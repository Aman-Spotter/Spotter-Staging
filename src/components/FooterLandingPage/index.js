import React from 'react';
import GoogleButton from 'assets/svgs/playstore.svg';
import AppstoreButton from 'assets/svgs/appstore.svg';
import LogoImg from 'assets/svgs/logo_spotter.svg';
import { ReactComponent as LogoLabel } from 'assets/svgs/logo.svg';
import Facebook from 'assets/svgs/facebook.svg';
import Linkedin from 'assets/svgs/linkedin.svg';
import Instagram from 'assets/svgs/instagram.svg';
import * as S from './styles';

const Footer = () => (
  <S.Layout>
    <S.InnerLayout>
      <S.LeftPanel>
        <S.LogoWrapper>
          <S.LogoImg src={LogoImg} alt="logo" />
        </S.LogoWrapper>
        <S.Social>
          <LogoLabel color="white" className="logo" />
          <S.IconsWrapper>
            <a href="https://www.facebook.com/spotterai" target="_blank" rel="noreferrer">
              <S.Icon src={Facebook} alt="facebook" />
            </a>
            <a
              href="https://www.linkedin.com/company/spotter-labs"
              target="_blank"
              rel="noreferrer"
            >
              <S.Icon src={Linkedin} alt="linkedin" />
            </a>
            <a href="https://www.instagram.com/spotter.ai/" target="_blank" rel="noreferrer">
              <S.Icon src={Instagram} alt="instagram" />
            </a>
          </S.IconsWrapper>
        </S.Social>
      </S.LeftPanel>
      <S.RightPanel>
        <a href={process.env.REACT_APP_APPSTORE_URL} target="_blank" rel="noreferrer">
          <S.Image src={AppstoreButton} alt="appstore" />
        </a>
        <a href={process.env.REACT_APP_PLAYSTORE_URL} target="_blank" rel="noreferrer">
          <S.Image src={GoogleButton} alt="google" />
        </a>
      </S.RightPanel>
    </S.InnerLayout>
    <S.CopyRight>
      {new Date().getFullYear()} Copyright spotter.ai All rights reserved.{' '}
      <a href="/privacy-policy" rel="noreferrer">
        Privacy Policy
      </a>
    </S.CopyRight>
  </S.Layout>
);

export default Footer;
