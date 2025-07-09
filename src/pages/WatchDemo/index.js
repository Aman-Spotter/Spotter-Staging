import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  FileText,
  Scan,
  Shield,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Brain,
  Award,
  User,
  Eye,
  Clock,
  Database,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  Search,
  BarChart3,
  Users,
  Rocket,
  MessageCircle,
  DollarSign,
  Video,
  Check,
  ArrowRight,
  Download,
  Maximize,
  Minimize,
} from 'lucide-react';
import { FaPlay, FaPause, FaUndo, FaRedo } from 'react-icons/fa';

import { Footer, Navbar } from 'components';
import { useIsMobile } from 'hooks';
import { useABTest } from 'hooks/useABTest';
import Sentinalvideo from 'assets/spotter_sentinel_HD_Final_01.mp4';
import cdlGeorgiaImg from 'assets/pngs/cdl-georgia.png';
import scannerIcon from 'assets/images/sentinel/scanner.svg';
import databaseIcon from 'assets/images/sentinel/database.png';
import filterIcon from 'assets/images/sentinel/filter.svg';
import michaelTestimonialImg from 'assets/images/sentinel/micheal.jpg';
import randallTestimonialImg from 'assets/images/sentinel/randall.jpg';
import davidTestimonialImg from 'assets/images/sentinel/david.png';
import williamTestimonialImg from 'assets/images/sentinel/william.png';
import nationalLogo from 'assets/images/sentinel/trusted/national.png';
import transcargoLogo from 'assets/images/sentinel/trusted/transcargo.png';
import swiftLogo from 'assets/images/sentinel/trusted/swift.png';
import truckElectricImg from 'assets/truck-electric.png';
import fileCheck2Img from 'assets/file-check-2.png';
import crosshairImg from 'assets/crosshair.png';
import databaseBackupImg from 'assets/database-backup.png';
import videoThumbnailPlaceholder from 'assets/images/sentinel/thumbnail-image.png';
import * as S from './styles';

