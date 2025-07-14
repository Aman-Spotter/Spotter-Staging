import styled, { keyframes, css } from 'styled-components';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;
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

const progressFill = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
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

// Main Layout
export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
`;

// Hero Section
export const HeroSection = styled.section`
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2vh 0;

  /* Desktop responsiveness improvements */
  @media (min-width: 1024px) {
    height: 100vh;
    padding: clamp(20px, 3vh, 60px) 0;
  }

  /* Extra large screens */
  @media (min-width: 1920px) {
    padding: clamp(40px, 4vh, 80px) 0;
  }

  /* Large screens */
  @media (min-width: 1440px) and (max-width: 1919px) {
    padding: clamp(30px, 3.5vh, 70px) 0;
  }

  /* Medium desktop screens */
  @media (min-width: 1280px) and (max-width: 1439px) {
    padding: clamp(25px, 3vh, 65px) 0;
  }

  /* Small desktop screens */
  @media (min-width: 1024px) and (max-width: 1279px) {
    padding: clamp(20px, 2.5vh, 50px) 0;
  }

  @media (max-width: 1023px) {
    min-height: 100vh;
    height: auto;
    padding: 40px 0;
  }

  @media (max-width: 768px) {
    padding: 40px 0;
  }

  @media (max-width: 480px) {
    padding: 30px 0;
    min-height: 100vh;
  }

  @media (max-width: 375px) {
    padding: 25px 0;
  }

  @media (max-width: 320px) {
    padding: 20px 0;
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
`;

// Floating Decorative Icons
export const FloatingDecorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

// Particle System Styles
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

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
`;

export const ParticleElement = styled.div`
  position: absolute;
  animation: ${drift} ${({ speed }) => (speed === 'slow' ? '8s' : speed === 'medium' ? '6s' : '4s')}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};

  width: ${({ size }) => (size === 'large' ? '20px' : size === 'medium' ? '14px' : '8px')};
  height: ${({ size }) => (size === 'large' ? '20px' : size === 'medium' ? '14px' : '8px')};

  color: ${({ color }) => {
    switch (color) {
      case 'logo-teal':
        return '#008080';
      case 'logo-red':
        return '#F84960';
      case 'logo-cyan':
        return '#BCDDDE';
      case 'blue':
        return '#3B82F6';
      case 'teal':
        return '#14B8A6';
      case 'purple':
        return '#9333EA';
      case 'green':
        return '#10B981';
      case 'orange':
        return '#F59E0B';
      case 'pink':
        return '#EC4899';
      case 'indigo':
        return '#6366F1';
      case 'cyan':
        return '#06B6D4';
      case 'yellow':
        return '#EAB308';
      case 'red':
        return '#EF4444';
      default:
        return '#FFFFFF';
    }
  }};

  ${({ type }) => {
    if (type === 'ring') {
      return css`
        border: 2px solid currentColor;
        border-radius: 50%;
        background: transparent;
        animation: ${drift} 6s ease-in-out infinite, ${glow} 3s ease-in-out infinite;
      `;
    }
    return css`
      background: currentColor;
      border-radius: 50%;
      animation: ${drift} 5s ease-in-out infinite, ${pulse} 2s ease-in-out infinite;
    `;
  }}

  ${({ position }) => {
    const positions = [
      { top: '15%', left: '10%' },
      { top: '25%', right: '15%' },
      { top: '45%', left: '8%' },
      { top: '55%', right: '18%' },
      { top: '75%', left: '12%' },
      { top: '85%', right: '10%' },
      { bottom: '35%', left: '20%' },
      { bottom: '45%', right: '25%' },
      { top: '30%', left: '35%' },
      { top: '65%', right: '30%' },
    ];

    const pos = positions[position % positions.length];
    return Object.entries(pos)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n');
  }}

  @media (max-width: 768px) {
    width: ${({ size }) => (size === 'large' ? '16px' : size === 'medium' ? '12px' : '6px')};
    height: ${({ size }) => (size === 'large' ? '16px' : size === 'medium' ? '12px' : '6px')};
  }

  @media (max-width: 480px) {
    ${({ position }) => {
      if (position > 6) {
        return 'display: none;';
      }
      return '';
    }}
  }
`;

// Centered Hero Container
export const CenteredHeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 0;

  /* Responsive gap for better desktop spacing */
  gap: clamp(1rem, 2vh, 2.5rem);

  /* Desktop responsiveness */
  @media (min-width: 1920px) {
    max-width: 1600px;
    gap: clamp(2rem, 3vh, 4rem);
  }

  @media (min-width: 1440px) and (max-width: 1919px) {
    max-width: 1500px;
    gap: clamp(1.5rem, 2.5vh, 3.5rem);
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    max-width: 1300px;
    gap: clamp(1.25rem, 2.25vh, 3rem);
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    max-width: 1100px;
    gap: clamp(1rem, 2vh, 2.5rem);
  }

  @media (max-width: 1023px) {
    gap: 0;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 0;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }

  @media (min-width: 2560px) {
    gap: clamp(3rem, 5vh, 6rem);
  }
`;

export const CenteredHeroContent = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease;
  margin-bottom: 15px;
  text-align: center;
  flex-shrink: 0;
  position: relative;
  top: -25px;

  @media (max-width: 480px) {
    position: relative;
    top: 0px;
  }

  @media (max-width: 375px) {
    margin-bottom: 12px;
  }

  /* Reduce upward offset on ultra-wide screens to avoid overlap */
  @media (min-width: 2560px) {
    top: 0;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white || '#ffffff'};
  margin-bottom: 0;
  letter-spacing: -0.02em;
  text-align: center;

  /* Desktop font size adjustments */
  @media (min-width: 1920px) {
    font-size: 70px
    line-height: 1.05;
  }

  @media (min-width: 1680px) and (max-width: 1919px) {
    font-size: clamp(4rem, 5vw, 5rem);
    line-height: 1.05;
  }

  @media (min-width: 1440px) and (max-width: 1679px) {
    font-size: clamp(4rem, 4.5vw, 4.5rem);
    line-height: 1.08;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    font-size: clamp(3.5rem, 5vw, 5rem);
    line-height: 1.1;
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    font-size: clamp(3rem, 4.5vw, 4.5rem);
    line-height: 1.1;
  }

  @media (max-width: 1023px) {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
  }

  @media (max-width: 768px) {
    font-size: 2.75rem;
    line-height: 1.2;
    position: relative;
    top: 35px;
  }

  @media (max-width: 480px) {
    font-size: 2.25rem;
    line-height: 1.25;
    letter-spacing: -0.015em;
  }

  @media (max-width: 375px) {
    font-size: 1.9rem;
    line-height: 1.3;
  }

  @media (max-width: 320px) {
    font-size: 1.75rem;
  }
`;

export const HeroHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  /* Fallback for browsers that don't support background-clip: text */
  @supports not (-webkit-background-clip: text) {
    color: #008080;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-shrink: 0;

  /* Move button down slightly */
  position: relative;
  top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    margin-top: 25px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    margin-top: 0px;
    padding: 0 16px;
  }

  @media (max-width: 375px) {
    margin-top: 10px;
    padding: 0 12px;
  }

  /* Neutralize upward offset for ultra-wide */
  @media (min-width: 2560px) {
    top: 0;
    margin-top: 40px;
  }
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #008080 0%, #f84960 50%, #bcddde 100%);
  background-size: 400% 400%;
  animation: ${colorWave} 6s ease-in-out infinite;
  color: white;
  border: none;
  border-radius: 12px;
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

  /* Responsive sizing - Reduced by 2-3px */
  padding: clamp(10px, 1.5vw, 17px) clamp(20px, 3vw, 35px);
  font-size: clamp(0.9rem, 1.5vw, 1.55rem);

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

  /* Desktop specific sizes - Reduced by 2-3px */
  @media (min-width: 1920px) {
    padding: 17px 35px; /* Reduced by 3px and 5px */
    font-size: 1.55rem; /* Reduced by 0.2rem */
    border-radius: 14px;
  }
  @media (min-width: 1680px) and (max-width: 1919px) {
    padding: 15px 32px; /* Reduced by 3px and 4px */
    font-size: 1.3rem; /* Reduced by 0.2rem */
    border-radius: 13px;
  }

  @media (min-width: 1440px) and (max-width: 1679px) {
    padding: 15px 32px; /* Reduced by 3px and 4px */
    font-size: 1.05rem; /* Reduced by 0.15rem */
    border-radius: 13px;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    padding: 13px 28px; /* Reduced by 3px and 4px */
    font-size: 1.3rem; /* Reduced by 0.2rem */
    border-radius: 12px;
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    padding: 12px 26px; /* Reduced by 3px and 4px */
    font-size: 1.2rem; /* Reduced by 0.2rem */
    border-radius: 11px;
  }

  @media (max-width: 1023px) {
    padding: 11px 24px; /* Reduced by 3px and 4px */
    font-size: 1.05rem; /* Reduced by 0.15rem */
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    padding: 11px 24px; /* Reduced by 3px and 4px */
    font-size: 1rem; /* Reduced by 0.1rem */
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px; /* Reduced by 2px and 4px */
    font-size: 0.9rem; /* Reduced by 0.1rem */
    border-radius: 8px;
    gap: 6px;
  }

  @media (max-width: 375px) {
    padding: 8px 16px; /* Reduced by 2px and 4px */
    font-size: 0.8rem; /* Reduced by 0.1rem */
    gap: 4px;
  }
`;
// Product Showcase
export const ProductShowcase = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '50px')});
  transition: all 1.2s ease 0.3s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;

  /* Responsive margin to prevent elements getting too close */
  margin: clamp(1rem, 2vh, 2.5rem) 0;

  /* Desktop specific spacing */
  @media (min-width: 1920px) {
    margin: clamp(1.5rem, 2.5vh, 3.5rem) 0;
  }

  @media (min-width: 1440px) and (max-width: 1919px) {
    margin: clamp(0.75rem, 1.75vh, 2.5rem) 0;
  }

  /* Medium-large screens (1024px-1439px) */
  @media (min-width: 1024px) and (max-width: 1439px) {
    margin: clamp(0.5rem, 1.5vh, 2rem) 0;
  }

  /* Tablet (768px-1023px) */
  @media (max-width: 1023px) {
    flex: none;
    margin: 20px 0 25px 0;
  }

  @media (max-width: 768px) {
    margin: 20px 0 25px 0;
  }

  @media (max-width: 480px) {
    margin: 15px 0 20px 0;
  }

  @media (max-width: 375px) {
    margin: 10px 0 0 0;
  }
`;

export const ProductShowcaseContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    align-items: center;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

export const DesktopMockup = styled.div`
  position: relative;
  background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  width: 100%;

  /* Default responsive sizing */
  max-width: clamp(600px, 70vw, 1200px);
  transform: scale(clamp(0.8, 1vw, 1.2));

  /* Screen bezel */
  &::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    bottom: 24px;
    border: 1px solid #000;
    border-radius: 12px;
    background: #000;
    z-index: 1;
    pointer-events: none;
  }

  /* MacBook Pro notch */
  & > *:first-child::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 16px;
    background: #000;
    border-radius: 0 0 12px 12px;
    z-index: 10;
    box-shadow: inset 0 -1px 2px rgba(255, 255, 255, 0.05);
  }

  /* Screen content area */
  & > * {
    position: relative;
    z-index: 2;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  /* Ultra-wide and very large screens (2560px+) */
  @media (min-width: 2560px) {
    max-width: 1600px;
    transform: scale(1.5);
  }

  /* Ultra-wide and very large screens (2560px+) */
  @media (min-width: 2560px) {
    max-width: 1600px;
    transform: scale(1.5);
  }

  /* Ultra-wide screens with limited height (e.g., 2560×1080 monitors)
     The default 1.5 scale can cause the mockup to overlap other hero elements
     on monitors that are very wide but not proportionally tall. We reduce the
     scale slightly when the viewport height is under 1300 px to keep the
     layout balanced. */
  @media (min-width: 2560px) and (max-height: 1300px) {
    transform: scale(1.25);
  }

  /* Standard 27–32" 1440p ultra-wide (2560×1440) screens
     Height is larger than 1080 px but the 1.5 scale is still a bit too big.
     Dial the scale back to 1.3 to avoid any overlap while keeping the
     mockup prominent. */
  @media (min-width: 2560px) and (max-height: 1450px) {
    transform: scale(1.3);
  }

  /* Very large screens (1920px-2559px) */
  @media (min-width: 1920px) and (max-width: 2559px) {
    max-width: 1400px;
    transform: scale(1);
  }

  /* Large screens (1680px-1919px) */
  @media (min-width: 1680px) and (max-width: 1919px) {
    max-width: 1200px;
    transform: scale(1);
  }

  @media (min-width: 1440px) and (max-width: 1679px) {
    max-width: 1200px;
    transform: scale(0.9);
  }

  /* Medium-large screens (1024px-1439px) */
  @media (min-width: 1024px) and (max-width: 1439px) {
    max-width: 1200px !important;
    transform: scale(0.8) !important;
  }

  /* Tablet (768px-1023px) */
  @media (max-width: 1023px) and (min-width: 768px) {
    transform: scale(0.75);
    padding: 14px 14px 20px 14px;
    max-width: 850px;

    &::after {
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 16px;
    }

    & > *:first-child::before {
      width: 70px;
      height: 10px;
      top: -5px;
    }
  }

  /* Mobile (480px-767px) */
  @media (max-width: 767px) and (min-width: 480px) {
    transform: scale(1.05);
    max-width: 100vw;
    padding: 12px 12px 18px 12px;
    margin: 0 -15px;

    &::after {
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 14px;
    }

    & > *:first-child::before {
      width: 60px;
      height: 8px;
      top: -4px;
    }
  }

  /* Small mobile (375px-479px) */
  @media (max-width: 479px) and (min-width: 375px) {
    transform: scale(1);
    margin: 15px -10px;
    padding: 10px 10px 16px 10px;

    &::after {
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 12px;
    }

    & > *:first-child::before {
      width: 50px;
      height: 6px;
      top: -3px;
    }
  }

  /* Extra small mobile (320px-374px) */
  @media (max-width: 374px) {
    transform: scale(1.15);
    max-width: 100vw;
    padding: 12px 12px 18px 12px;
    margin: 0 -18px;

    &::after {
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 14px;
    }

    & > *:first-child::before {
      width: 60px;
      height: 8px;
      top: -4px;
    }
  }

  /* Height-based adjustments for better viewport fitting - Desktop only */
  @media (max-height: 900px) and (min-width: 1024px) {
    transform: scale(0.9);
    max-width: 900px;
  }

  @media (max-height: 800px) and (min-width: 1024px) {
    transform: scale(0.7);
    max-width: 800px;
  }

  @media (max-height: 700px) and (min-width: 1024px) {
    transform: scale(0.7);
    max-width: 880px;
  }

  @media (max-height: 600px) and (min-width: 1024px) {
    transform: scale(0.5);
    max-width: 600px;
  }

  /* Height constraints for very short viewports - Desktop only */
  @media (max-height: 600px) and (min-width: 1024px) {
    transform: scale(0.55);
  }

  @media (max-height: 500px) and (min-width: 1024px) {
    transform: scale(0.5);
  }

  /* Combined width + height constraints for problematic desktop screens only */
  @media (max-width: 1280px) and (max-height: 800px) and (min-width: 1024px) {
    transform: scale(0.7);
  }

  /* Further reduce mockup scale for ultra-wide displays with limited height */
  @media (min-width: 2560px) and (max-height: 1200px) {
    transform: scale(1.1);
  }

  /* Additional ultra-wide fine-tuning – favour width over height */
  /* 21:9 ratio around 2560×1080 – widen slightly, reduce height */
  @media (min-width: 2560px) and (max-height: 1150px) {
    transform: scaleX(0.8) scaleY(0.7);
  }

  /* 3440×1440 ultra-wide */
  @media (min-width: 3400px) and (max-height: 1600px) {
    transform: scaleX(1.3) scaleY(0.9);
  }

  /* 32:9 & wider (3840×1080, 5120×1440, etc.) */
  @media (min-width: 3800px) and (max-height: 1500px) {
    transform: scaleX(1.2) scaleY(1.1);
  }
`;

export const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    max-width: 700px;
  }
