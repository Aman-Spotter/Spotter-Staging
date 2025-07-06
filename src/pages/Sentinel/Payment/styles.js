import styled, { keyframes, css } from 'styled-components';

// Keyframe animations
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
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

const spin = keyframes`
  to {
    transform: rotate(360deg);
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

// Layout Components
export const PaymentLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow-x: hidden;
`;

export const PaymentBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  z-index: -2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 80%, rgba(0, 128, 128, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.06) 0%, transparent 50%);
    z-index: -1;
  }
`;

// Floating Elements
export const PaymentFloatingElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

export const PaymentParticle = styled.div`
  position: absolute;
  opacity: 0.4;
  animation: ${float}
    ${(props) => (props.speed === 'slow' ? '8s' : props.speed === 'medium' ? '6s' : '4s')} infinite
    linear;
  animation-delay: ${(props) => props.delay};

  ${(props) => {
    const position = props.position % 6;
    const positions = [
      { top: '10%', left: '10%' },
      { top: '20%', left: '80%' },
      { top: '60%', left: '15%' },
      { top: '70%', left: '85%' },
      { top: '40%', left: '90%' },
      { top: '80%', left: '20%' },
    ];
    return css`
      top: ${positions[position].top};
      left: ${positions[position].left};
    `;
  }}

  ${(props) => {
    const size = props.size === 'large' ? '12px' : props.size === 'medium' ? '8px' : '6px';

    if (props.type === 'dollar') {
      return css`
        width: ${size};
        height: ${size};
        background: ${props.color === 'teal' ? '#008080' : '#10b981'};
        border-radius: 50%;
        &::before {
          content: '$';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: ${props.size === 'large' ? '8px' : '6px'};
          font-weight: bold;
        }
      `;
    }
    if (props.type === 'check') {
      return css`
        width: ${size};
        height: ${size};
        background: ${props.color === 'green' ? '#10b981' : '#059669'};
        border-radius: 50%;
        &::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: ${props.size === 'large' ? '6px' : '4px'};
        }
      `;
    }
    if (props.type === 'shield') {
      return css`
        width: ${size};
        height: ${size};
        background: ${props.color === 'blue' ? '#3b82f6' : '#2563eb'};
        clip-path: polygon(50% 0%, 0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%);
      `;
    }
    if (props.type === 'lock') {
      return css`
        width: ${size};
        height: ${size};
        background: ${props.color === 'purple' ? '#8b5cf6' : '#7c3aed'};
        border-radius: 2px;
        &::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 25%;
          width: 50%;
          height: 40%;
          border: 1px solid ${props.color === 'purple' ? '#8b5cf6' : '#7c3aed'};
          border-bottom: none;
          border-radius: 50% 50% 0 0;
        }
      `;
    }
    return css`
      width: ${size};
      height: ${size};
      background: ${props.color === 'teal' ? '#008080' : '#10b981'};
      border-radius: 50%;
    `;
  }}
`;

// Container Components
export const PaymentContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    padding: 100px 1rem 2rem;
  }
`;

export const PaymentContent = styled.div`
  width: 100%;
  animation: ${(props) => (props.isVisible ? fadeInUp : 'none')} 0.8s ease-out;
  opacity: 1;
  transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition: all 0.8s ease-out;
`;

// Development Notice
export const DevNotice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #fef3cd;
  border: 1px solid #f59e0b;
  border-radius: 0.75rem;
  color: #92400e;
  margin-bottom: 2rem;
  font-size: 0.9rem;

  svg {
    color: #f59e0b;
    margin-top: 0.1rem;
    flex-shrink: 0;
  }

  strong {
    color: #78350f;
  }

  small {
    color: #a16207;
    font-size: 0.8rem;
  }
`;

// Header Components
export const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  margin-bottom: 2rem;

  &:hover {
    color: #008080;
    background: rgba(0, 128, 128, 0.05);
    transform: translateX(-4px);
  }
`;

export const PaymentTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

export const PaymentHighlight = styled.span`
  background: linear-gradient(135deg, #008080 0%, #20b2aa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const PaymentSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

// Main Content Layout
export const PaymentMainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: start;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 800px;
  }
`;

export const PaymentFormSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 128, 128, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #008080, #20b2aa);
    border-radius: 1rem 1rem 0 0;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

