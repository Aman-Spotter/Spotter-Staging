# Spotter.AI 🚛

A comprehensive trucking and logistics platform providing market intelligence, load optimization, and fleet management solutions for the transportation industry.

## 🏗️ Project Architecture

### Frontend (React Application)

- **Framework**: React 17.0.1 with Create React App
- **State Management**: Apollo Client for GraphQL, Context API for local state
- **Styling**: Styled Components + SCSS
- **Maps & Visualization**: D3.js, Google Maps API, Custom mapping components
- **UI Components**: Custom component library with responsive design

### Backend (Node.js/Express)

- **Runtime**: Node.js 18.x with Express.js
- **APIs**: RESTful endpoints for subscriptions, quotes, and payments
- **Payment Processing**: Stripe integration for subscription management
- **Email**: Nodemailer with SMTP configuration
- **Notifications**: Slack webhook integrations

### Infrastructure & Deployment

- **Cloud Platform**: Google Cloud Platform (App Engine)
- **Build System**: Cloud Build with CI/CD pipelines
- **Environment Management**: Separate dev/prod configurations
- **CDN**: Cloud Load Balancer with cache invalidation

## 🚀 Key Features

### 🎯 Core Applications

#### **Spotter Lens** (Market Intelligence)

- Real-time freight market analysis
- Hot market visualization with interactive maps
- Historical market data and trends
- Load board optimization tools

#### **Spotter Sentinel** (Fleet Management)

- Driver monitoring and safety analytics
- Compliance tracking and reporting
- Fleet performance optimization
- Real-time alerts and notifications

#### **Spotter TMS** (Transportation Management)

- Load planning and optimization
- Route management
- Dispatch coordination
- Carrier management tools

#### **Browser Extension**

- Load board integration
- Market data overlay
- Email automation tools
- Quick filtering and search

### 💼 Business Features

- **Subscription Management**: Stripe-powered billing with monthly/yearly plans
- **User Authentication**: Secure login/signup with password reset
- **Quote System**: Automated quote requests with Slack notifications
- **Loan Calculators**: Financial tools for equipment financing
- **Mobile Apps**: iOS and Android companion applications

## 🛠️ Technology Stack

### Frontend Dependencies

```json
{
  "React": "17.0.1",
  "Apollo Client": "^3.7.15",
  "Styled Components": "^5.3.10",
  "React Router": "^5.2.0",
  "D3.js": "Various modules",
  "Stripe React": "^2.9.0",
  "Google Maps": "^1.16.2"
}
```

### Backend Dependencies

```json
{
  "Express": "^4.17.1",
  "Stripe": "^18.2.1",
  "Nodemailer": "^7.0.3",
  "CORS": "^2.8.5",
  "dotenv": "^16.5.0"
}
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x
- Yarn 1.x
- Google Cloud SDK (for deployment)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd spotter.ai
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   SERVER_PORT=3001
   NODE_ENV=development

   # Frontend Configuration
   REACT_APP_API_URL=https://api-dev.ai/graphql/
   REACT_APP_GOOGLE_API_KEY=your_google_api_key

   # Stripe Configuration
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PROF_PLAN_PRICE_ID=price_...
   STRIPE_YEARLY_PRICE_ID=price_...

   # External API
   DRF_API_URL=http://localhost:8000

   # Slack Integration
   SLACK_SENTINEL_WEBHOOK_URL=https://hooks.slack.com/...
   SLACK_MAIN_WEHOOK_URL=https://hooks.slack.com/...

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your_email@spotter.ai
   SMTP_PASS=your_app_password
   ```

### Development

1. **Start the development server**

   ```bash
   yarn start
   ```

   The React app will be available at `http://localhost:3000`

2. **Start the backend server** (in a separate terminal)
   ```bash
   node server/server.js
   ```
   The API will be available at `http://localhost:3001`

### Production Build

```bash
yarn build
```

## 🌐 API Endpoints

### Core APIs

- `POST /api/create-subscription` - Create Stripe subscription
- `POST /api/register-paid-user` - Register paid user account
- `POST /api/request-quote` - Submit quote requests
- `GET /api/health` - Health check endpoint
- `GET /api/status` - API status and available endpoints

## 🏢 Application Routes

### Public Routes

- `/` - Landing page with product overview
- `/driversapp` - Driver mobile app promotion
- `/lens` - Market intelligence dashboard
- `/sentinel` - Fleet management solution
- `/tms` - Transportation management system
- `/loan-calculators` - Financial tools

### Auth Routes

- `/login` - User authentication
- `/sign-up` - User registration
- `/forgot-password` - Password recovery
- `/password-reset/:token` - Password reset

### Extension Routes (extension.spotter.ai)

- `/` - Extension landing page
- `/pay` - Extension payment processing
- `/billing` - Subscription management
- `/privacy` - Privacy policy
- `/limited-use-disclosure` - Data usage disclosure

## ☁️ Deployment

### Google App Engine Deployment

The application is deployed using Google Cloud Build with separate configurations for development and production environments.

**Development Deployment:**

```bash
gcloud builds submit --config cloudbuild-dev.yaml
```

**Production Deployment:**

```bash
gcloud builds submit --config cloudbuild-prod.yaml
```

### Environment-Specific Configuration

- **Development**: `dev.spotter.ai`
- **Production**: `spotter.ai`
- **Extension**: `extension.spotter.ai`

## 📱 Mobile Applications

The platform includes companion mobile applications:

- **iOS**: Available on the App Store
- **Android**: Available on Google Play Store

Mobile apps provide driver-focused features and real-time notifications.

## 🔧 Development Tools

### Code Quality

- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Lint-staged**: Run linters on staged files

### Build Optimization

- **Webpack**: Custom configuration for optimal bundling
- **Code Splitting**: Automatic route-based splitting
- **Source Maps**: Disabled in production for performance
- **Memory Optimization**: Increased heap size for large builds

## 🎨 UI/UX Features

### Design System

- **Custom Typography**: Matter font family
- **Color Palette**: Consistent brand colors throughout
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliance considerations

### Interactive Elements

- **Data Visualization**: Custom D3.js charts and maps
- **Real-time Updates**: Live market data feeds
- **Interactive Maps**: Google Maps integration with custom overlays
- **Progressive Web App**: Offline capabilities and mobile optimization

## 📊 Analytics & Monitoring

- **Google Analytics 4**: User behavior tracking
- **Performance Monitoring**: Web vitals tracking
- **Error Reporting**: Comprehensive error handling
- **Slack Notifications**: Real-time alerts for business events

## 🔐 Security Features

- **Environment Variables**: Sensitive data protection
- **CORS Configuration**: Cross-origin request security
- **Input Validation**: Server-side data validation
- **Secure Headers**: Security-focused HTTP headers
- **SSL/TLS**: End-to-end encryption

## 📈 Business Intelligence

### Market Data

- Real-time freight rates
- Supply and demand analytics
- Geographic market analysis
- Historical trend tracking

### Fleet Analytics

- Driver performance metrics
- Vehicle utilization reports
- Safety compliance tracking
- Cost optimization insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Spotter.AI.

## 🆘 Support

For technical support or business inquiries:

- **Email**: support@spotter.ai
- **Website**: [https://spotter.ai](https://spotter.ai)
- **Documentation**: Internal team documentation available

---

**Built with ❤️ by the Spotter.AI Team**
#   S p o t t e r - S t a g i n g  
 