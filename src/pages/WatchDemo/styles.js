import styled, { keyframes, css } from 'styled-components';

// Only keep necessary keyframes
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const drift = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
`;

const videoPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  }
  50% { 
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 
                0 0 0 1px rgba(64, 224, 208, 0.3),
                0 0 20px rgba(64, 224, 208, 0.15);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
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

// Layout and Section
export const Layout = styled.div``;
export const PricingSection = styled.section`
  position: relative;
  padding: 80px 0;
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
    padding: 100px 20px 60px 20px;
  }
  @media (max-width: 480px) {
    padding: 120px 16px 60px 16px;
  }
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
export const NewHeroFloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
export const NewHeroFloatingElement = styled.div``;
export const Container = styled.div``;

// Pricing Card and Content
export const PricingContainer = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
`;
export const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    margin-bottom: 36px;
    padding: 0 10px;
  }
  @media (max-width: 480px) {
    margin-bottom: 32px;
    padding: 0 5px;
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
  margin-bottom: 10px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 14px;
    margin-bottom: 16px;
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
  color: #fff;
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
  display: inline-block;
  padding-bottom: 6px;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding-bottom: 4px;
    &::after {
      bottom: 1px;
      height: 1.5px;
    }
  }

  @media (max-width: 480px) {
    padding-bottom: 3px;
    &::after {
      bottom: 0px;
      height: 1px;
    }
  }
`;
export const PricingSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.5;
    padding: 0 10px;
  }
  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.5;
    padding: 0 5px;
  }
`;
export const PricingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  align-items: center;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  /* Large screens */
  @media (max-width: 1400px) {
    max-width: 1100px;
    gap: 40px;
  }

  @media (max-width: 1200px) {
    max-width: 1000px;
    gap: 36px;
    grid-template-columns: 1fr 380px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
    max-width: 800px;
    text-align: center;
  }

  @media (max-width: 768px) {
    gap: 40px;
    max-width: 100%;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    gap: 32px;
    padding: 0 12px;
  }
`;
export const PricingImageContainer = styled.div`
  position: relative;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(30px)')};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${({ delay }) => delay};
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1400px) {
    max-width: 600px;
  }

  @media (max-width: 1200px) {
    max-width: 550px;
  }

  @media (max-width: 1024px) {
    max-width: 650px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    max-width: 500px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;
export const PricingImage = styled.div`
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
  transform-origin: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  max-width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.1) 0%,
      rgba(32, 178, 170, 0.05) 50%,
      rgba(0, 128, 128, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    border-radius: 20px;
    z-index: 1;
  }

  &:hover .modern-controls,
  &:focus-within .modern-controls {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0s;
  }

  &:hover {
    transform: scale(1.02) translateY(-4px);
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4), 0 16px 48px rgba(64, 224, 208, 0.2),
      0 8px 32px rgba(32, 178, 170, 0.3), 0 0 40px rgba(64, 224, 208, 0.15),
      0 0 0 1px rgba(64, 224, 208, 0.2);

    &::before {
      opacity: 1;
    }
  }

  /* Fullscreen styles */
  &:fullscreen,
  &:-webkit-full-screen,
  &:-moz-full-screen,
  &:-ms-fullscreen {
    transform: none;
    border-radius: 0;
    background: #000;
    box-shadow: none;
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;

    video {
      width: 100%;
      height: 100%;
      border-radius: 0;
      object-fit: contain;
    }

    .modern-controls {
      opacity: 1;
      pointer-events: auto;
    }
  }

  video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    box-shadow: none;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    border-radius: 16px;

    &::before {
      border-radius: 16px;
    }

    &:hover {
      transform: scale(1.01) translateY(-2px);
    }

    video {
      border-radius: 16px;
    }
  }

  @media (max-width: 480px) {
    border-radius: 12px;

    &::before {
      border-radius: 12px;
    }

    &:hover {
      transform: scale(1.005) translateY(-1px);
    }

    video {
      border-radius: 12px;
    }
  }
