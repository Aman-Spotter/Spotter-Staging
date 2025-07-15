import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Color palette matching brand identity
const colors = {
  primary: '#14b8a6', // Teal
  primaryLight: '#40e0d0', // Light teal
  primaryDark: '#0f766e', // Dark teal
  background: '#0f172a', // Dark blue
  backgroundLight: '#1e293b', // Lighter dark blue
  cardBackground: 'rgba(30, 41, 59, 0.9)', // Semi-transparent card
  text: '#ffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  border: 'rgba(148, 163, 184, 0.2)',
  glow: 'rgba(20, 184, 166, 0.3)',
};

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Layout Components
export const Layout = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
  color: ${colors.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding-left: max(20px, env(safe-area-inset-left));
  padding-right: max(20px, env(safe-area-inset-right));
  padding-top: 120px;
  padding-bottom: 20px;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(15, 118, 110, 0.05) 0%, transparent 50%);
    animation: ${gradientShift} 15s ease infinite;
    z-index: 0;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 0;
    pointer-events: none;
  }
`;

// Blog List
export const BlogList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 1;
  padding: 0 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 0 20px;
    max-width: 100%;
  }
`;

// Blog Card Image
export const BlogCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0;
  transition: transform 0.4s ease;
  background: linear-gradient(45deg, ${colors.backgroundLight}, ${colors.background});
`;

// Blog Card
export const BlogCard = styled.div`
  background: ${colors.cardBackground};
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${colors.border};
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${slideIn} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight});
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 0 0 1px ${colors.primary}30,
      0 0 10px ${colors.glow};
    border-color: ${colors.primary};

    &::before {
      transform: scaleX(1);
    }

    ${BlogCardImage} {
      transform: scale(1.03);
    }
  }

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
`;

export const BlogContent = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const BlogCategory = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
  color: ${colors.text};
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px ${colors.primary}30;
  align-self: flex-start;
`;

export const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 16px;
  color: ${colors.text};
  word-break: break-word;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const BlogExcerpt = styled.p`
  color: ${colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1rem;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BlogMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
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
  font-weight: 500;

  svg {
    width: 14px;
    height: 14px;
    color: ${colors.primary};
  }
`;

export const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.primary};
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-top: auto;
  padding: 12px 0;
  border-top: 1px solid ${colors.border};

  svg {
    transition: transform 0.3s ease;
    color: ${colors.primary};
  }

  ${BlogCard}:hover & {
    color: ${colors.primaryLight};

    svg {
      transform: translateX(6px);
      color: ${colors.primaryLight};
    }
  }
`;

// Responsive Table Styles for Blog Content
export const ResponsiveTable = styled.div`
  overflow-x: auto;
  margin: 20px 0;
  border-radius: 8px;
  border: 1px solid ${colors.border};

  table {
    width: 100%;
    border-collapse: collapse;
    background: ${colors.cardBackground};
    min-width: 600px;
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
    margin: 15px 0;
    border-radius: 6px;

    th,
    td {
      padding: 8px 12px;
      font-size: 13px;
      min-width: 80px;
    }

    th {
      font-size: 13px;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden !important;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
  }
  
  * {
    box-sizing: border-box;
  }
`;