`;

// Trusted Section
export const TrustedSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #061830 0%, #043344 50%, #0f1419 100%);
  position: relative;
  overflow: hidden;
`;

export const TrustedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.08) 0%, transparent 60%),
    radial-gradient(circle at 80% 70%, rgba(32, 178, 170, 0.06) 0%, transparent 60%),
    radial-gradient(circle at 50% 50%, rgba(64, 224, 208, 0.04) 0%, transparent 80%);
  pointer-events: none;
`;

export const TrustedFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

export const TrustedFloatingElement = styled.div`
  position: absolute;
  width: ${({ type }) => (type === 'circle' ? '16px' : type === 'square' ? '14px' : '12px')};
  height: ${({ type }) => (type === 'circle' ? '16px' : type === 'square' ? '14px' : '12px')};
  background: rgba(64, 224, 208, 0.3);
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : type === 'square' ? '3px' : '0')};
  clip-path: ${({ type }) =>
    type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
  animation: ${float} ${({ position }) => 8 + (position % 4)}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  top: ${({ position }) => 15 + position * 7}%;
  left: ${({ position }) => 8 + position * 8}%;
  opacity: 0.6;

  @media (max-width: 768px) {
    display: ${({ position }) => (position > 6 ? 'none' : 'block')};
  }
`;

export const TrustedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 1.2s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const TrustedHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

export const TrustedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(26, 35, 50, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 50px;
  padding: 12px 24px;
  margin-bottom: 24px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TrustedBadgeIcon = styled.span`
  color: #40e0d0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
    filter: drop-shadow(0 0 6px rgba(64, 224, 208, 0.6));
  }
