import styled, { keyframes } from 'styled-components';

// Animation keyframes
const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const colors = {
  primary: '#0f8181',
  primaryLight: '#14b8a6',
  primaryDark: '#04283c',
  background: '#ffffff',
  border: '#e5e7eb',
  text: '#374151',
  textLight: '#6b7280',
  headerBg: '#e3f2fd',
  hover: '#f3f4f6',
  zebraLight: '#f8fafc',
  zebraDark: '#f1f5f9',
};

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(248, 73, 96, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(32, 178, 170, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
        circle at 25% 25%,
        rgba(64, 224, 208, 0.02) 1px,
        transparent 1px
      ),
      radial-gradient(circle at 75% 75%, rgba(248, 73, 96, 0.02) 1px, transparent 1px),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f8181' fill-opacity='0.01'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-size: 50px 50px, 30px 30px, 60px 60px;
    pointer-events: none;
  }
`;

export const HeaderSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 32px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
`;

export const HeaderContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${colors.primaryDark};
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const MainContent = styled.div`
  padding: 1.5rem 0;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 1rem 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 20px;
  }
`;

export const PricingSection = styled.div`
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #f7f9fb 0%, #f2f4f7 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const TableContainer = styled.div`
  background: ${colors.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid ${colors.border};
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(15, 129, 129, 0.2), transparent);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: ${colors.background};
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(135deg, ${colors.headerBg} 0%, #dbeafe 100%);
  border-bottom: 2px solid ${colors.primaryLight};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TableHeaderCell = styled.th`
  padding: 18px 20px;
  text-align: left;
  font-weight: 700;
  font-size: 14px;
  color: ${colors.primaryDark};
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  background: linear-gradient(135deg, ${colors.headerBg} 0%, #dbeafe 100%);
  border-right: 1px solid rgba(15, 129, 129, 0.1);

  &:first-child {
    border-top-left-radius: 16px;
  }

  &:last-child {
    border-top-right-radius: 16px;
    border-right: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight});
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, rgba(15, 129, 129, 0.05) 0%, rgba(20, 184, 166, 0.03) 100%);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(15, 129, 129, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }

  ${({ $isEven }) =>
    $isEven &&
    `
    background-color: ${colors.zebraLight};
    
    &:hover {
      background: linear-gradient(135deg, rgba(15, 129, 129, 0.08) 0%, rgba(20, 184, 166, 0.05) 100%);
    }
  `}
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: ${colors.text};
  font-weight: 500;
  transition: all 0.2s ease;
  border-right: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;

  &:first-child {
    font-weight: 700;
    color: ${colors.primaryDark};
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  }

  &:last-child {
    font-weight: 700;
    color: ${colors.primary};
    position: relative;
    border-right: none;
  }

  ${TableRow}:hover & {
    &:first-child::before {
      opacity: 1;
    }
  }
`;

// New styled component for price highlighting
export const PriceBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 8px;
  transition: all 0.2s ease;

  ${({ $type }) => {
    switch ($type) {
      case 'lowest':
        return `
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          color: #166534;
          border: 1px solid rgba(34, 197, 94, 0.2);
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.1);
        `;
      case 'highest':
        return `
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #92400e;
          border: 1px solid rgba(245, 158, 11, 0.2);
          box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
        `;
      default:
        return `
          background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
          color: #0c4a6e;
          border: 1px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 2px 4px rgba(14, 165, 233, 0.1);
        `;
    }
  }}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ControlsSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 900px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(15, 129, 129, 0.2), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textLight};
  z-index: 1;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 12px 14px 40px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  font-size: 14px;
  background: ${colors.background};
  color: ${colors.text};
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(15, 129, 129, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${colors.textLight};
  }
`;

export const FilterContainer = styled.div`
  position: relative;
  min-width: 150px;
`;

export const FilterIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textLight};
  z-index: 1;
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 14px 12px 14px 40px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  font-size: 14px;
  background: ${colors.background};
  color: ${colors.text};
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(15, 129, 129, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const SortContainer = styled.div`
  min-width: 180px;
  position: relative;

  &::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${colors.textLight};
    font-size: 12px;
  }
`;

export const SortSelect = styled.select`
  width: 100%;
  padding: 14px 12px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  font-size: 14px;
  background: ${colors.background};
  color: ${colors.text};
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(15, 129, 129, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const ExportContainer = styled.div`
  position: relative;
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(15, 129, 129, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 20px rgba(15, 129, 129, 0.4), 0 0 20px rgba(15, 129, 129, 0.2);
  }

  &:hover::before {
    left: 100%;
  }

  &:hover::after {
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(15, 129, 129, 0.3);
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`;

export const ExportMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 180px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    right: 20px;
    width: 8px;
    height: 8px;
    background: ${colors.background};
    border: 1px solid ${colors.border};
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }
`;

export const ExportMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 14px 18px;
  background: none;
  border: none;
  font-size: 14px;
  color: ${colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, rgba(15, 129, 129, 0.05) 0%, rgba(20, 184, 166, 0.03) 100%);
    color: ${colors.primary};
    transform: translateX(4px);
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

export const ResultsCount = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: ${colors.textLight};
  text-align: center;
  font-weight: 600;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const SortIcon = styled.span`
  margin-left: 6px;
  color: ${colors.primary};
  display: inline-flex;
  align-items: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const FooterSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const FooterLeft = styled.div`
  font-weight: 600;
  color: ${colors.primaryDark};
`;

export const FooterCenter = styled.div``;

export const FooterLink = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primaryDark};
    text-decoration: underline;
  }
`;

export const FooterRight = styled.div`
  font-weight: 600;
  color: ${colors.primaryDark};
`;
