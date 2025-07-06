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

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
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

const colorWave = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Advanced Keyframe Animations - inspired by Sentinel
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

const modernGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
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

const livePulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const chartAnimation = keyframes`
  0% {
    clip-path: polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 100%, 0% 60%, 15% 45%, 30% 55%, 45% 35%, 60% 40%, 75% 25%, 90% 30%, 100% 20%, 100% 100%);
  }
`;

const drawLine = keyframes`
  0% {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const pointAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Main Container
export const Container = styled.div`
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  position: relative;
`;

// Hero Section
export const HeroSection = styled.section`
  padding: 40px 0 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
  will-change: auto;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: visible;
  width: 100%;

  /* Add subtle grid pattern background like NewHome */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
    z-index: -1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 15px 0 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: visible;
  }

  @media (max-width: 480px) {
    padding: 10px 0 0;
    min-height: 100vh;
  }

  @media (max-width: 320px) {
    padding: 8px 0 0;
  }
`;

export const HeroContent = styled.div`
  max-width: 900px;
  text-align: center;
  opacity: 1;
  transform: translateY(0);
  transition: all 1s ease;
  will-change: auto;
`;

// Centered Hero Container - matching NewHome layout
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

  @media (max-width: 768px) {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    gap: 8px;
  }

  @media (max-width: 320px) {
    padding: 0 12px;
    gap: 6px;
  }
`;

export const CenteredHeroContent = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease;
  margin-bottom: 0px;
  flex-shrink: 0; /* Prevent content from shrinking */

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 0px; /* Remove bottom margin to save space */
  }

  @media (max-width: 480px) {
    margin-bottom: 0px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
    gap: 18px;
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
    gap: 12px;
    margin-bottom: 12px;
    position: relative;
    top: 0;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    gap: 8px;
    flex-direction: column;
    margin-bottom: 8px;
    line-height: 1.1;
  }

  @media (max-width: 320px) {
    font-size: 1.8rem;
    gap: 6px;
    margin-bottom: 6px;
  }
`;

// New styled components for the logo and colored text
export const HeroLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  filter: drop-shadow(0 8px 32px rgba(64, 224, 208, 0.3));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 12px 48px rgba(64, 224, 208, 0.4));
  }

  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 480px) {
    &:hover {
      transform: none;
    }
  }
`;

export const HeroLogoSVG = styled.svg`
  width: 80px;
  height: 55px;

  .st0 {
    fill: #008080;
  }

  .st1 {
    fill: #f84960;
  }

  .st2 {
    fill: #bcddde;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 41px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 34px;
  }
`;

export const HeroBrandText = styled.div`
  color: #40e0d0;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 16px rgba(64, 224, 208, 0.4);
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @supports not (-webkit-background-clip: text) {
    color: #40e0d0;
  }

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }

  @media (max-width: 320px) {
    font-size: 2rem;
  }
`;

export const HeroColoredText = styled.span`
  color: #f64673;
  background: linear-gradient(135deg, #f64673, #f84960);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @supports not (-webkit-background-clip: text) {
    color: #f64673;
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #bcddde;
  margin-bottom: 20px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 6px;
    line-height: 1.3;
  }

  @media (max-width: 320px) {
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 32px;
  }
`;

export const HeroActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto 80px;
  padding: 0 40px;
  position: relative;
  z-index: 2;
  flex-shrink: 0; /* Prevent container from shrinking */

  @media (max-width: 768px) {
    margin: 8px auto 20px; /* Reduce margins significantly */
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    margin: 6px auto 15px;
    padding: 0 16px;
  }

  @media (max-width: 320px) {
    margin: 4px auto 10px;
    padding: 0 12px;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: opacity 1s ease 0.8s, transform 1s ease 0.8s;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }

  @media (max-width: 320px) {
    gap: 6px;
  }
`;

export const HeroPrimaryButton = styled.button`
  background: linear-gradient(135deg, #008080 0%, #f84960 100%);
  background-size: 200% 200%;
  color: white;
  border: none;
  padding: 18px 36px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0, 128, 128, 0.4);
  will-change: transform, box-shadow;
  min-height: 56px;

  /* Only animate on devices that can handle it smoothly */
  @media (hover: hover) and (pointer: fine) {
    animation: ${colorWave} 3s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 48px rgba(0, 128, 128, 0.6);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 0.95rem;
    width: 100%;
    max-width: 280px;
    min-height: 44px;
    /* Disable animation on mobile for better performance */
    animation: none;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    gap: 6px;
    min-height: 40px;
    max-width: 260px;
  }

  @media (max-width: 320px) {
    padding: 8px 16px;
    font-size: 0.85rem;
    min-height: 36px;
    max-width: 240px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

export const HeroSecondaryButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 56px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.95rem;
    width: 100%;
    max-width: 280px;
    min-height: 44px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
    gap: 6px;
    min-height: 40px;
    max-width: 260px;
  }

  @media (max-width: 320px) {
    padding: 6px 12px;
    font-size: 0.85rem;
    min-height: 36px;
    max-width: 240px;
  }
`;

// Stats Section
export const StatsSection = styled.section`
  padding: 40px 40px 50px; /* Reduced spacing significantly */
  background: rgba(15, 32, 39, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '50px')});
  transition: all 1s ease;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 30px 20px 40px; /* Reduced for mobile */
  }

  @media (max-width: 480px) {
    padding: 20px 16px 30px;
  }
`;

export const StatsContainer = styled.div`
  margin-left: calc(-50vw + 50%);
  position: relative;
  padding: 60px 40px 80px;
  background: linear-gradient(
    135deg,
    rgba(15, 32, 39, 0.95) 0%,
    rgba(23, 37, 42, 0.9) 50%,
    rgba(15, 32, 39, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow-x: hidden;

  /* Inner content container */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.6;
    z-index: -1;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    padding: 50px 20px 60px;
  }

  @media (max-width: 768px) {
    padding: 40px 15px 50px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px 40px;
  }
`;

// Stats Content Wrapper for layout control
export const StatsContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    align-items: stretch;
  }
`;

// Carousel Container
export const StatsCarousel = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1; /* Take remaining space */
  margin: 0;
  width: 100%;
  max-width: 100%;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }

  @media (max-width: 768px) {
    /* Ensure carousel takes full width on mobile */
    width: 100%;
    overflow-x: hidden;
    padding: 0;
  }

  @media (max-width: 580px) {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    /* Ensure the carousel container doesn't constrain card width */
    min-width: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    min-width: 0;
  }
