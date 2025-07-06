import styled, { keyframes } from 'styled-components';

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

const successPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const checkmarkDraw = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

export const SuccessLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow-x: hidden;
`;

export const SuccessBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
  z-index: -2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(0, 128, 128, 0.08) 0%, transparent 50%);
    z-index: -1;
  }
`;

export const SuccessContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 100px 1rem 2rem;
  }
`;

export const SuccessContent = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(16, 185, 129, 0.2);
  text-align: center;
  width: 100%;
  animation: ${(props) => (props.isVisible ? fadeInUp : 'none')} 0.8s ease-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #10b981, #059669);
    border-radius: 1.5rem 1.5rem 0 0;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const SuccessIcon = styled.div`
  color: #10b981;
  margin-bottom: 2rem;
  animation: ${successPulse} 2s ease-in-out infinite;

  svg {
    filter: drop-shadow(0 4px 6px rgba(16, 185, 129, 0.2));
  }
`;

export const SuccessTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

export const SuccessSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

export const PaymentDetails = styled.div`
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 3rem;
  border: 1px solid #e5e7eb;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  svg {
    color: #008080;
    flex-shrink: 0;
  }

  > div {
    flex: 1;
    text-align: left;
  }
`;

export const DetailLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

export const DetailValue = styled.div`
  font-size: 1rem;
  color: #1f2937;
  font-weight: 600;
  margin-top: 0.25rem;
`;

export const NextSteps = styled.div`
  text-align: left;
  margin-bottom: 3rem;
`;

export const NextStepsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 0.75rem;
  border: 1px solid #e0f2fe;
`;

export const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  background: #008080;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

export const StepText = styled.span`
  color: #1f2937;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: #008080;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #006666;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 128, 128, 0.2);
  }
`;

export const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #008080;
    border-color: #008080;
    background: rgba(0, 128, 128, 0.05);
  }
`;

export const SupportNote = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

export const SupportLink = styled.a`
  color: #008080;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Registration Status Components
export const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 12px;
  margin: 20px 0;
  font-size: 16px;

  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #059669;
        `;
      case 'error':
        return `
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #dc2626;
        `;
      case 'info':
      default:
        return `
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #2563eb;
        `;
    }
  }}
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StatusText = styled.div`
  flex: 1;
  line-height: 1.5;

  small {
    font-size: 14px;
    opacity: 0.8;
    display: block;
    margin-top: 4px;
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-top: 2px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
