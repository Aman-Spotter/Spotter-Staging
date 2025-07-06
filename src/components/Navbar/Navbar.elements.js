import styled from 'styled-components';
import { FaTruck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '@szhsin/react-menu';

export const Nav = styled.nav`
  background: rgb(4, 51, 66);
  background: radial-gradient(circle, rgba(4, 51, 66, 1) 0%, rgba(6, 25, 49, 1) 100%);
  border-bottom: 1px solid #016369;

  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 32px;
  position: sticky;
  top: 0;
  z-index: 99999;

  ${({ absolute }) =>
    absolute ? 'position: absolute;width: 100%;background: rgb(4, 51, 66, 0.353);' : ''}
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  z-index: 0;
  width: 100%;
  ${(props) =>
    props.centered
      ? 'max-width: 1500px; margin-right: auto; margin-left: auto;padding-inline: 50px;'
      : 'padding-inline: 20px;'}
  position: relative;

  @media screen and (max-width: ${({ breakPoint }) => breakPoint || '991px'}) {
    padding: ${({ padding }) => padding || '30px 30px'};
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    padding: ${({ padding }) => padding || '20px 25px'};
    ${(props) => (props.centered ? 'padding-inline: 30px;' : 'padding-inline: 15px;')}
  }

  ${'' /* for carrier page only */}
  @media screen and (max-width: 768px) {
    height: ${({ height }) => height || 'unset'};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & button {
    border: none;
    background: transparent;
  }
  & .szh-menu {
    background: #043344;
    font-size: 13px;
    font-family: Open sans serif;
    color: #f5f6f8;
    width: 220px;
    top: 20px !important;
    z-index: 99999;
    & .szh-menu__item {
      img {
        width: 24px;
        margin-right: 5px;
      }
      svg {
        width: 24px;
        margin-right: 5px;
      }
      &:hover {
        background-color: #043344;
      }
    }
    & a {
      text-decoration: none;
      color: #f5f6f8;
    }
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    gap: 5px;
  }
`;

export const NavLogo = styled.a`
  justify-self: flex-start;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: 'Open Sans Regular';
  font-size: 24px;
  font-weight: 400;
  font-family: UberMove, UberMoveText, system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #008080;

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    gap: 10px;
    font-size: 22px;
  }
`;

export const NavIcon = styled(FaTruck)`
  margin-right: 0.5rem;
`;

export const HamburgerIcon = styled.div`
  cursor: pointer;
  transform: scaleX(1.75);
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  justify-content: space-between;
  height: 100%;

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    height: 64px;
  }
`;
export const NavMainMenu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin-left: 10%;
  align-items: center;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    margin-left: 0;
  }
`;

export const NavItem = styled.li`
  border-bottom: 2px solid transparent;
  height: 80px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: transparent;
    border-radius: 30px;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    display: none;
    justify-content: center;

    &:hover {
      border: none;
      border-radius: 0;
      background-color: transparent;
    }
  }
`;

export const NavItemBtn = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0;
  height: 100%;

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    gap: 8px;
    height: 64px;
  }
`;

