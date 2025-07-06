import styled from 'styled-components';
import ReactSelect from 'react-select';
import PhoneInput from 'react-phone-number-input/input';
import { List, AutoSizer } from 'react-virtualized';
import img from '../../assets/svgs/asterisk.svg';

export const Wrapper = styled.div`
  background-color: ${({ lightMode }) => (lightMode ? 'rgb(255, 255, 255)' : 'rgb(4, 40, 60)')};
  width: 100%;
  max-width: 888px;
  padding: 44px 30px;
  box-shadow: rgb(0 0 0 / 8%) 0px 8px 16px;
  border-radius: 4px;
  ${({ lightMode }) => (lightMode ? '' : 'border: 0.5px solid rgb(1, 99, 105);')}

  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-box-shadow: none;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const InputWarp = styled.div`
  position: relative;
  margin-bottom: 10px;
  span {
    content: '';
    position: absolute;
    right: ${({ select }) => (select ? '28px' : '8px')};
    top: ${({ select }) => (select ? '33%' : '33%')};
    bottom: 0;
    width: 15px;
    height: 10px;
    background-image: url(${img});
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    margin: 0px;
  }
`;

export const PhoneFormInput = styled(PhoneInput)`
  padding: 10px 20px 10px 10px;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;
  font-size: 16px;
  border: none;
  color: #242424;
  background-color: rgb(238, 238, 238);
  width: 100%;

  &::placeholder {
    color: #24242480;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;
export const FormInput = styled.input`
  padding: 10px 20px 10px 10px;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;
  font-size: 16px;
  border: none;
  color: #242424;
  background-color: rgb(238, 238, 238);
  width: 100%;

  &::placeholder {
    color: #24242480;
  }

  &:-webkit-autofill {
    color: #242424 !important;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const Dropdown = styled(ReactSelect)`
  background-color: rgb(238, 238, 238) !important;
  .react-select__control {
    width: 100px;
    background-color: rgb(238, 238, 238) !important;
    border: solid 1px ${(props) => props.theme.colors.primaryBorderColor} !important;
    box-shadow: none !important;
  }

  .react-select__indicator .react-select__dropdown-indicator {
    border-color: transparent transparent red;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__menu {
    width: 100px;
    background-color: rgb(238, 238, 238) !important;
    margin-top: 0px;
  }

  .react-select__menu-list {
    background-color: rgb(238, 238, 238) !important;
  }

  .react-select__option {
    font-family: 'Open Sans Regular';
    font-size: 14px;
    color: ${(props) => props.theme.colors.textBlack};
    text-align: left;
    background-color: rgb(238, 238, 238) !important;
  }

  .react-select__option--is-focused {
    color: ${(props) => props.theme.colors.textBlack};
  }

  .react-select__option--is-focused.react-select__option--is-selected {
    color: ${(props) => props.theme.colors.textBlack};
  }

  .react-select__single-value {
    font-family: 'Open Sans Regular';
    font-size: 14px;
    color: ${(props) => props.theme.colors.textBlack};
  }
`;

export const Error = styled.span`
  color: red;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const StyledList = styled(List)`
  overflow: auto;
  height: 200px;
  max-height: 200px;
`;

export const Item = styled.div`
  display: flex;
  padding: 0 10px;
  align-items: center;
  cursor: pointer;
  width: 480px;
  height: 40px;

  &:hover {
    background: #f2f2f2;
  }

  ${({ disabled }) => disabled && 'text-decoration: line-through;'}
`;

export const InputWarpCustom = styled.div`
  position: relative;
  margin-bottom: 10px;

  .react-dropdown-select-dropdown.react-dropdown-select-dropdown-position-bottom.css-vexuo1-DropDown {
    border: ${({ isBorder }) => (isBorder ? '1px solid #ccc' : 'none')};
  }
  div[class$='-menu'] {
    ${({ noMenu }) => (noMenu ? 'display: none' : '')};
  }
`;

export const StyledNoData = styled.div`
  padding: 10px;
  color: #555;
  background: #f2f2f2;
  border-radius: 5px;
  margin: 3px;
`;
// export const PlaceHolder = styled.p`
//   color: #8e8e8e;
// `;

export const StyledAutoSizer = styled(AutoSizer)`
  height: auto;
  .react-dropdown-select-dropdown.react-dropdown-select-dropdown-position-bottom.css-vexuo1-DropDown {
    border: none;
  }
`;

export const InputComponent = styled.input`
  line-height: inherit;
  border: none;
  margin-left: 5px;
  background: transparent;
  padding: 0;
  width: calc(${({ size }) => `${size}ch`} + 5px);
  font-size: smaller;
  ${({ readOnly }) => readOnly && 'cursor: pointer;'}
  :focus {
    outline: none;
  }
`;

export const Label = styled.div`
  text-align: center;
  font-size: 24px;
  @media screen and (max-width: 768px) {
  }
`;