`;

export const TrustedTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const TrustedHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const TrustedSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;
export const TrustedShowcase = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 60px;
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    gap: 40px;
    margin-bottom: 40px;
  }
`;

export const TrustedMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

export const TrustedMetric = styled.div`
  background: rgba(26, 35, 50, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '-30px')});
  transition: all 0.8s ease;
  animation-delay: ${({ delay }) => delay};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
  }

  &:hover {
    transform: translateX(8px);
    border-color: rgba(64, 224, 208, 0.4);
    box-shadow: 0 8px 32px rgba(64, 224, 208, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;

    &:hover {
      transform: translateX(4px);
    }
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;

    &:hover {
      transform: translateX(2px);
    }
  }
`;

export const MetricIcon = styled.div`
  color: #40e0d0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.6));
  }
`;

export const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #40e0d0;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const MetricLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-bottom: 16px;
`;

export const MetricProgress = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(64, 224, 208, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

export const MetricProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #40e0d0, #20b2aa);
  border-radius: 2px;
  width: 0%;
  animation: ${progressFill} 2s ease-out;
  animation-delay: ${({ delay }) => delay};
  animation-fill-mode: forwards;
  --progress-width: ${({ width }) => width};
`;

export const TrustedLogos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TrustedLogosTitle = styled.h3`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 700;
  margin-bottom: 60px;
  text-align: center;
  letter-spacing: 0.025em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 48px;

    &::after {
      width: 60px;
      height: 2px;
      bottom: -16px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    margin-bottom: 36px;

    &::after {
      width: 50px;
      bottom: -12px;
    }
  }
`;

