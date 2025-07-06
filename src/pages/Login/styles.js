import styled, { keyframes, css } from 'styled-components';
import ReactSelect from 'react-select';

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
    box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(64, 224, 208, 0.6);
  }
`;

const dividerPulse = keyframes`
  0%, 100% {
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(64, 224, 208, 0.3) 50%, 
      transparent 100%);
  }
  50% {
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(64, 224, 208, 0.8) 50%, 
      transparent 100%);
  }
`;

// Main Container
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #061830 0%, #043344 30%, #2d3e50 70%, #34495e 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// Background Elements
export const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const FloatingElement = styled.div`
  position: absolute;
  width: ${({ type }) => (type === 'circle' ? '16px' : type === 'square' ? '14px' : '12px')};
  height: ${({ type }) => (type === 'circle' ? '16px' : type === 'square' ? '14px' : '12px')};
  background: rgba(64, 224, 208, 0.3);
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : type === 'square' ? '3px' : '0')};
  clip-path: ${({ type }) =>
    type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
  animation: ${float} ${({ position }) => 8 + (position % 4)}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay};
  top: ${({ position }) => 10 + position * 8}%;
  left: ${({ position }) => 5 + position * 8}%;
  opacity: 0.6;

  @media (max-width: 768px) {
    display: ${({ position }) => (position > 6 ? 'none' : 'block')};
  }
`;

// Split Container
export const SplitContainer = styled.div`
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 40px 40px;
  gap: 0;
  position: relative;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '40px')});
  transition: all 1.2s ease 0.3s;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 100px 20px 20px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    padding: 90px 10px 10px;
  }
`;

// Login Sections
export const LoginSection = styled.div`
  flex: 1;
  background: rgba(26, 35, 50, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid
    ${({ variant }) => (variant === 'tms' ? 'rgba(64, 224, 208, 0.2)' : 'rgba(248, 73, 96, 0.2)')};
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible, variant }) => {
    if (!isVisible) {
      return variant === 'tms' ? 'translateX(-30px)' : 'translateX(30px)';
    }
    return 'translateX(0)';
  }};
  animation-delay: ${({ delay }) => delay};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ variant }) =>
      variant === 'tms'
        ? 'linear-gradient(90deg, #40e0d0, #20b2aa)'
        : 'linear-gradient(90deg, #f84960, #ff6b7a)'};
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: ${({ variant }) =>
      variant === 'tms' ? 'rgba(64, 224, 208, 0.6)' : 'rgba(248, 73, 96, 0.6)'};
    box-shadow: ${({ variant }) =>
      variant === 'tms'
        ? '0 20px 60px rgba(64, 224, 208, 0.2)'
        : '0 20px 60px rgba(248, 73, 96, 0.2)'};
  }

  @media (max-width: 1024px) {
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 20px;
  }
`;

export const SectionGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: ${({ variant }) =>
    variant === 'tms'
      ? 'radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(248, 73, 96, 0.1) 0%, transparent 70%)'};
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

export const SectionContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: space-between;
  min-height: 500px;

  @media (max-width: 768px) {
    min-height: 400px;
  }
`;

export const SectionIcon = styled.div`
  margin-bottom: 24px;
  transition: all 0.3s ease;

  ${LoginSection}:hover & {
    transform: scale(1.1);
    filter: ${({ variant }) =>
      variant === 'tms'
        ? 'drop-shadow(0 8px 24px rgba(64, 224, 208, 0.4))'
        : 'drop-shadow(0 8px 24px rgba(248, 73, 96, 0.4))'};
  }
`;

export const IconSVG = styled.svg`
  width: 60px;
  height: 40px;

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
    width: 50px;
    height: 33px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ variant }) => (variant === 'tms' ? '#40e0d0' : '#f84960')};
  margin-bottom: 12px;
  transition: all 0.3s ease;

  ${LoginSection}:hover & {
    transform: translateY(-2px);
    text-shadow: ${({ variant }) =>
      variant === 'tms'
        ? '0 4px 16px rgba(64, 224, 208, 0.4)'
        : '0 4px 16px rgba(248, 73, 96, 0.4)'};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 24px;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
    gap: 10px;
  }
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  svg {
    color: rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }

  ${LoginSection}:hover & {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);

    svg {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 0.8rem;
  }
`;

export const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  background: ${({ variant }) =>
    variant === 'tms'
      ? 'linear-gradient(135deg, #40e0d0, #20b2aa)'
      : 'linear-gradient(135deg, #f84960, #ff6b7a)'};
  border-radius: 16px;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 250px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  ${LoginSection}:hover & {
    transform: translateY(-2px);
    box-shadow: ${({ variant }) =>
      variant === 'tms'
        ? '0 8px 32px rgba(64, 224, 208, 0.4)'
        : '0 8px 32px rgba(248, 73, 96, 0.4)'};

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
    min-width: 200px;
  }
`;

export const ButtonArrow = styled.span`
  font-size: 1.25rem;
  transition: all 0.3s ease;

  ${LoginSection}:hover & {
    transform: translateX(5px);
  }
