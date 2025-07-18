import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronUp } from 'lucide-react';
import * as S from './styles';

// MVR pricing data
const mvrPricingData = [
  { state: 'Alabama', price: 8.63 },
  { state: 'Alaska', price: 9.13 },
  { state: 'Arizona', price: 4.13 },
  { state: 'Arkansas', price: 8.63 },
  { state: 'California', price: 4.13 },
  { state: 'Colorado', price: 8.63 },
  { state: 'Connecticut', price: 9.13 },
  { state: 'Delaware', price: 8.63 },
  { state: 'Florida', price: 8.63 },
  { state: 'Georgia', price: 8.63 },
  { state: 'Hawaii', price: 9.13 },
  { state: 'Idaho', price: 8.63 },
  { state: 'Illinois', price: 8.63 },
  { state: 'Indiana', price: 8.63 },
  { state: 'Iowa', price: 8.63 },
  { state: 'Kansas', price: 8.63 },
  { state: 'Kentucky', price: 8.63 },
  { state: 'Louisiana', price: 8.63 },
  { state: 'Maine', price: 9.13 },
  { state: 'Maryland', price: 8.63 },
  { state: 'Massachusetts', price: 9.13 },
  { state: 'Michigan', price: 8.63 },
  { state: 'Minnesota', price: 8.63 },
  { state: 'Mississippi', price: 8.63 },
  { state: 'Missouri', price: 8.63 },
  { state: 'Montana', price: 8.63 },
  { state: 'Nebraska', price: 8.63 },
  { state: 'Nevada', price: 8.63 },
  { state: 'New Hampshire', price: 9.13 },
  { state: 'New Jersey', price: 9.13 },
  { state: 'New Mexico', price: 8.63 },
  { state: 'New York', price: 9.13 },
  { state: 'North Carolina', price: 8.63 },
  { state: 'North Dakota', price: 8.63 },
  { state: 'Ohio', price: 8.63 },
  { state: 'Oklahoma', price: 8.63 },
  { state: 'Oregon', price: 8.63 },
  { state: 'Pennsylvania', price: 8.63 },
  { state: 'Rhode Island', price: 9.13 },
  { state: 'South Carolina', price: 8.63 },
  { state: 'South Dakota', price: 8.63 },
  { state: 'Tennessee', price: 8.63 },
  { state: 'Texas', price: 8.63 },
  { state: 'Utah', price: 8.63 },
  { state: 'Vermont', price: 9.13 },
  { state: 'Virginia', price: 8.63 },
  { state: 'Washington', price: 8.63 },
  { state: 'West Virginia', price: 8.63 },
  { state: 'Wisconsin', price: 8.63 },
  { state: 'Wyoming', price: 8.63 },
];

console.log('MVRPricing component loading...');

// Test if styled-components are working
console.log('Styled components imported:', Object.keys(S));

const MVRPricing = () => {
  console.log('MVRPricing component rendering...');

  try {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const exportMenuRef = useRef(null);

    // Set page title
    useEffect(() => {
      document.title = 'MVR Pricing by State | Spotter Sentinel';
    }, []);

    // Handle click outside export menu
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
          setShowExportMenu(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter and sort data
    const filteredAndSortedData = useMemo(() => {
      let filtered = mvrPricingData.filter((item) =>
        item.state.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Apply price filter
      if (priceFilter !== 'all') {
        filtered = filtered.filter((item) => {
          switch (priceFilter) {
            case 'under10':
              return item.price < 10;
            case '10to15':
              return item.price >= 10 && item.price <= 15;
            case 'over20':
              return item.price > 20;
            default:
              return true;
          }
        });
      }

      // Sort data
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        }
        return b.price - a.price;
      });

      return filtered;
    }, [searchTerm, priceFilter, sortOrder]);

    // Find min and max prices for highlighting
    const minPrice = Math.min(...mvrPricingData.map((item) => item.price));
    const maxPrice = Math.max(...mvrPricingData.map((item) => item.price));

    // Get price badge type
    const getPriceBadgeType = (price) => {
      if (price === minPrice) return 'lowest';
      if (price === maxPrice) return 'highest';
      return null;
    };

    // Export functions
    const exportToCSV = () => {
      const csvContent = [
        'State,MVR Price',
        ...filteredAndSortedData.map((item) => `${item.state},$${item.price.toFixed(2)}`),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mvr-pricing.csv';
      a.click();
      URL.revokeObjectURL(url);
      setShowExportMenu(false);
    };

    const exportToPDF = () => {
      window.print();
      setShowExportMenu(false);
    };

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
        <S.HeaderSection>
          <S.LogoContainer>
            <SentinelLogo />
          </S.LogoContainer>
          <S.Title>MVR Pricing by State</S.Title>
          <S.Subtitle>Spotter Sentinel MVR price by state</S.Subtitle>
        </S.HeaderSection>

        <S.ContentSection>
          <S.ControlsSection>
            <S.SearchContainer>
              <S.SearchIcon>
                <Search size={20} />
              </S.SearchIcon>
              <S.SearchInput
                type="text"
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </S.SearchContainer>

            <S.FilterContainer>
              <S.FilterIcon>
                <Filter size={20} />
              </S.FilterIcon>
              <S.FilterSelect value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="under10">Under $10</option>
                <option value="10to15">$10 - $15</option>
                <option value="over20">Over $20</option>
              </S.FilterSelect>
            </S.FilterContainer>

            <S.SortContainer>
              <S.SortButton onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Price {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </S.SortButton>
            </S.SortContainer>

            <S.ExportContainer ref={exportMenuRef}>
              <S.ExportButton onClick={() => setShowExportMenu(!showExportMenu)}>
                <Download size={16} />
                Export
              </S.ExportButton>
              {showExportMenu && (
                <S.ExportMenu>
                  <S.ExportMenuItem onClick={exportToCSV}>Export to CSV</S.ExportMenuItem>
                  <S.ExportMenuItem onClick={exportToPDF}>Export to PDF</S.ExportMenuItem>
                </S.ExportMenu>
              )}
            </S.ExportContainer>
          </S.ControlsSection>

          <S.TableSection>
            <S.TableContainer>
              <S.Table>
                <S.TableHeader>
                  <S.TableHeaderCell>State</S.TableHeaderCell>
                  <S.TableHeaderCell>MVR Price</S.TableHeaderCell>
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
          </S.TableSection>
        </S.ContentSection>

        <S.FooterSection>
          <S.FooterText>
            Spotter Sentinel LLC | Info@spottersentinel.com | +1 (269) 682-2181
          </S.FooterText>
        </S.FooterSection>
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

// Sentinel Logo Component
const SentinelLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#0F172A" />
    <path
      d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C20 10 20 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z"
      fill="#3B82F6"
    />
    <path
      d="M20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20C28 15.5817 24.4183 12 20 12ZM20 26C16.6863 26 14 23.3137 14 20C14 16.6863 16.6863 14 20 14C20 14 20 14 20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26Z"
      fill="#60A5FA"
    />
    <circle cx="20" cy="20" r="4" fill="#93C5FD" />
    <path d="M18 18H22V22H18V18Z" fill="#DBEAFE" />
  </svg>
);

export default MVRPricing;