export const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  max-width: 900px;
  margin: 0 auto;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 36px;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 320px;
    padding: 0 10px;
  }

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 280px;
  }
`;

export const IntegrationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: transparent;
  border: none;
  border-radius: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  min-height: auto;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')})
    scale(${({ isVisible }) => (isVisible ? 1 : 0.8)});
  animation-delay: ${({ delay }) => delay};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);

    &::before {
      width: 200px;
      height: 200px;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    &:hover {
      transform: translateY(-4px) scale(1.03);

      &::before {
        width: 150px;
        height: 150px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 12px;

    &:hover {
      transform: translateY(-2px) scale(1.02);

      &::before {
        width: 120px;
        height: 120px;
      }
    }
  }
`;

export const IntegrationIcon = styled.div`
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  filter: brightness(1) saturate(0.8);

  svg {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
  }

  ${IntegrationItem}:hover & {
    transform: scale(1.1);
    filter: brightness(1.2) saturate(1.1);
    color: rgba(255, 255, 255, 1);

    svg {
      filter: drop-shadow(0 8px 24px rgba(64, 224, 208, 0.3))
        drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
    }
  }

  @media (max-width: 768px) {
    ${IntegrationItem}:hover & {
      transform: scale(1.08);
    }
  }

  @media (max-width: 480px) {
    ${IntegrationItem}:hover & {
      transform: scale(1.05);
    }
  }
`;

