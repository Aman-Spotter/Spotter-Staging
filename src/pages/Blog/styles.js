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

// Enhanced Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatParticle = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(10px, -10px) scale(1.1); }
  50% { transform: translate(-5px, -20px) scale(0.9); }
  75% { transform: translate(-15px, -5px) scale(1.05); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
  50% { box-shadow: 0 0 40px rgba(20, 184, 166, 0.6); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Layout Components
export const Layout = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
  color: ${colors.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  padding-left: max(20px, env(safe-area-inset-left));
  padding-right: max(20px, env(safe-area-inset-right));
  padding-top: 80px;
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
    background: radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(15, 118, 110, 0.1) 0%, transparent 50%);
    animation: ${gradientShift} 20s ease infinite;
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
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 0;
    pointer-events: none;
  }
`;

// Animated Background Particles
export const BackgroundParticles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

export const Particle = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 50%;
  opacity: 0.6;
  animation: ${floatParticle} ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  left: ${({ left }) => left}%;
  top: ${({ top }) => top}%;
  filter: blur(1px);
`;

// Blog Header
export const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
  padding: 40px 0;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BlogPageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(
    135deg,
    ${colors.text} 0%,
    ${colors.primary} 50%,
    ${colors.primaryLight} 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
  word-break: break-word;
  line-height: 1.2;
  padding-bottom: 0.3em;
  animation: ${gradientShift} 3s ease infinite;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);
    animation: ${shimmer} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const BlogSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${colors.textSecondary};
  max-width: 600px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
  font-weight: 400;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }
`;

// Search Components
export const SearchContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${colors.cardBackground};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus-within {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.glow};
    transform: translateY(-2px);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${colors.text};
  font-size: 1rem;
  margin-left: 12px;
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

export const SearchResults = styled.div`
  text-align: center;
  margin-top: 12px;
  color: ${colors.textSecondary};
  font-size: 0.9rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

// Blog Grid - Full Width Layout
export const BlogGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  position: relative;
  z-index: 2;
  padding: 0 40px 60px 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 20px 40px 20px;
  }
`;

// Card content container - editorial horizontal layout
export const CardContent = styled.div`
  display: flex;
  align-items: stretch;
  height: 270px;
  width: 100%;
`;

// Left-aligned image container - full height, 40% width
export const CardImageContainer = styled.div`
  width: 40%;
  min-width: 40%;
  height: 100%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

// Card image - fills entire left side
export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  background: linear-gradient(45deg, ${colors.backgroundLight}, ${colors.background});
`;

// Right-aligned content block - 60% width
export const CardTextContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

// Enhanced Blog Card - Editorial layout
export const BlogCard = styled.div`
  background: ${colors.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${colors.border};
  backdrop-filter: blur(10px);
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  height: 270px;
  width: 100%;
  max-width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: rgba(20, 184, 166, 0.3);

    ${CardImage} {
      transform: scale(1.05);
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

  @media (max-width: 768px) {
    height: auto;

    // Stack layout on mobile
    ${CardContent} {
      flex-direction: column;
      height: auto;
    }

    ${CardImageContainer} {
      width: 100%;
      height: 200px;
    }

    ${CardTextContent} {
      padding: 16px;
      height: auto;
    }
  }
`;

// Card meta information (author and date)
export const CardMeta = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`;

// Card tags container - more prominent
export const CardTags = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 0;
  flex-wrap: wrap;
`;

// Enhanced Tag styling - more prominent
export const Tag = styled.span`
  background: rgba(20, 184, 166, 0.15);
  color: ${colors.primary};
  padding: 3px 6px;
  border-radius: 10px;
  font-size: 0.65rem;
  font-weight: 600;
  border: 1px solid rgba(20, 184, 166, 0.3);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${BlogCard}:hover & {
    background: rgba(20, 184, 166, 0.25);
    border-color: rgba(20, 184, 166, 0.5);
    transform: translateY(-1px);
  }
`;

// Card title - bold and attention-grabbing
export const CardTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 4px;
  color: ${colors.text};
  word-break: break-word;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Card excerpt - short preview (2-3 lines)
export const CardExcerpt = styled.div`
  color: ${colors.textSecondary};
  line-height: 1.4;
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
  min-height: 2.8em; /* Ensure minimum height for 2 lines */
  max-height: 2.8em; /* Limit to 2 lines */
`;

// Card content wrapper
export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

// Card actions container
export const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 15px;
`;

// Enhanced Read More Button
export const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.primary};
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  position: relative;

  svg {
    transition: transform 0.3s ease;
    color: ${colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight});
    transition: width 0.3s ease;
  }

  ${BlogCard}:hover & {
    color: ${colors.primaryLight};

    &::before {
      width: 100%;
    }

    svg {
      transform: translateX(3px);
      color: ${colors.primaryLight};
    }
  }
`;

// Enhanced Share Button
export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  background: transparent;
  color: ${colors.textMuted};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
    background: rgba(20, 184, 166, 0.1);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(20, 184, 166, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

// Enhanced Meta Item
export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.textMuted};
  font-size: 0.7rem;
  font-weight: 500;
  transition: color 0.3s ease;

  svg {
    width: 11px;
    height: 11px;
    color: ${colors.primary};
    transition: transform 0.3s ease;
  }

  ${BlogCard}:hover & {
    color: ${colors.textSecondary};

    svg {
      transform: scale(1.1);
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

export const NewsletterSection = styled.section`
  margin: 3rem 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 2rem 0;
    padding: 0 0.5rem;
  }
`;

export const NewsletterContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  padding: 3rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    border-radius: 6px;
  }
`;

export const NewsletterContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const NewsletterHeader = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const NewsletterTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const NewsletterSubtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
  font-weight: 300;
`;

export const NewsletterForm = styled.form`
  position: relative;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

export const EmailInput = styled.input`
  width: 320px;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const SubscribeButton = styled.button`
  padding: 1rem 1.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 160px;
    justify-content: center;
  }
`;

export const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;

  ${SubscribeButton}:hover & {
    transform: translateX(1px);
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(66, 186, 150, 0.1);
  border: 1px solid rgba(66, 186, 150, 0.2);
  border-radius: 6px;
  color: #42ba96;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  font-weight: 300;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(248, 73, 96, 0.1);
  border: 1px solid rgba(248, 73, 96, 0.2);
  border-radius: 6px;
  color: #f84960;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  font-weight: 300;
`;

export const CheckIcon = styled.span`
  display: flex;
  align-items: center;
  color: #42ba96;
`;

export const ErrorIcon = styled.span`
  display: flex;
  align-items: center;
  color: #f84960;
`;

export const PrivacyNote = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.4;
  text-align: center;
  font-weight: 400;
`;

export const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden !important;
    overflow-y: auto;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(20, 184, 166, 0.3) transparent;
  }
  
  * {
    box-sizing: border-box;
  }

  /* Webkit scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(20, 184, 166, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(20, 184, 166, 0.5);
  }
`;