`;

export const StatsCarouselTrack = styled.div`
  display: flex;
  transition: ${({ isTransitioning }) =>
    isTransitioning ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
  transform: translateX(${({ translateX }) => translateX}%);
  gap: 16px; /* Slightly reduced gap for better fit */
  padding: 0px 5px; /* Reduced padding */
  will-change: transform;
  align-items: stretch;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 0 2px;
  }

  @media (max-width: 580px) {
    gap: 0; /* Remove gap for full width cards */
    padding: 0;
    justify-content: flex-start;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    gap: 0; /* Remove gap on mobile for full width cards */
    padding: 0;
    justify-content: flex-start;
    align-items: stretch;
  }
`;

export const StatsCarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px; /* Slightly increased for better spacing */

  @media (max-width: 768px) {
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 16px;
  }
`;
export const CarouselDots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CarouselDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? 'rgba(0, 128, 128, 1)' : 'rgba(255, 255, 255, 0.3)')};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: rgba(0, 128, 128, 0.2);
    transform: scale(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${({ active }) => (active ? 'rgba(0, 128, 128, 1)' : 'rgba(255, 255, 255, 0.6)')};
    transform: scale(1.3);

    &:before {
      transform: scale(2);
    }
  }

  ${({ active }) =>
    active &&
    `
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(0, 128, 128, 0.5);
  `}

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;

    &:hover {
      transform: scale(1.2);
    }

    ${({ active }) =>
      active &&
      `
      transform: scale(1.15);
    `}
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;

    /* Larger touch targets for mobile */
    &:hover {
      transform: scale(1.1);
    }

    ${({ active }) =>
      active &&
      `
      transform: scale(1.1);
    `}
  }
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px 20px; /* Reduced padding */
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeInUp} 0.6s ease ${({ index }) => index * 0.1}s both;
  display: flex;
  flex-direction: column;
  height: 310px; /* Reduced height */
  justify-content: space-between;
  flex: 0 0 calc(33.333% - 12px); /* Adjusted for reduced gap */
  min-width: 240px; /* Slightly reduced minimum width */
  opacity: 0.85;
  transform: scale(0.98);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 128, 128, 0.4);
    box-shadow: 0 15px 50px rgba(0, 128, 128, 0.15);
    opacity: 1;
  }

  /* Enhanced entry animation */
  &[data-animate] {
    opacity: 1;
    transform: scale(1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 1024px) {
    height: 280px;
    flex: 0 0 calc(50% - 8px);
    min-width: 220px;
  }

  @media (max-width: 768px) {
    padding: 20px 16px; /* Further reduced for mobile */
    height: 260px; /* Reduced for mobile */
    flex: 0 0 calc(50% - 6px); /* Show 2 cards on tablet */
    min-width: 180px;

    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }

  @media (max-width: 580px) {
    flex: 0 0 100%; /* Full width card on small tablets */
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    flex: 0 0 100%; /* Show 1 card on mobile taking full width */
    height: auto;
    min-height: 240px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 20px 16px;
    border-radius: 12px;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;

    &:hover {
      transform: translateY(-2px) scale(1.005);
    }
  }

  @media (max-width: 360px) {
    flex: 0 0 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 18px 14px;
    min-height: 220px;
    box-sizing: border-box;
  }
`;

export const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #008080, #f84960);
  border-radius: 50%;
  margin: 0 auto 20px;
  color: white;
  flex-shrink: 0; /* Prevent icon from shrinking */
  aspect-ratio: 1; /* Ensure perfect circle */

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
  }
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1;
  flex-shrink: 0; /* Prevent shrinking */

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #bcddde;
  margin-bottom: 4px;
  min-height: 48px; /* Fixed height for alignment */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-height: 44px;
  }

  @media (max-width: 580px) {
    font-size: 1rem;
    min-height: auto;
    line-height: 1.3;
    padding: 0 4px;
  }

  @media (max-width: 480px) {
    min-height: auto; /* Allow natural height on very small screens */
    font-size: 1rem;
    line-height: 1.3;
    padding: 0 8px;
  }
`;

export const StatDescription = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
  min-height: 40px; /* Fixed height for alignment */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.3;
  flex: 1; /* Take up available space */
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    min-height: 36px;
  }

  @media (max-width: 580px) {
    min-height: auto;
    flex: none;
    font-size: 0.9rem;
    line-height: 1.4;
    padding: 0 4px;
  }

  @media (max-width: 480px) {
    min-height: auto; /* Allow natural height on very small screens */
    flex: none;
    font-size: 0.9rem;
    line-height: 1.4;
    padding: 0 8px;
  }
`;

export const StatGrowth = styled.div`
  font-size: 1.125rem; /* Increased from 0.875rem */
  font-weight: 700; /* Increased from 600 for more emphasis */
  color: ${({ positive }) => (positive ? '#10B981' : '#EF4444')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0; /* Prevent shrinking */
  margin-top: auto; /* Push to bottom */

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 120px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

export const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  margin-bottom: ${({ center }) => (center ? '80px' : '0')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease;
  position: relative;
  z-index: 3;
  width: 100%;

  ${({ center }) =>
    center
      ? css`
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 800px;
        `
      : css`
          flex: 0 0 280px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}

  @media (max-width: 1024px) {
    text-align: center;
    flex: none;
    margin-bottom: ${({ center }) => (center ? '60px' : '0')};
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: ${({ center }) => (center ? '0' : '16px')};
    flex: none;
    margin-bottom: ${({ center }) => (center ? '40px' : '0')};
  }

  @media (max-width: 480px) {
    flex: none;
    margin-bottom: ${({ center }) => (center ? '30px' : '0')};
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
  }
`;

// Removed original SectionTitle - using enhanced version below

export const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Trust Indicators Components
export const TrustIndicators = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  color: #bcddde;
  font-size: 1.125rem;
  margin: 0;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    gap: 16px;
    font-size: 1rem;
  }

  @media (max-width: 580px) {
    gap: 14px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    align-items: center;
    font-size: 0.9rem;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.85rem;
    gap: 4px;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  position: relative;
  backdrop-filter: blur(10px);

  /* Optimize for performance */
  contain: layout style paint;
  isolation: isolate;

  /* Separate initial animation from hover */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '50px')});
  transition: opacity 1s ease ${({ index }) => index * 0.1}s,
    transform 1s ease ${({ index }) => index * 0.1}s;

  /* Hover optimizations - use transform3d for hardware acceleration */
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  /* Pre-create hover layer */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 128, 128, 0.2);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
    z-index: -1;
    will-change: opacity;
  }

  /* Simple, fast hover effect */
  &:hover {
    transform: ${({ isVisible }) =>
      isVisible ? 'translate3d(0, -8px, 0)' : 'translate3d(0, 42px, 0)'};
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
      opacity: 1;
    }
  }

  /* Override hover behavior after initial animation completes */
  &.animation-complete {
    &:hover {
      transform: translate3d(0, -8px, 0);
    }
  }

  @media (max-width: 768px) {
    padding: 24px;

    &:hover {
      transform: ${({ isVisible }) =>
        isVisible ? 'translate3d(0, -4px, 0)' : 'translate3d(0, 46px, 0)'};
    }

    &.animation-complete {
      &:hover {
        transform: translate3d(0, -4px, 0);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

export const FeatureBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ type }) => {
    switch (type) {
      case 'new':
        return css`
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        `;
      case 'popular':
        return css`
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        `;
      default:
        return css`
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        `;
    }
  }}
