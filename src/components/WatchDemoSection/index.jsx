/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Video, Sparkles, Check, ArrowRight, Rocket, Maximize, Minimize } from 'lucide-react';
import { FaPlay } from 'react-icons/fa';
import { useIsMobile } from 'hooks';
import Sentinalvideo from 'assets/spotter_sentinel_HD_Final_01.mp4';
import * as S from './styles';

const WatchDemoSection = () => {
  const history = useHistory();
  const { isMobile } = useIsMobile();
  const [pricingPlan, setPricingPlan] = useState('monthly');
  const [isPricingAnimating, setIsPricingAnimating] = useState(false);
  const [showControls, setShowControls] = useState(isMobile);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      setVideoProgress((current / total) * 100);
    }
  };

  const handlePricingPlanChange = (newPlan) => {
    if (newPlan === pricingPlan) return;
    setIsPricingAnimating(true);
    setTimeout(() => setPricingPlan(newPlan), 200);
    setTimeout(() => setIsPricingAnimating(false), 400);
  };

  const handleMouseMove = () => setShowControls(true);
  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowControls(false);
    }
  };

  const formatTime = (seconds) => {
    if (Number.isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <S.WatchDemoSection>
      <S.Container>
        <S.SectionHeader>
          <S.SectionBadge>
            <Video size={16} />
            Watch Demo
          </S.SectionBadge>
          <S.SectionTitle>
            AI Powered Driver Screening <S.SectionHighlight>Under 2 Minutes</S.SectionHighlight>
          </S.SectionTitle>
          <S.SectionSubtitle>
            Watch the Demo to see how Spotter Sentinel helps you run MVR&PSP records and driver
            reviews instantly. Start today to reduce your ISS score with smarter automation.
          </S.SectionSubtitle>
        </S.SectionHeader>

        <S.DemoContent>
          <S.VideoContainer>
            <S.VideoPlayer
              onMouseEnter={handleMouseMove}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <video
                ref={videoRef}
                onClick={togglePlayPause}
                onPlay={() => {
                  setIsPlaying(true);
                  setShowThumbnail(false);
                }}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleVideoTimeUpdate}
                controls={false}
                playsInline
                preload="metadata"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f8fafc;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23grad)'/%3E%3C/svg%3E"
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
              >
                <source src={Sentinalvideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {showThumbnail && (
                <S.ThumbnailOverlay onClick={togglePlayPause}>
                  <S.PlayButtonContainer>
                    <S.PlayButtonRing>
                      <S.PlayButtonInner>
                        <S.PlayIcon>
                          <Video size={24} />
                        </S.PlayIcon>
                      </S.PlayButtonInner>
                    </S.PlayButtonRing>
                    <S.PlayHint>Click to play</S.PlayHint>
                  </S.PlayButtonContainer>
                </S.ThumbnailOverlay>
              )}

              <S.VideoControls className={`video-controls${showControls ? ' show' : ''}`}>
                <S.Timeline
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = clickX / rect.width;
                    videoRef.current.currentTime = percent * videoRef.current.duration;
                  }}
                >
                  <S.TimelineProgress style={{ width: `${videoProgress}%` }} />
                </S.Timeline>
                <S.ControlsRow>
                  <S.ControlsLeft>
                    <S.PlayPauseButton onClick={togglePlayPause}>
                      {isPlaying ? <S.PauseIcon>||</S.PauseIcon> : <FaPlay />}
                    </S.PlayPauseButton>
                    <S.TimeDisplay>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </S.TimeDisplay>
                  </S.ControlsLeft>
                  <S.ControlsRight>
                    <S.FullscreenButton onClick={toggleFullscreen}>
                      {isFullscreen ? <Minimize /> : <Maximize />}
                    </S.FullscreenButton>
                  </S.ControlsRight>
                </S.ControlsRow>
              </S.VideoControls>
            </S.VideoPlayer>
          </S.VideoContainer>

          <S.PricingCard isAnimating={isPricingAnimating}>
            <S.PricingToggle>
              <S.ToggleContainer>
                <S.ToggleButton
                  isActive={pricingPlan === 'monthly'}
                  onClick={() => handlePricingPlanChange('monthly')}
                >
                  Monthly
                </S.ToggleButton>
                <S.ToggleButton
                  isActive={pricingPlan === 'yearly'}
                  onClick={() => handlePricingPlanChange('yearly')}
                >
                  Yearly
                </S.ToggleButton>
              </S.ToggleContainer>
            </S.PricingToggle>

            <S.PricingHeader>
              <S.PlanName>Professional</S.PlanName>
              <S.PlanPrice>
                <S.Price>${pricingPlan === 'monthly' ? '35' : '28'}</S.Price>
                <S.Period>per month</S.Period>
              </S.PlanPrice>
              <S.Savings isVisible={pricingPlan === 'yearly'}>Save 20% annually</S.Savings>
            </S.PricingHeader>

            <S.FeaturesList>
              {[
                'Pull MVR',
                'Pull PSP',
                'Check CDL scan',
                'Check DAC',
                'AI extraction of CDL, MVR and PSP',
                'AI Driver Assessment',
              ].map((feature) => (
                <S.Feature key={feature}>
                  <S.FeatureIcon>
                    <Check size={16} />
                  </S.FeatureIcon>
                  <S.FeatureText>{feature}</S.FeatureText>
                </S.Feature>
              ))}
            </S.FeaturesList>

            <S.GetStartedButton onClick={() => history.push(`/payment?plan=${pricingPlan}`)}>
              <Rocket size={16} />
              Get started
              <ArrowRight size={16} />
            </S.GetStartedButton>
          </S.PricingCard>
        </S.DemoContent>
      </S.Container>
    </S.WatchDemoSection>
  );
};

export default WatchDemoSection;
