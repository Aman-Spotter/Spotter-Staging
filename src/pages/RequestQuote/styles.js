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

const colorShift = keyframes`
  0% { 
    background: linear-gradient(135deg, #40e0d0, #20b2aa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  50% { 
    background: linear-gradient(135deg, #F64673, #e53e3e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  100% { 
    background: linear-gradient(135deg, #40e0d0, #20b2aa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Layout
export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(32, 178, 170, 0.06) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(64, 224, 208, 0.04) 0%, transparent 80%);
    pointer-events: none;
  }
`;

// Background Elements (renamed from FloatingDecorations)
export const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

// Hero Section
export const HeroSection = styled.section`
  padding: 40px 0 80px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 40px 0 60px;
  }

  @media (max-width: 480px) {
    padding: 40px 0 60px;
  }
`;

export const HeroBackground = styled.div`
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(32, 178, 170, 0.06) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(64, 224, 208, 0.04) 0%, transparent 80%);
    pointer-events: none;
  }
`;

// Floating Decorations (kept for backward compatibility, but now same as BackgroundElements)
export const FloatingDecorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
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
    ];

    const pos = positions[position % positions.length];
    return Object.entries(pos)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n');
  }}
`;

// Container
export const Container = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: left;
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

// Header
export const Header = styled.div`
  text-align: center;
  // margin-bottom: 80px;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(26, 35, 50, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 50px;
  padding: 8px 18px;
  margin-bottom: 16px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BadgeIcon = styled.span`
  color: #40e0d0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin-bottom: 24px;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-top: 76px;
  }
`;

export const Highlight = styled.span`
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

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  line-height: 1.6;
  margin-bottom: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  &.apps-grid-label + & {
    margin-top: 8px;
    margin-bottom: 0;

    @media (max-width: 480px) {
      margin-top: 4px;
    }
  }
`;

// Form Container
export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 1400px;
  margin: 0 auto;

  /* Scale approach for large screens */
  @media (min-width: 1920px) {
    transform: scale(1.3);
    margin: 80px auto;
  }

  @media (min-width: 1680px) and (max-width: 1919px) {
    transform: scale(1.2);
    margin: 60px auto;
  }

  @media (min-width: 1440px) and (max-width: 1679px) {
    transform: scale(1);
    margin: 40px auto;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    transform: scale(1);
    margin: 20px auto;
  }

  @media (max-width: 768px) {
    padding: 14px;
    margin: 0 16px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin: 0 12px;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
  position: relative;
  z-index: 2;

  /* Ultra-wide and very large screens (2560px+) */
  @media (min-width: 2560px) {
    gap: 32px 48px;
  }

  /* Very large screens (1920px-2559px) */
  @media (min-width: 1920px) and (max-width: 2559px) {
    gap: 24px 40px;
  }

  /* Large screens (1680px-1919px) */
  @media (min-width: 1680px) and (max-width: 1919px) {
    gap: 20px 36px;
  }

  /* Medium-large screens (1440px-1679px) */
  @media (min-width: 1440px) and (max-width: 1679px) {
    gap: 18px 32px;
  }

  /* Medium desktop screens (1280px-1439px) */
  @media (min-width: 1280px) and (max-width: 1439px) {
    gap: 16px 28px;
  }

  /* Small desktop screens (1024px-1279px) */
  @media (min-width: 1024px) and (max-width: 1279px) {
    gap: 14px 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 3px;
  }

  @media (max-width: 480px) {
    gap: 3px;
  }

  /* Full width sections */
  &.full-width {
    grid-column: 1 / -1;
  }

  /* Products grid takes full width */
  &:has(> .apps-grid-label) {
    grid-column: 1 / -1;
  }

  /* Message field takes full width */
  &:has(textarea) {
    grid-column: 1 / -1;
  }

  /* Submit section takes full width */
  &:has(button) {
    grid-column: 1 / -1;
    margin-top: 4px;
  }

  /* Error message takes full width */
  &:has(.error-message) {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 2px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const RequiredAsterisk = styled.span`
  color: #ef4444;
  margin-left: 2px;
  font-weight: 600;
`;

// Input Styles
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #64748b;
  z-index: 3;
  pointer-events: none;
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    left: 8px;
    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 480px) {
    left: 6px;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  background: #ffffff;
  border: 1px solid ${({ hasError }) => (hasError ? '#f84960' : '#e2e8f0')};
  border-radius: 6px;
  color: #1e293b;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 8px 8px 8px 36px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 6px 6px 6px 32px;
    font-size: 0.75rem;
  }

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#f84960' : '#40e0d0')};
    box-shadow: 0 0 0 2px
      ${({ hasError }) => (hasError ? 'rgba(248, 73, 96, 0.1)' : 'rgba(64, 224, 208, 0.1)')};
  }

  &:focus + ${InputIcon} {
    color: ${({ hasError }) => (hasError ? '#f84960' : '#40e0d0')};
  }

  &:hover:not(:focus) {
    border-color: ${({ hasError }) => (hasError ? '#f84960' : '#cbd5e1')};
  }
