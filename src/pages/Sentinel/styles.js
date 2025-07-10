import styled, { keyframes, css } from 'styled-components';

// Advanced Keyframe Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Base animation styles for reuse
const baseAnimation = css`
  opacity: 0; /* Start hidden */
  animation-fill-mode: forwards; /* Retain styles after animation */
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); /* Smooth easing */
`;

const progressBarFill = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
`;

const modernGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
`;

const modernPulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const quantumFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) translateX(-15px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-25px) translateX(5px) rotate(270deg);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const scanningBeam = keyframes`
  0% {
    transform: translateX(-100%) scaleX(0.5);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(0) scaleX(1);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
    opacity: 0;
  }
`;

const shimmer = keyframes`
  0% {
  }
  100% {
    background-position: 200% 0;
  }
`;

const scoreReveal = keyframes`
  0% {
    transform: scale(0.5) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const drift = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`;

const navButtonHover = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.05);
  }
`;

const indicatorPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

// Add colorWave animation for hero button
const colorWave = keyframes`
  0% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  25% {
    background-position: 100% 50%;
    filter: hue-rotate(15deg);
  }
  50% {
    background-position: 100% 100%;
    filter: hue-rotate(0deg);
  }
  75% {
    background-position: 0% 100%;
    filter: hue-rotate(-15deg);
  }
  100% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
`;

// Layout Components
export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// Fixed Header Section
export const FixedHeader = styled.section`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 1000;
  padding: 50px 0 40px;
  pointer-events: none;
  transform: translateZ(0);
  will-change: auto;
  backface-visibility: hidden;
  contain: layout style paint;

  @media (max-width: 768px) {
    padding: 100px 0 30px;
  }
`;

export const FixedHeaderContent = styled.div`
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  pointer-events: auto;
  transform: translateZ(0);
  will-change: auto;
  position: relative;
  z-index: 1;
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 200px 0 80px;

  @media (max-width: 768px) {
    padding: 180px 0 60px;
  }
`;

// Add New Hero Section Styles (from test.html)
export const NewHeroSection = styled.section`
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  min-height: 50vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 40px 0 40px;

  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 20px 0 30px;
  }
`;

export const NewHeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
`;

export const NewHeroFloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const NewHeroFloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #00d4aa, #4fd1c7);
  opacity: 0.1;
  animation: ${float} 6s ease-in-out infinite;

  ${({ position, delay }) => css`
    animation-delay: ${delay || '0s'};

    ${position === 0 &&
    css`
      width: 80px;
      height: 80px;
      top: 20%;
      left: 10%;
    `}

    ${position === 1 &&
    css`
      width: 120px;
      height: 120px;
      top: 60%;
      right: 15%;
    `}
    
    ${position === 2 &&
    css`
      width: 60px;
      height: 60px;
      bottom: 30%;
      left: 20%;
    `}
  `}
`;

export const NewHeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
    padding: 0 1rem;
  }
`;

export const NewHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 680px; /* Increased max-width for better layout */
  z-index: 2;
  position: relative; /* Ensure it's above background elements */
  color: white; /* Ensure text color is white as it was before */
`;

export const NewHeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;

  /* Animation styles */
  ${baseAnimation}
  animation-name: ${fadeInUp};
  animation-duration: 0.8s;
  animation-delay: 0.2s;

  /* Reduce padding/margin for large desktops */
  @media (min-width: 1440px) {
    margin-bottom: 0.75rem;
    padding: 0;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 0.75rem;
  }
`;

export const NewHeroHighlight = styled.span`
  background: linear-gradient(135deg, #00d4aa, #4fd1c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const NewHeroStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  /* Animation styles */
  ${baseAnimation}
  animation-name: ${fadeInUp};
  animation-duration: 0.8s;
  animation-delay: 0.6s;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 1.5rem;
  }
`;

export const NewHeroStat = styled.div`
  text-align: center;
`;

export const NewHeroStatNumber = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #00d4aa;
  display: block;
`;

export const NewHeroStatLabel = styled.span`
  color: #a0aec0;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

export const NewHeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  /* Animation styles */
  ${baseAnimation}
  animation-name: ${fadeInUp};
  animation-duration: 0.8s;
  animation-delay: 0.8s;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
`;

export const NewHeroPrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00d4aa, #4fd1c7);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 212, 170, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 212, 170, 0.4);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    flex: 1;
    min-width: 140px;
    max-width: 160px;
  }

  @media (max-width: 360px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    min-width: 120px;
    max-width: 140px;
  }
`;

export const NewHeroButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewHeroSecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #008080 0%, #f84960 50%, #bcddde 100%);
  background-size: 400% 400%;
  animation: ${colorWave} 6s ease-in-out infinite;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 128, 128, 0.4), 0 4px 16px rgba(248, 73, 96, 0.3);
  white-space: nowrap;

  /* CDL-style glow effect - only when isGlowing is true */
  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: linear-gradient(135deg, #40e0d0, #20b2aa);
    border-radius: 32px;
    opacity: ${({ isGlowing }) => (isGlowing ? 1 : 0)};
    transition: all 0.4s ease;
    filter: blur(20px);
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    /* Removed glow effect from hover - only transform and shadow changes */
    box-shadow: 0 12px 48px rgba(0, 128, 128, 0.6), 0 8px 24px rgba(248, 73, 96, 0.4),
      0 0 0 1px rgba(188, 221, 222, 0.3);
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    flex: 1;
    min-width: 140px;
    max-width: 160px;
  }

  @media (max-width: 360px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    min-width: 120px;
    max-width: 140px;
  }
`;

export const NewHeroVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewHeroDashboardMockup = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.4s ease;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-delay: ${({ delay }) => delay || '0s'};

  &:hover {
    transform: translateY(-5px) scale(1.02);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0;

    &:hover {
      transform: translateY(-2px) scale(1.01);
    }
  }
`;

export const NewHeroDashboardGlow = styled.div`
  position: absolute;
  inset: -20px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border-radius: 40px;
  opacity: ${({ isGlowing }) => (isGlowing ? 1 : 0)};
  transition: all 0.4s ease;
  filter: blur(20px);
  z-index: 0;
`;

export const NewHeroDashboardContent = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
    gap: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
    gap: 10px;
  }
`;

export const NewHeroMockupHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    gap: 0.375rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
    gap: 0.25rem;
  }
`;

export const NewHeroMockupDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f57;

  &:nth-child(2) {
    background: #ffbd2e;
  }

  &:nth-child(3) {
    background: #28ca42;
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;

export const NewHeroMockupContent = styled.div`
  color: white;
`;

export const NewHeroProcessStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(15px)')};
  transition: opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-delay: ${({ delay }) => delay || '0s'};

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0.875rem;
    margin-bottom: 0.875rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    gap: 0.625rem;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 6px;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const NewHeroStepIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #00d4aa, #4fd1c7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #00d4aa, #4fd1c7);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  /* Subtle hover effect only (no individual glow on hover) */
  ${NewHeroDashboardMockup}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
    align-self: center;
  }
`;

export const NewHeroStepContent = styled.div`
  flex: 1;

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

export const NewHeroStepTitle = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.15rem;
  }
`;

export const NewHeroStepSubtitle = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

export const MetricDownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  cursor: not-allowed;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(64, 224, 208, 0.2);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  opacity: 0.6;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    right: 2px;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 14px;
    height: 14px;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.2));
    z-index: 1;
    opacity: 0.7;
  }
`;

export const MetricSuccessIcon = styled.div`
  color: #40e0d0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(64, 224, 208, 0.15);
  border-radius: 8px;
  border: 1px solid rgba(64, 224, 208, 0.3);
  transition: all 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
    filter: drop-shadow(0 0 4px rgba(64, 224, 208, 0.4));
  }

  &:hover {
    background: rgba(64, 224, 208, 0.25);
    transform: scale(1.05);
  }
`;

export const MetricWarningIcon = styled.div`
  color: #f59e0b;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(245, 158, 11, 0.15);
  border-radius: 8px;
  border: 1px solid rgba(245, 158, 11, 0.3);
  transition: all 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
    filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.4));
  }

  &:hover {
    background: rgba(245, 158, 11, 0.25);
    transform: scale(1.05);
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #061830 0%, #043344 50%, #0a2332 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(248, 73, 96, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(32, 178, 170, 0.05) 0%, transparent 70%);
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
        rgba(64, 224, 208, 0.03) 1px,
        transparent 1px
      ),
      radial-gradient(circle at 75% 75%, rgba(248, 73, 96, 0.03) 1px, transparent 1px);
    background-size: 50px 50px, 30px 30px;
    animation: ${float} 20s ease-in-out infinite;
  }
`;

