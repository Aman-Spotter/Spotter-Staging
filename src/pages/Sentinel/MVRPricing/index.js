import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import * as S from './styles';

// Add error boundary and debugging
console.log('MVRPricing component loading...');

// Test if styled-components are working
console.log('Styled components imported:', Object.keys(S));

// Sentinel Logo SVG Component
const SentinelLogo = () => (
  <svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="460 890 1100 190"
    width="160"
    height="35"
    className="h-auto w-auto"
    aria-label="Spotter Safety Logo"
  >
    <g id="Layer 1">
      <g id="group">
        <g id="shapes">
          <g id="shape1">
            <g id="path1">
              <path
                id="path-teal"
                className="fill-[#0f8181] dark:fill-[#4fd1c5]"
                d="m680.8 916.6l-124.7 50.4c-9 3.6-14.9 12.4-14.9 22.1v65l-72.1-30.7v-53.6c0-23.8 14.5-45.2 36.6-54.1l89.1-35.6z"
              />
            </g>
          </g>
          <g id="shape2">
            <g id="path2">
              <path
                id="path-teal-2"
                className="fill-[#0f8181] dark:fill-[#4fd1c5]"
                d="m680.9 976.4v53.6c-0.1 23.8-14.5 45.2-36.6 54.1l-89.3 35.8-85.9-36.5 124.7-50.6c9-3.6 14.9-12.3 14.9-22l0.1-65.1z"
              />
            </g>
          </g>
        </g>
        <g id="text">
          <path
            id="s"
            className="fill-zinc-900 dark:fill-white"
            d="m768.9 999q-5.4-1.9-11-4.4-5.6-2.5-10-6.1-4.5-3.5-7.2-8.5-2.8-5-2.8-11.9 0-7.5 3.1-13.2 3-5.7 8.3-9.6 5.3-3.9 12.1-5.9 6.8-2 14.3-2 5.2 0 10.4 0.9 5.1 0.9 9.6 2.9 4.5 1.9 8.1 4.9 3.7 3.1 6 7.2 1.2 2.4 0.8 4.8-0.3 2.4-1.7 3.8-1.5 1.6-3.7 2.1-2.2 0.6-4.3-0.5-5.2-5.8-10.8-8.3-5.5-2.5-13.3-2.5-4.4 0-8.6 0.8-4.1 0.8-7.4 2.6-3.2 1.8-5.1 4.8-1.9 3-1.9 7.3 0 3.9 1.8 6.6 1.9 2.8 5.1 4.8 3.2 2 7.5 3.4 4.4 1.5 9.1 2.9 7.7 2.5 14.8 5.2 7 2.8 12.3 6.7 5.3 3.9 8.4 9.3 3.1 5.4 3.1 12.9 0 7-3.1 13.1-3 6.1-8.3 10.6-5.4 4.5-12.6 7-7.2 2.5-15.5 2.5-6.2 0-12.2-1.2-6.1-1.2-11.5-3.6-5.4-2.4-9.7-6.3-4.3-3.8-7-9.1-1.8-3.5-1-6.3 0.7-2.7 2.9-4.1 2.1-1.4 5.2-1 3.1 0.5 6 3.3 3.8 6.1 10.9 9.6 7.1 3.5 16.4 3.5 4.6 0 8.9-1.3 4.4-1.3 7.6-3.7 3.3-2.3 5.2-5.6 2-3.3 2-7.3 0-4.1-2.8-7.2-2.8-3.2-7.3-5.7-4.5-2.6-10-4.5-5.5-2-11.1-3.7z"
          />
          <path
            id="p"
            fillRule="evenodd"
            className="fill-zinc-900 dark:fill-white"
            d="m843.8 1002.5q0.9 7.6 4.4 13.9 3.6 6.4 9 11.1 5.4 4.6 12.3 7.3 6.9 2.7 14.6 2.7 8.9 0 17-3.4 8-3.4 13.1-9.6 4.1-3 7.9-1.7 2.2 0.7 3.6 3.2 1.6 2.1 1.6 5.2-0.1 3-2.9 5.4-6.5 7.1-16.5 11.9-10.1 4.7-23.8 4.7-12 0-22.5-4.5-10.5-4.6-18.3-12.4-7.9-7.9-12.5-18.5-4.5-10.5-4.5-22.5 0-12 4.5-22.5 4.6-10.5 12.5-18.4 7.8-7.9 18.3-12.4 10.5-4.6 22.5-4.6 11.9 0 22.5 4.5 10.5 4.5 18.4 12.3 7.8 7.8 12.4 18.3 4.6 10.5 4.7 22.4 0 3.3-2.1 5.5-2.1 2.1-5.5 2.1zm82.2-13.3q-0.8-7.8-4.4-14.3-3.6-6.6-9.2-11.4-5.5-4.9-12.7-7.6-7.2-2.7-15.2-2.7-8.1 0-15.2 2.8-7.2 2.8-12.7 7.5-5.5 4.8-9 11.4-3.5 6.7-4.3 14.3z"
          />
          <path
            id="o"
            className="fill-zinc-900 dark:fill-white"
            d="m970.5 993v50.9q0 3.4-2.1 5.6-2.1 2.3-5.7 2.3-3.1 0-5.5-2.3-2.5-2.2-2.5-5.6v-51.1q0-11.5 4.2-21.6 4.1-10 11.3-17.5 7.2-7.6 17-11.9 9.9-4.4 21.4-4.4 11.4 0 21.1 4.3 9.7 4.3 16.7 11.8 6.9 7.6 11 17.6 4 10.1 4 21.6v0.1 0.5 50.6q0 3.4-2.2 5.6-2.2 2.3-5.5 2.3-3.4 0-5.7-2.3-2.4-2.2-2.4-5.6v-50.6q0-0.8 0.1-1.2-0.2-8-3-15.1-2.8-7.1-7.7-12.4-4.9-5.2-11.7-8.3-6.7-3.1-14.7-3.1-8.1 0-15 3-7 3-12.1 8.3-5.1 5.3-8 12.4-2.9 7.1-3 15.3v0.6z"
          />
          <path
            id="t"
            className="fill-zinc-900 dark:fill-white"
            d="m1097.5 939h52.5q3.3 0 5.7 2.3 2.3 2.3 2.3 5.6 0 3.1-2.2 5.5-2.3 2.4-5.8 2.4h-52.5v41.8q0 8.6 3.3 16.1 3.2 7.4 9 12.9 5.8 5.4 13.5 8.6 7.7 3.2 16.5 3.2 8 0 14.6-2.3 6.7-2.4 12.7-7.7 0.8-0.6 1.5-1.1 0.7-0.6 1.7-1 1.8-0.7 3.9-0.5 2.1 0.2 3.8 1.9 1.4 1.2 1.9 2.8 0.6 1.5 0.4 3.2-0.1 1.7-0.9 3.4-0.8 1.6-2 2.8-7.4 7.1-16.9 10.7-9.6 3.6-20.7 3.6-12 0-22.6-4.3-10.6-4.4-18.5-12-7.9-7.7-12.4-18-4.6-10.4-4.6-22.4v-87.8q0-3.4 2.3-5.8 2.3-2.4 5.6-2.4 3.4 0 5.7 2.3 2.2 2.3 2.2 5.9z"
          />
          <path
            id="t"
            className="fill-zinc-900 dark:fill-white"
            d="m1193.8 913.9q0-4.1 2.8-6.9 2.8-2.7 6.7-2.7 4 0 6.8 2.7 2.7 2.8 2.7 6.9 0 3.9-2.7 6.6-2.8 2.8-6.8 2.8-2 0-3.7-0.8-1.8-0.7-3.1-2-1.2-1.3-2-3-0.7-1.7-0.7-3.6zm17.4 129.8q-0.1 3.4-2.3 5.7-2.2 2.3-5.5 2.3-3.3 0-5.7-2.3-2.3-2.3-2.3-5.7v-96.8q0-3.3 2.3-5.6 2.4-2.3 5.7-2.3 3.4 0 5.6 2.3 2.2 2.3 2.2 5.6z"
          />
          <path
            id="e"
            className="fill-zinc-900 dark:fill-white"
            d="m1249.7 993v50.9q0 3.4-2.1 5.6-2.1 2.3-5.6 2.3-3.2 0-5.6-2.3-2.4-2.2-2.4-5.6v-51.1q0-11.5 4.1-21.6 4.1-10 11.3-17.5 7.2-7.6 17.1-11.9 9.8-4.4 21.3-4.4 11.4 0 21.1 4.3 9.7 4.3 16.7 11.8 7 7.6 11 17.6 4 10.1 4 21.6v0.1 0.5 50.6q0 3.4-2.2 5.6-2.2 2.3-5.5 2.3-3.4 0-5.7-2.3-2.4-2.2-2.4-5.6v-50.6q0-0.8 0.1-1.2-0.2-8-3-15.1-2.8-7.1-7.7-12.4-4.9-5.2-11.7-8.3-6.7-3.1-14.7-3.1-8.1 0-15 3-6.9 3-12 8.3-5.1 5.3-8 12.4-3 7.1-3.1 15.3v0.6z"
          />
          <path
            id="r"
            fillRule="evenodd"
            className="fill-zinc-900 dark:fill-white"
            d="m1371.6 1002.5q1 7.6 4.5 13.9 3.5 6.4 8.9 11.1 5.4 4.6 12.3 7.3 7 2.7 14.7 2.7 8.9 0 16.9-3.4 8.1-3.4 13.2-9.6 4.1-3 7.9-1.7 2.2 0.7 3.6 3.2 1.6 2.1 1.5 5.2 0 3-2.8 5.4-6.6 7.1-16.6 11.9-10 4.7-23.7 4.7-12 0-22.5-4.5-10.5-4.6-18.4-12.4-7.8-7.9-12.4-18.5-4.5-10.5-4.5-22.5 0-12 4.5-22.5 4.6-10.5 12.4-18.4 7.9-7.9 18.4-12.4 10.5-4.6 22.5-4.6 11.9 0 22.5 4.5 10.5 4.5 18.3 12.3 7.9 7.8 12.5 18.3 4.6 10.5 4.7 22.4 0 3.3-2.1 5.5-2.2 2.1-5.5 2.1zm82.2-13.3q-0.9-7.8-4.4-14.3-3.6-6.6-9.2-11.4-5.6-4.9-12.7-7.6-7.2-2.7-15.2-2.7-8.1 0-15.3 2.8-7.1 2.8-12.7 7.5-5.5 4.8-8.9 11.4-3.5 6.7-4.3 14.3z"
          />
          <path
            id="l"
            className="fill-zinc-900 dark:fill-white"
            d="m1530.9 1043.9q0 3.4-2.2 5.6-2.2 2.2-5.5 2.2h-0.1-0.6q-8.2-0.2-15.3-3.1-7-2.9-12.1-8.2-5.1-5.2-7.9-12.6-2.9-7.4-2.9-16.4v-108.1q0-3.4 2.2-5.7 2.3-2.3 5.4-2.3 3.3 0 5.7 2.3 2.5 2.3 2.5 5.7v108.2q0.1 11.4 6.1 17.8 6 6.4 16.3 6.6h0.6q3.4 0 5.6 2.4 2.2 2.3 2.2 5.6z"
          />
        </g>
      </g>
    </g>
  </svg>
);