`;

// Modern Video Play Overlay Components
export const VideoThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

export const PlayButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  transform: scale(1);
  transition: transform 0.3s ease;

  ${VideoThumbnailOverlay}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    gap: 14px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const PlayButtonRing = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Outer ring with subtle pulse */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 2px solid rgba(64, 224, 208, 0.3);
    z-index: -1;
  }

  /* Inner glow ring */
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border-radius: 50%;
    background: rgba(64, 224, 208, 0.08);
    transition: all 0.3s ease;
    z-index: -1;
  }

  ${VideoThumbnailOverlay}:hover & {
    &::before {
      border-color: rgba(64, 224, 208, 0.5);
      transform: scale(1.05);
    }

    &::after {
      background: rgba(64, 224, 208, 0.15);
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 85px;
    height: 85px;
  }
`;

export const PlayButtonInner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(64, 224, 208, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);

  ${VideoThumbnailOverlay}:hover & {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(64, 224, 208, 0.6), 0 4px 16px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
  }
`;

export const PlayIcon = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));

  @media (max-width: 768px) {
    margin-left: 3px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    margin-left: 2px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const PlayHint = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  opacity: 0.8;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  ${VideoThumbnailOverlay}:hover & {
    opacity: 1;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const CenterPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 5;
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(32, 178, 170, 0.2));
    opacity: 0;
    transition: all 0.4s ease;
    border-radius: 50%;
    transform: scale(0.8);
  }

  &:hover {
    background: rgba(64, 224, 208, 0.12);
    border-color: rgba(64, 224, 208, 0.4);
    color: #40e0d0;
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 30px 80px rgba(64, 224, 208, 0.4), 0 0 30px rgba(64, 224, 208, 0.2),
      0 0 0 1px rgba(64, 224, 208, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);

    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.05);
    transition-duration: 0.1s;
  }

  svg {
    z-index: 1;
    position: relative;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5));
    margin-left: 4px; /* Slight offset for play icon visual balance */
  }

  @media (max-width: 768px) {
    width: 72px;
    height: 72px;
    font-size: 26px;

    svg {
      margin-left: 3px;
    }
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    font-size: 22px;

    svg {
      margin-left: 2px;
    }
  }
`;
export const ModernControlsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.3) 70%,
    transparent 100%
  );
  padding: 24px;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(20px);
  border-radius: 0 0 20px 20px;

  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  &.show button {
    pointer-events: auto;
  }

  /* Fullscreen styles */
  *:fullscreen &,
  *:-webkit-full-screen &,
  *:-moz-full-screen &,
  *:-ms-fullscreen & {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    z-index: 2147483647; /* Maximum z-index to ensure visibility in fullscreen */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
    padding: 30px;

    &.show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    *:fullscreen &,
    *:-webkit-full-screen &,
    *:-moz-full-screen &,
    *:-ms-fullscreen & {
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;

    *:fullscreen &,
    *:-webkit-full-screen &,
    *:-moz-full-screen &,
    *:-ms-fullscreen & {
      padding: 15px;
    }
  }
`;

export const ModernTimelineBar = styled.div`
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 12;
  pointer-events: auto;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(64, 224, 208, 0.2) 0%,
      rgba(32, 178, 170, 0.3) 50%,
      rgba(64, 224, 208, 0.2) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 8px;
  }

  &:hover {
    height: 8px;
    background: rgba(255, 255, 255, 0.25);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 4px;
    margin-bottom: 16px;

    &:hover {
      height: 6px;
    }
  }
`;

export const ModernTimelineProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #40e0d0 0%, #20b2aa 50%, #008080 100%);
  border-radius: 8px;
  transition: width 0.15s linear;
  position: relative;
  box-shadow: 0 0 20px rgba(64, 224, 208, 0.4);

  &::after {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #40e0d0, #20b2aa);
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(64, 224, 208, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${ModernTimelineBar}:hover &::after {
    opacity: 1;
    transform: translateY(-50%) scale(1.2);
  }

  @media (max-width: 768px) {
    &::after {
      width: 12px;
      height: 12px;
      right: -6px;
      border-width: 1px;
    }
  }
`;

export const ModernControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 12;
  pointer-events: auto;