export const FloatingDecorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const FloatingElement = styled.div`
  position: absolute;
  animation: ${float}
    ${({ type }) =>
      type === 'shield'
        ? '6s'
        : type === 'scan'
        ? '8s'
        : type === 'check'
        ? '7s'
        : type === 'brain'
        ? '9s'
        : '5s'}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  opacity: 0.6;

  ${({ position, type }) => {
    const positions = [
      { top: '10%', left: '10%' },
      { top: '20%', left: '85%' },
      { top: '30%', left: '15%' },
      { top: '40%', left: '90%' },
      { top: '50%', left: '5%' },
      { top: '60%', left: '80%' },
      { top: '70%', left: '20%' },
      { top: '80%', left: '75%' },
      { top: '15%', left: '50%' },
      { top: '85%', left: '45%' },
      { top: '25%', left: '70%' },
      { top: '75%', left: '10%' },
      { top: '35%', left: '60%' },
      { top: '65%', left: '35%' },
      { top: '55%', left: '95%' },
      { top: '12%', left: '30%' },
      { top: '88%', left: '65%' },
      { top: '45%', left: '25%' },
      { top: '75%', left: '85%' },
      { top: '30%', left: '75%' },
    ];

    const pos = positions[position % positions.length];

    return css`
      top: ${pos.top};
      left: ${pos.left};
      width: ${type === 'shield'
        ? '24px'
        : type === 'scan'
        ? '20px'
        : type === 'brain'
        ? '28px'
        : '16px'};
      height: ${type === 'shield'
        ? '24px'
        : type === 'scan'
        ? '20px'
        : type === 'brain'
        ? '28px'
        : '16px'};

      &::before {
        content: '${type === 'shield'
          ? '🛡️'
          : type === 'scan'
          ? '🔍'
          : type === 'check'
          ? '✓'
          : type === 'brain'
          ? '🧠'
          : '✨'}';
        font-size: ${type === 'shield'
          ? '20px'
          : type === 'scan'
          ? '16px'
          : type === 'brain'
          ? '24px'
          : '14px'};
        color: ${type === 'shield'
          ? '#40e0d0'
          : type === 'scan'
          ? '#20b2aa'
          : type === 'check'
          ? '#48bb78'
          : type === 'brain'
          ? '#9f7aea'
          : '#f6e05e'};
        filter: drop-shadow(0 0 8px currentColor);
      }
    `;
  }}
`;

export const Container = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const HeroContent = styled.div`
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroTitle = styled.h1`
  font-size: 62px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 24px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 38px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

export const HeroHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
    border-radius: 2px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 32px;
  }
`;

export const HeroPrimaryButton = styled.button`
  background: linear-gradient(135deg, #008080 0%, #f84960 50%, #bcddde 100%);
  background-size: 400% 400%;
  animation: ${colorWave} 6s ease-in-out infinite;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 128, 128, 0.4), 0 4px 16px rgba(248, 73, 96, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #f84960 0%, #bcddde 50%, #008080 100%);
    background-size: 400% 400%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 48px rgba(0, 128, 128, 0.6), 0 8px 24px rgba(248, 73, 96, 0.4),
      0 0 0 1px rgba(188, 221, 222, 0.3);

    &::before {
      opacity: 1;
      animation: ${colorWave} 4s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }
`;

export const HeroButtonIcon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    transition: all 0.3s ease;
  }

  ${HeroPrimaryButton}:hover & {
    transform: translateY(2px);

    svg {
      transform: scale(1.1);
    }
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 19px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto 48px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 32px;
  }
`;

// Demo Section Styles
export const DemoSection = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const DemoControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const AutoDemoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(135deg, #F64673, #e53e3e)'
      : 'linear-gradient(135deg, #40e0d0, #20b2aa)'};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px
      ${({ isActive }) => (isActive ? 'rgba(246, 70, 115, 0.3)' : 'rgba(64, 224, 208, 0.3)')};
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 15px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const InteractiveContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const SimpleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Gallery Section Styles - Completely Redesigned
export const GallerySection = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  overflow: visible;
  margin-top: 0;
`;

export const GalleryFloatingElements = styled.div`
  position: absolute;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  pointer-events: none;
  z-index: 0;

  ${({ isScrolling }) =>
    isScrolling &&
    css`
      * {
        animation-play-state: paused !important;
      }
    `}
`;

export const GalleryParticle = styled.div`
  position: absolute;
  animation: ${drift} ${({ speed }) => (speed === 'slow' ? '8s' : speed === 'medium' ? '6s' : '4s')}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};

  width: ${({ size }) => (size === 'large' ? '20px' : size === 'medium' ? '14px' : '8px')};
  height: ${({ size }) => (size === 'large' ? '20px' : size === 'medium' ? '14px' : '8px')};

  color: ${({ color }) => {
    switch (color) {
      case 'teal':
        return '#40e0d0';
      case 'red':
        return '#F64673';
      case 'cyan':
        return '#20b2aa';
      case 'green':
        return '#48bb78';
      case 'purple':
        return '#9f7aea';
      default:
        return '#40e0d0';
    }
  }};

  ${({ type }) => {
    if (type === 'ring') {
      return css`
        border: 2px solid currentColor;
        border-radius: 50%;
        background: transparent;
        animation: ${drift} 6s ease-in-out infinite, ${modernGlow} 3s ease-in-out infinite;
      `;
    }
    if (type === 'diamond') {
      return css`
        background: currentColor;
        transform: rotate(45deg);
        animation: ${quantumFloat} 8s ease-in-out infinite;
      `;
    }
    return css`
      background: currentColor;
      border-radius: 50%;
      animation: ${drift} 5s ease-in-out infinite, ${modernPulse} 2s ease-in-out infinite;
    `;
  }}

  ${({ position }) => {
    const positions = [
      { top: '10%', left: '5%' },
      { top: '20%', right: '8%' },
      { top: '35%', left: '12%' },
      { top: '50%', right: '15%' },
      { top: '65%', left: '8%' },
      { top: '80%', right: '10%' },
      { bottom: '25%', left: '18%' },
      { bottom: '40%', right: '20%' },
      { top: '25%', left: '50%' },
      { top: '70%', right: '45%' },
      { top: '15%', left: '75%' },
      { top: '85%', left: '30%' },
    ];

    const pos = positions[position % positions.length];
    return Object.entries(pos)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n');
  }}
`;

export const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`;

export const GalleryTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  letter-spacing: -0.01em;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
    border-radius: 2px;
  }

  svg {
    color: #40e0d0;
    filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.4));
  }
`;

export const GallerySubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 17px;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
`;

export const CarouselContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  user-select: none;
  touch-action: pan-y;

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    max-width: 700px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    padding: 10px 0;
  }
`;

export const CarouselTrack = styled.div`
  position: relative;
  width: 550px;
  height: 380px; // Base height for largest screens, accommodates shorter card
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;

  @media (max-width: 1024px) {
    width: 550px;
    height: 300px; // Adjusted height for 1024px breakpoint
  }

  @media (max-width: 768px) {
    width: 500px;
    height: 280px; // Adjusted height for 768px breakpoint
  }

  @media (max-width: 640px) {
    width: 90vw;
    max-width: 400px;
    height: 270px; // Adjusted height for 640px breakpoint
  }
`;

export const DriverCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  min-height: 350px;
  background: rgba(15, 25, 40, 0.75);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(64, 224, 208, 0.25);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  will-change: transform, opacity, box-shadow, background-color, border-color;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: translateX(-50%) translateY(-50%)
    ${({ isActive }) =>
      isActive
        ? 'scale(1) rotateY(0deg) translateZ(0)'
        : 'scale(0.85) rotateY(15deg) translateZ(-100px)'};
  z-index: ${({ isActive }) => (isActive ? 10 : 1)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.05) 0%,
      transparent 50%,
      rgba(32, 178, 170, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: 20px;
  }

  &:hover {
    background: rgba(20, 30, 45, 0.85);
    border-color: rgba(64, 224, 208, 0.6);

    ${({ isActive }) =>
      isActive &&
      css`
        transform: translateX(-50%) translateY(-50%) scale(1.05) rotateX(7deg) rotateY(-3deg)
          translateZ(30px);
      `}

    box-shadow: 0 15px 45px rgba(64, 224, 208, 0.22), 0 0 0 1px rgba(64, 224, 208, 0.45);

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    padding: 22px;
    min-height: 330px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    min-height: 310px;
  }

  @media (max-width: 640px) {
    padding: 18px;
    min-height: 290px;
  }
`;

export const CarouselNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 810px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 20;

  @media (max-width: 1024px) {
    width: 710px;
  }

  @media (max-width: 768px) {
    width: 620px;
  }

  @media (max-width: 640px) {
    width: calc(100vw - 40px);
    max-width: 450px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 20px);
    max-width: 380px;
    padding: 0 10px;
  }
`;

export const NavButton = styled.button`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(26, 35, 50, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(64, 224, 208, 0.3);
  color: #40e0d0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;

  &:hover {
    background: rgba(64, 224, 208, 0.15);
    border-color: rgba(64, 224, 208, 0.6);
    color: #ffffff;
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(64, 224, 208, 0.3);
    animation: ${navButtonHover} 0.3s ease-out;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(0.9);
  }

  svg {
    filter: drop-shadow(0 0 8px currentColor);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    background: rgba(26, 35, 50, 0.98);
    border: 2px solid rgba(64, 224, 208, 0.5);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    width: 48px;
    height: 48px;
    background: rgba(26, 35, 50, 0.98);
    border: 2px solid rgba(64, 224, 208, 0.6);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 480px) {
    width: 46px;
    height: 46px;
    background: rgba(26, 35, 50, 0.99);
    border: 2px solid rgba(64, 224, 208, 0.7);

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  position: relative;
  z-index: 15;

  @media (max-width: 640px) {
    margin-top: 30px;
  }
`;

export const Indicator = styled.button`
  width: ${({ active }) => (active ? '32px' : '12px')};
  height: 12px;
  border-radius: 6px;
  border: none;
  background: ${({ active }) =>
    active ? 'linear-gradient(90deg, #40e0d0, #20b2aa)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: ${({ active }) =>
      active ? 'linear-gradient(90deg, #40e0d0, #20b2aa)' : 'rgba(255, 255, 255, 0.5)'};
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(64, 224, 208, 0.3);

    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ active }) =>
    active &&
    css`
      box-shadow: 0 0 20px rgba(64, 224, 208, 0.4);
      animation: ${indicatorPulse} 2s ease-in-out infinite;
    `}
