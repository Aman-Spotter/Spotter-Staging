import styled from 'styled-components';
import { ActionButton } from 'components';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export const Wrapper = styled.div`
  background-color: rgb(4, 40, 60);
  border: 0.5px solid rgb(1, 99, 105);
  color: #fff;
  width: 100%;
  max-width: 830px;
  padding: 20px 30px;
  min-height: 550px;
  box-shadow: rgb(0 0 0 / 8%) 0px 8px 16px;
  border-radius: 4px;
  margin: 74px auto;
  display: flex;
  flex-direction: column;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-box-shadow: none;
  }
`;

export const Section = styled.div`
  &:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  margin: 10px 0px;
`;

export const AdminActionButton = styled(ActionButton)`
  width: 70px;
`;

export const Text = styled.p`
  margin: ${({ noMargin }) => (noMargin ? '0px' : '10px 0px')};
  font-size: ${({ small }) => (small ? '12px' : '14px')};
`;

export const CardNumber = styled.span`
  margin-left: 1rem;
  font-size: 14px;
`;

export const InvoiceStatus = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${(props) => props.theme.danger};
  &.paid {
    background-color: ${(props) => props.theme.success};
  }
`;

export const MakeDefaultButton = styled.a`
  margin-right: 1rem;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  color: ${(props) => props.theme.secondaryTextColor};

  &:hover {
    color: ${(props) => props.theme.primaryTextColor};
  }
`;

export const TextCancel = styled.span`
  margin: ${({ noMargin }) => (noMargin ? '0px' : '10px 0px')};
  font-size: 12px;
  cursor: pointer;
  :hover {
    color: #008080;
  }
  text-decoration: underline;
`;
