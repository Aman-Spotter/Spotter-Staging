import styled, { keyframes, css } from 'styled-components';

// Color palette matching brand identity
const colors = {
  primary: '#14b8a6', // Teal
  primaryLight: '#40e0d0', // Light teal
  primaryDark: '#0f766e', // Dark teal
  secondary: '#f59e0b', // Amber
  accent: '#8b5cf6', // Purple
  success: '#10b981', // Green
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
  background: '#0f172a', // Dark blue
  backgroundLight: '#1e293b', // Lighter dark blue
  cardBackground: 'rgba(30, 41, 59, 0.8)', // Semi-transparent card
  surface: '#334155', // Gray blue
  text: '#ffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  border: 'rgba(148, 163, 184, 0.2)',
  borderLight: 'rgba(148, 163, 184, 0.1)',
  glow: 'rgba(20, 184, 166, 0.3)',
};

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(20, 184, 166, 0.5);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const slideFromTop = keyframes`
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(20, 184, 166, 0.4);
  }
`;

// Layout Components
export const Layout = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
  color: ${colors.text};
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  /* Prevent layout shift from scrollbar */
  scrollbar-gutter: stable;
`;

export const BackgroundElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export const BackgroundParticle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: ${floatAnimation}
    ${(props) => (props.speed === 'slow' ? '8s' : props.speed === 'medium' ? '6s' : '4s')}
    ease-in-out infinite;
  animation-delay: ${(props) => props.delay};

  ${(props) => {
    const positions = [
      { top: '10%', left: '10%' },
      { top: '20%', right: '15%' },
      { bottom: '30%', left: '20%' },
      { top: '60%', right: '25%' },
      { bottom: '20%', right: '10%' },
      { top: '40%', left: '5%' },
    ];
    const pos = positions[props.position % positions.length];
    return css`
      ${pos.top && `top: ${pos.top};`}
      ${pos.bottom && `bottom: ${pos.bottom};`}
      ${pos.left && `left: ${pos.left};`}
      ${pos.right && `right: ${pos.right};`}
    `;
  }}

  ${(props) => {
    const sizeMap = { small: '8px', medium: '12px', large: '16px' };
    const colorMap = {
      teal: colors.primary,
      cyan: colors.primaryLight,
      green: colors.success,
      purple: colors.accent,
    };
    return css`
      width: ${sizeMap[props.size]};
      height: ${sizeMap[props.size]};
      background: ${colorMap[props.color]};
      opacity: ${props.type === 'ring' ? '0.3' : '0.6'};
      ${props.type === 'ring' &&
      `
        background: transparent;
        border: 2px solid ${colorMap[props.color]};
      `}
    `;
  }}
`;

// Hero Section
export const HeroSection = styled.section`
  padding: 20px 10px 10px;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    display: none; /* Hide hero section on mobile */
  }
`;

export const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? 0 : 30)}px);
  transition: all 0.8s ease-out;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-top: 50px;
  margin-bottom: 10px;
  background: linear-gradient(135deg, ${colors.text} 0%, ${colors.textSecondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
`;

export const HeroHighlight = styled.span`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${colors.textSecondary};
  max-width: 800px;
  margin: 0 auto 8px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0 auto 4px;
  }
`;

export const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroStat = styled.div`
  text-align: center;
  padding: 12px;
  background: ${colors.cardBackground};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${colors.primary};
  }
`;

export const HeroStatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
  border-radius: 12px;
  color: white;
`;

export const HeroStatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.text};
  margin-bottom: 8px;
`;

export const HeroStatLabel = styled.div`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

// Tabs Section
export const TabsSection = styled.section`
  padding: 0px 10px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    display: none; /* Hide entire section on mobile */
  }
`;

export const TabsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? 0 : 30)}px);
  transition: all 0.8s ease-out;
`;

export const TabsHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

export const TabsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${colors.text};
`;

export const TabsSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

export const CalculatorTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    display: none; /* Hide tabs on mobile, use dropdown instead */
  }