`;

// CDL Input Section
export const CDLInputSection = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
`;

export const CDLInputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 17px;
  font-weight: 600;
  color: #40e0d0;
  margin-bottom: 16px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const CDLInputContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const CDLInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 15px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #40e0d0;
    box-shadow: 0 0 0 2px rgba(64, 224, 208, 0.2);
  }
`;

export const CDLButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(64, 224, 208, 0.3);
  }
`;

// Processing Section Styles
export const ProcessingSection = styled.div`
  animation: ${fadeInUp} 0.6s ease-out;
  text-align: center;
`;

export const ProcessingHeader = styled.div`
  margin-bottom: 20px;
`;

export const DriverProcessingCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
`;

export const ProcessingDriverInfo = styled.div`
  text-align: center;
`;

export const DriverDetails = styled.div`
  display: none;
`;

export const AIProcessingAnimation = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const ScanningBeam = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #40e0d0, #20b2aa, transparent);
  animation: ${scanningBeam} 2s ease-in-out infinite;
  transform: translateY(-50%);
  border-radius: 2px;
`;

export const ProcessingIcon = styled.div`
  color: #40e0d0;
  animation: ${pulse} 1.5s ease-in-out infinite;
  position: relative;
  z-index: 1;
  margin-bottom: 12px;
`;

export const ProcessingText = styled.div`
  strong {
    font-size: 18px;
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 12px;
    display: block;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    letter-spacing: -0.01em;
  }
`;

export const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  margin-top: 12px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #40e0d0, #20b2aa);
  border-radius: 5px;
  width: ${({ progress }) => progress}%;
  transition: width 0.5s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 2s ease-in-out infinite;
  }
`;

export const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ProcessingSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProcessingStep = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 8px;
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  transition: all 0.3s ease;
  background: ${({ current }) => (current ? 'rgba(64, 224, 208, 0.1)' : 'transparent')};
  border: ${({ current }) =>
    current ? '1px solid rgba(64, 224, 208, 0.2)' : '1px solid transparent'};

  ${({ active }) =>
    active &&
    css`
      color: #40e0d0;
      animation: ${fadeInUp} 0.5s ease-out;
    `}
`;

export const StepIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#40e0d0' : 'rgba(255, 255, 255, 0.1)')};
  color: ${({ active }) => (active ? '#061830' : 'rgba(255, 255, 255, 0.6)')};
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

export const StepName = styled.span`
  flex: 1;
  text-align: left;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
`;

export const StepStatus = styled.div`
  color: #48bb78;
  animation: ${fadeInUp} 0.3s ease-out;
`;

// Results Section Styles - Redesigned
export const ResultsSection = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;

export const ResultsHeader = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

export const CompletionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(72, 187, 120, 0.15);
  border: 1px solid rgba(72, 187, 120, 0.3);
  border-radius: 50px;
  color: #48bb78;
  font-size: 15px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.2);
  animation: ${modernPulse} 2s ease-in-out infinite;

  svg {
    filter: drop-shadow(0 0 8px rgba(72, 187, 120, 0.6));
  }
`;

export const ScoreDisplayResults = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ScoreAnimation = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

export const ScoreRing = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto;
  border-radius: 50%;
  background: conic-gradient(
    ${({ score }) => {
        if (score >= 90) return '#48bb78';
        if (score >= 80) return '#38bdf8';
        if (score >= 70) return '#fbbf24';
        if (score >= 60) return '#fb923c';
        return '#f87171';
      }}
      ${({ score }) => (score / 100) * 360}deg,
    rgba(255, 255, 255, 0.1) 0deg
  );
  padding: 6px;
  animation: ${scoreReveal} 1.2s ease-out;
  box-shadow: 0 0 30px
    ${({ score }) => {
      if (score >= 90) return 'rgba(72, 187, 120, 0.3)';
      if (score >= 80) return 'rgba(56, 189, 248, 0.3)';
      if (score >= 70) return 'rgba(251, 191, 36, 0.3)';
      if (score >= 60) return 'rgba(251, 146, 60, 0.3)';
      return 'rgba(248, 113, 113, 0.3)';
    }};

  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: #061830;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ScoreValueResults = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  font-size: 34px;
  font-weight: 700;
  color: #ffffff;
  z-index: 2;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.02em;
`;

export const ScoreLabelResults = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 25%);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  white-space: nowrap;
`;

export const RiskAssessment = styled.div`
  margin-bottom: 20px;
`;

export const RiskLevel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 17px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  backdrop-filter: blur(20px);
  border: 2px solid;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  ${({ risk }) => {
    switch (risk) {
      case 'Low':
        return css`
          background: linear-gradient(135deg, rgba(72, 187, 120, 0.2), rgba(72, 187, 120, 0.1));
          color: #48bb78;
          border-color: rgba(72, 187, 120, 0.4);
          box-shadow: 0 8px 24px rgba(72, 187, 120, 0.2);
        `;
      case 'Medium':
        return css`
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1));
          color: #fbbf24;
          border-color: rgba(251, 191, 36, 0.4);
          box-shadow: 0 8px 24px rgba(251, 191, 36, 0.2);
        `;
      default:
        return css`
          background: linear-gradient(135deg, rgba(248, 113, 113, 0.2), rgba(248, 113, 113, 0.1));
          color: #f87171;
          border-color: rgba(248, 113, 113, 0.4);
          box-shadow: 0 8px 24px rgba(248, 113, 113, 0.2);
        `;
    }
  }}

  svg {
    filter: drop-shadow(0 0 8px currentColor);
  }
`;

export const DetailedResults = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(64, 224, 208, 0.15);

    &::before {
      opacity: 1;
    }
  }
`;

export const ResultIcon = styled.div`
  color: #40e0d0;
  padding: 8px;
  background: rgba(64, 224, 208, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(64, 224, 208, 0.2);
  filter: drop-shadow(0 0 6px rgba(64, 224, 208, 0.3));
`;

export const ResultInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ResultLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ResultValue = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
`;

export const ResultStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;

  color: ${({ status }) => {
    switch (status) {
      case 'good':
        return '#48bb78';
      case 'warning':
        return '#fbbf24';
      default:
        return '#f87171';
    }
  }};

  svg {
    filter: drop-shadow(0 0 4px currentColor);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 4px;
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 26px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 24px rgba(64, 224, 208, 0.3);
  letter-spacing: -0.01em;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(64, 224, 208, 0.4);
    background: linear-gradient(135deg, #48e8d8, #28c2bc);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
  }
`;

// Processing Zone Container
export const ProcessingZone = styled.div`
  background: rgba(26, 35, 50, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.15);
  border-radius: 20px;
  padding: 20px;
  min-height: 300px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 280px;
  }
`;

export const DriverCardGlow = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa, #40e0d0);
  border-radius: 22px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(4px);
  will-change: opacity;

  ${DriverCard}:hover & {
    opacity: 0.2;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
  text-align: center;
`;

export const DriverName = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  text-align: center;
  width: 100%;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
`;

export const DriverInfo = styled.div`
  margin-bottom: 16px;
  position: relative;
`;

export const DriverCDL = styled.div`
  font-size: 16px;
  color: #40e0d0;
  margin-bottom: 16px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
  background: rgba(64, 224, 208, 0.12);
  border: 1px solid rgba(64, 224, 208, 0.25);
  padding: 10px 18px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  position: relative;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 10px;
  }

  ${DriverCard}:hover &::before {
    opacity: 1;
  }
`;

export const DriverMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  transition: all 0.3s ease;
  will-change: background-color, color;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  width: 100%;
  box-sizing: border-box;

  svg {
    color: #40e0d0;
    flex-shrink: 0;
    filter: drop-shadow(0 0 2px rgba(64, 224, 208, 0.3));
    width: 16px;
    height: 16px;
  }

  ${DriverCard}:hover & {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ driverImage }) =>
    driverImage
      ? `linear-gradient(
          135deg, 
          rgba(64, 224, 208, 0.92) 0%, 
          rgba(32, 178, 170, 0.92) 50%,
          rgba(40, 224, 208, 0.92) 100%
        ), url(${driverImage})`
      : 'linear-gradient(135deg, rgba(64, 224, 208, 0.95) 0%, rgba(32, 178, 170, 0.95) 100%)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 20px;
  will-change: opacity;

  ${DriverCard}:hover & {
    opacity: 0.9;
  }
`;