const Sentinel = () => {
  const history = useHistory();
  const location = useLocation();
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
  const [isVisible, setIsVisible] = useState({});

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowThumbnail(false);
      // On desktop, hide controls after starting playback unless hovering
      if (!isMobile) {
        setShowControls(false);
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current.parentElement; // Get the container with our custom controls

    if (!document.fullscreenElement) {
      videoContainer
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.log('Error attempting to exit fullscreen:', err);
        });
    }
  };

  const seek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime += time;
    }
  };

  const handleMouseMove = () => setShowControls(true);
  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowControls(false);
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

  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return; // Don't interfere with input fields
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        seek(-10);
        break;
      case 'ArrowRight':
        e.preventDefault();
        seek(10);
        break;
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      default:
        break;
    }
  }, []);

  const handlePricingPlanChange = (newPlan) => {
    if (newPlan === pricingPlan) return;
    setIsPricingAnimating(true);
    setTimeout(() => setPricingPlan(newPlan), 200);
    setTimeout(() => setIsPricingAnimating(false), 400);
  };
  const floatingElementIds = ['float-1', 'float-2', 'float-3'];

  const formatTime = (seconds) => {
    if (Number.isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.05, rootMargin: '50px' }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      // Show controls when entering fullscreen
      if (isNowFullscreen) {
        setShowControls(true);
      }
    };

    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleKeyDown]);

  return (
    <S.Layout>
      <S.PricingSection id="pricing" data-animate>
        {/* Enhanced Floating Elements */}
        <S.PricingFloatingElements>
          {Array.from({ length: 12 }, (_, i) => (
            <S.PricingParticle
              key={`pricing-particle-${i}`}
              delay={`${i * 0.3}s`}
              position={i}
              type={
                i % 4 === 0 ? 'dollar' : i % 4 === 1 ? 'check' : i % 4 === 2 ? 'star' : 'circle'
              }
            />
          ))}
        </S.PricingFloatingElements>
        <S.Container>
          <S.PricingContainer isVisible={isVisible.pricing}>
            <S.PricingHeader>
              <S.PricingBadge>
                <S.PricingBadgeIcon>
                  <Video size={16} />
                </S.PricingBadgeIcon>
                Watch Demo
              </S.PricingBadge>
              <S.PricingTitle>
                AI Powered Driver Screening <S.PricingHighlight>Under 2 Minutes</S.PricingHighlight>
              </S.PricingTitle>
              <S.PricingSubtitle>
                Watch the Demo to see how Spotter Sentinel helps you run MVR&PSP records and driver
                reviews instantly. Start today to reduce your ISS score with smarter automation.
              </S.PricingSubtitle>
            </S.PricingHeader>

            <S.PricingContent>
              <S.PricingImageContainer isVisible={isVisible.pricing} delay="0.4s">
                <S.PricingImage
                  onMouseEnter={handleMouseMove}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onFocus={handleMouseMove}
                  onBlur={handleMouseLeave}
                  tabIndex={0}
                >
                  <video
                    ref={videoRef}
                    onClick={togglePlayPause}
                    onPlay={() => {
                      setIsPlaying(true);
                      setShowThumbnail(false);
                      // On desktop, hide controls after starting playback unless hovering
                      if (!isMobile) {
                        setShowControls(false);
                      }
                    }}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleVideoTimeUpdate}
                    controls={false}
                    playsInline
                    preload="metadata"
                    poster={videoThumbnailPlaceholder}
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <source src={Sentinalvideo} type="video/mp4" />
                    <track kind="captions" srcLang="en" label="English captions" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Simple Video Play Overlay */}
                  {showThumbnail && (
                    <S.VideoThumbnailOverlay onClick={togglePlayPause}>
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
                    </S.VideoThumbnailOverlay>
                  )}

                  <S.ModernControlsContainer
                    className={`modern-controls${showControls ? ' show' : ''}`}
                  >
                    <S.ModernTimelineBar
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percent = clickX / rect.width;
                        videoRef.current.currentTime = percent * videoRef.current.duration;
                      }}
                    >
                      <S.ModernTimelineProgress style={{ width: `${videoProgress}%` }} />
                    </S.ModernTimelineBar>

                    <S.ModernControlsRow>
                      <S.ModernControlsLeft>
                        <S.ModernPlayPauseButton
                          type="button"
                          onClick={togglePlayPause}
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <S.ModernPauseIcon>||</S.ModernPauseIcon> : <FaPlay />}
                        </S.ModernPlayPauseButton>

                        <S.ModernSeekButton
                          type="button"
                          onClick={() => seek(-10)}
                          aria-label="Rewind 10 seconds"
                        >
                          <S.ModernSeekIcon>↶</S.ModernSeekIcon>
                        </S.ModernSeekButton>

                        <S.ModernSeekButton
                          type="button"
                          onClick={() => seek(10)}
                          aria-label="Forward 10 seconds"
                        >
                          <S.ModernSeekIcon>↷</S.ModernSeekIcon>
                        </S.ModernSeekButton>

                        <S.ModernTimeDisplay>
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </S.ModernTimeDisplay>
                      </S.ModernControlsLeft>

                      <S.ModernControlsRight>
                        <S.ModernFullscreenButton
                          type="button"
                          onClick={toggleFullscreen}
                          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                        >
                          {isFullscreen ? <Minimize /> : <Maximize />}
                        </S.ModernFullscreenButton>
                      </S.ModernControlsRight>
                    </S.ModernControlsRow>
                  </S.ModernControlsContainer>
                </S.PricingImage>
              </S.PricingImageContainer>

              <S.PricingPlanCard
                isVisible={isVisible.pricing}
                delay="0.2s"
                isAnimating={isPricingAnimating}
                style={{ paddingBottom: '20px' }}
              >
                <S.PricingToggle>
                  <S.PricingToggleContainer>
                    <S.PricingToggleButton
                      isActive={pricingPlan === 'monthly'}
                      onClick={() => handlePricingPlanChange('monthly')}
                    >
                      Monthly
                    </S.PricingToggleButton>
                    <S.PricingToggleButton
                      isActive={pricingPlan === 'yearly'}
                      onClick={() => handlePricingPlanChange('yearly')}
                    >
                      Yearly
                    </S.PricingToggleButton>
                  </S.PricingToggleContainer>
                </S.PricingToggle>
                <S.PricingCardGlow />
                <S.PricingCardHeader>
                  <S.PricingPlanName>Professional</S.PricingPlanName>
                  <S.PricingAmount>
                    <S.PricingPrice>${pricingPlan === 'monthly' ? '35' : '28'}</S.PricingPrice>
                    <S.PricingPeriod>per month</S.PricingPeriod>
                  </S.PricingAmount>
                  <S.PricingSavings isVisible={pricingPlan === 'yearly'}>
                    Save 20% annually
                  </S.PricingSavings>
                </S.PricingCardHeader>
                <S.PricingFeatures>
                  {[
                    'Pull MVR',
                    'Pull PSP',
                    'Check CDL scan',
                    'Check DAC',
                    'AI extraction of CDL, MVR and PSP',
                    'AI Driver Assessment',
                  ].map((feature) => (
                    <S.PricingFeature key={feature}>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>{feature}</S.PricingFeatureText>
                    </S.PricingFeature>
                  ))}
                </S.PricingFeatures>
                <S.PricingButton
                  onClick={() => history.push(`/payment?plan=${pricingPlan}`)}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <S.ButtonIcon>
                    <Rocket size={16} />
                  </S.ButtonIcon>
                  Get started
                  <ArrowRight style={{ verticalAlign: 'middle' }} />
                </S.PricingButton>
              </S.PricingPlanCard>
            </S.PricingContent>
          </S.PricingContainer>
        </S.Container>
      </S.PricingSection>
    </S.Layout>
  );
};

export default Sentinel;
