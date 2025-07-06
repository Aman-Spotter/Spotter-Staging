import styled from 'styled-components';

export const Layout = styled.div`
  padding: 0 0 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const InnerLayout = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 10px solid ${({ theme }) => theme.colors.lightTeal};
  @media screen and (max-width: 1024px) {
    width: 150px;
    height: 150px;
  }
`;