export const ViewAnalysisText = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  transform: translateY(10px) scale(0.95);
  transition: transform 0.3s ease;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.4);
  padding: 16px 28px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  will-change: transform;

  svg {
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
  }

  ${DriverCard}:hover & {
    transform: translateY(0) scale(1);
  }
`;

export const DatabaseFooter = styled.div`
  border-top: 1px solid rgba(64, 224, 208, 0.15);
  padding-top: 24px;
  text-align: center;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
  }
`;

export const DatabaseStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 20px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 18px;
  background: rgba(64, 224, 208, 0.08);
  border: 1px solid rgba(64, 224, 208, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;

  &:hover {
    background: rgba(64, 224, 208, 0.15);
    color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(64, 224, 208, 0.15);
  }

  svg {
    color: #40e0d0;
    filter: drop-shadow(0 0 4px rgba(64, 224, 208, 0.4));
  }
`;

// New Compact Results Section - Modern Redesign
export const CompactResultsContainer = styled.div`
  background: rgba(15, 25, 40, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px; // Adjusted gap for better spacing like screenshot

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 8px;
    gap: 16px;
    max-width: none;
    width: calc(100% - 16px);
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin: 0 4px;
    width: calc(100% - 8px);
  }
`;

export const ResultsCompactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(64, 224, 208, 0.2); // Darker, teal-tinted border

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

export const CompletionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: rgba(64, 224, 208, 0.1); // Translucent teal background
  padding: 8px 14px; // Adjusted padding
  border-radius: 10px; // Rounded corners like screenshot
  border: 1px solid rgba(64, 224, 208, 0.2); // Teal-tinted border

  svg {
    color: #40e0d0; // Bright teal icon color
    filter: none;
  }
`;

export const DriverSummary = styled.div`
  text-align: right;

  @media (max-width: 640px) {
    text-align: center;
  }
`;

export const DriverNameCompact = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 2px;
`;

export const DriverCDLCompact = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
`;

export const CompactScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

export const ScoreHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 224, 208, 0.15);
  border-radius: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const MainScoreCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(
    255,
    255,
    255,
    0.03
  ); // Very subtle light background, or darker like rgba(10, 20, 30, 0.5)
  border: 1px solid rgba(64, 224, 208, 0.15); // Subtle teal border
  border-radius: 16px; // Match screenshot's roundedness
  min-width: 140px;

  @media (max-width: 640px) {
    min-width: auto;
  }
`;

export const ScoreCircle = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ score }) => {
        if (score >= 90) return '#48bb78';
        if (score >= 80) return '#38bdf8'; // Screenshot looks like a bright blue/teal
        if (score >= 70) return '#fbbf24';
        if (score >= 60) return '#fb923c';
        return '#f87171';
      }}
      ${({ score }) => (score / 100) * 360}deg,
    rgba(255, 255, 255, 0.1) 0deg // Base for the non-filled part of the ring
  );
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${scoreReveal} 1s ease-out;

  &::after {
    // This creates the inner circle background
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background: #0f2027; // Dark background to match overall container's presumed dark base
    border-radius: 50%;
  }
`;

export const ScoreNumber = styled.div`
  position: relative;
  z-index: 2;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1;
`;

export const ScoreLabel = styled.div`
  position: relative;
  z-index: 2;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-top: 1px;
  line-height: 1;
  text-align: center;
  max-width: 60px;
  word-spacing: -1px;
`;

export const RiskBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px; // Adjusted padding
  border-radius: 10px; // Match screenshot's roundedness
  font-size: 12px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  // Border is now handled by the switch case for semantic coloring

  ${({ risk }) => {
    switch (risk) {
      case 'Low':
        return css`
          background: rgba(72, 187, 120, 0.15);
          color: #48bb78;
        `;
      case 'Medium':
        return css`
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
        `;
      default: // High risk
        return css`
          background: rgba(248, 113, 113, 0.15);
          color: #f87171;
        `;
    }
  }}

  svg {
    filter: drop-shadow(0 0 2px currentColor);
  }
`;

export const QuickMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 14px;
  }
`;

export const MetricItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 80px;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.5), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(64, 224, 208, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(64, 224, 208, 0.15);

    &::before {
      opacity: 1;
    }
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 8px;
    justify-content: center;
  }

  > div:last-child {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
`;

export const MetricLabel = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.2;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MetricValue = styled.div`
  font-size: 16px;
  color: #ffffff;
  font-weight: 700;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;
  white-space: normal;
  word-break: normal;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const CompactActions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const NewAnalysisButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(64, 224, 208, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(64, 224, 208, 0.4);
    background: linear-gradient(135deg, #48e8d8, #28c2bc);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
  }
`;

// New Compact Processing Section - Modern Redesign
export const CompactProcessingContainer = styled.div`
  background: rgba(15, 25, 40, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    opacity: 0.6;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    animation: ${scanningBeam} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 8px;
    gap: 16px;
    max-width: none;
    width: calc(100% - 16px);
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin: 0 4px;
    width: calc(100% - 8px);
  }
`;

export const ProcessingCompactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(64, 224, 208, 0.2);

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

export const ProcessingStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: rgba(64, 224, 208, 0.1);
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(64, 224, 208, 0.2);

  svg {
    color: #40e0d0;
    animation: ${pulse} 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 4px rgba(64, 224, 208, 0.6));
  }
`;

export const ProcessingMainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

export const ProcessingScoreHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 224, 208, 0.15);
  border-radius: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ProcessingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 224, 208, 0.15);
  border-radius: 16px;
  min-width: 140px;

  @media (max-width: 640px) {
    min-width: auto;
  }
`;

export const ProcessingSpinner = styled.div`
  color: #40e0d0;
  animation: ${pulse} 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.4));
`;

export const ProcessingPhase = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  text-align: center;
  line-height: 1.3;
  max-width: 120px;
`;

export const CompactProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProgressBarContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  height: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #40e0d0, #20b2aa);
  border-radius: 8px;
  width: ${({ progress }) => progress}%;
  transition: width 0.5s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 2s ease-in-out infinite;
  }
`;

export const ProgressPercentage = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 10px;
  color: #ffffff;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ProcessingStepsCompact = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 14px;
  }
`;

export const ProcessingStepCompact = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 18px;
  background: ${({ current }) =>
    current ? 'rgba(64, 224, 208, 0.1)' : 'rgba(255, 255, 255, 0.08)'};
  border: ${({ current }) =>
    current ? '1px solid rgba(64, 224, 208, 0.2)' : '1px solid rgba(255, 255, 255, 0.12)'};
  border-radius: 16px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 80px;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.5), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  ${({ active }) =>
    active &&
    css`
      animation: ${fadeInUp} 0.5s ease-out;
    `}

  &:hover {
    background: ${({ current }) =>
      current ? 'rgba(64, 224, 208, 0.15)' : 'rgba(255, 255, 255, 0.12)'};
    border-color: rgba(64, 224, 208, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(64, 224, 208, 0.15);

    &::before {
      opacity: 1;
    }
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 8px;
    justify-content: center;
  }

  > div:last-child {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
`;

export const StepIconCompact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#40e0d0' : 'rgba(255, 255, 255, 0.1)')};
  color: ${({ active }) => (active ? '#061830' : 'rgba(255, 255, 255, 0.6)')};
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

export const StepNameCompact = styled.span`
  flex: 1;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  line-height: 1.2;
`;

export const StepCheckmark = styled.div`
  color: #48bb78;
  animation: ${fadeInUp} 0.3s ease-out;
  filter: drop-shadow(0 0 2px rgba(72, 187, 120, 0.6));
`;

// Modern Driver Cards - Redesigned for Gallery Section
export const ModernDriverCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%; // Card will take full width of its parent, CarouselTrack
  max-width: 620px; // Increased max-width for the card
  height: auto;
  min-height: 260px; // Reduced min-height
  background: rgba(26, 35, 50, 0.8); // Darker, glassmorphic background
  backdrop-filter: blur(12px);
  border: 1px solid rgba(64, 224, 208, 0.3); // Teal border
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  will-change: transform, opacity, box-shadow, background-color, border-color;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); // Adjusted shadow
  display: flex;
  flex-direction: column;
  gap: 16px;

  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: translateX(-50%) translateY(-50%)
    ${({ isActive }) =>
      isActive
        ? 'scale(1) rotateY(0deg) translateZ(0)'
        : 'scale(0.85) rotateY(15deg) translateZ(-100px)'};
  z-index: ${({ isActive }) => (isActive ? 10 : 1)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(30, 40, 55, 0.85); // Slightly lighter on hover
    border-color: rgba(64, 224, 208, 0.5);
    transform: translateX(-50%) translateY(-50%) scale(1.02) rotateX(2deg) translateZ(10px);
    box-shadow: 0 12px 40px rgba(64, 224, 208, 0.25); // Enhanced hover shadow
  }

  @media (max-width: 1024px) {
    padding: 18px;
    min-height: 240px; // Reduced min-height
  }

  @media (max-width: 768px) {
    width: 65%; // Keep existing responsive behavior
    padding: 16px;
    min-height: 220px; // Reduced min-height
  }
`;

export const CardGlow = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa, #40e0d0);
  border-radius: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(4px);

  ${ModernDriverCard}:hover & {
    opacity: 0.2; // Increased glow intensity on hover
  }
`;

