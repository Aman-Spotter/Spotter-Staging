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
  margin-bottom: 60px;
  padding: 40px 0;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out;
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
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Enhanced Blog List
export const BlogList = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 2;
  padding: 0 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 0 20px;
    max-width: 100%;
  }
`;

// Enhanced Blog Card Image
export const BlogCardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0;
  transition: transform 0.4s ease;
  background: linear-gradient(45deg, ${colors.backgroundLight}, ${colors.background});
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
    pointer-events: none;
  }
`;

// Enhanced Blog Content
export const BlogContent = styled.div`
  padding: 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
`;

// Enhanced Blog Card
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
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

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

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px ${colors.primary}40,
      0 0 20px ${colors.glow};
    border-color: ${colors.primary};

    &::before {
      transform: scaleX(1);
    }

    &::after {
      opacity: 1;
    }

    ${BlogCardImage} {
      transform: scale(1.05);
    }

    ${BlogContent} {
      transform: translateY(-5px);
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
  animation: ${glowPulse} 2s ease-in-out infinite;
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
  transition: color 0.3s ease;

  ${BlogCard}:hover & {
    color: ${colors.primaryLight};
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const BlogExcerpt = styled.div`
  color: ${colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1rem;
  font-weight: 400;
  height: 100px; /* Fixed height for 4 lines of text */
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  padding-right: 16px;
  position: relative;

  /* Hide scrollbar by default */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    width: 12px;
    background: transparent !important;
  }

  &::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 20px;
    margin: 6px 0;
    border: none;
    box-shadow: none;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      ${colors.primary} 0%,
      ${colors.primaryLight} 30%,
      ${colors.primary} 70%,
      ${colors.primaryDark} 100%
    );
    border-radius: 20px;
    border: 2px solid rgba(20, 184, 166, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 12px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.4) 100%
      );
      border-radius: 2px;
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 12px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.9) 100%
      );
      border-radius: 2px;
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
    }
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      180deg,
      ${colors.primaryLight} 0%,
      ${colors.primary} 30%,
      ${colors.primaryLight} 70%,
      ${colors.primary} 100%
    );
    box-shadow: 0 0 30px rgba(20, 184, 166, 0.6), 0 0 15px rgba(64, 224, 208, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    transform: scaleX(1.3) scaleY(1.1);
    border-color: rgba(20, 184, 166, 0.5);
  }

  &::-webkit-scrollbar-thumb:active {
    background: linear-gradient(
      180deg,
      ${colors.primaryDark} 0%,
      ${colors.primary} 30%,
      ${colors.primaryLight} 70%,
      ${colors.primary} 100%
    );
    box-shadow: 0 0 40px rgba(20, 184, 166, 0.8), inset 0 2px 4px rgba(0, 0, 0, 0.3);
    transform: scaleX(1.4) scaleY(1.2);
  }

  /* Show scrollbar on hover */
  &:hover {
    // scrollbar-width: thin;
    -ms-overflow-style: auto;

    &::-webkit-scrollbar-track {
      background: transparent !important;
      border: none;
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(
        180deg,
        ${colors.primary} 0%,
        ${colors.primaryLight} 30%,
        ${colors.primary} 70%,
        ${colors.primaryDark} 100%
      );
      box-shadow: 0 0 20px rgba(20, 184, 166, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    }
  }

  /* Ensure text wraps properly */
  word-wrap: break-word;
  white-space: normal;
`;

export const BlogMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

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
  transition: color 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
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
