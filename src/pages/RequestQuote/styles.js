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
    padding: 32px 0 48px;
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
    font-size: 2.2rem;
    margin-top: 48px;
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

export const FormHelperText = styled.p`
  font-size: 0.85rem;
  color: #718096;
  margin: -4px 0 8px 0;
  line-height: 1.4;
`;

// Form Container
export const FormContainer = styled.div`
  background: rgba(10, 25, 47, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 24px;
  padding: 56px;
  position: relative;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
  max-width: 1100px;
  margin: 40px auto;
  width: 90%;

  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px auto;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 20px auto;
    width: calc(100% - 24px);
    border-radius: 16px;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 24px;
  position: relative;
  z-index: 2;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Spanning full width for specific items */
  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: #e2e8f0;
  letter-spacing: 0.2px;
`;

export const RequiredAsterisk = styled.span`
  color: #f87171;
  margin-left: 3px;
  font-weight: 600;
`;

// Input Styles
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  z-index: 3;
  display: flex;
  align-items: center;
  height: 100%;
  pointer-events: none;
  transition: color 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 20px 0 52px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:focus-within + ${InputIcon}, &:not(:placeholder-shown) + ${InputIcon} {
    color: #40e0d0;
  }

  &:focus {
    outline: none;
    border-color: #40e0d0;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 16px rgba(64, 224, 208, 0.2);
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    height: 48px;
    padding: 0 16px 0 48px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;

// Textarea Styles
export const TextareaWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const TextareaIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 18px;
  color: #94a3b8;
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  transition: color 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 128px;
  max-height: 200px;
  padding: 16px 20px 16px 52px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  line-height: 1.6;

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:focus-within + ${TextareaIcon}, &:not(:placeholder-shown) + ${TextareaIcon} {
    color: #40e0d0;
  }

  &:focus {
    outline: none;
    border-color: #40e0d0;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 16px rgba(64, 224, 208, 0.2);
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    min-height: 110px;
    padding: 16px 16px 16px 48px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;

// Apps Grid
export const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 0;
  margin-bottom: 8px;
  padding: ${({ hasError }) => (hasError ? '2px' : '0')};
  border: ${({ hasError }) => (hasError ? '1px solid #f84960' : 'none')};
  border-radius: 12px;
  transition: all 0.2s ease;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const AppCard = styled.label`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
  overflow: hidden;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-color: #40e0d0;
      background: rgba(64, 224, 208, 0.1);
    `}

  &:hover:not(:disabled) {
    border-color: #40e0d0;
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
  }

  input[type='checkbox'] {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
    border-radius: 12px;
  }
`;

export const AppIcon = styled.div`
  color: ${({ isSelected, isDisabled }) =>
    isDisabled ? '#64748b' : isSelected ? '#40e0d0' : '#e2e8f0'};
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const AppInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AppName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ isDisabled }) => (isDisabled ? '#a0aec0' : '#ffffff')};
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const AppDescription = styled.div`
  font-size: 0.85rem;
  color: ${({ isDisabled }) => (isDisabled ? '#a0aec0' : '#cbd5e1')};
  line-height: 1.4;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const AppCheckbox = styled.div`
  margin-left: auto;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#40e0d0' : 'rgba(255, 255, 255, 0.2)')};
  border-radius: 50%;
  background-color: ${({ isSelected }) => (isSelected ? '#40e0d0' : 'transparent')};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
    color: #1a202c;
    opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
    transform: ${({ isSelected }) => (isSelected ? 'scale(1)' : 'scale(0.5)')};
    transition: all 0.2s ease;
  }
`;

// Submit Button
export const SubmitButton = styled.button`
  background: linear-gradient(90deg, #40e0d0, #20b2aa);
  color: white;
  border: none;
  padding: 16px 28px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 54px;
  margin-top: 16px;
  box-shadow: 0 8px 24px rgba(64, 224, 208, 0.25);

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(64, 224, 208, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(64, 224, 208, 0.3);
  }

  @media (max-width: 480px) {
    min-height: 50px;
    padding: 14px 24px;
    font-size: 0.95rem;
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isSubmitting }) => (isSubmitting ? spin : 'none')} 1s linear infinite;

  svg {
    transition: all 0.3s ease;
  }
`;

export const ErrorMessage = styled.div`
  color: #c53030;
  font-size: 0.8rem;
  font-weight: 500;
  min-height: 20px;
  margin-top: 4px;
  margin-bottom: 0;
  line-height: 1.4;
  grid-column: 1 / -1;
  transition: opacity 0.2s, transform 0.2s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  padding-left: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
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

export const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 8px;
`;

export const CountryCodeSelect = styled.select`
  padding: 10px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px 0 0 6px;
  background: #f8fafc;
  color: #1e293b;
  font-size: 0.85rem;
  font-weight: 500;
  outline: none;
  min-width: 90px;
  height: 40px;
  transition: border-color 0.2s;
  &:focus {
    border-color: #40e0d0;
  }
`;

export const FixedCountryCode = styled.span`
  display: flex;
  align-items: center;
  background: #f8fafc;
  color: #1e293b;
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  border-radius: 6px 0 0 6px;
  padding: 0 16px;
  height: 40px;
  user-select: none;
`;