export const NavLinks = styled(NavLink)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px 16px;
  height: 64px;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  gap: 6px;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;

  /* Ensure proper icon alignment */
  svg {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    vertical-align: middle;
  }

  /* Button-specific styles */
  &[as='button'] {
    background: transparent;
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  &.${(props) => props.activeClassName} {
    &::after {
      content: ' ';
      width: 100%;
      height: 6px;
      background-color: ${(props) => props.theme.colors.landingPagePrimaryColor};
      border-top-right-radius: 4px;
      display: block;
      position: absolute;
      top: 45px;
    }
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    padding: 8px 12px;
    font-size: 13px;
    gap: 5px;
    line-height: 1;
    height: 64px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &:hover {
    color: #fff;
    opacity: 0.8;
    text-shadow: 0 0 8px #40e0d0, 0 0 16px #40e0d0;
    transition: text-shadow 0.3s, color 0.3s, opacity 0.3s;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 0.8rem;
    width: 100%;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavDevLinks = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px 12px;
  height: 100%;
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
  min-width: 70px;
  justify-content: center;
  position: relative;
  &.${(props) => props.activeClassName} {
    &::after {
      content: ' ';
      width: 100%;
      height: 6px;
      background-color: ${(props) => props.theme.colors.landingPagePrimaryColor};
      border-top-right-radius: 4px;
      display: block;
      position: absolute;
      top: 45px;
    }
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 0.8rem;
    width: 100%;
    display: table;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 64px;
  width: 100%;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  line-height: 1;

  /* Ensure proper icon alignment */
  svg {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    vertical-align: middle;
  }

  /* Button-specific styles */
  &[as='button'] {
    background: transparent;
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    height: 64px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const Button = styled.button`
  border-radius: ${({ borderRadius }) => borderRadius || '30px'};
  background-color: ${(props) => props.theme.colors.landingPagePrimaryColor};
  white-space: nowrap;
  padding: ${({ padding }) => padding || '10px 10px'};
  margin: ${({ margin }) => margin || '0px'};
  color: ${({ color }) => color || '#000000'};
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '14px')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  line-height: 1;
  height: 40px;
  min-height: 40px;

  outline: none;
  border: none;
  font-weight: 600;
  cursor: pointer;

  /* Ensure proper icon alignment */
  svg {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    vertical-align: middle;
  }

  &:hover {
    transition: all 0.3s ease-out;
    background-color: ${({ theme }) => theme.landingPageSecondaryColor};
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    padding: ${({ padding }) => (padding === '10px 25px' ? '8px 20px' : padding || '8px 8px')};
    font-size: ${({ fontBig }) => (fontBig ? '18px' : '13px')};
    gap: 6px;
    line-height: 1;
    height: 36px;
    min-height: 36px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    padding: ${({ smPadding, padding }) => smPadding || padding || '10px 10px'};
    height: 44px;
    min-height: 44px;
  }
`;

export const Username = styled.span`
  background-color: transparent;
  color: ${({ theme }) => theme.highlightColor};
  padding: 12px 16px;
  font-family: 'Open Sans Bold';
  font-size: 14px;
  border: none;
  min-width: 120px;
  text-align: left;
  display: flex;
  align-items: center;
  column-gap: 10px;
  line-height: 1;
  height: 64px;

  svg {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.highlightColor};
    vertical-align: middle;
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    padding: 10px 12px;
    font-size: 13px;
    min-width: 100px;
    column-gap: 8px;
    line-height: 1;
    height: 64px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 768px) {
    width: fit-content;
    min-width: fit-content;
    padding: 0;
    padding-left: 12px;
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }

  &:hover > button {
    background-color: transparent;
  }
`;

export const DropdownBtn = styled.button`
  background-color: transparent;
  color: #bbdcdf;
  padding: 12px 16px;
  font-family: 'Open Sans Bold';
  font-size: 14px;
  border: none;
  cursor: pointer;
  min-width: 120px;
  text-align: left;
  display: flex;
  gap: 10px;
  align-items: center;
  line-height: 1;
  height: 64px;

  svg {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #bbdcdf !important;
    vertical-align: middle;
  }

  /* Tablet range optimization */
  @media screen and (max-width: 991px) and (min-width: 769px) {
    padding: 10px 12px;
    font-size: 13px;
    min-width: 100px;
    gap: 8px;
    line-height: 1;
    height: 64px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 768px) {
    width: fit-content;
    min-width: fit-content;
    padding: 0;
    padding-left: 12px;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #043344;
  border-radius: 5px;
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : '100%')};
  max-height: calc(100vh - 100px);
  left: ${({ left }) => left};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    min-width: fit-content;
  }
`;

export const DropdownItem = styled.div`
  color: #f5f6f8;
  padding: 8px 16px 0 16px;
  text-decoration: none;
  font-family: ${({ isRead }) => (isRead === 'bold' ? 'Open Sans Bold' : 'Open Sans Regular')};
  font-size: 14px;
  display: block;
  cursor: pointer;
  text-align: left;
  line-height: 18px;
  & > div {
    border-bottom: ${({ border }) => border};
    padding-bottom: 8px;
  }
  &:hover {
    background-color: #4b566d;
    outline: ${({ border }) => border};
  }
  &.center {
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    padding: 4px 12px;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  height: 36px;
  font-family: 'Open Sans Regular';
  background-color: #043344;
`;