// Progress Steps
export const ProgressSteps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  position: relative;
`;

export const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
`;

export const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => (props.active || props.completed ? '#008080' : '#e5e7eb')};
  color: ${(props) => (props.active || props.completed ? 'white' : '#9ca3af')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
`;

export const StepLabel = styled.span`
  font-size: 0.875rem;
  color: ${(props) => (props.active || props.completed ? '#008080' : '#6b7280')};
  font-weight: 500;
`;

export const ProgressLine = styled.div`
  flex: 1;
  height: 2px;
  background: #e5e7eb;
  margin: 0 2rem;
  position: relative;
  top: -1.25rem;
`;

// Email Step
export const EmailStep = styled.div`
  animation: ${(props) => (props.isVisible ? fadeInUp : 'none')} 0.6s ease-out;
`;

export const EmailInputContainer = styled.div`
  margin-bottom: 2rem;
`;

export const NameRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const NameInputContainer = styled.div`
  flex: 1;
  margin-bottom: 0;

  @media (max-width: 640px) {
    margin-bottom: 2rem;
  }
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
`;

export const EmailInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${(props) => (props.hasError ? '#ef4444' : '#e5e7eb')};
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #008080;
    box-shadow: 0 0 0 4px rgba(0, 128, 128, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ErrorText = styled.span`
  display: block;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const ContinueButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'loading',
})`
  width: 100%;
  padding: 1rem 2rem;
  background: ${(props) => (props.disabled ? '#9ca3af' : '#008080')};
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: #006666;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 128, 128, 0.2);
  }
`;

export const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 0.8s linear infinite;
`;

// Payment Step
export const PaymentStep = styled.div`
  animation: ${(props) => (props.isVisible ? fadeInUp : 'none')} 0.6s ease-out;
`;

export const BackToEmailButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  padding: 0.5rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: #008080;
    background: rgba(0, 128, 128, 0.05);
    transform: translateX(-4px);
  }
`;

// Payment Form Components
export const PaymentFormContainer = styled.div`
  width: 100%;
`;

export const PaymentFormWrapper = styled.form`
  width: 100%;
`;

export const PaymentElementContainer = styled.div`
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #008080;
    box-shadow: 0 0 0 4px rgba(0, 128, 128, 0.1);
  }
`;

export const PaymentErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.75rem;
  color: #dc2626;
  margin-bottom: 1.5rem;
`;

export const PaymentErrorMessage = styled.span`
  font-size: 0.9rem;
`;

export const PaymentSubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${(props) => (props.disabled ? '#9ca3af' : props.ready ? '#008080' : '#b8c5c9')};
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  opacity: ${(props) => (props.ready ? 1 : 0.7)};
  transform: ${(props) => (props.ready ? 'translateY(-2px)' : 'translateY(0)')};

  &:hover:not(:disabled) {
    background: #006666;
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 128, 128, 0.2);
  }
`;

export const PaymentSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 0.8s linear infinite;
`;

export const PaymentSecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;

  svg {
    color: #10b981;
  }
`;

// Summary Section
export const PaymentSummarySection = styled.div`
  @media (max-width: 1024px) {
    order: -1;
  }
`;

export const SummaryCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 128, 128, 0.1);
  position: sticky;
  top: 2rem;
  animation: ${(props) => (props.isVisible ? fadeInUp : 'none')} 0.8s ease-out 0.2s;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const SummaryHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

export const PriceBadge = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #008080, #20b2aa);
  border-radius: 0.75rem;
  color: white;
`;

export const Currency = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const Amount = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;

export const Period = styled.span`
  font-size: 1rem;
  opacity: 0.9;
`;

export const SavingsNote = styled.div`
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 0.5rem;
  color: #059669;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`;

// Features
export const SummaryFeatures = styled.div`
  margin-bottom: 2rem;
`;

export const FeaturesTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const FeatureIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  svg {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

export const FeatureText = styled.span`
  font-size: 0.9rem;
  color: #4b5563;
`;

export const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 0.5rem;
  color: #0369a1;
  font-size: 0.875rem;
  font-weight: 500;
`;

// Error Container
export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.75rem;
  color: #dc2626;
  margin-top: 1.5rem;
`;

export const ErrorMessage = styled.span`
  font-size: 0.9rem;
`;