`;

export const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #008080, #f84960);
  border-radius: 16px;
  margin-bottom: 24px;
  color: white;

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    margin-bottom: 20px;
  }
`;

export const FeatureContent = styled.div`
  flex: 1;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const FeatureSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #bcddde;
  margin-bottom: 12px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

// CTA Section
export const CTASection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease 0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(64, 224, 208, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const CTAContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px 40px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const CTADescription = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 32px;
  }
`;

export const CTAActions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CTAPrimaryButton = styled.button`
  background: linear-gradient(135deg, #008080 0%, #f84960 100%);
  background-size: 200% 200%;
  animation: ${colorWave} 3s ease-in-out infinite;
  color: white;
  border: none;
  padding: 18px 36px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0, 128, 128, 0.4);

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 48px rgba(0, 128, 128, 0.6);
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 1rem;
    width: 100%;
  }
`;

export const CTASecondaryButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
    width: 100%;
  }
`;

// Common section components with advanced styling
export const SectionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(64, 224, 208, 0.1);
  color: #40e0d0;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(64, 224, 208, 0.3);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -200%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.2), transparent);
    animation: ${shimmer} 3s infinite;
  }
`;

export const BadgeIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 8px rgba(64, 224, 208, 0.12);
  filter: drop-shadow(0 0 4px currentColor);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(64, 224, 208, 0.2);
    border-color: rgba(64, 224, 208, 0.4);
  }
`;

// SectionTitle - updated to match Sentinel patterns
export const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ lightBackground }) => (lightBackground ? '#1a202c' : '#ffffff')};
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 1024px) {
    font-size: 42px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 20px;
  }

  @media (max-width: 580px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 16px;
  }

  @media (max-width: 360px) {
    font-size: 24px;
  }
`;

export const SectionHighlight = styled.span`
  background: linear-gradient(135deg, #40e0d0, #00bcd4, #26c6da);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${colorWave} 4s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.3));
`;

export const SectionDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: ${({ lightBackground }) =>
    lightBackground ? 'rgba(26, 32, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  margin: 0;
  max-width: 800px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

// Dashboard Section - Completely Redesigned
export const DashboardSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1a1a1a 25%,
    #0f1419 50%,
    #1a1a1a 75%,
    #0a0a0a 100%
  );

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(0, 128, 128, 0.12) 0%, transparent 50%),
      linear-gradient(135deg, rgba(32, 178, 170, 0.08) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const DashboardHeaderPreview = styled.div`
  width: 100%;
  height: 95%;
  border-radius: 20px;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  margin: 0 auto 0px auto;
  max-width: 1400px;
  border: 3px solid rgba(64, 224, 208, 0.5);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(64, 224, 208, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.02) 0%,
      rgba(0, 128, 128, 0.01) 50%,
      transparent 100%
    );
    border-radius: 17px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 20, 25, 0.03);
    border-radius: 17px;
    backdrop-filter: blur(0.1px);
  }

  @media (max-width: 1200px) {
    height: 350px;
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    height: 250px;
    border-radius: 16px;
    margin-bottom: 0px;
  }

  @media (max-width: 480px) {
    height: 200px;
    border-radius: 12px;
  }

  @media (max-width: 320px) {
    border-radius: 10px;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

export const DashboardMain = styled.div`
  position: relative;
`;

export const DashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
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
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  ${({ isHovered }) =>
    isHovered &&
    css`
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(64, 224, 208, 0.3);
      transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(64, 224, 208, 0.15);
    `}
`;

export const DashboardPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${({ isVisible }) => (isVisible ? '0.95' : '0')};
  transform: ${({ isVisible }) =>
    isVisible ? 'scale(1) translateZ(0)' : 'scale(1.05) translateZ(0)'};
  transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 10;
  pointer-events: none;
  overflow: hidden;
  border: 4px solid rgba(64, 224, 208, 0.6);
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(64, 224, 208, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 0 80px rgba(64, 224, 208, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.03) 0%,
      rgba(0, 128, 128, 0.01) 50%,
      transparent 100%
    );
    border-radius: 16px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 20, 25, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(0.2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DashboardCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const DashboardTitle = styled.h3`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(16, 185, 129, 0.3);
`;

export const LivePulse = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: ${livePulse} 2s infinite;
  box-shadow: 0 0 8px #10b981;
`;

export const DashboardMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const MetricIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 12px rgba(64, 224, 208, 0.12);
  padding: 8px;
  overflow: hidden;
  filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.3));
`;

export const MetricLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

export const MetricValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ positive }) => (positive ? '#10b981' : '#f87171')};

  svg {
    filter: drop-shadow(0 0 4px currentColor);
  }
`;

export const DashboardChart = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

export const ChartLegend = styled.div`
  display: flex;
  gap: 16px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

export const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0 0 4px ${({ color }) => color};
`;

export const ChartArea = styled.div`
  height: 200px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.05), rgba(30, 64, 175, 0.05));
`;

export const ChartLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #40e0d0 0%, #1e40af 100%);
  opacity: 0.8;
  clip-path: polygon(
    0% 100%,
    0% 60%,
    15% 45%,
    30% 55%,
    45% 35%,
    60% 40%,
    75% 25%,
    90% 30%,
    100% 20%,
    100% 100%
  );
  animation: ${chartAnimation} 2s ease-out;
`;