`;

export const CalculatorTab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: ${(props) =>
    props.active
      ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
      : colors.cardBackground};
  border: 1px solid ${(props) => (props.active ? colors.primary : colors.border)};
  border-radius: 16px;
  color: ${(props) => (props.active ? 'white' : colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    border-color: ${colors.primary};
  }

  ${(props) =>
    props.active &&
    css`
      animation: ${pulseGlow} 3s ease-in-out infinite;
    `}

  @media (max-width: 768px) {
    padding: 8px 6px;
    gap: 6px;
    border-radius: 12px;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const TabIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${(props) =>
    props.theme?.active ? 'rgba(255, 255, 255, 0.2)' : `rgba(20, 184, 166, 0.1)`};
  border-radius: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }
`;

export const TabContent = styled.div`
  flex: 1;
`;

export const TabTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2px;
  }
`;

export const TabSubtitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Calculator Container
export const CalculatorContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 10px 40px;
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 4px 20px;
    gap: 12px;
    overflow-x: auto;
  }
`;

// Input Panel with smooth sticky animation
export const InputPanel = styled.div`
  background: ${colors.cardBackground};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  backdrop-filter: blur(10px);
  height: fit-content;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Entrance animation */
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transform: ${(props) =>
    props.isLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
  animation: ${(props) =>
    props.isLoaded
      ? css`
          ${fadeInScale} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards
        `
      : 'none'};

  @media (max-width: 768px) {
    position: ${(props) => (props.isSticky ? 'fixed' : 'relative')};
    top: ${(props) => {
      if (!props.isSticky) return '75px';

      // Smooth animation from current position to top
      const progress = Math.min((props.scrollY - 200) / 100, 1);
      const startTop = 0;
      const endTop = 10;
      const currentTop = startTop + (endTop - startTop) * progress;
      return `${currentTop}px`;
    }};
    left: ${(props) => (props.isSticky ? '0' : 'auto')};
    right: ${(props) => (props.isSticky ? '0' : 'auto')};
    width: ${(props) => (props.isSticky ? '96%' : '100%')};
    margin: ${(props) => (props.isSticky ? '0 auto' : '0')};
    z-index: ${(props) => (props.isSticky ? '100' : '1')};
    backdrop-filter: ${(props) => (props.isSticky ? 'blur(20px)' : 'blur(10px)')};
    border-bottom: ${(props) =>
      props.isSticky ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`};
    box-shadow: ${(props) =>
      props.isSticky ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(20, 184, 166, 0.2)' : 'none'};
    border-radius: ${(props) => (props.isSticky ? '0 0 20px 20px' : '20px')};
    transform: ${(props) => {
      if (!props.isSticky) return 'translateY(0) scale(1)';

      // Add subtle scale and glow effects during sticky transition
      const progress = Math.min((props.scrollY - 200) / 100, 1);
      const scale = 1 - progress * 0.02; // Slight scale down
      return `translateY(0) scale(${scale})`;
    }};

    /* Enhanced visual effects when sticky */
    ${(props) =>
      props.isSticky &&
      css`
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            ${colors.primary} 20%,
            ${colors.primaryLight} 50%,
            ${colors.primary} 80%,
            transparent 100%
          );
          animation: ${pulseGlow} 2s ease-in-out infinite;
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(20, 184, 166, 0.05) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
      `}

    /* Smooth entrance animation */
    animation: ${(props) =>
      props.isSticky
        ? css`
            ${fadeInScale} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards
          `
        : 'none'};
  }
`;

export const InputPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  // border-bottom: 1px solid ${colors.border};
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: ${(props) => (props.isSticky ? '3px 4px 2px' : '4px 3px')};

    /* Add subtle shimmer effect when sticky */
    ${(props) =>
      props.isSticky &&
      css`
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(20, 184, 166, 0.05) 50%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: ${shimmer} 3s ease-in-out infinite;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            ${colors.primary} 50%,
            transparent 100%
          );
          animation: ${glowPulse} 2s ease-in-out infinite;
        }
      `}
  }
`;