export const CardTopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(64, 224, 208, 0.2); // Teal-tinted border
`;

export const DriverAvatar = styled.div`
  width: 48px; // Slightly larger avatar
  height: 48px;
  border-radius: 50%;
  background: rgba(64, 224, 208, 0.1); // Teal accent background
  border: 2px solid rgba(64, 224, 208, 0.3); // Teal accent border
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0; // Teal icon color
  flex-shrink: 0;

  svg {
    width: 24px; // Adjusted icon size
    height: 24px;
    filter: drop-shadow(0 0 4px rgba(64, 224, 208, 0.4));
  }
`;

export const DriverHeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ModernDriverName = styled.div`
  font-size: 19px; // Slightly adjusted size
  font-weight: 600;
  color: #ffffff; // White color for dark theme
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ModernDriverCDL = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7); // Lighter gray for dark theme
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

export const VerificationBadge = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(72, 187, 120, 0.15);
  border: 1px solid rgba(72, 187, 120, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #48bb78;
  flex-shrink: 0;

  svg {
    filter: drop-shadow(0 0 2px rgba(72, 187, 120, 0.6));
  }
`;

// Remove CardMetaSection and related, will be replaced by InfoGrid
// export const CardMetaSection = styled.div`...`;
// export const CompactMetaItem = styled.div`...`;
// export const MetaText = styled.span`...`;

// New InfoGrid styles
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px; // Adjusted gap
  padding: 8px 0; // Add some padding around the grid
`;

export const InfoGridItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px; // Adjusted padding
  display: flex;
  flex-direction: column; // Stack icon, label, value vertically
  align-items: center; // Center content
  text-align: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
  }

  svg {
    color: #40e0d0; // Teal icons
    margin-bottom: 6px; // Space below icon
    width: 20px; // Icon size
    height: 20px;
  }
`;

export const InfoGridItemLabel = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6); // Lighter label color
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px; // Space below label
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const InfoGridItemValue = styled.span`
  font-size: 13px;
  color: #ffffff; // White value text
  font-weight: 500; // Medium weight for values
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.2;
`;

export const CardActionSection = styled.div`
  margin-top: auto; // Pushes button to the bottom
  padding-top: 12px; // Adjusted padding
  border-top: 1px solid rgba(64, 224, 208, 0.2); // Teal-tinted border
`;

export const AnalyzeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px; // Standard padding
  background: linear-gradient(135deg, #40e0d0, #20b2aa); // Primary CTA gradient
  border: none; // No border for gradient button
  border-radius: 8px; // Standard border radius
  color: #ffffff; // White text for contrast
  font-size: 13px; // Slightly larger font
  font-weight: 600; // Bold text
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.2s ease;
  cursor: pointer; // Ensure cursor pointer is set

  &:hover {
    background: linear-gradient(135deg, #48e8d8, #28c2bc); // Lighter gradient on hover
    transform: translateY(-2px); // Subtle lift
    box-shadow: 0 4px 12px rgba(64, 224, 208, 0.3); // Add shadow on hover
  }

  svg {
    width: 16px; // Icon size
    height: 16px;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2)); // Subtle shadow for icon
  }
`;

export const ModernCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ driverImage }) =>
    driverImage
      ? `linear-gradient(
          135deg, 
          rgba(64, 224, 208, 0.95) 0%, 
          rgba(32, 178, 170, 0.95) 100%
        ), url(${driverImage})`
      : 'linear-gradient(135deg, rgba(64, 224, 208, 0.95) 0%, rgba(32, 178, 170, 0.95) 100%)'};
  background-size: contain; // Changed from cover to make image smaller
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 16px;

  ${ModernDriverCard}:hover & {
    opacity: 1;
  }
`;

export const ModernAnalysisPrompt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: rgba(0, 0, 0, 0.3);
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transform: translateY(10px) scale(0.95);
  transition: transform 0.2s ease;

  ${ModernDriverCard}:hover & {
    transform: translateY(0) scale(1);
  }

  svg {
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
  }
`;

// Add new brand-matching animations and styles after existing animations
const modernBounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -7px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const brandColorFlow = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const particleDrift = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }
  33% {
    transform: translate3d(25px, -25px, 0) scale(1.1) rotate(120deg);
  }
  66% {
    transform: translate3d(-15px, 15px, 0) scale(0.9) rotate(240deg);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1) rotate(360deg);
  }
`;

// BENEFITS SECTION STYLES
export const BenefitsSection = styled.section`
  /* Reduced vertical padding for a more compact look */
  padding: 80px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fffe 0%, #ffffff 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    /* Extra-small screens get slightly tighter spacing */
    padding: 60px 0;
  }
`;

export const BenefitsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(64, 224, 208, 0.03) 0%,
    rgba(248, 73, 96, 0.02) 50%,
    rgba(188, 221, 222, 0.03) 100%
  );
  z-index: 0;
`;

export const BenefitsFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  ${({ isScrolling }) =>
    isScrolling &&
    css`
      * {
        animation-play-state: paused !important;
      }
    `}
`;

export const BenefitsParticle = styled.div`
  position: absolute;
  animation: ${particleDrift}
    ${({ speed = 'medium' }) => (speed === 'slow' ? '12s' : speed === 'fast' ? '6s' : '9s')}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;

  width: ${({ size = 'medium' }) =>
    size === 'large' ? '16px' : size === 'small' ? '8px' : '12px'};
  height: ${({ size = 'medium' }) =>
    size === 'large' ? '16px' : size === 'small' ? '8px' : '12px'};

  ${({ type, position }) => {
    const positions = [
      { top: '10%', left: '8%' },
      { top: '20%', right: '12%' },
      { top: '35%', left: '5%' },
      { top: '45%', right: '8%' },
      { top: '60%', left: '10%' },
      { top: '70%', right: '15%' },
      { top: '85%', left: '7%' },
      { top: '25%', left: '50%' },
      { top: '55%', right: '45%' },
      { top: '75%', left: '60%' },
      { top: '15%', right: '35%' },
      { top: '40%', left: '25%' },
      { top: '65%', right: '25%' },
      { top: '80%', left: '40%' },
      { top: '30%', right: '60%' },
    ];

    const pos = positions[position % positions.length];

    if (type === 'circle') {
      return css`
        ${pos};
        background: linear-gradient(135deg, #008080, #40e0d0);
        border-radius: 50%;
        opacity: 0.4;
      `;
    }
    if (type === 'square') {
      return css`
        ${pos};
        background: linear-gradient(135deg, #f84960, #ff6b8a);
        border-radius: 2px;
        opacity: 0.3;
        transform: rotate(45deg);
      `;
    }
    return css`
      ${pos};
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 10px solid #bcddde;
      opacity: 0.4;
    `;
  }}
`;

export const BenefitsContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 2;
`;

export const BenefitsHeader = styled.div`
  text-align: center;
  /* Reduce space between header and statistics grid */
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const BenefitsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(248, 73, 96, 0.1));
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 50px;
  padding: 8px 20px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #008080;
  backdrop-filter: blur(10px);
`;

export const BenefitsBadgeIcon = styled.div`
  color: #008080;
`;

export const BenefitsTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 24px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const BenefitsHighlight = styled.span`
  background: linear-gradient(135deg, #008080, #40e0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const BenefitsSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const BenefitCard = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${({ delay }) => delay || '0s'},
    transform 0.12s ease-out;
  position: relative;
  cursor: pointer;
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  display: flex;
  height: 100%;

  &:hover {
    transform: translateY(-8px) translateZ(0);
  }
`;

export const BenefitCardGlow = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, #008080, #f84960, #bcddde);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.12s ease-out;
  z-index: 0;
  filter: blur(3px);
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;

  ${BenefitCard}:hover & {
    opacity: 0.15;
  }
`;

export const BenefitCardInner = styled.div`
  background: white;
  border-radius: 18px;
  padding: 32px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(64, 224, 208, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  transition: border-color 0.12s ease-out, background-color 0.12s ease-out;
  will-change: border-color, background-color;
  transform: translateZ(0);
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${BenefitCard}:hover & {
    border-color: rgba(64, 224, 208, 0.25);
    background: rgba(255, 255, 255, 0.98);
  }
`;

export const BenefitIconContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const BenefitIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 1;
`;

export const BenefitIconGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  border-radius: 16px;
  filter: blur(20px);
  opacity: 0.3;
  z-index: 0;
`;

export const BenefitContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BenefitHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`;

export const BenefitTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 0px !important;
  padding-top: 0px !important;
  margin-bottom: 12px;
  line-height: 1.3;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const BenefitDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// WORKFLOW SECTION STYLES
export const WorkflowSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const WorkflowBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(64, 224, 208, 0.03) 0%, transparent 70%);
  z-index: 0;
`;

export const WorkflowContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 2;
`;

export const WorkflowHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const WorkflowBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(248, 73, 96, 0.1));
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 50px;
  padding: 8px 20px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #008080;
  backdrop-filter: blur(10px);
`;

export const WorkflowBadgeIcon = styled.div`
  color: #008080;
