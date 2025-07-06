import styled from 'styled-components';
import { FaTruck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as GS from '../../globalStyles';

export const FooterContainer = styled.div`
  background-color: #051830;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;

  @media screen and (max-width: 768px) {
    padding: 8px 0;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 0;
  }
`;

export const SocialMedia = styled(GS.Container)`
  width: 100%;
  max-width: 100%;
  background-color: #24272b;
  padding: 0px !important;
  margin: 0;
  position: relative;
`;

export const DesktopSocialLinks = styled.div`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: ${(props) => props.theme.colors.teal};
  justify-self: start;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: 'Open Sans Regular';
  font-size: 24px;

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    gap: 10px;
    font-size: 22px;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const AnchorLink = styled(Link)`
  color: #979797;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-decoration: none;
  margin-top: ${({ noMargin }) => (noMargin ? '0' : '10px')};
`;

export const SocialIcon = styled(FaTruck)`
  margin-right: 10px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 30px;
  margin-right: ${({ last }) => (last ? '0px' : '40px')};
`;
export const LinkWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  padding: 15px 10px;

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    padding: 12px 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 8px 10px;
  }
`;

export const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 1fr;
  gap: 0 20px;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  justify-items: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 12px 25px;
    max-width: 380px;
  }

  @media screen and (max-width: 768px) {
    gap: 10px 20px;
    max-width: 320px;
  }

  @media screen and (max-width: 480px) {
    gap: 8px 15px;
    max-width: 280px;
  }
`;

export const Copyright = styled.p`
  color: #80a2aa;
  width: 100%;
  text-align: center;
  line-height: 24px;
  font-size: 13px;
  a {
    color: #80a2aa;
    cursor: pointer;
  }
  margin: 0;
`;

export const Address = styled.p`
  color: #80a2aa;
  width: 100%;
  text-align: center;
  line-height: 24px;
  font-size: 13px;
  margin: 0;
  font-style: italic;
`;

export const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  color: ${({ color }) => color || '#ffffff'};
  font-size: ${({ fontSize }) => fontSize || '24px'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  column-gap: 20px;
  cursor: pointer;
`;

export const MenuItem = styled(AnchorLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: nowrap;
  color: #d8d8d8;
  margin: 0;
  font-size: 15px;
  font-family: Open sans semibold;
  height: 32px;
  cursor: pointer;
  width: 100%;
  max-width: 140px;
  flex: 1;

  & > .icon {
    flex: 0 0 25px;
    width: 25px;
    color: #d8d8d8;
  }
  & span {
    color: #d8d8d8;
    text-align: center;
    white-space: nowrap;
  }
  min-height: 50px;

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    width: 100px;
    flex: 0 0 100px;
    font-size: 14px;
    gap: 8px;
    min-height: 45px;
    & > .icon {
      flex: 0 0 20px;
      width: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 90px;
    flex: 0 0 90px;
    font-size: 13px;
    gap: 6px;
    min-height: 40px;
    height: auto;
    padding: 5px;
    & > .icon {
      flex: 0 0 18px;
      width: 18px;
    }
    & span {
      font-size: 12px;
      text-align: center;
    }
  }

  @media screen and (max-width: 480px) {
    width: 80px;
    flex: 0 0 80px;
    font-size: 12px;
    gap: 4px;
    min-height: 35px;
    padding: 3px;
    & > .icon {
      flex: 0 0 16px;
      width: 16px;
    }
    & span {
      font-size: 11px;
    }
  }
`;

export const MenuItemA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: nowrap;
  color: #d8d8d8;
  margin: 0;
  font-size: 15px;
  font-family: Open sans semibold;
  height: 32px;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  max-width: 140px;
  flex: 1;
  & > .icon {
    flex: 0 0 25px;
    width: 25px;
  }
  & span {
    color: #d8d8d8;
    text-align: center;
    white-space: nowrap;
  }
  min-height: 50px;

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    width: 100px;
    flex: 0 0 100px;
    font-size: 14px;
    gap: 8px;
    min-height: 45px;
    & > .icon {
      flex: 0 0 20px;
      width: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 90px;
    flex: 0 0 90px;
    font-size: 13px;
    gap: 6px;
    min-height: 40px;
    height: auto;
    padding: 5px;
    & > .icon {
      flex: 0 0 18px;
      width: 18px;
    }
    & span {
      font-size: 12px;
      text-align: center;
    }
  }

  @media screen and (max-width: 480px) {
    width: 80px;
    flex: 0 0 80px;
    font-size: 12px;
    gap: 4px;
    min-height: 35px;
    padding: 3px;
    & > .icon {
      flex: 0 0 16px;
      width: 16px;
    }
    & span {
      font-size: 11px;
    }
  }
`;

export const Username = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.highlightColor};
  padding: 12px 16px;
  font-family: 'Open Sans Bold';
  font-size: 14px;
  border: none;
  min-width: 120px;
  text-align: left;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: fit-content;
    min-width: fit-content;
    padding: 0;
  }
`;

export const LogoImg = styled.img`
  width: 60px;
`;

export const Social = styled.div`
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  .logo {
    width: 150px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    margin-left: 0px;
    .logo {
      width: 140px;
    }
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

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
    margin-left: 0;
    margin-top: 6px;
  }
`;

export const Icon = styled.img`
  width: 30px;

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    width: 26px;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    gap: 16px;
    max-width: 350px;
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    gap: 12px;
    max-width: 320px;
  }

  @media screen and (max-width: 480px) {
    gap: 10px;
    max-width: 280px;
  }
`;

export const Image = styled.img`
  width: 130px;
  height: auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 1200px) and (min-width: 770px) {
    width: 115px;
  }

  @media screen and (max-width: 768px) {
    width: 140px;
  }

  @media screen and (max-width: 480px) {
    width: 120px;
  }
`;