export const IntegrationName = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  margin-top: 12px;
  opacity: 0;

  ${IntegrationItem}:hover & {
    color: #40e0d0;
    transform: translateY(-2px);
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 6px;
  }
`;

export const IntegrationGlow = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(circle, rgba(64, 224, 208, 0.15) 0%, transparent 60%);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;

  ${IntegrationItem}:hover & {
    opacity: 1;
    transform: scale(1.2);
  }
`;

export const TrustedTestimonial = styled.div`
  display: flex;
  justify-content: center;
`;

export const TestimonialCard = styled.div`
  max-width: 800px;
  background: rgba(26, 35, 50, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease;
  animation-delay: ${({ delay }) => delay};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 20px;
    margin: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
    margin: 0 16px;
  }
`;

export const TestimonialQuote = styled.blockquote`
  font-size: 1.25rem;
  color: white;
  line-height: 1.6;
  margin-bottom: 32px;
  font-style: italic;
  position: relative;

  &::before {
    content: '"';
    font-size: 4rem;
    color: #40e0d0;
    position: absolute;
    top: -20px;
    left: -20px;
    font-family: serif;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 24px;
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const AuthorAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const AvatarImage = styled.div`
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
`;

export const AuthorInfo = styled.div`
  flex: 1;
`;

export const AuthorName = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`;