export const ChartGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.3) 0%, transparent 70%);
  clip-path: polygon(
    0% 100%,
    0% 60%,
    15% 45%,
    30% 55%,
    45% 35%,
    60% 40%,
    75% 25%,
    90% 30%,
    100% 20%,
    100% 100%
  );
  animation: ${chartAnimation} 2s ease-out 0.2s both;
`;

export const DashboardSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DashboardFeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateX(4px);
  }
`;

export const FeatureCardIcon = styled.div`
  color: #40e0d0;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(64, 224, 208, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(64, 224, 208, 0.2);
  width: fit-content;
  filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.3));
`;

export const CircularFeatureCardIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  margin-bottom: 16px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 12px rgba(64, 224, 208, 0.12);
  padding: 8px;
  overflow: hidden;
  filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.3));
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(64, 224, 208, 0.2);
    border-color: rgba(64, 224, 208, 0.4);
  }
`;

export const FeatureCardContent = styled.div`
  color: #ffffff;
`;

export const FeatureCardTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const FeatureCardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

// Load Management Section - Completely Redesigned
export const LoadManagementSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="load-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23load-grid)"/></svg>');
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const LoadManagementHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const LoadManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const LoadStatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const LoadStatCard = styled.div`
  background: rgba(15, 32, 39, 0.85); /* darker glassy */
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
  border: 1.5px solid rgba(64, 224, 208, 0.13);
  color: #fff;
  transition: all 0.3s ease;
  backdrop-filter: blur(14px);

  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.28);
    border-color: rgba(0, 128, 128, 0.4);
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const LoadStatIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 12px rgba(64, 224, 208, 0.12);
  padding: 8px;
  overflow: hidden;
`;

export const LoadStatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LoadStatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #40e0d0;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const LoadStatLabel = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

export const LoadStatTrend = styled.div`
  font-size: 14px;
  color: ${({ positive }) => (positive ? '#10b981' : '#f87171')};
  font-weight: 600;
  filter: drop-shadow(0 0 4px currentColor);
`;

export const LoadFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const LoadFeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #40e0d0, transparent);
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  ${({ isHovered }) =>
    isHovered &&
    css`
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(64, 224, 208, 0.3);
      transform: translateY(-8px);
      box-shadow: 0 25px 50px rgba(64, 224, 208, 0.15);
    `}
`;

export const LoadFeatureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const LoadFeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 8px rgba(64, 224, 208, 0.1);
`;

export const LoadFeatureBadge = styled.div`
  background: rgba(64, 224, 208, 0.15);
  color: #40e0d0;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid rgba(64, 224, 208, 0.3);
  backdrop-filter: blur(10px);
`;

export const LoadFeatureContent = styled.div`
  margin-bottom: 24px;
`;

export const LoadFeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const LoadFeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const LoadFeatureDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LoadFeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;

  svg {
    color: #10b981;
    flex-shrink: 0;
    filter: drop-shadow(0 0 4px currentColor);
  }
`;

export const LoadFeatureMetric = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(64, 224, 208, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(64, 224, 208, 0.1);
`;

// Driver Portal Section - Completely Redesigned
export const DriverPortalSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="driver-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(100,116,139,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23driver-grid)"/></svg>');
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const DriverPortalLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 80px;
  align-items: center;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

export const DriverPortalContent = styled.div`
  color: #ffffff;
`;

export const DriverPortalStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const DriverStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateY(-4px);
  }
`;

export const DriverStatIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  margin-bottom: 0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 12px rgba(64, 224, 208, 0.12);
  padding: 8px;
  overflow: hidden;
`;

export const DriverStatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DriverStatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const DriverStatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

export const DriverFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DriverFeature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(64, 224, 208, 0.2);
    transform: translateX(4px);
  }
`;

export const DriverFeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border-radius: 50%;
  border: 2px solid rgba(64, 224, 208, 0.22);
  box-shadow: 0 2px 8px rgba(64, 224, 208, 0.1);
`;

export const DriverFeatureContent = styled.div`
  flex: 1;
`;

export const DriverFeatureTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const DriverFeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

export const DriverPortalVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1200px) {
    justify-self: center;
  }
`;

export const MobilePreview = styled.div`
  width: 340px;
  height: 700px;
  background: linear-gradient(135deg, #23272f 0%, #181a20 100%);
  border-radius: 48px;
  padding: 24px;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), 0 2px 16px rgba(64, 224, 208, 0.08);
  border: 6px solid #22272e;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  &::before {
    /* iPhone 16 Dynamic Island */
    content: '';
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    height: 18px;
    background: #111;
    border-radius: 12px;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
    opacity: 0.92;
  }

  &::after {
    /* Subtle inner border for glass effect */
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 44px;
    border: 2px solid rgba(255, 255, 255, 0.07);
    pointer-events: none;
    z-index: 1;
  }
`;

export const MobileScreen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #181a20 0%, #23272f 100%);
  border-radius: 40px;
  padding: 24px 18px 18px 18px;
  color: #ffffff;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: flex;
  flex-direction: column;
  /* Hide scrollbar for a more app-like look */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MobileHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MobileHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MobileTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const MobileNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(248, 113, 113, 0.1);
  color: #f87171;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 12px;
  border: 1px solid rgba(248, 113, 113, 0.3);
`;

export const NotificationDot = styled.div`
  width: 6px;
  height: 6px;
  background: #f87171;
  border-radius: 50%;
  animation: ${livePulse} 2s infinite;
`;

export const MobileStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const MobileStatCard = styled.div`
  background: ${({ primary }) =>
    primary
      ? 'linear-gradient(135deg, rgba(64, 224, 208, 0.15), rgba(64, 224, 208, 0.05))'
      : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ primary }) => (primary ? 'rgba(64, 224, 208, 0.3)' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ primary }) =>
      primary
        ? 'linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(64, 224, 208, 0.1))'
        : 'rgba(255, 255, 255, 0.08)'};
    transform: translateY(-2px);
  }
`;

export const MobileStatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 500;
`;

export const MobileStatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const MobileStatTrend = styled.div`
  font-size: 12px;
  color: ${({ positive }) => (positive ? '#10b981' : '#f87171')};
  font-weight: 600;
`;

