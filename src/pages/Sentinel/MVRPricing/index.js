import React, { useState, useMemo } from 'react';

// Simple MVR pricing data
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

const MVRPricing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = mvrPricingData.filter((item) =>
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  }, [searchTerm, sortOrder]);

  // Find min and max prices for highlighting
  const minPrice = Math.min(...mvrPricingData.map((item) => item.price));
  const maxPrice = Math.max(...mvrPricingData.map((item) => item.price));

  // Get price badge type
  const getPriceBadgeType = (price) => {
    if (price === minPrice) return 'lowest';
    if (price === maxPrice) return 'highest';
    return null;
  };

  // Export to CSV
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
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            background: '#0F172A',
            borderRadius: '8px',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              background: '#3B82F6',
              borderRadius: '50%',
              border: '2px solid #60A5FA',
            }}
          />
        </div>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#04283c',
            margin: '0 0 8px 0',
          }}
        >
          MVR Pricing by State
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            margin: '0',
          }}
        >
          Spotter Sentinel MVR price by state
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: '1',
            minWidth: '200px',
            position: 'relative',
          }}
        >
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Sort */}
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{
            padding: '12px 16px',
            background: '#0f8181',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Price {sortOrder === 'asc' ? '↑' : '↓'}
        </button>

        {/* Export */}
        <button
          type="button"
          onClick={exportToCSV}
          style={{
            padding: '12px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          📥 Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr
              style={{
                background: '#e3f2fd',
                borderBottom: '2px solid #e5e7eb',
              }}
            >
              <th
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#04283c',
                }}
              >
                State
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#04283c',
                }}
              >
                MVR Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((item, index) => {
              const badgeType = getPriceBadgeType(item.price);
              return (
                <tr
                  key={item.state}
                  style={{
                    background: index % 2 === 0 ? '#f8fafc' : 'white',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <td
                    style={{
                      padding: '16px',
                      fontWeight: '500',
                      color: '#374151',
                    }}
                  >
                    {item.state}
                  </td>
                  <td
                    style={{
                      padding: '16px',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    ${item.price.toFixed(2)}
                    {badgeType && (
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          background: badgeType === 'lowest' ? '#dcfce7' : '#fef3c7',
                          color: badgeType === 'lowest' ? '#166534' : '#92400e',
                          border: `1px solid ${
                            badgeType === 'lowest'
                              ? 'rgba(34, 197, 94, 0.2)'
                              : 'rgba(245, 158, 11, 0.2)'
                          }`,
                        }}
                      >
                        {badgeType === 'lowest' ? 'Lowest' : 'Highest'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '24px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: '0',
          }}
        >
          Spotter Sentinel LLC | Info@spottersentinel.com | +1 (269) 682-2181
        </p>
      </div>
    </div>
  );
};

export default MVRPricing;
