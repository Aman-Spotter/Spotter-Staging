import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Layout = styled.div`
  padding: 10px 0;
  background-color: #0000005a;
  position: absolute;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.teal};
  z-index: 100;
  top: 0;
`;

export const InnerLayout = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1060px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    padding-left: 25px;
    padding-right: 25px;
  }

  @media screen and (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const LeftPanel = styled(Link)`
  display: flex;
  .logo {
    width: 90px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    /* Tablet range optimization */
    @media screen and (max-width: 991px) and (min-width: 769px) {
      width: 80px;
      margin-left: 8px;
      margin-top: 8px;
      margin-bottom: 8px;
    }

    @media screen and (max-width: 768px) {
      width: 70px;
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
`;

export const RightPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    text-decoration: none;
  }
`;

export const LogoImg = styled.img`
  width: 40px;

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    width: 35px;
  }

  @media screen and (max-width: 768px) {
    width: 25px;
    margin-top: 0px;
  }
`;

export const SignUp = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
