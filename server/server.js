// Load environment variables from project root (.env). This works even if we run `node server/server.js` from inside `server`.
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { createSubscription, registerPaidUser } = require('./api/create-subscription');
const { requestQuote } = require('./api/request-quote');
const { sendCcpaRequest } = require('./api/ccpa-request');

const app = express();

// Set default port if not provided in environment - use SERVER_PORT for backend
const PORT = process.env.SERVER_PORT || 3001;

// CORS configuration for development
const corsOptions = {
  origin: [
    'http://localhost:3000', // React development server
    'http://localhost:3001', // This server
    'https://spotter.ai', // Production domain
    /\.spotter\.ai$/, // Any subdomain of spotter.ai
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes MUST come before static file serving
app.post('/api/create-subscription', createSubscription);
app.post('/api/register-paid-user', registerPaidUser);
app.post('/api/request-quote', requestQuote);
app.post('/api/ccpa-request', sendCcpaRequest);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    message: 'Spotter API Server',
    mode: 'production',
    endpoints: [
      'POST /api/request-quote',
      'POST /api/create-subscription',
      'POST /api/register-paid-user',
      'GET /api/health',
      'GET /api/status',
    ],
  });
});

const buildPath = path.join(__dirname, '..', 'build');

// Serve static files only if build directory exists
if (fs.existsSync(buildPath)) {
  console.log(`📦 Build directory found, serving static files from: ${buildPath}`);

  app.use(
    express.static(buildPath, {
      etag: false,
      lastModified: false,
      setHeaders: (res, filePath) => {
        // No cache for index html otherwise there's gonna be problems loading the scripts
        if (filePath.indexOf('index.html') !== -1) {
          res.set('Cache-Control', 'no-store');
        }
      },
    })
  );

  // Catch-all handler for React Router (MUST be last)
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(buildPath, 'index.html'), { etag: false, lastModified: false });
  });
} else {
  console.log(`⚠️  Build directory not found. Running in API-only mode.`);

  // Development mode - just serve API
  app.get('/', (req, res) => {
    res.json({
      message: 'Spotter API Server',
      mode: 'development',
      endpoints: [
        'POST /api/request-quote',
        'POST /api/create-subscription',
        'POST /api/register-paid-user',
        'GET /api/health',
        'GET /api/status',
      ],
    });
  });

  // Handle 404 for non-API routes in development
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.status(404).json({ error: 'Page not found - React dev server should handle this' });
  });
}

console.log(`🚀 Server starting on port ${PORT}`);
if (fs.existsSync(buildPath)) {
  console.log(`📱 React app will be served at: http://localhost:${PORT}`);
} else {
  console.log(`📱 React dev server should run on: http://localhost:3000`);
}
console.log(`🔌 API endpoints available at: http://localhost:${PORT}/api/`);

app.listen(PORT, () => {
  console.log(`✅ Server successfully started and listening on port ${PORT}`);
});
