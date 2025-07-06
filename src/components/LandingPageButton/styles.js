import styled, { keyframes } from 'styled-components';
import { fontSizePercentile } from '../../globalStyles';

const load = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button`
  background: ${({ primary, transparent, disabled, theme }) =>
    disabled
      ? theme.colors.lightGray
      : primary
      ? theme.colors.teal
      : transparent
      ? theme.colors.transparent
      : theme.colors.teal};
  white-space: nowrap;
  padding: ${({ padding }) => padding || '25px 40px'};
  margin: ${({ margin }) => margin || '0px'};

  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  align-self: ${({ alignSelf }) => alignSelf || 'unset'};
  outline: none;
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ borderRadius }) => borderRadius || '0px 18px 0px 0px'};
  font-family: 'Open sans semibold';
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: ${({ iconLeft }) => iconLeft || '20px'};
    vertical-align: middle;
  }

  &:hover {
    transition: all 0.3s ease-out;
    background-color: ${({ theme, disabled }) => !disabled && theme.teal};
  }
  vertical-align: middle;

  @media screen and (max-width: 960px) {
    width: ${({ fixedWidth, width }) => (fixedWidth ? width || 'auto' : '100%')};
    padding: ${({ smPadding, padding }) => smPadding || padding || '25px 40px'};
  }
`;
export const Title = styled.span`
  color: ${({ color }) => color || '#000000'};
  font-size: ${({ fontSize }) => fontSizePercentile(fontSize, 1) || '17px'};
  @media screen and (max-width: 960px) {
    font-size: ${({ fontSize }) => fontSizePercentile(fontSize, 0.7) || '17px'};
  }
`;

export const Loader = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid;
  animation: ${load} 1s infinite linear;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;