export const AuthorTitle = styled.div`
  font-size: 1rem;
  color: #40e0d0;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const AuthorCompany = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const TestimonialRating = styled.div`
  display: flex;
  gap: 4px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StarIcon = styled.span`
  color: #40e0d0;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
    filter: drop-shadow(0 0 4px rgba(64, 224, 208, 0.8));
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(64, 224, 208, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(32, 178, 170, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }

  /* Ultra-wide screens (e.g., 2560px & up) */
  @media (min-width: 2560px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: 1600px;
  }

  /* Super ultra-wide (≈3440px) */
  @media (min-width: 3440px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 40px;
    max-width: 2000px;
  }

  /* 4K ultra-wide (≈3840px) */
  @media (min-width: 3840px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 48px;
    max-width: 2400px;
  }

  /* Dual-wide / Super-ultra-wide (5120px+) */
  @media (min-width: 5120px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 60px;
    max-width: 2800px;
  }
`;

export const FeatureCard = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${({ delay }) => delay || '0s'};
  position: relative;
`;

export const FeatureBadge = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
`;

export const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #40e0d0, #008080);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto;
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
    border-radius: 16px;
    filter: blur(6px);
    opacity: 0.3;
    z-index: -1;
    transform: translateZ(0);
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0px;
  line-height: 1.2;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureSubtitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #40e0d0;
  margin-bottom: 6px;
  margin-top: 0px;
  line-height: 1.2;