`;

export const WorkflowTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a202c;
  margin-bottom: 24px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const WorkflowHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #f84960);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const WorkflowSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const WorkflowSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch; /* Changed from start to stretch */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const WorkflowStep = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${({ delay }) => delay || '0s'};
  position: relative;
`;

export const WorkflowStepCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  position: relative;
  backdrop-filter: blur(20px);
  transition: transform 0.12s ease-out, border-color 0.12s ease-out, background-color 0.12s ease-out;
  cursor: default;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  will-change: transform, border-color, background-color;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px) translateZ(0);
    border-color: rgba(64, 224, 208, 0.4);
    background: rgba(255, 255, 255, 0.95);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const WorkflowStepGlow = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, #40e0d0, #f84960);
  border-radius: 22px;
  opacity: 0;
  transition: opacity 0.12s ease-out;
  z-index: 0;
  filter: blur(3px);
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;

  ${WorkflowStepCard}:hover & {
    opacity: 0.2;
  }
`;

export const WorkflowStepNumber = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #008080;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 50px;
  padding: 8px 16px;
  display: inline-block;
  margin-bottom: 20px;
`;

export const WorkflowStepIconContainer = styled.div`
  position: relative;
  margin-bottom: 1px;
  width: fit-content;
  align-self: center;
`;

export const WorkflowStepIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #40e0d0, #008080);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  transform: translateZ(0);
  backface-visibility: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #40e0d0, #008080);
    border-radius: 20px;
    filter: blur(8px);
    opacity: 0.3;
    z-index: -1;
    transform: translateZ(0);
  }
`;

export const WorkflowStepContent = styled.div`
  flex: 1; /* Take remaining space to ensure equal card heights */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Changed from center to flex-start */
`;

export const WorkflowStepTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0px;
  line-height: 1.3;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 60px; /* Added fixed min-height to ensure alignment */
  display: flex;
  align-items: center; /* Center text vertically within the fixed height */
  justify-content: center; /* Center text horizontally */
`;

export const WorkflowStepDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 5px;
  margin-top: 0px;
  color: #666;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const WorkflowConnector = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 50%;
    right: -20px;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #40e0d0, transparent);
    opacity: ${({ isVisible }) => (isVisible ? 0.6 : 0)};
    transition: opacity 0.6s ease ${({ delay }) => delay || '0s'};
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -4px;
      width: 0;
      height: 0;
      border-left: 8px solid #40e0d0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
`;

// TESTIMONIALS SECTION STYLES
export const TestimonialsSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fffe 0%, #ffffff 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const TestimonialsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(248, 73, 96, 0.03) 0%, transparent 70%);
  z-index: 0;
`;

export const TestimonialsFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const TestimonialsParticle = styled.div`
  position: absolute;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};

  ${({ position }) => {
    const positions = [
      { top: '15%', left: '10%', width: '12px', height: '12px' },
      { top: '25%', right: '15%', width: '16px', height: '16px' },
      { top: '45%', left: '8%', width: '10px', height: '10px' },
      { top: '55%', right: '12%', width: '14px', height: '14px' },
      { top: '75%', left: '15%', width: '12px', height: '12px' },
      { top: '35%', left: '50%', width: '18px', height: '18px' },
      { top: '65%', right: '45%', width: '10px', height: '10px' },
      { top: '20%', right: '60%', width: '14px', height: '14px' },
    ];

    const pos = positions[position % positions.length];

    return css`
      ${pos};
      background: linear-gradient(135deg, #f84960, #ff6b8a);
      border-radius: 50%;
      opacity: 0.4;
    `;
  }}
`;

export const TestimonialsContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 2;
`;

export const TestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const TestimonialsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(248, 73, 96, 0.1), rgba(64, 224, 208, 0.1));
  border: 1px solid rgba(248, 73, 96, 0.3);
  border-radius: 50px;
  padding: 8px 20px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #f84960;
  backdrop-filter: blur(10px);
`;

export const TestimonialsBadgeIcon = styled.div`
  color: #f84960;
`;

export const TestimonialsTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 24px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const TestimonialsHighlight = styled.span`
  background: linear-gradient(135deg, #f84960, #008080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const TestimonialsSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const TestimonialShowcase = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  border-radius: 8px;
  transition: transform 0.2s ease;

  /* Focus styles for keyboard navigation */
  &:focus {
    outline: 2px solid rgba(64, 224, 208, 0.6);
    outline-offset: 4px;
  }

  &:focus-visible {
    outline: 2px solid rgba(64, 224, 208, 0.8);
    outline-offset: 4px;
    box-shadow: 0 0 0 4px rgba(64, 224, 208, 0.2);
  }

  /* Touch-friendly on mobile */
  @media (max-width: 768px) {
    touch-action: pan-x;
  }
`;

export const TestimonialCard = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1) ${({ delay }) => delay || '0s'},
    transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) ${({ delay }) => delay || '0s'};
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(64, 224, 208, 0.08);
  overflow: hidden;
  cursor: pointer;
  height: 450px; /* Changed to fixed height */
  display: flex; /* Added to help content fill height */
  flex-direction: column; /* Added to stack content vertically */

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
    border-color: rgba(64, 224, 208, 0.15);
    transition: transform 0.12s ease-out, box-shadow 0.12s ease-out, border-color 0.12s ease-out;
  }

  ${({ isTransitioning }) =>
    isTransitioning &&
    css`
      opacity: 0.9;
      transition: opacity 0.12s ease-out;
    `}

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

export const TestimonialCardGlow = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, #f84960, #008080, #bcddde);
  border-radius: 25px;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.12s ease-out;
  filter: blur(1px); /* Lowered blur for better performance */

  ${TestimonialCard}:hover & {
    opacity: 0.04;
  }
`;

export const TestimonialQuote = styled.blockquote`
  font-size: 24px;
  line-height: 1.6;
  color: #1a1a1a;
  margin-bottom: 32px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: flex-start; /* Changed from center to flex-start */
  gap: 16px;
  position: relative;
  z-index: 1;
  flex-shrink: 0; /* Added to prevent vertical shrinking */

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
`;

export const TestimonialAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;

  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0);
  transition: transform 0.15s ease-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Changed from cover to contain */
    transition: transform 0.15s ease-out;
    will-change: transform;
    transform: translateZ(0);
  }

  &:hover img {
    transform: scale(1.03) translateZ(0);
  }
`;

export const TestimonialAuthorInfo = styled.div`
  flex: 1;
`;

export const TestimonialAuthorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const TestimonialAuthorRole = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 2px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const TestimonialAuthorCompany = styled.div`
  font-size: 14px;
  color: #999;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const TestimonialCompanyLogo = styled.div`
  height: 40px;
  flex-shrink: 0;
  overflow: hidden; /* Added overflow: hidden */

  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0);
  transition: transform 0.15s ease-out;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    opacity: 0.8;
    transition: opacity 0.15s ease-out;
    will-change: opacity;
  }

  &:hover {
    transform: translateZ(0);

    img {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 32px;
  }
`;

export const TestimonialRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 20px;
  }
`;

export const TestimonialStar = styled.div`
  color: #fbbf24;
  opacity: 0;
  animation: ${fadeInUp} 0.2s ease forwards;
  animation-delay: ${({ delay }) => delay || '0s'};

  /* Performance optimizations */
  will-change: color, opacity;
  transform: translateZ(0);
  transition: color 0.1s ease;

  ${({ isTransitioning }) =>
    isTransitioning &&
    css`
      animation-delay: 0s;
      opacity: 1;
    `}

  &:hover {
    color: #f59e0b;
  }
`;

export const TestimonialIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
`;

export const TestimonialIndicator = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: ${({ active }) =>
    active ? 'linear-gradient(135deg, #F84960, #008080)' : 'rgba(0, 0, 0, 0.2)'};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  /* Optimized transitions */
  will-change: transform, border-color;
  transform: translateZ(0);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease-out;

  &:hover {
    transform: scale(1.2) translateZ(0);
    border-color: rgba(64, 224, 208, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ active }) =>
    active &&
    css`
      box-shadow: 0 4px 20px rgba(64, 224, 208, 0.25);
    `}
`;

// Progress indicator for active testimonial
export const TestimonialIndicatorProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #f84960, #008080);
  transform: scaleX(0);
  transform-origin: left center;

  ${({ active, isPaused }) =>
    active &&
    !isPaused &&
    css`
      animation: ${progressBarFill} 6s linear infinite;
    `}

  ${({ active, isPaused }) =>
    active &&
    isPaused &&
    css`
      animation-play-state: paused;
    `}
`;

// Autoplay Control
export const TestimonialAutoplayControl = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export const AutoplayButton = styled.button`
  padding: 8px 16px;
  border: 2px solid rgba(64, 224, 208, 0.3);
  border-radius: 20px;
  background: ${({ active }) => (active ? 'rgba(64, 224, 208, 0.1)' : 'transparent')};
  color: #008080;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(64, 224, 208, 0.2);
    border-color: rgba(64, 224, 208, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Navigation Controls
export const TestimonialNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -60px;
  right: -60px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;

  @media (max-width: 1200px) {
    left: -40px;
    right: -40px;
  }

  @media (max-width: 768px) {
    left: 10px;
    right: 10px;
    top: 20px;
    transform: none;
  }
`;

export const TestimonialNavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  z-index: 11;
  color: #666;

  /* Performance optimizations */
  will-change: transform, background-color, color, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease-out,
    color 0.2s ease-out, box-shadow 0.2s ease-out;

  &:hover {
    background: #f8f9fa;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    color: #008080;
    transform: scale(1.05) translateZ(0);
  }

  &:active {
    transform: scale(0.95) translateZ(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

// Content Container with transition effects
export const TestimonialContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto; /* Added for vertical scrolling */
  /* max-height: 100%; Removed this line */

  /* Simplified transition */
  will-change: opacity;
  transform: translateZ(0);
  transition: opacity 0.15s ease-out;

  ${({ isTransitioning }) =>
    isTransitioning &&
    css`
      opacity: 0.8;
    `}
`;

// CTA SECTION STYLES
export const CTASection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const CTABackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(64, 224, 208, 0.08) 0%, transparent 70%);
  z-index: 0;
`;

export const CTAFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const CTAFloatingElement = styled.div`
  position: absolute;
  animation: ${quantumFloat} 8s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};

  ${({ position }) => {
    const positions = [
      { top: '10%', left: '5%', width: '14px', height: '14px' },
      { top: '20%', right: '10%', width: '18px', height: '18px' },
      { top: '40%', left: '8%', width: '12px', height: '12px' },
      { top: '60%', right: '15%', width: '16px', height: '16px' },
      { top: '80%', left: '12%', width: '14px', height: '14px' },
      { top: '30%', left: '60%', width: '20px', height: '20px' },
      { top: '70%', right: '50%', width: '12px', height: '12px' },
      { top: '15%', right: '40%', width: '16px', height: '16px' },
      { top: '50%', left: '30%', width: '10px', height: '10px' },
      { top: '25%', left: '80%', width: '14px', height: '14px' },
    ];

    const pos = positions[position % positions.length];

    return css`
      ${pos};
      background: linear-gradient(135deg, #40e0d0, #f84960);
      border-radius: 50%;
      opacity: 0.6;
    `;
  }}