export const MobileActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const MobileActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 12px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(64, 224, 208, 0.15);
    border-color: rgba(64, 224, 208, 0.5);
    transform: translateY(-2px);
  }

  svg {
    color: #40e0d0;
    filter: drop-shadow(0 0 4px currentColor);
  }

  span {
    text-align: center;
    line-height: 1.2;
  }
`;

// Maintenance Section Components
export const MaintenanceSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(64, 224, 208, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const MaintenanceLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

export const MaintenanceContent = styled.div`
  max-width: 500px;
`;

export const MaintenanceMetrics = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const MaintenanceMetric = styled.div`
  text-align: center;
`;

export const MetricNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #40e0d0;
  margin-bottom: 8px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const MetricDescription = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.4;
`;

export const MaintenanceFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const MaintenanceFeature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateY(-4px);
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 8px 0;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin: 0;
    line-height: 1.5;
  }
`;

export const MaintenanceFeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(64, 224, 208, 0.1));
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  flex-shrink: 0;
`;

// Enhanced Financial Section Components
export const FinancialSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1a1a1a 25%,
    #0f1419 50%,
    #1a1a1a 75%,
    #0a0a0a 100%
  );
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(0, 128, 128, 0.12) 0%, transparent 50%),
      linear-gradient(135deg, rgba(32, 178, 170, 0.08) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }
`;

export const FinancialFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export const FinancialParticle = styled.div`
  position: absolute;
  animation: ${quantumFloat}
    ${({ speed = 'medium' }) => (speed === 'slow' ? '12s' : speed === 'fast' ? '6s' : '9s')}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;

  width: ${({ size = 'medium' }) =>
    size === 'large' ? '18px' : size === 'small' ? '10px' : '14px'};
  height: ${({ size = 'medium' }) =>
    size === 'large' ? '18px' : size === 'small' ? '10px' : '14px'};

  ${({ type, position }) => {
    const positions = [
      { top: '12%', left: '8%' },
      { top: '25%', right: '15%' },
      { top: '40%', left: '5%' },
      { top: '55%', right: '10%' },
      { top: '70%', left: '12%' },
      { top: '85%', right: '18%' },
      { top: '30%', left: '50%' },
      { top: '60%', right: '45%' },
    ];

    const pos = positions[position % positions.length];

    if (type === 'dollar') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        &::before {
          content: '$';
          font-size: 16px;
          font-weight: bold;
          color: rgba(64, 224, 208, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      `;
    }
    if (type === 'circle') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        background: linear-gradient(135deg, #008080, #40e0d0);
        border-radius: 50%;
        opacity: 0.4;
      `;
    }
    return css`
      top: ${pos.top};
      ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
      background: linear-gradient(135deg, #f84960, #ff6b8a);
      border-radius: 2px;
      opacity: 0.3;
      transform: rotate(45deg);
    `;
  }}
`;

export const FinancialGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  margin-top: 60px;
  position: relative;
  z-index: 1;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FinancialCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  will-change: transform, background-color, border-color, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

  ${({ primary }) =>
    primary &&
    css`
      grid-row: span 2;
      background: linear-gradient(135deg, rgba(64, 224, 208, 0.15), rgba(0, 128, 128, 0.1));
      border: 1px solid rgba(64, 224, 208, 0.3);

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(64, 224, 208, 0.05), transparent);
        border-radius: 24px;
        pointer-events: none;
      }
    `}

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(64, 224, 208, 0.5);
    transform: translateY(-12px) translateZ(0);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(64, 224, 208, 0.2);

    ${({ primary }) =>
      primary &&
      css`
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(64, 224, 208, 0.3);
      `}
  }

  // Shimmer effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

export const FinancialCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  svg {
    color: #40e0d0;
    filter: drop-shadow(0 0 8px currentColor);
  }
`;

export const FinancialCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const FinancialCardContent = styled.div`
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
`;

export const FinancialFeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin-bottom: 12px;
    padding-left: 20px;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #40e0d0;
      font-weight: bold;
    }
  }
`;

// Enhanced Integration Section Components
export const IntegrationSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/></pattern></defs><rect width='100' height='100' fill='url(%23grid)'/></svg>");
    opacity: 0.3;
    z-index: -1;
    pointer-events: none;
  }
`;

export const IntegrationFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const IntegrationParticle = styled.div`
  position: absolute;
  animation: ${quantumFloat}
    ${({ speed = 'medium' }) => (speed === 'slow' ? '10s' : speed === 'fast' ? '5s' : '7s')}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  will-change: transform;
  backface-visibility: hidden;

  width: ${({ size = 'medium' }) =>
    size === 'large' ? '16px' : size === 'small' ? '8px' : '12px'};
  height: ${({ size = 'medium' }) =>
    size === 'large' ? '16px' : size === 'small' ? '8px' : '12px'};

  ${({ type, position }) => {
    const positions = [
      { top: '15%', left: '10%' },
      { top: '20%', right: '12%' },
      { top: '45%', left: '8%' },
      { top: '60%', right: '15%' },
      { top: '75%', left: '18%' },
      { top: '35%', left: '50%' },
    ];

    const pos = positions[position % positions.length];

    if (type === 'network') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        &::before {
          content: '⚡';
          font-size: 14px;
          color: rgba(64, 224, 208, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      `;
    }
    if (type === 'circle') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        background: linear-gradient(135deg, #008080, #40e0d0);
        border-radius: 50%;
        opacity: 0.4;
      `;
    }
    return css`
      top: ${pos.top};
      ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
      background: linear-gradient(135deg, #4ade80, #10b981);
      border-radius: 2px;
      opacity: 0.3;
    `;
  }}
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

export const IntegrationContent = styled.div`
  max-width: 500px;
  position: relative;
`;

export const IntegrationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
`;

export const IntegrationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  will-change: transform, background-color, border-color, box-shadow;
  transform: translateZ(0);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(64, 224, 208, 0.4);
    transform: translateX(12px) translateZ(0);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(64, 224, 208, 0.2);
  }

  // Enhanced shimmer effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  svg {
    color: #40e0d0;
    margin-top: 2px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 4px rgba(64, 224, 208, 0.3));
    transition: filter 0.3s ease;
  }

  &:hover svg {
    filter: drop-shadow(0 0 8px rgba(64, 224, 208, 0.5));
  }

  strong {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin: 0;
    line-height: 1.5;
  }
`;

export const IntegrationVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 400px;
`;

export const IntegrationDiagram = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

