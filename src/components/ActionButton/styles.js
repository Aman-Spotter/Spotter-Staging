import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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

export const Button = styled.button`
  font-family: 'Open Sans SemiBold';
  font-size: 14px;
  color: ${(props) => (props.disabled ? props.theme.colors.secondaryTextColor : '#fff')};
  border: none;
  border-radius: ${(props) => props.borderRadius || '4px'};
  outline: none;
  box-shadow: none;
  background-color: ${(props) =>
    props.disabled
      ? '#4B566D'
      : props.color === 'primary'
      ? props.theme.colors.teal
      : props.color === 'secondary'
      ? props.theme.secondaryButtonBgColor
      : props.theme[props.color] || props.color};
  padding: 8px 16px;
  min-width: 120px;
  height: 30px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: 600;
  margin-left: ${(props) => (props.hasLeftMargin ? '32px' : '0px')};
  height: ${({ height }) => height || '30px'};
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;