`;

export const CTAContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
`;

export const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const CTATitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: white;
  margin-bottom: 24px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const CTAHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #f84960);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
    border-radius: 2px;
  }
`;

export const CTASubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 48px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 36px;
  }
`;

export const CTAFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;
  }
`;

export const CTAFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
`;

export const CTAFeatureIcon = styled.div`
  color: #40e0d0;
  font-weight: bold;
`;

export const CTAFeatureText = styled.span`
  font-size: 16px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CTAPrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(64, 224, 208, 0.3);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(64, 224, 208, 0.4);
  }
`;

export const CTASecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

export const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
`;

// PRODUCTIVITY SECTION STYLES
export const ProductivitySection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const ProductivityBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(64, 224, 208, 0.08) 0%, transparent 70%);
  z-index: 0;
`;

export const ProductivityContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 2;
`;

export const ProductivityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

export const ProductivityImageColumn = styled.div`
  @media (max-width: 968px) {
    order: 2;
  }
`;

export const ProductivityImage = styled.div`
  img {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
`;

export const ProductivityContentColumn = styled.div`
  @media (max-width: 968px) {
    order: 1;
  }
`;

export const ProductivityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(64, 224, 208, 0.15);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 30px;
  padding: 12px 20px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 600;
  color: #40e0d0;
`;

export const ProductivityBadgeIcon = styled.div`
  display: flex;
  align-items: center;
  color: #40e0d0;
`;

export const ProductivityTitle = styled.h2`
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin-bottom: 24px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const ProductivityHighlight = styled.span`
  background: linear-gradient(135deg, #008080, #40e0d0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ProductivityDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ProductivityButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(64, 224, 208, 0.3);
  min-width: 198px;
  height: 56px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(64, 224, 208, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

// WHY SPOTTER SECTION STYLES
export const WhySpotterSection = styled.section`
  /* Tighten vertical spacing */
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    /* Extra-small screens get slightly tighter spacing */
    padding: 80px 0;
  }
`;

export const WhySpotterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 128, 128, 0.08) 0%,
    rgba(248, 73, 96, 0.04) 50%,
    rgba(188, 221, 222, 0.06) 100%
  );
  z-index: 0;
`;

export const WhySpotterContainer = styled.div`
  position: relative;
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  /* Constrain inner content width for better side margins */
  max-width: 1000px;
  margin: 0 auto;
`;

export const WhySpotterHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const WhySpotterBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 128, 128, 0.1);
  border: 1px solid rgba(0, 128, 128, 0.2);
  color: rgb(0, 128, 128);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
`;

export const WhySpotterBadgeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WhySpotterTitle = styled.h2`
  font-size: 44px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
  line-height: 1.25;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const WhySpotterHighlight = styled.span`
  background: linear-gradient(135deg, rgb(0, 128, 128), #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const WhySpotterSubtitle = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const AccuracyChartContainer = styled.div`
  margin-bottom: 80px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(30px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
  backdrop-filter: blur(10px);
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ChartHoverArea = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 120px; /* match taller SVG */
  z-index: 10;
  cursor: crosshair;

  @media (max-width: 768px) {
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 80px;
  }
`;

export const ChartLines = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 120px;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 80px;
  }
`;

export const ChartLineY = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  left: var(--x, -100px);
  opacity: var(--line-opacity, 0);
  transition: opacity 0.2s ease;
`;

export const ChartPoints = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ChartPoint = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const ChartLabel = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 160px;
  margin-bottom: 40px;

  path {
    transition: stroke-width 0.2s ease, filter 0.2s ease;
  }

  .red-ball {
    transition: opacity 0.2s ease;
  }

  .teal-ball {
    transition: opacity 0.2s ease;
  }

  @media (max-width: 768px) {
    height: 120px;
    margin-bottom: 20px;
  }
`;

export const ChartCard = styled.div`
  position: absolute;
  bottom: 20px;
  left: var(--card-x, calc(0% - 106px));
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  backdrop-filter: blur(10px);
  opacity: var(--card-opacity, 0);
  transition: opacity 0.2s ease;
  z-index: 20;
  min-width: 200px;

  @media (max-width: 768px) {
    bottom: 10px;
    min-width: 160px;
    padding: 12px;
  }
`;

export const ChartDays = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ChartValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ChartValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChartCompany = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ChartCompetitorValue = styled.span`
  color: #f84960;
  font-size: 12px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const ChartSpotterValue = styled.span`
  color: rgb(0, 128, 128);
  font-size: 12px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const WhySpotterFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const WhySpotterFeaturesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const WhySpotterVisualizationColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const WhySpotterFeature = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const WhySpotterFeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
`;

export const WhySpotterFeatureContent = styled.div`
  flex: 1;
`;

export const WhySpotterFeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  line-height: 1.4;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const WhySpotterFeatureDescription = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.4;
  }
`;

export const RadarVisualization = styled.div`
  position: relative;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(30px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.4s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(107, 114, 128, 0.3);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 8px 32px rgba(107, 114, 128, 0.1);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

export const RadarGrid = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 0, #000 85%, transparent);
  -webkit-mask-image: linear-gradient(180deg, #000 0, #000 85%, transparent);

  @media (max-width: 640px) {
    height: 120px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    height: 100px;
    margin-bottom: 12px;
  }

  @media (min-width: 641px) {
    cursor: none;
  }

  @media (max-width: 640px) {
    cursor: default;
  }

  /* Lens cursor icon */
  &::before {
    content: '';
    position: absolute;
    top: calc(var(--y) - 65px);
    left: calc(var(--x) - 65px);
    width: 80px;
    height: 80px;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 490 490' xmlns='http://www.w3.org/2000/svg' fill='none' transform='rotate(45)'%3E%3Cpath d='M437.588,202.053C437.588,90.634,344.307,0,229.643,0S21.683,90.634,21.683,202.053s93.296,202.068,207.96,202.068 c43.421,0,83.744-13.04,117.128-35.243L456.982,490l11.335-10.318L359.242,359.809C406.918,322.749,437.588,265.857,437.588,202.053 z M229.643,388.809c-106.23,0-192.647-83.785-192.647-186.756S123.412,15.313,229.643,15.313 c106.216,0,192.633,83.77,192.633,186.741S335.858,388.809,229.643,388.809z' fill='%23008080' /%3E%3C/svg%3E")
      no-repeat center;
    background-size: contain;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const RadarSvg = styled.svg`
  opacity: 0.3;
  width: 100%;

  @media (max-width: 640px) {
    height: 120px;
    opacity: 0.4;
  }

  @media (max-width: 480px) {
    height: 100px;
    opacity: 0.5;
  }
`;

export const RadarMagnifier = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' fill='none' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23D9D9D9'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' fill='none' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23D9D9D9'/%3E%3C/svg%3E");
  mask-position: calc(var(--x) - 52px) calc(var(--y) - 61px);
  -webkit-mask-position: calc(var(--x) - 52px) calc(var(--y) - 61px);
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-size: 60px;
  -webkit-mask-size: 60px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  @media (min-width: 641px) {
    ${RadarGrid}:hover & {
      opacity: 1;
    }
  }
`;

export const RadarMagnifierGlass = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0ed;
  transform: scale(1.5);
  position: static;

  /* Override circle colors to lead when inside magnifier */
  g circle {
    fill: rgb(8, 189, 125) !important;
  }
`;

// Navigation Hint
export const TestimonialNavigationHint = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  opacity: 0.6;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

export const NavigationHintText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  text-align: center;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

// ===============================
// Pricing Section Styles
// ===============================

export const PricingSection = styled.section`
  position: relative;
  padding: 120px 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1a1a1a 25%,
    #0f1419 50%,
    #1a1a1a 75%,
    #0a0a0a 100%
  );

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const PricingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(0, 128, 128, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, rgba(32, 178, 170, 0.05) 0%, transparent 100%);
  pointer-events: none;
`;

export const PricingFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const PricingParticle = styled.div`
  position: absolute;
  animation: ${quantumFloat}
    ${({ type }) =>
      type === 'dollar' ? '8s' : type === 'check' ? '6s' : type === 'star' ? '7s' : '5s'}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  opacity: 0.4;

  ${({ position, type }) => {
    const positions = [
      { top: '8%', left: '12%' },
      { top: '25%', left: '88%' },
      { top: '40%', left: '8%' },
      { top: '15%', left: '75%' },
      { top: '65%', left: '15%' },
      { top: '80%', left: '85%' },
      { top: '35%', left: '92%' },
      { top: '70%', left: '5%' },
      { top: '20%', left: '45%' },
      { top: '85%', left: '55%' },
      { top: '50%', left: '25%' },
      { top: '90%', left: '75%' },
    ];

    const pos = positions[position % positions.length];

    return css`
      top: ${pos.top};
      left: ${pos.left};
      width: ${type === 'dollar' ? '20px' : type === 'star' ? '16px' : '14px'};
      height: ${type === 'dollar' ? '20px' : type === 'star' ? '16px' : '14px'};

      &::before {
        content: '${type === 'dollar'
          ? '💰'
          : type === 'check'
          ? '✓'
          : type === 'star'
          ? '⭐'
          : '●'}';
        font-size: ${type === 'dollar' ? '18px' : type === 'star' ? '14px' : '12px'};
        color: ${type === 'dollar'
          ? '#40e0d0'
          : type === 'check'
          ? '#48bb78'
          : type === 'star'
          ? '#f6e05e'
          : '#20b2aa'};
        filter: drop-shadow(0 0 8px currentColor);
      }
    `;
  }}
`;

export const PricingContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
`;

export const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`;

export const PricingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 50px;
  color: #40e0d0;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(64, 224, 208, 0.15);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateY(-1px);
  }
`;

export const PricingBadgeIcon = styled.div`
  color: #40e0d0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PricingTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 20px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const PricingHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
    border-radius: 2px;
  }
`;

export const PricingSubtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`;

export const PricingToggleContainer = styled.div`
  display: flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 4px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

export const PricingToggleButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(135deg, #40e0d0, #20b2aa)' : 'transparent'};
  color: ${({ isActive }) => (isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)')};

  &:hover {
    color: #ffffff;
    transform: translateY(-1px);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 0 4px 16px rgba(64, 224, 208, 0.3);
    `}
`;

export const PricingContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  align-items: start;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1024px) {
    max-width: 800px;
    gap: 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    gap: 20px;
  }
`;

export const PricingPlanCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px 28px ${(props) => (props.hasSavings ? '20px' : '28px')} 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  max-width: 420px;
  min-height: 560px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(30px)')};
  animation-delay: ${(props) => props.delay || '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(64, 224, 208, 0.15);
    border-color: rgba(64, 224, 208, 0.3);
  }

  @media (max-width: 1024px) {
    padding: 28px 24px 24px 24px;
    height: 520px; /* Fixed height instead of min-height */
    max-width: 380px;
  }

  @media (max-width: 768px) {
    padding: 24px 20px 20px 20px;
    height: 480px; /* Fixed height instead of min-height */
    max-width: 100%;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 20px 16px 16px 16px;
    height: 465px; /* Fixed height instead of min-height */
    border-radius: 20px;
  }
`;

export const PricingFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  flex-grow: 1;
  justify-content: flex-start;
  height: 320px; /* Fixed height for consistency */

  @media (max-width: 1024px) {
    gap: 11px;
    margin-bottom: 24px;
    height: 280px; /* Fixed height for consistency */
  }

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 28px;
    height: 240px; /* Fixed height for consistency */
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 24px;
    height: 220px; /* Fixed height for consistency */
  }
`;

export const PricingImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center; // Vertically center the image with the cards
  width: 100%;
  height: 100%;
  min-height: 320px;
  margin-top: 24px;
`;

export const PricingImage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 130%%;
    max-width: 350px;
    max-height: 350px;
    min-width: 180px;
    min-height: 120px;
    object-fit: contain;
    border-radius: 18px;
    box-shadow: none;
    background: none;
  }
  @media (max-width: 1024px) {
    img {
      max-width: 260px;
      max-height: 220px;
    }
  }
  @media (max-width: 900px) {
    img {
      max-width: 180px;
      max-height: 120px;
    }
  }
`;

// Pricing Card Components
export const PricingCardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(32, 178, 170, 0.1));
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;

  ${PricingPlanCard}:hover & {
    opacity: 1;
  }
`;

export const PricingCardHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  min-height: ${(props) => (props.hasSavings ? '108px' : '140px')}; /* adjust for badge */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; /* Center children horizontally */

  @media (max-width: 768px) {
    margin-bottom: 28px;
    min-height: 130px; /* Fixed minimum height for tablets */
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
    min-height: 120px; /* Fixed minimum height for mobile */
  }
`;

export const PricingPlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 1.375rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }
`;

export const PricingAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const PricingPrice = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const PricingPeriod = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const PricingSavings = styled.div`
  margin-top: 6px;
  padding: 3px 8px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  /* Make it a pill badge and center it */
  border-radius: 9999px;
  margin: 8px auto 0; /* Center horizontally with some spacing */
  width: fit-content;
  padding: 2px 16px;
  color: #10b981;
  font-size: 0.7rem;
  font-weight: 500;
  /* Smooth appear/disappear */
  overflow: hidden;
  display: block;
  max-height: ${(props) => (props.isVisible ? '32px' : '0px')};
  margin-top: ${(props) => (props.isVisible ? '8px' : '0px')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? '0' : '-6px')});
  transition: max-height 0.35s ease, margin-top 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
  text-align: center;
`;

export const PricingFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PricingFeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const PricingFeatureText = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

export const PricingButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  min-height: 48px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(64, 224, 208, 0.3);
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 0.9rem;
    min-height: 44px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.875rem;
    min-height: 40px;
    border-radius: 10px;
  }
`;

// Statistics Components
export const StatisticsGrid = styled.div`
  /* Implement fixed four-column layout as requested */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatisticCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  animation: ${(props) => (props.isVisible ? fadeInUp : 'none')} 0.6s ease-out;
  animation-delay: ${(props) => props.delay || '0s'};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(64, 224, 208, 0.3);
    box-shadow: 0 12px 40px rgba(64, 224, 208, 0.1);
  }
