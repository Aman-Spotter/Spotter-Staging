import styled from 'styled-components';

export const Layout = styled.div`
  padding: 50px 0 20px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
`;

export const InnerLayout = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1060px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex: 0 0 50%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 50px;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  flex: 0 0 50%;
  @media screen and (max-width: 768px) {
    align-items: center;
    gap: 15px;
  }
`;

export const LogoWrapper = styled.div`
  @media screen and (max-width: 768px) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

export const LogoImg = styled.img`
  width: 60px;
`;

export const Social = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .logo {
    width: 150px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    align-items: center;
    .logo {
      width: 150px;
    }
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    justify-content: center;
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const Icon = styled.img`
  width: 30px;
`;

export const LogoLabel = styled.img`
  width: 200px;
  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
  font-weight: bold;
  margin-left: 20px;
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 200px;
  }
`;

export const CopyRight = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightTeal};
  text-align: center;
  margin-top: 50px;
  a {
    color: white;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