`;

export const FeaturePreview = styled.div`
  background: #f7fafc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

export const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PreviewText = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
  line-height: 1.5;
`;

export const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 1.2s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const FeaturesHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

export const FeaturesTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 24px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const FeaturesHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const FeaturesSubtitle = styled.p`
  font-size: 1.25rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const FeatureCardGlow = styled.div`
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

  ${FeatureCard}:hover & {
    opacity: 0.2;
  }
`;

export const FeatureCardInner = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  position: relative;
  backdrop-filter: blur(20px);
  transition: transform 0.12s ease-out, border-color 0.12s ease-out, background-color 0.12s ease-out;
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

export const FeatureIconContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
  width: fit-content;
  align-self: center;
`;

export const FeatureIconGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(64, 224, 208, 0.3) 0%, transparent 70%);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${FeatureCard}:hover & {
    opacity: 1;
  }
`;

export const FeatureContent = styled.div`
  flex: 1;
  margin-bottom: 8px;
`;

export const FeatureDescription = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #666;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
`;

export const FeatureMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
`;

export const FeatureMetric = styled.div`
  text-align: left;
`;

export const FeatureMetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #40e0d0;
  margin-bottom: 4px;
`;

export const FeatureMetricLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
`;

export const FeatureArrow = styled.div`
  font-size: 1.5rem;
  color: #40e0d0;
  transition: transform 0.3s ease;

  ${FeatureCard}:hover & {
    transform: translateX(4px);
  }
`;

// Stats Section
export const StatsSection = styled.section`
  padding: 80px 0;
  background: #f7fafc;
`;

export const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '20px')});
  transition: all 0.8s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const StatsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 24px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* Ultra-wide screens (e.g., 2560px & up) */
  @media (min-width: 2560px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 64px;
    max-width: 1600px;
  }

  /* Super ultra-wide (≈3440px) */
  @media (min-width: 3440px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 80px;
    max-width: 2000px;
  }

  /* 4K ultra-wide (≈3840px) */
  @media (min-width: 3840px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 96px;
    max-width: 2400px;
  }

  /* Dual-wide / Super-ultra-wide (5120px+) */
  @media (min-width: 5120px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 120px;
    max-width: 2800px;
  }
`;

// Stats-specific styled components with centered icons and reduced padding
export const StatsCardInner = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  position: relative;
  backdrop-filter: blur(20px);
  transition: transform 0.12s ease-out, border-color 0.12s ease-out, background-color 0.12s ease-out;
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

export const StatsIconContainer = styled.div`
  position: relative;
  margin-bottom: 1px;
  width: fit-content;
  align-self: center;
`;

export const StatsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StatItem = styled.div`
  text-align: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 0.8s ease;
  animation-delay: ${({ delay }) => delay};
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.teal || '#008080'};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 600;
`;

export const StatsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

export const StatsHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatsSubtitle = styled.p`
  font-size: 1.125rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const StatCardGlow = styled.div`
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

  ${StatCard}:hover & {
    opacity: 0.2;
  }
`;