export const CentralNode = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(64, 224, 208, 0.1));
  border: 2px solid rgba(64, 224, 208, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  z-index: 2;
  animation: ${modernGlow} 3s ease-in-out infinite;
`;

export const IntegrationNode = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  padding: 8px;
  line-height: 1.2;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-120px)
    rotate(calc(-1 * var(--angle)));

  transition: all 0.3s ease;
  animation: ${quantumFloat} 15s ease-in-out infinite;

  &:hover {
    background: rgba(64, 224, 208, 0.2);
    border-color: rgba(64, 224, 208, 0.5);
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-130px)
      rotate(calc(-1 * var(--angle))) scale(1.1);
  }
`;

// Enhanced Security Section Components
export const SecuritySection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 30%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(0, 128, 128, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(32, 178, 170, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

export const SecurityFloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const SecurityParticle = styled.div`
  position: absolute;
  animation: ${quantumFloat}
    ${({ speed = 'medium' }) => (speed === 'slow' ? '11s' : speed === 'fast' ? '6s' : '8s')}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  will-change: transform;
  opacity: 0.6;

  width: ${({ size = 'medium' }) =>
    size === 'large' ? '20px' : size === 'small' ? '10px' : '15px'};
  height: ${({ size = 'medium' }) =>
    size === 'large' ? '20px' : size === 'small' ? '10px' : '15px'};

  ${({ type, position }) => {
    const positions = [
      { top: '10%', left: '15%' },
      { top: '25%', right: '20%' },
      { top: '50%', left: '10%' },
      { top: '70%', right: '18%' },
      { top: '85%', left: '25%' },
    ];

    const pos = positions[position % positions.length];

    if (type === 'shield') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        &::before {
          content: '🛡️';
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          filter: grayscale(1) brightness(1.5);
        }
      `;
    }
    if (type === 'lock') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        &::before {
          content: '🔒';
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          filter: grayscale(1) brightness(1.5);
        }
      `;
    }
    return css`
      top: ${pos.top};
      ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
      background: linear-gradient(135deg, #008080, #40e0d0);
      border-radius: 50%;
      opacity: 0.3;
    `;
  }}
`;

export const SecurityLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 60px;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

export const SecurityIcon = styled.div`
  color: #40e0d0;
  filter: drop-shadow(0 0 20px currentColor);
  animation: ${modernGlow} 4s ease-in-out infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: ${pulse} 3s ease-in-out infinite;
  }

  @media (max-width: 1024px) {
    justify-self: center;
  }
`;

export const SecurityContent = styled.div`
  max-width: 400px;
  position: relative;

  @media (max-width: 1024px) {
    max-width: 600px;
    justify-self: center;
  }
`;

export const SecurityFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    justify-self: center;
  }
`;

export const SecurityFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  will-change: transform, background-color, border-color, box-shadow;
  transform: translateZ(0);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(64, 224, 208, 0.4);
    transform: translateX(12px) translateZ(0);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(64, 224, 208, 0.25);
  }

  // Enhanced shimmer effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.15), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  svg {
    color: #40e0d0;
    flex-shrink: 0;
    filter: drop-shadow(0 0 6px rgba(64, 224, 208, 0.4));
    transition: filter 0.3s ease;
  }

  &:hover svg {
    filter: drop-shadow(0 0 12px rgba(64, 224, 208, 0.6));
  }

  span {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    justify-content: center;

    &:hover {
      transform: translateY(-8px) translateZ(0);
    }
  }
`;

// Enhanced Testimonials Section Components
export const TestimonialsSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fffe 0%, #ffffff 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.03) 0%,
      rgba(248, 73, 96, 0.02) 50%,
      rgba(188, 221, 222, 0.03) 100%
    );
    pointer-events: none;
    z-index: 0;
  }
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
  animation: ${quantumFloat}
    ${({ speed = 'medium' }) => (speed === 'slow' ? '14s' : speed === 'fast' ? '7s' : '10s')}
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
    ];

    const pos = positions[position % positions.length];

    if (type === 'quote') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        &::before {
          content: '"';
          font-size: 18px;
          font-weight: bold;
          color: rgba(64, 224, 208, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-family: serif;
        }
      `;
    }
    if (type === 'star') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        &::before {
          content: '⭐';
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          filter: grayscale(0.7) brightness(1.2);
        }
      `;
    }
    if (type === 'circle') {
      return css`
        top: ${pos.top};
        ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
        background: linear-gradient(135deg, #008080, #40e0d0);
        border-radius: 50%;
        opacity: 0.4;
      `;
    }
    return css`
      top: ${pos.top};
      ${pos.left ? `left: ${pos.left};` : `right: ${pos.right};`}
      background: linear-gradient(135deg, #f84960, #ff6b8a);
      border-radius: 2px;
      opacity: 0.3;
      transform: rotate(45deg);
    `;
  }}
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 60px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const TestimonialCard = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  will-change: transform, box-shadow, border-color;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(64, 224, 208, 0.2);
    transform: translateY(-12px) translateZ(0);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(64, 224, 208, 0.1);
  }

  // Enhanced shimmer effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.08), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  // Decorative element
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(64, 224, 208, 0.05));
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 32px;
    border-radius: 20px;
  }
