import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 25px;
`;

export const Question = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: black;
  margin-top: 20px;
  line-height: 1;
  span {
    color: ${({ theme }) => theme.colors.teal};
  }
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
