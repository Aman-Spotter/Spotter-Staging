import styled from 'styled-components';

export const AutoComplete = styled.div`
  width: 100%;
  position: relative;
`;

export const FormInput = styled.input`
  background-color: #f1f1f1;
  font-family: 'Open Sans Regular';
  font-size: ${({ fontSize }) => fontSize || '12px'};
  color: ${({ color }) => color || '#000'};
  text-align: center;
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: transparent;
  height: 30px;
  &::placeholder {
    font-family: 'Open Sans Regular';
    color: ${({ placeholderColor }) => placeholderColor || '#ffffff'};
  }
`;

export const SpinContainer = styled.div`
  position: absolute;
  color: gray;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

export const SpinIcon = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const OptionContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: calc(100% + 5px);
  width: 100%;
  max-height: 300px;
  background-color: #282b33;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 0 2px 5px rgb(0 0 0 / 15%);

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-color: #f0f0f0;
  }
`;

export const Option = styled.div`
  padding: 10px 5px;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  color: ${({ color }) => color || '#cad4de'};
  &:hover {
    background-color: ${({ bgColor }) => bgColor || '#4B566D'};
  }
  &.selected,
  &:active {
    background-color: #4b566d;
    color: #cad4de;
  }
`;

export const ItemContainer = styled.div`
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border-radius: 5px;
  border: 1px solid transparent;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '60px'};
  padding: ${({ padding }) => padding || '15px'};
  display: flex;
  align-items: center;
  &:hover {
    border-color: ${({ borderColor }) => borderColor || '#4b5159'};
  }
  &:active {
    border: 2px solid #008080;
  }
`;

export const Overlay = styled.div`
  min-width: 300px;
  width: ${({ width }) => width || '100%'};
  border-radius: 10px;
  background-color: #606873;
  overflow: hidden;
  color: #ffffff;
  & > div {
    color: #ffffff;
  }
  hr {
    background-color: #77808c;
    border: none;
    height: 0.1px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    min-width: 100%;
  }
`;
