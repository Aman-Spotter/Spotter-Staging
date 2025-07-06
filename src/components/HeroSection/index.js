import React from 'react';
import Dots from 'components/Dots';
import GoogleButton from 'assets/svgs/playstore.svg';
import AppstoreButton from 'assets/svgs/appstore.svg';
import NoGoImg from 'assets/pngs/no-go.png';
import PhoneSvg from 'assets/svgs/phone.svg';
import BgSvg from 'assets/svgs/background.svg';
import MobileBgSvg from 'assets/svgs/mobile_bg.svg';
import { useIsMobile } from 'hooks/useMobile';
import * as S from './styles';

const HeroSection = () => {
  const { isMobile } = useIsMobile();
  return (
    <S.Layout>
      <S.Background background={isMobile ? MobileBgSvg : BgSvg} />
      <S.InnerLayout>
        <S.LeftPanel>
          <Dots />
          <S.LeftContent>
            {!isMobile ? (
              <>
                <S.Heading>
                  get more out of
                  <br />
                  each mile with
                  <br />
                  <span className="load">spotter</span>
                </S.Heading>
                <S.Description>
                  AI technology that gets you{isMobile ? <br /> : ' '}
                  <span className="load">hot loads</span>
                </S.Description>
              </>
            ) : (
              <S.Heading>
                <span className="ai">AI</span> technology that
                <br />
                gets you <span className="load">hot loads</span>
              </S.Heading>
            )}
            <S.ButtonsWrapper>
              <a href={process.env.REACT_APP_APPSTORE_URL} target="_blank" rel="noreferrer">
                <S.Image src={AppstoreButton} alt="appstore" />
              </a>
              <a href={process.env.REACT_APP_PLAYSTORE_URL} target="_blank" rel="noreferrer">
                <S.Image src={GoogleButton} alt="google" />
              </a>
            </S.ButtonsWrapper>
          </S.LeftContent>
        </S.LeftPanel>
        <S.RightPanel>
          <S.PhoneWrapper>
            <S.Card left="-110px" top="100px">
              <S.InnerCard>
                <span>personal scheduler</span>
                <div>set home time</div>
              </S.InnerCard>
            </S.Card>
            <S.PhoneImg src={PhoneSvg} alt="phone" />
            <S.Card right="-80px" bottom="212px">
              <S.InnerCard>
                <span>select NO-GO markets</span>
                <img src={NoGoImg} alt="no-go" />
              </S.InnerCard>
            </S.Card>
          </S.PhoneWrapper>
        </S.RightPanel>
      </S.InnerLayout>
    </S.Layout>
  );
};

export default HeroSection;
