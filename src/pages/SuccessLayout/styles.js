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
