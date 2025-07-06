import React from 'react';

import HeroSection from 'components/HeroSection';
import ImageSection from 'components/ImageSection';
import QuestionSection from 'components/QuestionSection';
import GuideSection from 'components/GuideSection';
import OwnerSection from 'components/OwnerSection';
import Footer from 'components/FooterLandingPage';
import Header from 'components/Header';
import * as S from './styles';

const Home = () => (
  <S.Layout>
    <HeroSection />
    <ImageSection />
    <QuestionSection />
    <GuideSection />
    <OwnerSection />
  </S.Layout>
);

export default Home;