`;

// Textarea Styles
export const TextareaWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const TextareaIcon = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  color: #64748b;
  z-index: 3;
  pointer-events: none;
  transition: all 0.3s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    top: 8px;
    left: 8px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 10px 10px 40px;
  background: #ffffff;
  border: 1px solid ${({ hasError }) => (hasError ? '#f84960' : '#e2e8f0')};
  border-radius: 6px;
  color: #1e293b;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  resize: vertical;
  min-height: 50px;
  max-height: 80px;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 8px 8px 8px 36px;
    font-size: 0.8rem;
    min-height: 40px;
    max-height: 60px;
  }

  @media (max-width: 480px) {
    padding: 6px 6px 6px 32px;
    font-size: 0.75rem;
    min-height: 35px;
    max-height: 50px;
  }

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#f84960' : '#40e0d0')};
    box-shadow: 0 0 0 3px
      ${({ hasError }) => (hasError ? 'rgba(248, 73, 96, 0.1)' : 'rgba(64, 224, 208, 0.1)')};
  }

  &:focus + ${TextareaIcon} {
    color: ${({ hasError }) => (hasError ? '#f84960' : '#40e0d0')};
  }

  &:hover:not(:focus) {
    border-color: ${({ hasError }) => (hasError ? '#f84960' : '#cbd5e1')};
  }
`;

// Apps Grid
export const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-top: 4px;
  padding: ${({ hasError }) => (hasError ? '2px' : '0')};
  border: ${({ hasError }) => (hasError ? '1px solid #f84960' : 'none')};
  border-radius: ${({ hasError }) => (hasError ? '6px' : '0')};
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

export const AppCard = styled.label`
  background: #ffffff;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#40e0d0' : '#e2e8f0')};
  border-radius: 6px;
  padding: 8px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  background-color: ${({ isSelected }) => (isSelected ? '#f0fdfa' : '#ffffff')};

  @media (max-width: 768px) {
    padding: 6px;
    gap: 4px;
  }

  @media (max-width: 480px) {
    padding: 4px;
    gap: 3px;
  }

  &:hover {
    border-color: ${({ isSelected, isDisabled }) =>
      isDisabled ? '#e2e8f0' : isSelected ? '#40e0d0' : '#cbd5e1'};
    background-color: ${({ isSelected, isDisabled }) =>
      isDisabled ? '#ffffff' : isSelected ? '#f0fdfa' : '#f8fafc'};
  }

  input[type='checkbox'] {
    display: none;
  }
`;

export const AppCardGlow = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #40e0d0, #20b2aa);
  border-radius: 18px;
  opacity: ${({ isSelected }) => (isSelected ? 0.4 : 0)};
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(4px);
`;

export const AppIcon = styled.div`
  color: ${({ isSelected, isDisabled }) =>
    isDisabled ? '#94a3b8' : isSelected ? '#40e0d0' : '#64748b'};
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const AppInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AppName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ isDisabled }) => (isDisabled ? '#94a3b8' : '#1e293b')};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const AppDescription = styled.div`
  font-size: 0.7rem;
  color: ${({ isDisabled }) => (isDisabled ? '#cbd5e1' : '#64748b')};
  line-height: 1.2;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const AppCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#40e0d0' : '#d1d5db')};
  border-radius: 3px;
  background-color: ${({ isSelected }) => (isSelected ? '#40e0d0' : '#ffffff')};
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 10px;
    height: 10px;
    color: white;
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
  }
`;

// Submit Button
export const SubmitButton = styled.button`
  background: ${({ disabled }) => (disabled ? '#94a3b8' : '#40e0d0')};
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  min-height: 44px;
  margin: 16px 0 0 0;
  width: 100%;
  box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 3px 10px rgba(64, 224, 208, 0.3)')};

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.95rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    min-height: 36px;
  }

  &:hover:not(:disabled) {
    background: #20b2aa;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(64, 224, 208, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(64, 224, 208, 0.4);
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isSubmitting }) => (isSubmitting ? spin : 'none')} 1s linear infinite;
  transition: all 0.3s ease;

  svg {
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

export const ErrorMessage = styled.div`
  color: #f84960;
  font-size: 0.75rem;
  font-weight: 400;
  margin-top: 4px;
  margin-bottom: 0;
  line-height: 1.2;
  grid-column: 1 / -1;
`;

// Success Section
export const SuccessSection = styled.section`
  padding: 60px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(64, 224, 208, 0.1) 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const SuccessContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '30px')});
  transition: all 1s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SuccessIcon = styled.div`
  color: #40e0d0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const SuccessTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const SuccessMessage = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const SuccessActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #008080 0%, #f84960 50%, #bcddde 100%);
  background-size: 400% 400%;
  animation: ${colorWave} 6s ease-in-out infinite;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 8px 32px rgba(0, 128, 128, 0.4), 0 4px 16px rgba(248, 73, 96, 0.3);
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;
