import styled from 'styled-components';

export const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.teal};
  position: relative;
  padding-top: 65px;
  @media screen and (max-width: 768px) {
    padding-top: 50px;
  }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1500px;
  margin-right: auto;
  margin-left: auto;
  padding: 74px 50px;
  position: relative;
  min-height: calc(100vh - 320px);

  @media screen and (max-width: 768px) {
    padding: 30px 20px;
    min-height: calc(100vh - 500px);
  }
`;

export const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  width: 100%;
  max-width: 888px;
  padding: 44px 30px;
  box-shadow: rgb(0 0 0 / 8%) 0px 8px 16px;
  border-radius: 4px;
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
    margin: 0px;
  }
`;

export const Error = styled.span`
  color: red;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