`;

// Divider
export const Divider = styled.div`
  width: 2px;
  margin: 0 20px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(64, 224, 208, 0.3) 20%,
    rgba(64, 224, 208, 0.6) 50%,
    rgba(64, 224, 208, 0.3) 80%,
    transparent 100%
  );
  position: relative;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${dividerPulse} 3s ease-in-out infinite;
  animation-delay: 1s;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: rgba(64, 224, 208, 0.3);
    border: 2px solid rgba(64, 224, 208, 0.6);
    border-radius: 50%;
    animation: ${glow} 2s ease-in-out infinite;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 2px;
    margin: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(64, 224, 208, 0.3) 20%,
      rgba(64, 224, 208, 0.6) 50%,
      rgba(64, 224, 208, 0.3) 80%,
      transparent 100%
    );
  }
`;

// Footer
export const Footer = styled.footer`
  padding: 20px 40px;
  text-align: center;
  position: relative;
  z-index: 10;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '20px')});
  transition: all 1s ease 0.8s;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const FooterLink = styled.a`
  color: #40e0d0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: #20b2aa;
    text-shadow: 0 2px 8px rgba(64, 224, 208, 0.4);
  }
`;

export const Form = styled.form`
  width: 480px;
  height: 380px;
  background-color: #f4f7f8;
  box-shadow: 0 8px 16px #e2e2e2;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
    height: 100%;
    row-gap: 50px;
    justify-content: center;
  }
`;

export const ForgotPasswordForm = styled.form`
  width: 480px;
  background-color: #f4f7f8;
  box-shadow: 0 8px 16px #e2e2e2;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
    height: 100%;
    justify-content: center;
    row-gap: 50px;
  }
`;

export const Title = styled.div`
  width: 100%;
  height: 100px;
  font-family: 'Open Sans Bold';
  font-size: 18px;
  color: ${(props) => props.theme.colors.primaryTextColor};
  text-align: center;
  line-height: 100px;
  a {
    text-decoration: none;
    color: #008080;
    font-size: 22px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 20%;
  }
`;

export const FormContent = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;

export const ForgotPasswordFormContent = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const RowContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;

export const Label = styled.div`
  font-family: 'Open Sans Semibold';
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  width: 100px;
  @media screen and (max-width: 768px) {
    text-align: left;
    width: 100%;
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  flex: 1;

  &:hover > div {
    display: block;
  }

  &:hover > button {
    background-color: transparent;
  }
`;

export const DropdownBtn = styled.button`
  background-color: transparent;
  color: #fff;
  padding: 8px 16px;
  font-family: 'Open Sans Regular';
  font-size: 14px;
  border: none;
  cursor: pointer;
  min-width: 120px;
  width: 100%;
  text-align: left;
  border: solid 1px #747b8c;
  border-radius: 4px;
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  padding: 4px 0px;
`;

export const DropdownItem = styled.div`
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  font-family: 'Open Sans Regular';
  font-size: 14px;
  display: block;
  cursor: default;

  &:hover {
    background-color: #d3d3d3;
  }
`;

export const RoleDropdown = styled(ReactSelect)`
  .react-select__control {
    width: 300px;
    background-color: transparent;
    border: solid 1px ${(props) => props.theme.colors.primaryBorderColor} !important;
    box-shadow: none !important;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .react-select__indicator .react-select__dropdown-indicator {
    border-color: transparent transparent red;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__menu {
    width: 300px;
    background-color: ${(props) => props.theme.colors.primaryDropdownMenuBgColor};
    margin-top: 0px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .react-select__menu-list {
  }

  .react-select__option {
    font-family: 'Open Sans Regular';
    font-size: 14px;
    color: ${(props) => props.theme.colors.primaryTextColor};
    text-align: left;
  }

  .react-select__option--is-focused {
    color: ${(props) => props.theme.colors.secondaryTextColor};
  }

  .react-select__option--is-focused .react-select__option--is-selected {
    color: ${(props) => props.theme.colors.primaryTextColor};
  }

  .react-select__single-value {
    font-family: 'Open Sans Regular';
    font-size: 14px;
    color: ${(props) => props.theme.colors.primaryTextColor};
  }

  .react-select__placeholder {
    font-family: 'Open Sans Regular';
    font-size: 14px;
  }
`;

export const Input = styled.input`
  flex: 1;
  font-family: 'Open Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.colors.primaryTextColor};
  border: none;
  border-bottom: solid 1px #a5a8ac;
  outline: none;
  box-shadow: none;
  background-color: transparent !important;
  padding: 4px 12px;

  &:-internal-autofill-selected {
    background-color: transparent !important;
  }
  @media screen and (max-width: 768px) {
    border: solid 1px ${(props) => props.theme.colors.primaryBorderColor};
    padding: 8px 12px;
    border-radius: 4px;
  }
`;

export const Error = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.colors.errorTextColor};
  line-height: 14px;
  margin-left: 100px;
  margin-top: 4px;
  text-align: left;
`;

export const FormActions = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ForgotPasswordFormActions = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 20%;
  }
`;

export const LoginRow = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const LoginBtn = styled.button`
  font-family: 'Open Sans SemiBold';
  font-size: 14px;
  color: ${(props) => props.theme.colors.colors.primaryTextColor};
  border: none;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  background-color: ${(props) => props.theme.colors.colors.teal};
  padding: 8px 16px;
  width: 200px;
  margin-top: 20px;
`;

export const ForgotPasswordBtn = styled.button`
  font-family: 'Open Sans SemiBold';
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  border: none;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  padding: 4px 16px;
  margin-top: 8px;
`;

export const ActionError = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.colors.errorTextColor};
  line-height: 40px;
  height: 40px;
  text-align: center;
`;

export const EmailSentMessage = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  text-align: center;
  margin-bottom: 8px;
`;