`;

export const TestimonialQuote = styled.blockquote`
  font-size: 18px;
  line-height: 1.7;
  color: #2d3748;
  margin: 0 0 32px 0;
  font-style: italic;
  position: relative;
  z-index: 1;
  font-weight: 400;

  &::before {
    content: '"';
    font-size: 80px;
    color: rgba(64, 224, 208, 0.15);
    position: absolute;
    top: -20px;
    left: -20px;
    font-family: serif;
    line-height: 1;
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;

    &::before {
      font-size: 60px;
      top: -15px;
      left: -15px;
    }
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const TestimonialAvatar = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(0, 128, 128, 0.1));
  border: 2px solid rgba(64, 224, 208, 0.3);
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background: linear-gradient(135deg, #008080, #40e0d0);
    border-radius: 50%;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const TestimonialName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 4px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const TestimonialTitle = styled.div`
  font-size: 14px;
  color: #718096;
  font-weight: 500;
  line-height: 1.4;
`;

export const TestimonialMetric = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(0, 128, 128, 0.05));
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  color: #008080;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.1), transparent);
    animation: ${shimmer} 2s infinite;
  }

  svg {
    flex-shrink: 0;
    color: #40e0d0;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

// ===== ECOSYSTEM INTEGRATION SECTION =====
export const EcosystemSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/></pattern></defs><rect width='100' height='100' fill='url(%23grid)'/></svg>");
    opacity: 0.3;
    z-index: -1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const EcosystemHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

export const EcosystemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const EcosystemMainCard = styled.div`
  background: rgba(15, 32, 39, 0.85); /* darker glassy */
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(64, 224, 208, 0.15);
  position: relative;
  overflow: hidden;
  color: #fff;
  backdrop-filter: blur(14px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #008080, #40e0d0);
  }

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

export const EcosystemCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const EcosystemIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 20px;

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const EcosystemCardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  flex: 1;
`;

export const EcosystemBadge = styled.span`
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(0, 128, 128, 0.05));
  color: #008080;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const EcosystemCardContent = styled.div`
  margin-top: 24px;
`;

export const EcosystemDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #bcddde;
  margin-bottom: 32px;
`;

export const EcosystemMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const EcosystemMetric = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(64, 224, 208, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(64, 224, 208, 0.1);
`;

export const EcosystemIntegrationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const IntegrationCategory = styled.div`
  background: rgba(15, 32, 39, 0.85); /* darker glassy */
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(64, 224, 208, 0.12);
  color: #fff;
  backdrop-filter: blur(14px);
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(0, 128, 128, 0.05));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #008080;
  margin-right: 16px;
`;

export const CategoryTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const EcosystemIntegrationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EcosystemIntegrationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(32, 50, 60, 0.85); /* dark glassy */
  border-radius: 12px;
  border: 1px solid rgba(64, 224, 208, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(64, 224, 208, 0.1);
    border-color: rgba(64, 224, 208, 0.22);
  }
`;

export const IntegrationLogo = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 700;
  margin-right: 12px;
`;

export const IntegrationName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #fff; /* white for contrast */
  flex: 1;
`;

export const IntegrationStatus = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  ${({ connected }) =>
    connected
      ? `
    background: rgba(34, 197, 94, 0.15);
    color: #40e0d0;
  `
      : `
    background: rgba(255,255,255,0.08);
    color: #bcddde;
  `}
`;

// ===== SUCCESS SHOWCASE SECTION =====
export const SuccessShowcaseSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/></pattern></defs><rect width='100' height='100' fill='url(%23grid)'/></svg>");
    opacity: 0.3;
    z-index: -1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const SuccessShowcaseHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

export const SuccessShowcaseGrid = styled.div`
  display: grid;
  gap: 60px;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

export const SuccessStatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
`;

export const SuccessStatCard = styled.div`
  background: rgba(15, 32, 39, 0.92); /* darker glassy */
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
  border: 2px solid rgba(64, 224, 208, 0.15);
  position: relative;
  overflow: hidden;
  color: #fff;
  backdrop-filter: blur(16px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #008080, #40e0d0);
  }

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

export const SuccessStatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 20px auto;
`;

export const SuccessStatContent = styled.div``;

export const SuccessStatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #40e0d0;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const SuccessStatLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SuccessStatDescription = styled.div`
  font-size: 14px;
  color: #bcddde;
`;

export const SuccessStoriesContainer = styled.div`
  display: grid;
  gap: 40px;
`;

export const FeaturedSuccessStory = styled.div`
  background: rgba(15, 32, 39, 0.92); /* darker glassy */
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
  border: 2px solid rgba(64, 224, 208, 0.15);
  position: relative;
  overflow: hidden;
  color: #fff;
  backdrop-filter: blur(16px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #008080, #40e0d0);
  }

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

export const SuccessStoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const SuccessStoryBadge = styled.span`
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.1), rgba(0, 128, 128, 0.05));
  color: #008080;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SuccessStoryCompany = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SuccessStoryContent = styled.div``;

export const SuccessStoryQuote = styled.blockquote`
  font-size: 20px;
  line-height: 1.6;
  color: #bcddde;
  margin: 0 0 32px 0;
  font-style: italic;
  position: relative;

  &::before {
    content: '"';
    font-size: 80px;
    color: rgba(64, 224, 208, 0.15);
    position: absolute;
    top: -20px;
    left: -20px;
    font-family: serif;
    line-height: 1;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SuccessStoryAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

export const SuccessStoryAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(0, 128, 128, 0.1));
  border: 2px solid rgba(64, 224, 208, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #008080;
`;

export const SuccessStoryAuthorInfo = styled.div``;

export const SuccessStoryName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
`;

export const SuccessStoryTitle = styled.div`
  font-size: 14px;
  color: #40e0d0;
  font-weight: 500;
`;

export const SuccessStoryCompanySize = styled.div`
  font-size: 12px;
  color: #008080;
  font-weight: 600;
`;

export const SuccessStoryMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const SuccessMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(32, 50, 60, 0.85); /* dark glassy */
  border-radius: 16px;
  border: 1.5px solid rgba(64, 224, 208, 0.13);
`;

export const SuccessMetricIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #008080, #40e0d0);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const SuccessMetricContent = styled.div``;

export const SuccessMetricValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #40e0d0;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SuccessMetricLabel = styled.div`
  font-size: 14px;
  color: #bcddde;
  font-weight: 500;
`;

export const SuccessStoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const SuccessStoryCard = styled.div`
  background: rgba(15, 32, 39, 0.85); /* darker glassy */
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
  border: 1.5px solid rgba(64, 224, 208, 0.13);
  color: #fff;
  transition: all 0.3s ease;
  backdrop-filter: blur(14px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.28);
    border-color: rgba(0, 128, 128, 0.4);
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const SuccessStoryCardHeader = styled.div`
  margin-bottom: 24px;
`;

export const SuccessStoryCardQuote = styled.blockquote`
  font-size: 16px;
  line-height: 1.6;
  color: #bcddde;
  margin: 0 0 16px 0;
  font-style: italic;
`;

export const SuccessStoryRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
`;

export const SuccessStoryCardAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const SuccessStoryCardAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(0, 128, 128, 0.1));
  border: 2px solid rgba(64, 224, 208, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #008080;
`;

export const SuccessStoryCardAuthorInfo = styled.div``;

export const SuccessStoryCardName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
`;

export const SuccessStoryCardTitle = styled.div`
  font-size: 14px;
  color: #40e0d0;
  font-weight: 500;
`;

export const SuccessStoryCardMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.13), rgba(0, 128, 128, 0.08));
  border: 1.5px solid rgba(64, 224, 208, 0.22);
  border-radius: 12px;
  color: #40e0d0;
  font-size: 14px;
  font-weight: 600;
`;

export const SuccessStoryCardMetricText = styled.span`
  color: #40e0d0;
`;

export const SuccessShowcaseFooter = styled.div`
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

export const SuccessShowcaseCTA = styled.div`
  background: rgba(15, 32, 39, 0.92);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  text-align: center;
  border: 2px solid rgba(64, 224, 208, 0.15);
  color: #fff;
  backdrop-filter: blur(16px);

  @media (max-width: 768px) {
    padding: 32px;
  }
`;

export const SuccessShowcaseCTAContent = styled.div`
  margin-bottom: 32px;
`;

export const SuccessShowcaseCTATitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: #40e0d0;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const SuccessShowcaseCTADescription = styled.p`
  font-size: 18px;
  color: #bcddde;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SuccessShowcaseCTAActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const SuccessShowcasePrimaryButton = styled.button`
  background: linear-gradient(135deg, #008080, #40e0d0);
  color: white;
  border: none;
  padding: 18px 36px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 128, 128, 0.3);
  }
`;

export const SuccessShowcaseSecondaryButton = styled.button`
  background: transparent;
  color: #008080;
  border: 2px solid #008080;
  padding: 16px 34px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #008080;
    color: white;
    transform: translateY(-2px);
  }