export const InputPanelTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${colors.text};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.isSticky ? '0.8rem' : '0.85rem')};
    gap: 4px;

    /* Enhanced glow effect when sticky */
    ${(props) =>
      props.isSticky &&
      css`
        color: ${colors.primary};
        text-shadow: 0 0 10px rgba(20, 184, 166, 0.3);

        svg {
          color: ${colors.primary};
          filter: drop-shadow(0 0 5px rgba(20, 184, 166, 0.3));
        }
      `}
  }

  /* Icon animation when sticky */
  svg {
    transition: all 0.3s ease;
    ${(props) =>
      props.isSticky &&
      css`
        animation: ${pulseGlow} 2s ease-in-out infinite;
      `}
  }
`;

export const MobileToggle = styled.button`
  display: none;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 8px 12px;
  color: ${colors.textSecondary};
  cursor: pointer;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const InputWrapper = styled.div`
  padding: 6px;

  @media (max-width: 768px) {
    padding: 3px;
  }
`;

// Sticky Indicator
export const StickyIndicator = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? 'flex' : 'none')};
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
    border-radius: 20px;
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
    animation: ${slideFromTop} 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 101;

    svg {
      width: 12px;
      height: 12px;
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: ${colors.primary};
    }
  }
`;

// Mobile Calculator Dropdown
export const MobileCalculatorDropdown = styled.div`
  display: none;
  margin-bottom: 8px;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const DropdownHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    background: rgba(20, 184, 166, 0.1);
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }
`;

export const DropdownIcon = styled.div`
  color: ${colors.primary};
  flex-shrink: 0;
`;

export const DropdownContent = styled.div`
  flex: 1;
  text-align: left;
`;

export const DropdownTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1px;
`;

export const DropdownSubtitle = styled.div`
  font-size: 0.8rem;
  color: ${colors.textSecondary};
  opacity: 0.8;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${colors.cardBackground};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  margin-top: 2px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.show ? '0' : '-10px')});
  transition: all 0.3s ease;
`;

export const DropdownMenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: ${(props) => (props.active ? 'rgba(20, 184, 166, 0.1)' : 'transparent')};
  border: none;
  color: ${(props) => (props.active ? colors.primary : colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background: rgba(20, 184, 166, 0.1);
    color: ${colors.primary};
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const DropdownMenuContent = styled.div`
  flex: 1;
`;

export const DropdownMenuTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1px;
`;

export const DropdownMenuSubtitle = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
`;

// Input Rows for Both Desktop and Mobile
export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
  align-items: start;

  @media (max-width: 768px) {
    gap: 4px;
    margin-bottom: 4px;
  }
`;

// Full Width Input Row for single fields
export const InputRowFull = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

// More Options Toggle
export const MoreOptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

export const MoreOptionsToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 4px 6px;
  color: ${colors.textSecondary};
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
    background: rgba(20, 184, 166, 0.05);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 3px 5px;
  }
`;

export const InputContainer = styled.div`
  /* Base container for different calculator inputs */
`;

export const InputGrid = styled.div`
  display: grid;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  max-width: 100%;
  min-width: 0; /* Allows flex items to shrink below content size */

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 2px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    gap: 3px;
    white-space: normal; /* Allow wrapping on mobile if needed */
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 3px 4px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.text};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }

  &::placeholder {
    color: ${colors.textMuted};
  }

  @media (max-width: 768px) {
    padding: 2px 3px;
    font-size: 0.8rem;
    border-radius: 6px;
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 0.8rem;
  font-weight: 500;
  display: none;

  &.error-message {
    display: block;
  }
`;

// Results Panel with dynamic spacing for sticky panel
export const ResultsPanel = styled.div`
  background: ${colors.cardBackground};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    overflow-x: auto;
    margin-top: ${(props) => (props.stickyOffset ? '480px' : '70px')}; /* Dynamic spacing */
  }
`;

export const CalculatorContent = styled.div`
  padding: 16px;
  animation: ${fadeInScale} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 6px 4px;
    padding-top: 0px !important;
  }
`;

// Expandable Sections
export const ExpandableSection = styled.div`
  margin-bottom: 16px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.3);
  width: 100%;
  contain: layout;

  @media (max-width: 768px) {
    margin-bottom: 8px;
    border-radius: 12px;
  }
`;

export const SectionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: ${colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(20, 184, 166, 0.05);
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
  }
`;

export const SectionHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const SectionIcon = styled.div`
  color: ${colors.primary};
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const ExpandIcon = styled.div`
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.rotated ? 180 : 0)}deg);
  color: ${colors.primary};
`;

export const SectionContent = styled.div`
  max-height: ${(props) => (props.expanded ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: ${(props) => (props.expanded ? '0 12px 12px' : '0 12px 0')};
  will-change: max-height;

  @media (max-width: 768px) {
    padding: ${(props) => (props.expanded ? '0 8px 8px' : '0 8px 0')};
  }
`;

// Extra Payments Grid
export const ExtraPaymentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 6px;
    margin-bottom: 8px;
  }
`;

export const PayoffSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

export const PayoffCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
  border-radius: 12px;
  color: white;

  @media (max-width: 768px) {
    padding: 6px;
    gap: 6px;
    border-radius: 8px;
  }
`;

export const PayoffIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }
`;

export const PayoffContent = styled.div`
  flex: 1;
