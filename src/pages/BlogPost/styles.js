import styled from 'styled-components';

// Color palette matching brand identity
const colors = {
  primary: '#14b8a6', // Teal
  primaryLight: '#40e0d0', // Light teal
  background: '#0f172a', // Dark blue
  backgroundLight: '#1e293b', // Lighter dark blue
  cardBackground: 'rgba(30, 41, 59, 0.8)', // Semi-transparent card
  text: '#ffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  border: 'rgba(148, 163, 184, 0.2)',
};

// Layout Components
export const Layout = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
  color: ${colors.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 20px;
  padding-top: 84px; /* Account for fixed navbar height (64px) + 20px padding */

  @media (max-width: 768px) {
    padding: 20px;
    padding-top: 84px; /* Ensure consistent spacing on mobile */
  }
`;

// Loading State
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const LoadingText = styled.div`
  color: ${colors.textSecondary};
  font-size: 18px;
`;

// Back Button
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid ${colors.border};
  border-radius: 6px;
  color: ${colors.textMuted};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0;
  margin-bottom: 24px;
  margin-left: 0;
  margin-right: 0;
  box-shadow: none;

  &:hover {
    background: ${colors.backgroundLight};
    color: ${colors.primary};
    border-color: ${colors.primary};
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 13px;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const ArticleCategory = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: block;
`;

export const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 24px;
  color: ${colors.text};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${colors.textMuted};
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Featured Image
export const FeaturedImageSection = styled.section`
  margin-bottom: 40px;
`;

export const FeaturedImageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FeaturedImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

// Article Content
export const ArticleContent = styled.section`
  margin-bottom: 60px;
`;

export const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  line-height: 1.8;
  font-size: 16px;
  color: ${colors.textSecondary};

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${colors.text};
    margin: 40px 0 20px 0;
    line-height: 1.4;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: ${colors.text};
    margin: 30px 0 15px 0;
    line-height: 1.4;
  }

  p {
    margin-bottom: 20px;
  }

  ul,
  ol {
    margin: 20px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  blockquote {
    border-left: 4px solid ${colors.primary};
    padding-left: 20px;
    margin: 30px 0;
    font-style: italic;
    color: ${colors.textMuted};
    background: ${colors.cardBackground};
    padding: 20px;
    border-radius: 8px;
  }

  /* Responsive Table Styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
    background: ${colors.cardBackground};
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${colors.border};
  }

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid ${colors.border};
  }

  th {
    background: ${colors.backgroundLight};
    color: ${colors.text};
    font-weight: 600;
    font-size: 14px;
  }

  td {
    color: ${colors.textSecondary};
    font-size: 14px;
  }

  tr:hover {
    background: rgba(20, 184, 166, 0.05);
  }

  @media (max-width: 768px) {
    font-size: 15px;

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.2rem;
    }

    /* Mobile Table Styles */
    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      margin: 20px 0;
      border-radius: 6px;
    }

    th,
    td {
      padding: 8px 12px;
      font-size: 13px;
      min-width: 80px;
    }

    th {
      font-size: 13px;
      font-weight: 600;
    }
  }
`;
