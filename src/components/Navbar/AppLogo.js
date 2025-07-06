import React from 'react';
import { FaBars, FaChrome } from 'react-icons/fa';
import { Menu, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { QueryStats } from '@styled-icons/material-outlined';
import { Shield, Truck, Home, Calculator } from 'lucide-react';
import { ReactComponent as Logo } from 'assets/svgs/logo.svg';
import { ReactComponent as LogoIcon } from 'assets/svgs/logo_spotter.svg';
import DriverAppIcon from 'assets/pngs/driver-app-icon.png';
import { NavLogo, HamburgerIcon, StyledMenuItem } from './Navbar.elements';

const HOSTNAME =
  process.env.REACT_APP_HOSTNAME ||
  `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }`;

export const AppLogo = () => (
  <>
    <Menu
      menuButton={
        <MenuButton>
          <HamburgerIcon>
            <FaBars />
          </HamburgerIcon>
        </MenuButton>
      }
      transition
      menuClassName="nav-menu"
    >
      <StyledMenuItem href={`${HOSTNAME}/`}>
        <Home size={18} role="img" color="#d8d8d8" />
        home
      </StyledMenuItem>
      <StyledMenuItem href={`${HOSTNAME}/lens`}>
        <QueryStats size={18} role="img" />
        lens
      </StyledMenuItem>
      <StyledMenuItem href={`${HOSTNAME}/tms`}>
        <Truck size={18} role="img" color="#d8d8d8" />
        tms
      </StyledMenuItem>
      <StyledMenuItem href={`${HOSTNAME}/sentinel`}>
        <Shield size={18} role="img" color="#d8d8d8" />
        sentinel
      </StyledMenuItem>
      <StyledMenuItem
        href={
          process.env.REACT_APP_ENV === 'PRODUCTION'
            ? 'https://extension.spotter.ai'
            : 'https://extension-dev.spotter.ai'
        }
      >
        <FaChrome size={14} role="img" color="#d8d8d8" />
        extension
      </StyledMenuItem>
      <StyledMenuItem href={`${HOSTNAME}/driversapp`}>
        <img className="icon" src={DriverAppIcon} alt="driver-app-icon" />
        spotter app
      </StyledMenuItem>
      <StyledMenuItem href={`${HOSTNAME}/loan-calculators`}>
        <Calculator size={18} role="img" color="#d8d8d8" />
        loan calculators
      </StyledMenuItem>
    </Menu>
    <NavLogo href={`${HOSTNAME}/`}>
      <LogoIcon height={20} />
      <Logo height={25} color="white" />
    </NavLogo>
  </>
);
