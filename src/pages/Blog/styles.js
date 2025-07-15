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
  background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
  color: ${colors.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding: 20px;
`;

// Header Section
export const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, ${colors.text} 0%, ${colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
  word-break: break-word;
  line-height: 1.25;
  padding-bottom: 0.3em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Blog List
export const BlogList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// Blog Card
export const BlogCard = styled.div`
  background: ${colors.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${colors.border};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${colors.primary};
  }
`;

export const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const BlogCardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
  background: #222c3a;
`;

export const BlogContent = styled.div`
  padding: 24px;
`;

export const BlogCategory = styled.div`
  display: inline-block;
  background: ${colors.primary};
  color: ${colors.text};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BlogTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 12px;
  color: ${colors.text};
  word-break: break-word;
  white-space: normal;
  /* Remove any text-overflow or ellipsis */

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const BlogExcerpt = styled.p`
  color: ${colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

export const BlogMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${colors.textMuted};
  font-size: 0.85rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  ${BlogCard}:hover & {
    color: ${colors.primaryLight};

    svg {
      transform: translateX(4px);
    }
  }
`;
