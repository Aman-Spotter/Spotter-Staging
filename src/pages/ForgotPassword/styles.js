import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: #fefffe;
  display: flex;
  align-items: center;
  justify-content: center;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    color: #ffffff !important;
    transition: color 5000s, background-color 5000s;
    -webkit-box-shadow: none;
    background-color: transparent;
  }
`;

export const Form = styled.form`
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
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;

export const Label = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.secondaryTextColor};
  width: 60px;

  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: left;
  }
`;

export const Input = styled.input`
  flex: 1;
  font-family: 'Open Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.primaryTextColor};
  border: none;
  border-bottom: solid 1px ${(props) => props.theme.primaryBorderColor};
  outline: none;
  box-shadow: none;
  background-color: transparent !important;
  padding: 4px 4px;

  &:-internal-autofill-selected {
    background-color: transparent !important;
  }
  @media screen and (max-width: 768px) {
    border: solid 1px ${(props) => props.theme.primaryBorderColor};
    border-radius: 4px;
    padding: 8px 12px;
  }
`;

export const Error = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.errorTextColor};
  line-height: 14px;
  margin-left: 60px;
  margin-top: 4px;
  text-align: left;
`;

export const FormActions = styled.div`
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

export const ActionError = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.errorTextColor};
  line-height: 40px;
  height: 40px;
  text-align: center;
`;

export const EmailSentMessage = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.info};
  text-align: center;
  margin-bottom: 8px;
`;