`;

export const PayoffLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 2px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1px;
  }
`;

export const PayoffValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Loan Summary
export const LoanSummaryContainer = styled.div`
  #loanSummary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;

    .loan-summary-item {
      padding: 10px;
      background: rgba(20, 184, 166, 0.1);
      border: 1px solid rgba(20, 184, 166, 0.3);
      border-radius: 12px;
      text-align: center;

      h3 {
        font-size: 0.9rem;
        color: ${colors.textSecondary};
        margin: 0 0 4px 0;
      }

      p {
        font-size: 1.5rem;
        font-weight: 700;
        color: ${colors.primary};
        margin: 0;
      }
    }
  }
`;

// Schedule Section
export const ScheduleSection = styled.div`
  // margin-top: 32px;
  @media (max-width: 768px) {
    overflow-x: auto;
    width: 100%;
    margin-top: 20px;
  }
`;

export const ScheduleHeader = styled.div`
  padding: 10px 12px;
  // border-bottom: 1px solid ${colors.border};
  padding-top: 0px !important;

  @media (max-width: 768px) {
    padding: 6px 4px;
    padding-top: 0px !important;
  }
`;

export const ScheduleTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${colors.text};

  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 8px;
  }
`;

export const ScheduleContainer = styled.div`
  padding: 12px;
  padding-top: 0px !important;
  max-height: 600px;
  overflow-y: auto;

  /* Custom scrollbar styling to match theme */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(51, 65, 85, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary});
    box-shadow: 0 0 8px rgba(20, 184, 166, 0.3);
  }

  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: ${colors.primary} rgba(51, 65, 85, 0.3);

  @media (max-width: 768px) {
    padding: 4px 2px;
    max-height: none;
    overflow-y: visible;
  }

  #schedule {
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;

      @media (max-width: 768px) {
        width: 100%;
        table-layout: fixed;
        overflow-x: hidden;
        white-space: normal;
        font-size: 0.6rem;
      }

      thead {
        @media (max-width: 768px) {
          display: table-header-group;
        }
      }

      tbody,
      tr {
        @media (max-width: 768px) {
          display: table-row-group;
        }
      }

      tr {
        @media (max-width: 768px) {
          margin-bottom: 0;
          border: none;
          border-radius: 0;
          overflow: visible;
          display: table-row;
          padding: 0;
        }
      }

      th {
        background: ${colors.surface};
        color: ${colors.text};
        padding: 6px 4px;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid ${colors.border};

        @media (max-width: 768px) {
          display: table-cell;
          padding: 2px 1px;
          border: 1px solid ${colors.borderLight};
          text-align: center;
          font-size: 0.6rem;
          word-break: break-word;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 768px) {
          &:nth-child(1) {
            width: 15%;
          }
          &:nth-child(2) {
            width: 22%;
          }
          &:nth-child(3) {
            width: 21%;
          }
          &:nth-child(4) {
            width: 21%;
          }
          &:nth-child(5) {
            width: 21%;
          }
        }
      }

      td {
        padding: 5px 4px;
        border-bottom: 1px solid ${colors.borderLight};
        color: ${colors.textSecondary};

        @media (max-width: 768px) {
          display: table-cell;
          padding: 2px 1px;
          border: 1px solid ${colors.borderLight};
          text-align: center;
          font-size: 0.6rem;
          word-break: break-word;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 768px) {
          &:nth-child(1) {
            width: 15%;
          }
          &:nth-child(2) {
            width: 22%;
          }
          &:nth-child(3) {
            width: 21%;
          }
          &:nth-child(4) {
            width: 21%;
          }
          &:nth-child(5) {
            width: 21%;
          }
        }

        @media (max-width: 768px) {
          &::before {
            content: none;
          }
        }
      }

      tr:hover {
        background: rgba(20, 184, 166, 0.05);
      }

      .initial-balance {
        background: rgba(20, 184, 166, 0.1);
        font-weight: 600;
      }

      .balloon-row {
        background: rgba(245, 158, 11, 0.1);
        font-weight: 600;
      }

      @media (max-width: 768px) {
        tr td:first-child {
          background-color: transparent;
          border-bottom: 1px solid ${colors.borderLight};
          padding: 4px 2px;
          font-size: 0.6rem;
          justify-content: center;
        }
      }
    }
  }
