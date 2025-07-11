import styled, { keyframes, css } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const WatchDemoSection = styled.section`
  position: relative;
  padding: 100px 0;
  background: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1a1a1a 25%,
    #0f1419 50%,
    #1a1a1a 75%,
    #0a0a0a 100%
  );
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;

export const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 50px;
  color: #40e0d0;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;

  &:hover {
    background: rgba(64, 224, 208, 0.15);
    border-color: rgba(64, 224, 208, 0.3);
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export const SectionTitle = styled.h2`
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

export const SectionHighlight = styled.span`
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

export const SectionSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const DemoContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items: center;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;

  @media (max-width: 1024px) {
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const VideoPlayer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

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

  &:hover {
    transform: scale(1.02) translateY(-4px);
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4), 0 16px 48px rgba(64, 224, 208, 0.2),
      0 8px 32px rgba(32, 178, 170, 0.3), 0 0 40px rgba(64, 224, 208, 0.15),
      0 0 0 1px rgba(64, 224, 208, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &:hover .video-controls {
    opacity: 1;
    pointer-events: auto;
  }

  video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    border-radius: 16px;

    &::before {
      border-radius: 16px;
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

    video {
      border-radius: 12px;
    }
  }
`;

export const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(10, 15, 20, 0.75) 0%,
    rgba(10, 15, 20, 0.65) 50%,
    rgba(10, 15, 20, 0.75) 100%
  );
  backdrop-filter: blur(4px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(10, 15, 20, 0.85) 0%,
      rgba(10, 15, 20, 0.75) 50%,
      rgba(10, 15, 20, 0.85) 100%
    );
    backdrop-filter: blur(6px);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

export const PlayButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transform: scale(1);
  transition: transform 0.3s ease;

  ${ThumbnailOverlay}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const PlayButtonRing = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(64, 224, 208, 0.4),
      rgba(32, 178, 170, 0.6),
      rgba(0, 128, 128, 0.4),
      rgba(64, 224, 208, 0.4)
    );
    animation: ${float} 3s ease-in-out infinite;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border-radius: 50%;
    background: rgba(64, 224, 208, 0.1);
    transition: all 0.4s ease;
  }

  ${ThumbnailOverlay}:hover & {
    background: rgba(255, 255, 255, 0.12);

    &::after {
      background: rgba(64, 224, 208, 0.2);
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

export const PlayButtonInner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(64, 224, 208, 0.4);
  transition: all 0.3s ease;

  ${ThumbnailOverlay}:hover & {
    transform: scale(1.1);
    box-shadow: 0 12px 48px rgba(64, 224, 208, 0.6);
  }

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
  }
`;

export const PlayIcon = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

  @media (max-width: 768px) {
    margin-left: 3px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    margin-left: 2px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const PlayHint = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  opacity: 0.9;
  transition: opacity 0.3s ease;

  ${ThumbnailOverlay}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const VideoControls = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding: 20px;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  transform: translateY(10px);

  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const Timeline = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    height: 6px;
    background: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    height: 3px;
    margin-bottom: 12px;

    &:hover {
      height: 5px;
    }
  }
`;

export const TimelineProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #40e0d0 0%, #20b2aa 100%);
  border-radius: 2px;
  transition: width 0.15s linear;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  ${Timeline}:hover &::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    &::after {
      width: 10px;
      height: 10px;
      right: -5px;
    }
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const PlayPauseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 18px;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    margin-left: 2px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

export const PauseIcon = styled.span`
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

export const TimeDisplay = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const FullscreenButton = styled.button`
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
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 24px;
  }
`;

export const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  position: relative;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;
  opacity: ${({ isAnimating }) => (isAnimating ? 0.7 : 1)};
  transform: ${({ isAnimating }) => (isAnimating ? 'scale(0.98)' : 'scale(1)')};

  &:hover {
    box-shadow: 0 8px 32px rgba(64, 224, 208, 0.18);
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 1024px) {
    max-width: 450px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

export const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 4px;
  backdrop-filter: blur(10px);
`;

export const ToggleButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
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

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const PlanPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    gap: 6px;
    flex-wrap: wrap;
  }
`;

export const Price = styled.span`
  font-size: 48px;
  font-weight: 700;
  color: #40e0d0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

export const Period = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Savings = styled.div`
  padding: 8px 16px;
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
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'scale(1)' : 'scale(0.95)')};
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const FeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

export const FeatureText = styled.span`
  font-size: 16px;
  color: #40e0d0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const GetStartedButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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
    font-size: 16px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 14px;
    gap: 6px;
  }
`;