`;

export const StatisticIcon = styled.div`
  /* Circular teal icon container to match design */
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 128, 128, 0.1);
  border-radius: 50%;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

export const StatisticValue = styled.div`
  /* Slightly smaller headline to align with screenshot */
  font-size: 2rem;
  font-weight: 700;
  color: rgb(26, 32, 44);
  margin-bottom: 8px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const StatisticTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(26, 32, 44);
  margin-bottom: 8px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const StatisticDescription = styled.p`
  font-size: 0.9rem;
  color: rgb(102, 102, 102);
  line-height: 1.5;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// Upload Demo Components
export const UploadSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  max-width: 400px;
`;

export const UploadHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UploadTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const UploadSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const CDLImageGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.3), rgba(32, 178, 170, 0.3));
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
`;

export const CDLImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px) scale(1.02);

    ${CDLImageGlow} {
      opacity: 1;
    }
  }
`;

export const CDLImage = styled.div`
  position: relative;
  z-index: 2;

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
`;

export const CDLClickPrompt = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
  pointer-events: none;

  ${CDLImageContainer}:hover & {
    opacity: 1;
  }
`;

export const CDLClickIcon = styled.div`
  color: #40e0d0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CDLClickText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// Enterprise card features with same dimensions as regular features
export const PricingFeaturesEnterprise = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; // Reduced spacing to fit same height
  margin-bottom: ${(props) =>
    props.hasSavings ? '29px' : '40px'}; // Same margin as regular features
  flex-grow: 1;
  justify-content: flex-start;
  height: 320px; // Fixed height to match regular features

  @media (max-width: 1024px) {
    gap: 10px; // Reduced spacing to fit same height
    margin-bottom: 32px; // Same margin as regular features
    height: 280px; // Fixed height to match regular features
  }

  @media (max-width: 768px) {
    gap: 8px; // Reduced spacing to fit same height
    margin-bottom: 28px; // Same margin as regular features
    height: 240px; // Fixed height to match regular features
  }

  @media (max-width: 480px) {
    gap: 6px; // Reduced spacing to fit same height
    margin-bottom: 24px; // Same margin as regular features
    height: 220px; // Fixed height to match regular features
  }
`;