`;

// Results Section
export const ResultsSection = styled.div`
  text-align: center;
`;

export const ResultsHeader = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const ResultsTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${colors.text};

  @media (max-width: 768px) {
    font-size: 1.4rem;
    gap: 8px;
    margin-bottom: 8px;
  }
`;

export const ResultsSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${colors.textSecondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ResultCard = styled.div`
  padding: 16px 12px;
  background: ${(props) =>
    props.highlight
      ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
      : 'rgba(15, 23, 42, 0.5)'};
  border: 1px solid ${(props) => (props.highlight ? colors.primary : colors.border)};
  border-radius: 16px;
  color: ${(props) => (props.highlight ? 'white' : colors.text)};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  ${(props) =>
    props.highlight &&
    css`
      animation: ${pulseGlow} 3s ease-in-out infinite;
    `}

  @media (max-width: 768px) {
    padding: 10px 8px;
    border-radius: 12px;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const ResultCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    gap: 4px;
    margin-bottom: 6px;
  }
`;

export const ResultCardIcon = styled.div`
  color: ${(props) => (props.theme?.highlight ? 'rgba(255, 255, 255, 0.9)' : colors.primary)};
`;

export const ResultCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ResultCardValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 6px;
  }
`;

// Legacy support for old styles (to prevent breaking changes)
export const Container = styled.div`
  min-height: 100vh;
  background: ${colors.background};
  color: ${colors.text};
`;

export const Header = styled.div`
  padding: 10px;
  background: ${colors.cardBackground};
  // border-bottom: 1px solid ${colors.border};
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const HeaderTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const MobileTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${colors.text};

  @media (min-width: 769px) {
    display: none;
  }
`;

export const SettingsToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 8px 12px;
  color: ${colors.textSecondary};
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const ArrowIcon = styled.span`
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.rotated ? 180 : 0)}deg);
`;

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: ${colors.text};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Instructions = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${colors.textSecondary};
  margin-bottom: 40px;
`;

export const OutputSection = styled.div`
  text-align: center;
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    color: ${colors.text};
    margin-bottom: 20px;
  }
`;

export const OutputValue = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${colors.primary};
  margin-bottom: 40px;
`;