const MVRPricing = () => {
  console.log('MVRPricing component rendering...');

  try {
    // State for search, filter, and sort
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('state'); // 'state', 'price-asc', 'price-desc'
    const [showExportMenu, setShowExportMenu] = useState(false);

    // MVR pricing data by state
    const mvrPricingData = [
      { state: 'WI', price: 9.13 },
      { state: 'TX', price: 8.63 },
      { state: 'CT', price: 20.13 },
      { state: 'WV', price: 14.63 },
      { state: 'OH', price: 7.13 },
      { state: 'KS', price: 18.83 },
      { state: 'AZ', price: 10.13 },
      { state: 'MA', price: 10.13 },
      { state: 'MN', price: 7.13 },
      { state: 'VA', price: 10.13 },
      { state: 'UT', price: 13.13 },
      { state: 'CO', price: 8.13 },
      { state: 'AL', price: 12.13 },
      { state: 'OK', price: 29.63 },
      { state: 'IN', price: 12.13 },
      { state: 'MO', price: 4.95 },
      { state: 'NV', price: 9.13 },
      { state: 'ID', price: 12.13 },
      { state: 'LA', price: 20.13 },
      { state: 'NE', price: 9.63 },
      { state: 'FL', price: 10.13 },
      { state: 'MD', price: 17.13 },
      { state: 'ME', price: 9.13 },
      { state: 'WA', price: 17.13 },
      { state: 'DE', price: 27.13 },
      { state: 'IL', price: 22.13 },
      { state: 'TN', price: 9.63 },
      { state: 'MS', price: 16.13 },
      { state: 'GA', price: 8.13 },
      { state: 'NM', price: 8.52 },
      { state: 'NJ', price: 14.13 },
      { state: 'SC', price: 9.38 },
      { state: 'OR', price: 16.12 },
      { state: 'KY', price: 8.13 },
      { state: 'PA', price: 18.13 },
      { state: 'IA', price: 12.43 },
      { state: 'CA', price: 4.13 },
      { state: 'NY', price: 9.13 },
      { state: 'RI', price: 23.13 },
      { state: 'MI', price: 17.13 },
      { state: 'AR', price: 14.83 },
      { state: 'NC', price: 14.88 },
      { state: 'WY', price: 12.13 },
      { state: 'ND', price: 5.13 },
    ];

    // Find min and max prices for highlighting
    const minPrice = Math.min(...mvrPricingData.map((item) => item.price));
    const maxPrice = Math.max(...mvrPricingData.map((item) => item.price));

    // Filter and sort data
    const filteredAndSortedData = useMemo(() => {
      let filtered = mvrPricingData;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.state.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply price filter
      if (priceFilter !== 'all') {
        switch (priceFilter) {
          case 'under-10':
            filtered = filtered.filter((item) => item.price < 10);
            break;
          case '10-15':
            filtered = filtered.filter((item) => item.price >= 10 && item.price <= 15);
            break;
          case '15-20':
            filtered = filtered.filter((item) => item.price > 15 && item.price <= 20);
            break;
          case 'over-20':
            filtered = filtered.filter((item) => item.price > 20);
            break;
          default:
            break;
        }
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          return filtered.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return filtered.sort((a, b) => b.price - a.price);
        case 'state':
        default:
          return filtered.sort((a, b) => a.state.localeCompare(b.state));
      }
    }, [searchTerm, priceFilter, sortBy]);

    // Get price badge type
    const getPriceBadgeType = (price) => {
      if (price === minPrice) return 'lowest';
      if (price === maxPrice) return 'highest';
      return null;
    };

    // Export functions
    const exportToCSV = () => {
      const headers = ['State', 'MVR Price'];
      const csvContent = [
        headers.join(','),
        ...filteredAndSortedData.map((item) => `${item.state},$${item.price.toFixed(2)}`),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'mvr-pricing-by-state.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const exportToPDF = () => {
      // Create a simple PDF-like format using window.print()
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>MVR Pricing by State - Spotter Sentinel</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #04283c; text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #e3f2fd; color: #04283c; }
              .header { text-align: center; margin-bottom: 30px; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Spotter Sentinel MVR Pricing by State</h1>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>State</th>
                  <th>MVR Price</th>
                </tr>
              </thead>
              <tbody>
                ${filteredAndSortedData
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.state}</td>
                    <td>$${item.price.toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
            <div class="footer">
              <p>Spotter Sentinel LLC | Info@spottersentinel.com | +1 (269) 682-2181</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    };

    // Close export menu when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (showExportMenu && !event.target.closest('.export-container')) {
          setShowExportMenu(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showExportMenu]);

    // Update page title for SEO
    React.useEffect(() => {
      document.title = 'MVR Pricing by State | Spotter Sentinel - Driver Record Search';
    }, []);

    console.log('MVRPricing component rendering JSX...');

    // Check if styled components are available
    if (!S.PageContainer) {
      console.error('Styled components not loaded properly');
      return (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f0f0f0',
            minHeight: '100vh',
          }}
        >
          <h1 style={{ color: '#333' }}>MVR Pricing by State</h1>
          <p style={{ color: '#666' }}>Spotter Sentinel MVR price by state</p>
          <div style={{ marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: '#e3f2fd' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>
                    State
                  </th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>
                    MVR Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {mvrPricingData.slice(0, 10).map((item, index) => (
                  <tr
                    key={item.state}
                    style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}
                  >
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.state}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      ${item.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '20px', color: '#666' }}>
            Spotter Sentinel LLC | Info@spottersentinel.com | +1 (269) 682-2181
          </p>
        </div>
      );
    }

    return (
      <S.PageContainer>
        {/* Header with Logo */}
        <S.HeaderSection>
          <S.HeaderContent>
            <S.LogoContainer>
              <SentinelLogo />
            </S.LogoContainer>
            <S.HeaderTitle>Spotter Sentinel MVR price by state</S.HeaderTitle>
          </S.HeaderContent>
        </S.HeaderSection>

        {/* Main Content */}
        <S.MainContent>
          <S.ContentWrapper>
            {/* Search and Filter Controls */}
            <S.ControlsSection>
              <S.ControlsRow>
                {/* Search Bar */}
                <S.SearchContainer>
                  <S.SearchIcon>
                    <Search size={16} />
                  </S.SearchIcon>
                  <S.SearchInput
                    type="text"
                    placeholder="Search states..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </S.SearchContainer>

                {/* Price Filter */}
                <S.FilterContainer>
                  <S.FilterIcon>
                    <Filter size={16} />
                  </S.FilterIcon>
                  <S.FilterSelect
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="under-10">Under $10</option>
                    <option value="10-15">$10 - $15</option>
                    <option value="15-20">$15 - $20</option>
                    <option value="over-20">Over $20</option>
                  </S.FilterSelect>
                </S.FilterContainer>

                {/* Sort Options */}
                <S.SortContainer>
                  <S.SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="state">Sort by State</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </S.SortSelect>
                </S.SortContainer>

                {/* Export Menu */}
                <S.ExportContainer className="export-container">
                  <S.ExportButton onClick={() => setShowExportMenu(!showExportMenu)}>
                    <Download size={16} />
                    Export
                  </S.ExportButton>
                  {showExportMenu && (
                    <S.ExportMenu>
                      <S.ExportMenuItem onClick={exportToCSV}>
                        <FileSpreadsheet size={16} />
                        Export to CSV
                      </S.ExportMenuItem>
                      <S.ExportMenuItem onClick={exportToPDF}>
                        <FileText size={16} />
                        Export to PDF
                      </S.ExportMenuItem>
                    </S.ExportMenu>
                  )}
                </S.ExportContainer>
              </S.ControlsRow>

              {/* Results Count */}
              <S.ResultsCount>
                Showing {filteredAndSortedData.length} of {mvrPricingData.length} states
              </S.ResultsCount>
            </S.ControlsSection>

            {/* Pricing Table */}
            <S.PricingSection>
              <S.TableContainer>
                <S.Table>
                  <S.TableHeader>
                    <S.TableHeaderCell>
                      State
                      {sortBy === 'state' && (
                        <S.SortIcon>
                          <ChevronUp size={12} />
                        </S.SortIcon>
                      )}
                    </S.TableHeaderCell>
                    <S.TableHeaderCell>
                      MVR Price
                      {sortBy === 'price-asc' && (
                        <S.SortIcon>
                          <ChevronUp size={12} />
                        </S.SortIcon>
                      )}
                      {sortBy === 'price-desc' && (
                        <S.SortIcon>
                          <ChevronDown size={12} />
                        </S.SortIcon>
                      )}
                    </S.TableHeaderCell>
                  </S.TableHeader>
                  <S.TableBody>
                    {filteredAndSortedData.map((item, index) => {
                      const badgeType = getPriceBadgeType(item.price);
                      return (
                        <S.TableRow key={item.state} $isEven={index % 2 === 0}>
                          <S.TableCell>{item.state}</S.TableCell>
                          <S.TableCell>
                            ${item.price.toFixed(2)}
                            {badgeType && (
                              <S.PriceBadge $type={badgeType}>
                                {badgeType === 'lowest' ? 'Lowest' : 'Highest'}
                              </S.PriceBadge>
                            )}
                          </S.TableCell>
                        </S.TableRow>
                      );
                    })}
                  </S.TableBody>
                </S.Table>
              </S.TableContainer>
            </S.PricingSection>

            {/* Footer Information */}
            <S.FooterSection>
              <S.FooterContent>
                <S.FooterLeft>Spotter Sentinel LLC</S.FooterLeft>
                <S.FooterCenter>
                  <S.FooterLink href="mailto:Info@spottersentinel.com">
                    Info@spottersentinel.com
                  </S.FooterLink>
                </S.FooterCenter>
                <S.FooterRight>+1 (269) 682-2181</S.FooterRight>
              </S.FooterContent>
            </S.FooterSection>
          </S.ContentWrapper>
        </S.MainContent>
      </S.PageContainer>
    );
  } catch (error) {
    console.error('Error in MVRPricing component:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Error Loading MVR Pricing Page</h1>
        <p>Something went wrong. Please try refreshing the page.</p>
        <p>Error: {error.message}</p>
      </div>
    );
  }
};

export default MVRPricing;
