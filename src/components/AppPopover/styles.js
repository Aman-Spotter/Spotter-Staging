import styled from 'styled-components';

export const ItemContainer = styled.div`
  cursor: ${({ isEdit }) => (isEdit ? 'text' : 'pointer')};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border-radius: 10px;
  border: 1px solid ${({ borderColor }) => borderColor || 'transparent'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '54px'};
  padding: ${({ padding }) => padding || '15px'};
  display: flex;
  align-items: center;
  column-gap: 10px;
  position: relative;
  &:hover {
    border-color: ${({ open, borderOnHover }) =>
      borderOnHover ? (open ? '#008080' : '#008080') : 'transparent'};
  }
  @media screen and (max-width: 749px) {
    width: ${({ filled, width }) => (filled ? '100%' : width)};
  }
`;

export const Overlay = styled.div`
  width: ${({ width }) => width || '100%'};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ bgColor }) => bgColor};
  box-shadow: 1px 2px 5px 2px #0000001f;
  display: ${({ noPopover }) => (noPopover ? 'none' : 'block')};
  z-index: 999;
  hr {
    background-color: #77808c;
    border: none;
    height: 0.1px;
  }
`;

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
    height: 20px;
  }
`;

export const DownArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  svg {
    width: 10px;
    height: 10px;
  }
`;

export const CloseWrapper = styled.div`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #008080;
  &:active {
    opacity: 0.5;
  }
`;

export const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