`;

export const ModernControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 13;
  pointer-events: auto;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ModernControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 13;
  pointer-events: auto;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const ModernPlayPauseButton = styled.button`
  background: linear-gradient(135deg, rgba(64, 224, 208, 0.9), rgba(32, 178, 170, 0.9));
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 52px;
  height: 52px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 20px;
  position: relative;
  z-index: 15;
  pointer-events: auto;
  box-shadow: 0 8px 24px rgba(64, 224, 208, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: conic-gradient(
      from 0deg,
      rgba(64, 224, 208, 0.6),
      rgba(32, 178, 170, 0.8),
      rgba(0, 128, 128, 0.6),
      rgba(64, 224, 208, 0.6)
    );
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(64, 224, 208, 1), rgba(32, 178, 170, 1));
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(64, 224, 208, 0.6), 0 6px 16px rgba(0, 0, 0, 0.4);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    margin-left: 2px; /* Slight offset for play icon */
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

export const ModernSeekButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: none;
  border-radius: 6px;
  width: 36px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 16px;
  position: relative;
  z-index: 15;
  pointer-events: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  span {
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 28px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 24px;
    font-size: 12px;
  }
`;

export const ModernTimeDisplay = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-left: 8px;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-left: 6px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    margin-left: 4px;
  }
`;

export const ModernFullscreenButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: none;
  border-radius: 6px;
  width: 36px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 16px;
  position: relative;
  z-index: 15;
  pointer-events: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 28px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 24px;
    font-size: 12px;
  }
`;

export const ModernPauseIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ModernSeekIcon = styled.span`
  font-size: 16px;
  font-weight: bold;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const PricingPlanCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px 20px 24px 20px;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ isVisible, isAnimating }) => (isAnimating ? 0.7 : isVisible ? 1 : 0)};
  transform: ${({ isVisible, isAnimating }) =>
    isAnimating ? 'scale(0.98) translateY(5px)' : isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition-delay: ${({ delay }) => delay};
  overflow: hidden;
  &:hover {
    box-shadow: 0 8px 32px rgba(64, 224, 208, 0.18);
  }
  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 14px;
    max-width: 100%;
    width: 100%;
    font-size: 0.97em;
    margin: 0;
    &:hover {
      box-shadow: 0 2px 8px rgba(64, 224, 208, 0.1);
    }
  }
  @media (max-width: 480px) {
    padding: 20px 16px;
    border-radius: 12px;
    max-width: 100%;
    width: 100%;
    font-size: 0.95em;
    margin: 0;
    &:hover {
      box-shadow: 0 1px 4px rgba(64, 224, 208, 0.08);
    }
  }
  & > * {
    margin-bottom: 10px !important;
  }
  & > *:last-child {
    margin-bottom: 0 !important;
  }
`;
export const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
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
  color: ${({ isActive }) => (isActive ? '#fff' : 'rgba(255,255,255,0.7)')};
  &:hover {
    color: #fff;
    transform: translateY(-1px);
  }
  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 0 4px 16px rgba(64, 224, 208, 0.3);
    `}
`;
export const PricingCardGlow = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa, #008080);
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
  ${PricingPlanCard}:hover & {
    opacity: 0.1;
  }
`;
export const PricingCardHeader = styled.div`
  margin-bottom: 18px;
  text-align: center;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;
export const PricingPlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 12px;
  }
`;
export const PricingAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 480px) {
    gap: 6px;
    flex-wrap: wrap;
  }
`;
export const PricingPrice = styled.span`
  font-size: 48px;
  font-weight: 700;
  color: #40e0d0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;
export const PricingPeriod = styled.span`
  font-size: 16px;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  height: 100%;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
export const PricingSavings = styled.div`
  margin-top: 16px;
  padding: 0 12px;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 20px;
  color: #40e0d0;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  line-height: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'scale(1)' : 'scale(0.95)')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
export const PricingFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 14px;
  }
  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 10px;
  }
`;
export const PricingFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const PricingFeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  flex-shrink: 0;
`;
export const PricingFeatureText = styled.span`
  font-size: 16px;
  color: #40e0d0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
export const PricingButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  min-height: 56px;
  margin-bottom: 0;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(64, 224, 208, 0.4);
  }
  &:active {
    transform: translateY(0);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }
  &:hover::before {
    left: 100%;
  }
  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 18px;
    min-height: 48px;
    border-radius: 14px;
    margin-bottom: 0;
  }
  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 16px;
    min-height: 44px;
    border-radius: 12px;
    margin-bottom: 0;
  }
`;
export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  svg {
    margin-left: 10px;
    font-size: 1.3em;
    font-weight: bold;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    top: 1px;
  }
`;
