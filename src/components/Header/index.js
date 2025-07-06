/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from 'assets/svgs/logo_spotter.svg';
import { ReactComponent as LogoLabel } from 'assets/svgs/logo.svg';
import * as S from './styles';

const Header = ({ isSignUpPage = false }) => (
  <S.Layout>
    <S.InnerLayout>
      <S.LeftPanel to="/">
        <S.LogoImg src={LogoImg} alt="logo" />
        <LogoLabel color="white" className="logo" />
      </S.LeftPanel>
      <S.RightPanel>
        {!isSignUpPage && (
          <Link to="/sign-up">
            <S.SignUp>sign up</S.SignUp>
          </Link>
        )}
      </S.RightPanel>
    </S.InnerLayout>
  </S.Layout>
);

export default Header;
