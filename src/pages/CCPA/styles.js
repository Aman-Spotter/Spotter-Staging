import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Layout
export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #061830 0%, #043344 100%);
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;

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

  // Add floating decorations
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    right: 10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 15px;
    width: calc(100% - 30px); // Ensure container doesn't exceed viewport
    max-width: calc(100vw - 30px); // Prevent overflow
    overflow-x: visible; // Allow dropdown to be visible
    margin-left: 15px;
    margin-right: 15px;
  }

  @media (max-width: 375px) {
    padding: 12px 12px;
    width: calc(100% - 24px);
    max-width: calc(100vw - 24px);
    margin-left: 12px;
    margin-right: 12px;
  }
`;

// Content Section
export const ContentSection = styled.div`
  margin-bottom: 60px;
  color: #ffffff;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 15px;
  }

  @media (max-width: 375px) {
    font-size: 24px;
    margin-bottom: 12px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 40px 0 20px 0;
  color: #ffffff;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 30px 0 15px 0;
  }

  @media (max-width: 375px) {
    font-size: 20px;
    margin: 24px 0 12px 0;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

export const RightsList = styled.ul`
  margin: 30px 0;
  padding: 0;
  list-style: none;
`;

export const RightItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const Bullet = styled.span`
  color: #40e0d0;
  margin-right: 15px;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.6;
  min-width: 15px;

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`;

export const RightText = styled.span`
  font-size: 16px;
  line-height: 1.6;
  flex: 1;

  strong {
    color: #40e0d0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const InfoList = styled.ul`
  margin: 20px 0;
  padding: 0;
  list-style: none;
`;

export const InfoItem = styled.li`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 8px;
  }
`;

// Form Section
export const FormSection = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: visible; // Allow dropdown to be visible

  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 12px;
    margin: 0; // Remove any default margins
  }

  @media (max-width: 375px) {
    padding: 20px 16px;
    border-radius: 10px;
    margin: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$fullWidth ? '1fr' : '1fr 1fr')};
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 375px) {
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: visible; // Allow select dropdown to be visible

  // Ensure select dropdown stays within screen boundaries
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    min-width: 0;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Required = styled.span`
  color: #ff4444;
  font-size: 16px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.$hasError ? '#ff4444' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 16px;
  color: #333333;
  background: #ffffff;
  transition: all 0.2s ease;
  min-height: 44px; // iOS touch target minimum
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? '#ff4444' : '#40e0d0')};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$hasError ? 'rgba(255, 68, 68, 0.1)' : 'rgba(64, 224, 208, 0.1)')};
  }

  &::placeholder {
    color: #999999;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px; // Prevent zoom on iOS
  }

  @media (max-width: 375px) {
    padding: 16px 14px;
    font-size: 16px;
    min-height: 48px; // Slightly larger for very small screens
  }
`;

export const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.$hasError ? '#ff4444' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 16px;
  color: #333333;
  background: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 44px; // iOS touch target minimum
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  appearance: none; // Remove default styling
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
  position: relative;
  z-index: 9999; // Ensure dropdown appears above all other elements

  // Ensure dropdown stays within screen boundaries
  @media (max-width: 768px) {
    max-width: calc(100vw - 60px); // Prevent overflow on mobile
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? '#ff4444' : '#40e0d0')};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$hasError ? 'rgba(255, 68, 68, 0.1)' : 'rgba(64, 224, 208, 0.1)')};
  }

  option {
    color: #333333;
    background: #ffffff;
    padding: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    padding-right: 40px;
    font-size: 16px;
    background-position: right 16px center;
  }

  @media (max-width: 375px) {
    padding: 16px 14px;
    padding-right: 40px;
    font-size: 16px;
    min-height: 48px; // Slightly larger for very small screens
    background-position: right 14px center;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.$hasError ? '#ff4444' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 16px;
  color: #333333;
  background: #ffffff;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? '#ff4444' : '#40e0d0')};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$hasError ? 'rgba(255, 68, 68, 0.1)' : 'rgba(64, 224, 208, 0.1)')};
  }

  &::placeholder {
    color: #999999;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px; // Prevent zoom on iOS
    min-height: 100px;
  }

  @media (max-width: 375px) {
    padding: 16px 14px;
    font-size: 16px;
    min-height: 100px;
  }
`;

export const ErrorText = styled.span`
  color: #ff4444;
  font-size: 14px;
  margin-top: -4px;
  font-weight: 500;
`;

export const HintText = styled.span`
  color: #999999;
  font-size: 14px;
  margin-top: -4px;
`;

export const SubmitButton = styled.button`
  background: #40e0d0;
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin: 20px auto 0;
  min-height: 48px; // iOS touch target minimum

  &:hover {
    background: #20b2aa;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(64, 224, 208, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 18px 32px;
    font-size: 16px;
    max-width: 100%;
  }

  @media (max-width: 375px) {
    padding: 20px 32px;
    font-size: 16px;
    max-width: 100%;
    min-height: 52px; // Slightly larger for very small screens
    margin: 16px auto 0;
  }
`;

// Success Modal
export const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
`;

export const SuccessModal = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  margin: 20px;
  animation: ${fadeInScale} 0.4s ease-out;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 95%;
  }

  @media (max-width: 375px) {
    padding: 24px 16px;
    width: 95%;
    margin: 16px;
    border-radius: 12px;
  }
`;

export const SuccessIcon = styled.div`
  color: #42ba96;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 768px) {
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

export const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #42ba96;
  margin-bottom: 16px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SuccessMessage = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 25px;
  }
`;

export const ContinueButton = styled.button`
  background: #42ba96;
  color: #ffffff;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  min-height: 44px; // iOS touch target minimum

  &:hover {
    background: #369870;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(66, 186, 150, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    min-width: 140px;
  }

  @media (max-width: 375px) {
    padding: 18px 32px;
    min-width: 160px;
    min-height: 48px; // Slightly larger for very small screens
  }
`;