export const StatProgress = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(64, 224, 208, 0.1);
  border-radius: 2px;
  margin-top: 16px;
  overflow: hidden;
`;

export const StatProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #40e0d0, #20b2aa);
  border-radius: 2px;
  width: 0%;
  animation: ${progressFill} 2s ease-out;
  animation-delay: ${({ delay }) => delay};
  animation-fill-mode: forwards;
  --progress-width: 100%;
`;

export const StatsFooter = styled.div`
  text-align: center;
  margin-top: 80px;
  padding: 40px;
  background: rgba(26, 35, 50, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(64, 224, 208, 0.1);

  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 32px;
  }
`;

export const StatsFooterText = styled.blockquote`
  font-size: 1.25rem;
  font-style: italic;
  color: #2d3748;
  margin-bottom: 24px;
  line-height: 1.6;
  position: relative;

  &::before {
    content: '"';
    font-size: 3rem;
    color: #40e0d0;
    position: absolute;
    top: -10px;
    left: -20px;
    font-family: serif;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const StatsFooterAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
export const StatsAuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;

  &::before {
    content: 'SC';
  }
`;

export const StatsAuthorInfo = styled.div`
  text-align: left;
`;

export const StatsAuthorName = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
`;

export const StatsAuthorTitle = styled.div`
  font-size: 0.875rem;
  color: #718096;
`;

// CTA Section
export const CTASection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2d3e50 100%);
  position: relative;
  overflow: hidden;
  text-align: center;
`;

export const CTABackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 25% 25%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(32, 178, 170, 0.1) 0%, transparent 50%);
  pointer-events: none;
`;

export const CTAFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export const CTAFloatingElement = styled.div`
  position: absolute;
  width: ${({ position }) => (position % 2 === 0 ? '20px' : '12px')};
  height: ${({ position }) => (position % 2 === 0 ? '20px' : '12px')};
  background: rgba(64, 224, 208, 0.3);
  border-radius: 50%;
  animation: ${float} ${({ position }) => 6 + (position % 3)}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  top: ${({ position }) => 10 + position * 12}%;
  left: ${({ position }) => 5 + position * 11}%;

  @media (max-width: 768px) {
    display: ${({ position }) => (position > 4 ? 'none' : 'block')};
  }
`;

export const CTAContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 1s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const CTAContent = styled.div`
  background: rgba(26, 35, 50, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 24px;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const CTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CTAHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const CTASubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 32px;
  }
`;

export const CTAFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
`;

export const CTAFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CTAFeatureIcon = styled.span`
  color: #40e0d0;
  font-weight: 600;
`;

export const CTAFeatureText = styled.span`
  white-space: nowrap;
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const ButtonIcon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    transition: all 0.3s ease;
  }

  ${PrimaryButton}:hover & {
    transform: translateY(2px);

    svg {
      transform: scale(1.1);
    }
  }
`;

export const CTATrust = styled.div`
  text-align: center;
`;

export const CTATrustText = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const CTATrustLogos = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  align-items: center;
  justify-items: center;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 600px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 360px;
  }
`;

export const CTATrustLogo = styled.div`
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(10px) scale(0.9);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${({ delay }) => delay};
  padding: 8px;
  border-radius: 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%);
    border-radius: 8px;
    opacity: 0;
    transition: all 0.4s ease;
  }

  &:hover {
    color: #40e0d0;
    transform: translateY(-4px) scale(1.05);
    filter: brightness(1.2) saturate(1.1);

    &::before {
      opacity: 1;
    }

    svg {
      filter: drop-shadow(0 4px 12px rgba(64, 224, 208, 0.3));
    }
  }

  svg {
    transition: all 0.4s ease;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 768px) {
    padding: 6px;

    &:hover {
      transform: translateY(-2px) scale(1.03);
    }
  }

  @media (max-width: 480px) {
    padding: 4px;

    &:hover {
      transform: translateY(-1px) scale(1.02);
    }
  }
`;