`;

// Security Features List (for SecurityCommandSection)
export const SecurityFeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SecurityFeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const SecurityFeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(0, 128, 128, 0.1));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  margin-bottom: 20px;
`;

export const SecurityFeatureContent = styled.div``;

export const SecurityFeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
`;

export const SecurityFeatureDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #bcddde;
  margin: 0 0 16px 0;
`;

export const SecurityFeatureBadge = styled.span`
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(0, 128, 128, 0.1));
  color: #40e0d0;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// ===== SECURITY METRICS & THREAT MAP (for SecurityCommandSection) =====
export const SecurityMetricCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 28px 24px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.14);
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(64, 224, 208, 0.3);
    transform: translateY(-4px);
  }
`;

export const SecurityMetricIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.18), rgba(0, 128, 128, 0.08));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40e0d0;
  flex-shrink: 0;
`;

export const SecurityMetricContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SecurityMetricValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #40e0d0;
`;

export const SecurityMetricLabel = styled.div`
  font-size: 14px;
  color: #bcddde;
  font-weight: 500;
`;

export const SecurityMetricStatus = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ secure }) => (secure ? '#10b981' : '#f87171')};
  background: ${({ secure }) => (secure ? 'rgba(16,185,129,0.08)' : 'rgba(248,113,113,0.08)')};
  border-radius: 8px;
  padding: 2px 10px;
  display: inline-block;
  margin-top: 2px;
`;

export const SecurityThreatMap = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 224, 208, 0.08);
  border-radius: 18px;
  margin-top: 32px;
  padding: 28px 24px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
`;

export const ThreatMapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const ThreatMapTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export const ThreatMapStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ThreatIndicator = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ level }) =>
    level === 'low'
      ? 'linear-gradient(135deg, #10b981, #34d399)'
      : level === 'medium'
      ? 'linear-gradient(135deg, #f59e42, #fbbf24)'
      : 'linear-gradient(135deg, #ef4444, #f87171)'};
  box-shadow: 0 0 8px
    ${({ level }) =>
      level === 'low'
        ? 'rgba(16,185,129,0.4)'
        : level === 'medium'
        ? 'rgba(251,191,36,0.4)'
        : 'rgba(239,68,68,0.4)'};
`;

export const ThreatMapContent = styled.div``;

export const ThreatMapGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
`;

export const ThreatMapItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #bcddde;
`;

export const ThreatMapDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #008080);
  margin-right: 8px;
`;

// ===== SECURITY COMMAND SECTION STRUCTURE (for SecurityCommandSection) =====
export const SecurityCommandSection = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const SecurityCommandHeader = styled.div`
  margin-bottom: 48px;
`;

export const SecurityCommandGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  align-items: flex-start;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const SecurityMainPanel = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 32px 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const SecurityPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const SecurityStatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SecurityStatusDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #34d399);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
`;

export const SecurityStatusText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #10b981;
`;

export const SecurityTimestamp = styled.div`
  font-size: 12px;
  color: #bcddde;
  font-weight: 500;
`;

export const SecurityMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

// Enhanced Chart Components
export const AdvancedChartContainer = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  border-radius: 12px;
  overflow: visible;
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.02), rgba(30, 64, 175, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
`;

export const ChartSVG = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 16px;
  left: 40px;
  right: 16px;
  bottom: 40px;
  width: calc(100% - 56px);
  height: calc(100% - 56px);
  overflow: visible;

  /* Add keyframe animations */
  @keyframes drawLine {
    0% {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
    }
  }

  @keyframes pointAnimation {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1.4);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ChartLabels = styled.div`
  position: absolute;
  bottom: 0;
  left: 40px;
  right: 16px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChartLabel = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  text-align: center;
  min-width: 30px;
`;

export const YAxisLabels = styled.div`
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 40px;
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const YAxisLabel = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  text-align: right;
  transform: translateY(-50%);
`;

export const ChartTooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 8px;
  padding: 12px;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -100%);
  margin-top: -8px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 160px;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
`;

export const TooltipHeader = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #40e0d0;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(64, 224, 208, 0.2);
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TooltipLabel = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

export const TooltipValue = styled.span`
  font-size: 11px;
  color: #ffffff;
  font-weight: 600;
  margin-left: 8px;
`;

// Mobile responsive adjustments for the advanced chart
export const ChartResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    ${AdvancedChartContainer} {
      height: 180px;
      padding: 12px;
    }

    ${ChartSVG} {
      left: 35px;
      width: calc(100% - 47px);
    }

    ${ChartLabels} {
      left: 35px;
      right: 12px;
    }

    ${YAxisLabels} {
      width: 32px;
    }

    ${YAxisLabel} {
      font-size: 9px;
    }

    ${ChartLabel} {
      font-size: 10px;
      min-width: 25px;
    }

    ${ChartTooltip} {
      min-width: 140px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    ${AdvancedChartContainer} {
      height: 160px;
      padding: 10px;
    }

    ${ChartTooltip} {
      min-width: 120px;
      padding: 8px;
      font-size: 10px;
    }

    ${TooltipHeader} {
      font-size: 11px;
    }

    ${TooltipLabel}, ${TooltipValue} {
      font-size: 10px;
    }
  }
`;
