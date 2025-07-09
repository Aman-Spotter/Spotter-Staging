import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { throttle } from 'lodash';
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
  Check,
  Download,
} from 'lucide-react';

import { Footer, Navbar } from 'components';
import { useIsMobile } from 'hooks';
import { useABTest } from 'hooks/useABTest';
import BgSvg from 'assets/svgs/background.svg';
import MobileBgSvg from 'assets/svgs/mobile_bg.svg';

// Import CDL image for interactive demo
import cdlGeorgiaImg from 'assets/pngs/cdl-georgia.png';

// Import sentinel assets
import scannerIcon from 'assets/images/sentinel/scanner.svg';
import databaseIcon from 'assets/images/sentinel/database.png';
import filterIcon from 'assets/images/sentinel/filter.svg';
import gearIcon from 'assets/images/sentinel/gear.svg';
import loadingIcon from 'assets/images/sentinel/loading.svg';

// Import testimonial images
import michaelTestimonialImg from 'assets/images/sentinel/micheal.jpg';
import randallTestimonialImg from 'assets/images/sentinel/randall.jpg';
import davidTestimonialImg from 'assets/images/sentinel/david.png';
import williamTestimonialImg from 'assets/images/sentinel/william.png';

// Import trusted company logos
import nationalLogo from 'assets/images/sentinel/trusted/national.png';
import transcargoLogo from 'assets/images/sentinel/trusted/transcargo.png';
import swiftLogo from 'assets/images/sentinel/trusted/swift.png';

// Import productivity assets
import groupImage from 'assets/group.svg';

// Import statistics assets
import truckElectricImg from 'assets/truck-electric.png';
import fileCheck2Img from 'assets/file-check-2.png';
import crosshairImg from 'assets/crosshair.png';
import databaseBackupImg from 'assets/database-backup.png';

// Import pricing assets
import pcImage from 'assets/pc.png';

import * as S from './styles';

const Sentinel = () => {
  const history = useHistory();
  const location = useLocation();
  const { isMobile } = useIsMobile();
  const abTest = useABTest('sentinel_hero_cta', [
    { name: 'A', text: 'Buy Now' },
    { name: 'B', text: 'Get Started Today' },
  ]);
  const [demoMode, setDemoMode] = useState('intro'); // 'intro', 'upload', 'processing', 'complete'
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [processingPhase, setProcessingPhase] = useState('');
  const [isVisible, setIsVisible] = useState({});
  // Performance state for scroll optimization
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Chart interaction state
  const [chartState, setChartState] = useState({
    mouseX: 0,
    mouseY: 0,
    isHovering: false,
    hoveredPath: null,
    currentDay: 0,
    competitorRate: '0.0',
    spotterRate: '0.0',
    chartWidth: 0,
    redBallX: 0,
    redBallY: 0,
    tealBallX: 0,
    tealBallY: 0,
  });

  // Radar interaction state
  const [radarState, setRadarState] = useState({
    mouseX: 0,
    mouseY: 0,
    isHovering: false,
  });

  // Enhanced Testimonials State with smooth transitions
  const [testimonialState, setTestimonialState] = useState({
    currentIndex: 0,
    isTransitioning: false,
    nextIndex: 0,
    direction: 'next', // 'next' or 'prev'
  });

  // Interactive glow state for button-demo connection
  const [glowState, setGlowState] = useState({
    buttonHovered: false,
    demoHovered: false,
  });

  // Pricing state
  const [pricingPlan, setPricingPlan] = useState('monthly'); // 'monthly' or 'yearly'
  const [isPricingAnimating, setIsPricingAnimating] = useState(false);

  // References for interactive elements
  const chartRef = useRef(null);
  const radarRef = useRef(null);
  const testimonialAutoplayRef = useRef(null);

  // Floating particles for gallery section - optimized for performance
  const galleryParticles = [
    { id: 'gallery-1', type: 'dot', size: 'large', color: 'teal', speed: 'slow' },
    { id: 'gallery-2', type: 'ring', size: 'medium', color: 'red', speed: 'medium' },
    { id: 'gallery-3', type: 'dot', size: 'small', color: 'cyan', speed: 'fast' },
    { id: 'gallery-4', type: 'diamond', size: 'medium', color: 'green', speed: 'slow' },
    { id: 'gallery-5', type: 'ring', size: 'large', color: 'teal', speed: 'medium' },
    { id: 'gallery-6', type: 'dot', size: 'small', color: 'purple', speed: 'fast' },
  ];

  const processingSteps = [
    { name: 'Fetching CDL Database', icon: Database, delay: 800 },
    { name: 'Running MVR Analysis', icon: Scan, delay: 1200 },
    { name: 'Running PSP Analysis', icon: Shield, delay: 1000 },
    { name: 'Generating Safety Score', icon: Award, delay: 800 },
  ];
  // Function to start demo from the new hero
  const startDemo = () => {
    setDemoMode('upload');
    setCurrentSlideIndex(1);
  };

  // Function to start CDL processing
  const startCDLProcessing = () => {
    // Create a mock driver for the Georgia CDL
    const mockDriver = {
      id: 'georgia-cdl',
      name: 'Sample Driver',
      cdl: 'GA-CDL-202X-XXXX',
      fullCdl: 'GA-CDL-2024-2778',
      experience: '< 8 years',
      score: 28,
      risk: 'High',
      specialization: 'Commercial',
      mvrViolations: 7,
      pspViolations: 9,
      mvrProcessed: true,
      pspProcessed: true,
      compliance: '68%',
      lastVerified: 'Processing...',
      status: 'processing',
      image: cdlGeorgiaImg,
    };

    setSelectedDriver(mockDriver);
    setDemoMode('processing');
    setProgress(0);
    setCurrentStep(0);
    setProcessingPhase('Initializing CDL Analysis...');

    // Simulate realistic processing with variable timing
    const totalSteps = processingSteps.length;
    let stepIndex = 0;

    const processStep = () => {
      if (stepIndex < totalSteps) {
        const step = processingSteps[stepIndex];
        const progressPercent = ((stepIndex + 1) / totalSteps) * 100;

        setCurrentStep(stepIndex + 1);
        setProgress(progressPercent);
        setProcessingPhase(step.name);

        setTimeout(() => {
          stepIndex += 1;
          if (stepIndex < totalSteps) {
            processStep();
          } else {
            setTimeout(() => {
              setDemoMode('complete');
              setProcessingPhase('Analysis Complete');
            }, 500);
          }
        }, step.delay);
      }
    };

    processStep();
  };

  const resetDemo = () => {
    setDemoMode('intro');
    setCurrentSlideIndex(0);
    setProgress(0);
    setCurrentStep(0);
    setSelectedDriver(null);
    setProcessingPhase('');
  };

  // Simplified scroll performance optimization
  useEffect(() => {
    let ticking = false;
    let mounted = true;

    const handleScroll = () => {
      if (!ticking && mounted) {
        requestAnimationFrame(() => {
          if (!mounted) return;

          setIsScrolling(true);

          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }

          // Set scrolling to false after scroll ends
          scrollTimeoutRef.current = setTimeout(() => {
            if (mounted) {
              setIsScrolling(false);
            }
          }, 100);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mounted = false;
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, []);

  // Benefits data
  const benefits = [
    {
      id: 'pre-screening',
      icon: Filter,
      title: 'CDL Pre-Screening',
      description:
        'Stop wasting money on MVR and PSP for drivers in our database that are known safety risks',
      iconImage: filterIcon,
    },
    {
      id: 'background-checking',
      icon: Database,
      title: 'Background checking across multiple platforms',
      description:
        'Run background checks including DAC report and all other background check services all in one place',
      iconImage: databaseIcon,
    },
    {
      id: 'ocr-processing',
      icon: Scan,
      title: 'MVR and PSP optical character recognition',
      description:
        'Parse MVR and PSP information automatically using AI rather than typing out safety violation history manually',
      iconImage: scannerIcon,
    },
  ];

  // How it works steps
  const workflowSteps = [
    {
      id: 'upload',
      step: '1',
      title: 'Upload CDL',
      description:
        "Simply drag and drop or upload the driver's CDL. Our AI instantly extracts all relevant information.",
      icon: FileText,
    },
    {
      id: 'analyze',
      step: '2',
      title: 'AI Analysis',
      description:
        'Our system runs checks across MVR, PSP, and background databases using advanced AI algorithms.',
      icon: Brain,
    },
    {
      id: 'verify',
      step: '3',
      title: 'Verification',
      description:
        'Cross-reference data across multiple platforms and databases to ensure accuracy and completeness.',
      icon: Shield,
    },
    {
      id: 'report',
      step: '4',
      title: 'Get Results',
      description:
        'Receive a comprehensive safety score and detailed report with actionable insights within minutes.',
      icon: Award,
    },
  ];

  // Statistics data
  const statistics = [
    {
      id: 'carriers',
      value: '3k',
      title: 'Carriers',
      description: 'Trusted transportation companies using our safety platform daily.',
      image: truckElectricImg,
    },
    {
      id: 'reports',
      value: '8k',
      title: 'Reports pulled/m',
      description: 'MVR, PSP, and background checks processed monthly with AI precision.',
      image: fileCheck2Img,
    },
    {
      id: 'precision',
      value: '98%',
      title: 'Precision',
      description: 'AI accuracy rate in driver risk assessment and safety predictions.',
      image: crosshairImg,
    },
    {
      id: 'driver-reports',
      value: '14k+',
      title: 'Existing driver reports',
      description: 'Comprehensive driver safety records in our verified database.',
      image: databaseBackupImg,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Michael R. Thompson',
      role: 'Fleet Safety Director',
      company: 'National Transportation',
      image: michaelTestimonialImg,
      logo: nationalLogo,
      quote:
        "Spotter Sentinel has transformed how we manage our fleet's safety. Their AI-driven system helped us reduce incidents by 60% and maintain perfect compliance scores. The automated document verification is a game-changer.",
    },
    {
      id: 2,
      name: 'Randall Martinez',
      role: 'Compliance Manager',
      company: 'TransCargo Solutions',
      image: randallTestimonialImg,
      logo: transcargoLogo,
      quote:
        "The predictive analytics have been invaluable for our risk management. We've seen a significant improvement in our CSA scores, and the real-time monitoring helps us address potential issues before they become problems.",
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Operations Director',
      company: 'Swift Transport',
      image: davidTestimonialImg,
      logo: swiftLogo,
      quote:
        'As a growing fleet operator, maintaining compliance was becoming challenging. Spotter Sentinel streamlined our entire process - from CDL verification to PSP screening. Their support team truly understands DOT requirements.',
    },
    {
      id: 4,
      name: 'William C. Dosky',
      role: 'Compliance Manager',
      company: 'Swift Transport',
      image: williamTestimonialImg,
      logo: swiftLogo,
      quote:
        "The driver screening process used to take us weeks. Now with Spotter Sentinel's automated system, we get comprehensive safety reports in minutes. It's been a huge time-saver for our operations team.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [shuffledTestimonials, setShuffledTestimonials] = useState([]);

  useEffect(() => {
    if (testimonials.length > 0 && shuffledTestimonials.length === 0) {
      const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
      const newShuffled = shuffleArray(testimonials);
      setShuffledTestimonials(newShuffled);
      setCurrentTestimonial(0);
      setTestimonialState({
        currentIndex: 0,
        isTransitioning: false,
        nextIndex: 0,
        direction: 'next',
      });
    }
  }, [testimonials.length, shuffledTestimonials.length]); // Only run when needed

  // Enhanced testimonial transition functions
  const transitionToTestimonial = useCallback(
    (targetIndex, direction = 'next') => {
      if (testimonialState.isTransitioning || targetIndex === testimonialState.currentIndex) return;

      setTestimonialState((prev) => ({
        ...prev,
        isTransitioning: true,
        nextIndex: targetIndex,
        direction,
      }));

      // Start transition
      setTimeout(() => {
        setCurrentTestimonial(targetIndex);
        setTestimonialState((prev) => ({
          ...prev,
          currentIndex: targetIndex,
        }));
      }, 150); // Reduced from 250ms

      // Complete transition
      setTimeout(() => {
        setTestimonialState((prev) => ({
          ...prev,
          isTransitioning: false,
        }));
      }, 300); // Reduced from 500ms
    },
    [testimonialState.isTransitioning, testimonialState.currentIndex]
  );

  const goToNextTestimonial = useCallback(() => {
    if (shuffledTestimonials.length > 0 && !testimonialState.isTransitioning) {
      const nextIndex = (testimonialState.currentIndex + 1) % shuffledTestimonials.length;
      transitionToTestimonial(nextIndex, 'next');
    }
  }, [
    testimonialState.currentIndex,
    testimonialState.isTransitioning,
    shuffledTestimonials,
    transitionToTestimonial,
  ]);

  // Testimonial autoplay functionality
  useEffect(() => {
    // If there are no testimonials yet, return a no-op cleanup for consistent return behaviour
    if (shuffledTestimonials.length === 0) {
      return () => {};
    }

    const startAutoplay = () => {
      // Clear any existing interval before starting a new one to prevent multiple intervals
      if (testimonialAutoplayRef.current) {
        clearInterval(testimonialAutoplayRef.current);
        testimonialAutoplayRef.current = null;
      }
      testimonialAutoplayRef.current = setInterval(goToNextTestimonial, 5000); // 5 s cadence
    };

    const stopAutoplay = () => {
      if (testimonialAutoplayRef.current) {
        clearInterval(testimonialAutoplayRef.current);
        testimonialAutoplayRef.current = null;
      }
    };

    // Start autoplay after short delay to ensure component has mounted
    const timeoutId = setTimeout(startAutoplay, 100);

    // Cleanup on unmount or dependency change
    return () => {
      clearTimeout(timeoutId);
      stopAutoplay();
    };
  }, [goToNextTestimonial, shuffledTestimonials.length]);

  // Intersection Observer for animations
  useEffect(() => {
    let mounted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        if (mounted) {
          entries.forEach((entry) => {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));
          });
        }
      },
      {
        threshold: 0.05,
        rootMargin: '50px',
      }
    );

    // Small delay to ensure DOM is ready
    const setupObserver = () => {
      if (mounted) {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => {
          if (mounted) {
            observer.observe(el);
          }
        });
      }
    };

    const timeoutId = setTimeout(setupObserver, 100);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Throttled chart mouse handlers for performance
  const throttledChartMouseMove = useCallback(
    throttle((e) => {
      if (!chartRef.current) return;

      try {
        const rect = chartRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));

        // Calculate dynamic values based on mouse position
        const maxWeeks = 50; // Maximum weeks as shown in chart
        const currentWeek = Math.round((xPercent / 100) * maxWeeks);
        const currentDay = currentWeek * 7; // Convert weeks to days

        // More realistic progression - exponential growth for competitors, linear for Spotter
        // Competitors: Exponential increase showing poor scaling
        const competitorBase = (xPercent / 100) ** 1.8 * 28; // Exponential curve up to 28%
        const competitorRate = Math.max(0, competitorBase);

        // Spotter: Much better performance with slower, linear growth
        const spotterBase = (xPercent / 100) * 8.5; // Linear growth up to 8.5% (much better)
        const spotterRate = Math.max(0, spotterBase);

        // Ensure Spotter is always better (at least 60% better performance)
        const adjustedSpotterRate = Math.min(spotterRate, competitorRate * 0.4);

        // Simplified fallback calculation instead of expensive SVG path operations
        const redBallX = (xPercent / 100) * 725;
        const redBallY = 20 + (competitorRate / 28) * 30;
        const tealBallX = (xPercent / 100) * 725;
        const tealBallY = 50 + (adjustedSpotterRate / 8.5) * 60;

        setChartState({
          mouseX: x,
          mouseY: y,
          isHovering: true,
          hoveredPath: null,
          currentDay,
          competitorRate: competitorRate.toFixed(1),
          spotterRate: adjustedSpotterRate.toFixed(1),
          chartWidth: rect.width,
          redBallX,
          redBallY,
          tealBallX,
          tealBallY,
        });

        // Use requestAnimationFrame for DOM updates
        requestAnimationFrame(() => {
          // eslint-disable-next-line arrow-body-style
          if (chartRef.current) {
            chartRef.current.style.setProperty('--card-x', `calc(${xPercent}% - 106px)`);
            chartRef.current.style.setProperty('--card-opacity', '1');
          }
        });
      } catch (error) {
        console.warn('Chart mouse move error:', error);
      }
    }, 16), // ~60fps throttling
    []
  );

  const handleChartMouseMove = throttledChartMouseMove;

  const handleChartMouseLeave = () => {
    if (!chartRef.current) return;
    setChartState({
      mouseX: 0,
      mouseY: 0,
      isHovering: false,
      hoveredPath: null,
      currentDay: 0,
      competitorRate: '0.0',
      spotterRate: '0.0',
      chartWidth: 0,
      redBallX: 0,
      redBallY: 0,
      tealBallX: 0,
      tealBallY: 0,
    });

    // Reset CSS custom properties
    chartRef.current.style.setProperty('--card-x', 'calc(0% - 106px)');
    chartRef.current.style.setProperty('--card-opacity', '0');
  };

  // Radar mouse handlers
  const handleRadarMouseMove = (e) => {
    if (!radarRef.current) return;
    const rect = radarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRadarState({
      mouseX: x,
      mouseY: y,
      isHovering: true,
    });

    // Update CSS custom properties for both lens cursor and magnifier positioning
    radarRef.current.style.setProperty('--x', `${x}px`);
    radarRef.current.style.setProperty('--y', `${y}px`);
  };

  const handleRadarMouseLeave = () => {
    if (!radarRef.current) return;
    setRadarState({
      mouseX: 0,
      mouseY: 0,
      isHovering: false,
    });

    // Reset CSS custom properties
    radarRef.current.style.setProperty('--x', '0px');
    radarRef.current.style.setProperty('--y', '0px');
  };

  // Handle pricing plan change with animation
  const handlePricingPlanChange = (newPlan) => {
    if (newPlan === pricingPlan) return;

    setIsPricingAnimating(true);

    setTimeout(() => {
      setPricingPlan(newPlan);
    }, 200);

    setTimeout(() => {
      setIsPricingAnimating(false);
    }, 400);
  };

  // Get plan details from URL params or default
  const urlParams = new URLSearchParams(location.search);
  const planType = urlParams.get('plan') || 'monthly';

  // General cleanup on unmount to prevent memory leaks
  useEffect(
    () => () => {
      // Clear all timeouts and intervals
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      if (testimonialAutoplayRef.current) {
        clearInterval(testimonialAutoplayRef.current);
        testimonialAutoplayRef.current = null;
      }

      // Reset states to prevent memory leaks
      setIsScrolling(false);
      setIsVisible({});
      setChartState({
        mouseX: 0,
        mouseY: 0,
        isHovering: false,
        hoveredPath: null,
        currentDay: 0,
        competitorRate: '0.0',
        spotterRate: '0.0',
        chartWidth: 0,
        redBallX: 0,
        redBallY: 0,
        tealBallX: 0,
        tealBallY: 0,
      });
      setRadarState({
        mouseX: 0,
        mouseY: 0,
        isHovering: false,
      });
    },
    []
  );

  return (
    <>
      <S.Layout>
        {/* New Hero Section - Styled like test.html */}
        <S.NewHeroSection id="new-hero-section" data-animate>
          <S.NewHeroBackground background={isMobile ? MobileBgSvg : BgSvg} />

          {/* Enhanced Floating Elements */}
          <S.NewHeroFloatingElements>
            {Array.from({ length: 3 }, (_, i) => (
              <S.NewHeroFloatingElement key={i} delay={`${i * 2}s`} position={i} />
            ))}
          </S.NewHeroFloatingElements>

          <S.NewHeroContainer>
            <S.NewHeroContent isVisible={isVisible['new-hero-section']}>
              <S.NewHeroTitle>
                <S.NewHeroHighlight>Instant</S.NewHeroHighlight> Background Screening That Actually
                Works
              </S.NewHeroTitle>
              <S.NewHeroStats>
                <S.NewHeroStat>
                  <S.NewHeroStatNumber>2min</S.NewHeroStatNumber>
                  <S.NewHeroStatLabel>Average Processing</S.NewHeroStatLabel>
                </S.NewHeroStat>
                <S.NewHeroStat>
                  <S.NewHeroStatNumber>99.9%</S.NewHeroStatNumber>
                  <S.NewHeroStatLabel>Uptime</S.NewHeroStatLabel>
                </S.NewHeroStat>
                <S.NewHeroStat>
                  <S.NewHeroStatNumber>24/7</S.NewHeroStatNumber>
                  <S.NewHeroStatLabel>Support</S.NewHeroStatLabel>
                </S.NewHeroStat>
              </S.NewHeroStats>

              <S.NewHeroCTA>
                <S.NewHeroPrimaryButton onClick={() => history.push('/payment?plan=monthly')}>
                  <S.NewHeroButtonIcon>
                    <Rocket size={16} />
                  </S.NewHeroButtonIcon>
                  {abTest.text}
                </S.NewHeroPrimaryButton>
                <S.NewHeroSecondaryButton
                  onClick={startDemo}
                  onMouseEnter={() => setGlowState((prev) => ({ ...prev, buttonHovered: true }))}
                  onMouseLeave={() => setGlowState((prev) => ({ ...prev, buttonHovered: false }))}
                  isGlowing={glowState.demoHovered}
                >
                  View Demo
                </S.NewHeroSecondaryButton>
              </S.NewHeroCTA>
            </S.NewHeroContent>

            <S.NewHeroVisual>
              {demoMode === 'intro' && (
                <S.NewHeroDashboardMockup
                  isVisible={isVisible['new-hero-section']}
                  onMouseEnter={() => setGlowState((prev) => ({ ...prev, demoHovered: true }))}
                  onMouseLeave={() => setGlowState((prev) => ({ ...prev, demoHovered: false }))}
                  onClick={startDemo}
                >
                  <S.NewHeroDashboardGlow isGlowing={glowState.buttonHovered} />
                  <S.NewHeroDashboardContent>
                    <S.NewHeroMockupHeader>
                      <S.NewHeroMockupDot />
                      <S.NewHeroMockupDot />
                      <S.NewHeroMockupDot />
                    </S.NewHeroMockupHeader>
                    <S.NewHeroMockupContent>
                      <S.NewHeroProcessStep isVisible={isVisible['new-hero-section']} delay="0.2s">
                        <S.NewHeroStepIcon>1</S.NewHeroStepIcon>
                        <S.NewHeroStepContent>
                          <S.NewHeroStepTitle>Upload CDL</S.NewHeroStepTitle>
                          <S.NewHeroStepSubtitle>
                            Drag & drop or paste license number
                          </S.NewHeroStepSubtitle>
                        </S.NewHeroStepContent>
                      </S.NewHeroProcessStep>
                      <S.NewHeroProcessStep isVisible={isVisible['new-hero-section']} delay="0.4s">
                        <S.NewHeroStepIcon>2</S.NewHeroStepIcon>
                        <S.NewHeroStepContent>
                          <S.NewHeroStepTitle>AI Processing</S.NewHeroStepTitle>
                          <S.NewHeroStepSubtitle>
                            Automated verification & data extraction
                          </S.NewHeroStepSubtitle>
                        </S.NewHeroStepContent>
                      </S.NewHeroProcessStep>
                      <S.NewHeroProcessStep isVisible={isVisible['new-hero-section']} delay="0.6s">
                        <S.NewHeroStepIcon>3</S.NewHeroStepIcon>
                        <S.NewHeroStepContent>
                          <S.NewHeroStepTitle>Complete Report</S.NewHeroStepTitle>
                          <S.NewHeroStepSubtitle>
                            MVR, PSP, criminal & risk score
                          </S.NewHeroStepSubtitle>
                        </S.NewHeroStepContent>
                      </S.NewHeroProcessStep>
                    </S.NewHeroMockupContent>
                  </S.NewHeroDashboardContent>
                </S.NewHeroDashboardMockup>
              )}

              {demoMode === 'upload' && (
                <S.UploadSlide>
                  {/* Floating Particles */}
                  <S.GalleryFloatingElements>
                    {galleryParticles.map((particle, index) => (
                      <S.GalleryParticle
                        key={particle.id}
                        delay={`${index * 0.3}s`}
                        position={index}
                        {...particle}
                      />
                    ))}
                  </S.GalleryFloatingElements>

                  <S.UploadContent>
                    <S.UploadHeader>
                      <S.UploadTitle>Let&apos;s start!</S.UploadTitle>
                      <S.UploadSubtitle>
                        Click on this CDL image to start the analysis
                      </S.UploadSubtitle>
                    </S.UploadHeader>

                    <S.CDLImageContainer onClick={startCDLProcessing}>
                      <S.CDLImageGlow />
                      <S.CDLImage>
                        <img src={cdlGeorgiaImg} alt="Georgia Commercial Driver's License" />
                      </S.CDLImage>
                      <S.CDLClickPrompt>
                        <S.CDLClickIcon>
                          <Scan size={24} />
                        </S.CDLClickIcon>
                        <S.CDLClickText>Click to Analyze CDL</S.CDLClickText>
                      </S.CDLClickPrompt>
                    </S.CDLImageContainer>
                  </S.UploadContent>
                </S.UploadSlide>
              )}

              {demoMode === 'processing' && selectedDriver && (
                <S.CompactProcessingContainer>
                  <S.ProcessingCompactHeader>
                    <S.ProcessingStatus>
                      <Brain size={16} />
                      <span>Analyzing CDL</span>
                    </S.ProcessingStatus>
                    <S.DriverSummary>
                      <S.DriverNameCompact>Georgia CDL Analysis</S.DriverNameCompact>
                      <S.DriverCDLCompact>{selectedDriver.fullCdl}</S.DriverCDLCompact>
                    </S.DriverSummary>
                  </S.ProcessingCompactHeader>

                  <S.ProcessingMainSection>
                    <S.ProcessingScoreHeader>
                      <S.ProcessingIndicator>
                        <S.ProcessingSpinner>
                          <Brain size={32} />
                        </S.ProcessingSpinner>
                        <S.ProcessingPhase>{processingPhase}</S.ProcessingPhase>
                      </S.ProcessingIndicator>
                    </S.ProcessingScoreHeader>

                    <S.CompactProgressSection>
                      <S.ProgressBarContainer>
                        <S.ProgressBarFill progress={progress} />
                        <S.ProgressPercentage>{Math.round(progress)}%</S.ProgressPercentage>
                      </S.ProgressBarContainer>

                      <S.ProcessingStepsCompact>
                        {processingSteps.map((step, index) => {
                          const StepIcon = step.icon;
                          return (
                            <S.ProcessingStepCompact
                              key={step.name}
                              active={index < currentStep}
                              current={index === currentStep - 1}
                            >
                              <div>
                                <S.MetricLabel>
                                  <S.StepIconCompact active={index < currentStep}>
                                    <StepIcon size={14} />
                                  </S.StepIconCompact>
                                  {step.name}
                                </S.MetricLabel>
                                <S.MetricValue>
                                  {index < currentStep
                                    ? 'Complete'
                                    : index === currentStep - 1
                                    ? 'Processing...'
                                    : 'Pending'}
                                </S.MetricValue>
                              </div>
                              <div>
                                {index < currentStep && (
                                  <S.StepCheckmark>
                                    <CheckCircle size={14} />
                                  </S.StepCheckmark>
                                )}
                              </div>
                            </S.ProcessingStepCompact>
                          );
                        })}
                      </S.ProcessingStepsCompact>
                    </S.CompactProgressSection>
                  </S.ProcessingMainSection>
                </S.CompactProcessingContainer>
              )}

              {demoMode === 'complete' && selectedDriver && (
                <S.CompactResultsContainer>
                  <S.ResultsCompactHeader>
                    <S.CompletionStatus>
                      <CheckCircle size={18} />
                      <span>Analysis Complete</span>
                    </S.CompletionStatus>
                    <S.DriverSummary>
                      <S.DriverNameCompact>Georgia CDL Analysis</S.DriverNameCompact>
                      <S.DriverCDLCompact>{selectedDriver.fullCdl}</S.DriverCDLCompact>
                    </S.DriverSummary>
                  </S.ResultsCompactHeader>

                  <S.CompactScoreSection>
                    <S.ScoreHeader>
                      <S.ScoreCircle score={selectedDriver.score}>
                        <S.ScoreNumber>{selectedDriver.score}</S.ScoreNumber>
                        <S.ScoreLabel>Safety Score</S.ScoreLabel>
                      </S.ScoreCircle>
                      <S.RiskBadge risk={selectedDriver.risk}>
                        {selectedDriver.risk === 'Low' ? (
                          <CheckCircle size={16} />
                        ) : (
                          <AlertTriangle size={16} />
                        )}
                        <span>{selectedDriver.risk} Risk</span>
                      </S.RiskBadge>
                    </S.ScoreHeader>

                    <S.QuickMetrics>
                      <S.MetricItem>
                        <div>
                          <S.MetricLabel>
                            <S.MetricWarningIcon>
                              <FileText size={14} />
                            </S.MetricWarningIcon>
                            MVR Violations
                          </S.MetricLabel>
                          <S.MetricValue>{selectedDriver.mvrViolations} violations</S.MetricValue>
                        </div>
                        <div>
                          <S.MetricWarningIcon>
                            <AlertTriangle size={14} />
                          </S.MetricWarningIcon>
                        </div>
                      </S.MetricItem>

                      <S.MetricItem>
                        <div>
                          <S.MetricLabel>
                            <S.MetricWarningIcon>
                              <Shield size={14} />
                            </S.MetricWarningIcon>
                            PSP Violations
                          </S.MetricLabel>
                          <S.MetricValue>{selectedDriver.pspViolations} violations</S.MetricValue>
                        </div>
                        <div>
                          <S.MetricWarningIcon>
                            <AlertTriangle size={14} />
                          </S.MetricWarningIcon>
                        </div>
                      </S.MetricItem>

                      <S.MetricItem>
                        <div>
                          <S.MetricLabel>
                            <S.MetricSuccessIcon>
                              <CheckCircle size={14} />
                            </S.MetricSuccessIcon>
                            MVR Report
                          </S.MetricLabel>
                          <S.MetricValue>Ready for Download</S.MetricValue>
                        </div>
                        <div>
                          <S.MetricDownloadButton title="Download Disabled" disabled>
                            <Download size={14} />
                          </S.MetricDownloadButton>
                        </div>
                      </S.MetricItem>

                      <S.MetricItem>
                        <div>
                          <S.MetricLabel>
                            <S.MetricSuccessIcon>
                              <CheckCircle size={14} />
                            </S.MetricSuccessIcon>
                            PSP Report
                          </S.MetricLabel>
                          <S.MetricValue>Ready for Download</S.MetricValue>
                        </div>
                        <div>
                          <S.MetricDownloadButton title="Download Disabled" disabled>
                            <Download size={14} />
                          </S.MetricDownloadButton>
                        </div>
                      </S.MetricItem>
                    </S.QuickMetrics>
                  </S.CompactScoreSection>

                  <S.CompactActions>
                    <S.NewAnalysisButton
                      onClick={() => history.push('/request-quote?product=sentinel')}
                    >
                      <MessageCircle size={14} />
                      Contact Sales
                    </S.NewAnalysisButton>
                  </S.CompactActions>
                </S.CompactResultsContainer>
              )}
            </S.NewHeroVisual>
          </S.NewHeroContainer>
        </S.NewHeroSection>

        {/* How It Works Section */}
        <S.WorkflowSection id="how-it-works" data-animate>
          <S.WorkflowBackground />
          <S.Container>
            <S.WorkflowContainer isVisible={isVisible['how-it-works']}>
              <S.WorkflowHeader>
                <S.WorkflowBadge>
                  <S.WorkflowBadgeIcon>
                    <Zap size={16} />
                  </S.WorkflowBadgeIcon>
                  How it works
                </S.WorkflowBadge>
                <S.WorkflowTitle>
                  Complete Driver Verification &
                  <S.WorkflowHighlight> Safety Analysis Automation</S.WorkflowHighlight>
                </S.WorkflowTitle>
                <S.WorkflowSubtitle>
                  Simply upload any CDL and receive comprehensive MVR reports, PSP records, and
                  complete background verification in under 2 minutes—including an AI-generated
                  safety risk assessment that eliminates manual document review.
                </S.WorkflowSubtitle>
              </S.WorkflowHeader>

              <S.WorkflowSteps>
                {workflowSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <S.WorkflowStep
                      key={step.id}
                      isVisible={isVisible['how-it-works']}
                      delay={`${index * 0.2}s`}
                    >
                      <S.WorkflowStepCard>
                        <S.WorkflowStepGlow />
                        <S.WorkflowStepIconContainer>
                          <S.WorkflowStepIcon>
                            <IconComponent size={32} />
                          </S.WorkflowStepIcon>
                        </S.WorkflowStepIconContainer>
                        <S.WorkflowStepContent>
                          <S.WorkflowStepTitle>
                            {step.step}. {step.title}
                          </S.WorkflowStepTitle>
                          <S.WorkflowStepDescription>{step.description}</S.WorkflowStepDescription>
                        </S.WorkflowStepContent>
                      </S.WorkflowStepCard>
                      {index < workflowSteps.length - 1 && (
                        <S.WorkflowConnector
                          isVisible={isVisible['how-it-works']}
                          delay={`${index * 0.2 + 0.5}s`}
                        />
                      )}
                    </S.WorkflowStep>
                  );
                })}
              </S.WorkflowSteps>
            </S.WorkflowContainer>
          </S.Container>
        </S.WorkflowSection>

        {/* Why Spotter Section */}
        <S.WhySpotterSection id="why-spotter" data-animate>
          <S.WhySpotterBackground />
          <S.Container>
            <S.WhySpotterContainer isVisible={isVisible['why-spotter']}>
              <S.WhySpotterHeader>
                <S.WhySpotterBadge>
                  <S.WhySpotterBadgeIcon>
                    <Target size={16} />
                  </S.WhySpotterBadgeIcon>
                  Why Spotter?
                </S.WhySpotterBadge>
                <S.WhySpotterTitle>
                  The most effective application at predicting future{' '}
                  <S.WhySpotterHighlight>Driver Safety</S.WhySpotterHighlight> behavior
                </S.WhySpotterTitle>
                <S.WhySpotterSubtitle>
                  Identify high risk drivers using the largest pool of data on driver safety
                  behavior
                </S.WhySpotterSubtitle>
              </S.WhySpotterHeader>

              <S.AccuracyChartContainer isVisible={isVisible['why-spotter']}>
                <S.ChartWrapper
                  ref={chartRef}
                  onMouseMove={handleChartMouseMove}
                  onMouseLeave={handleChartMouseLeave}
                >
                  <S.ChartHoverArea />
                  <S.ChartPoints>
                    <S.ChartPoint>0</S.ChartPoint>
                    <S.ChartPoint>10</S.ChartPoint>
                    <S.ChartPoint>20</S.ChartPoint>
                    <S.ChartPoint>30</S.ChartPoint>
                    <S.ChartPoint>40</S.ChartPoint>
                    <S.ChartPoint>50</S.ChartPoint>
                  </S.ChartPoints>
                  <S.ChartLabels>
                    <S.ChartLabel>UNSAFE DOT INCIDENTS</S.ChartLabel>
                    <S.ChartLabel>WEEKS AFTER INITIALIZATION</S.ChartLabel>
                  </S.ChartLabels>

                  <S.ChartSvg
                    preserveAspectRatio="none"
                    width="725"
                    height="144"
                    viewBox="0 0 725 144"
                    fill="none"
                  >
                    {/* Red path (Competitors) */}
                    <path
                      id="red-line"
                      d="M0 0.58374L23.1716 2.55755C24.979 2.71151 26.7962 2.71151 28.6036 2.55756L47.2184 0.971908C50.2409 0.714444 53.2846 0.888057 56.2583 1.48753L77.2217 5.7137C80.3892 6.35227 83.6352 6.5074 86.8492 6.17381L106.468 4.13758C108.581 3.91824 110.711 3.90991 112.825 4.11269L161.001 8.7319C162.979 8.92155 164.97 8.92657 166.949 8.74688L187.027 6.92368C189.803 6.67162 192.6 6.78331 195.347 7.25591L229.804 13.1842C233.424 13.807 237.124 13.8019 240.742 13.1693L268.039 8.39594C271.772 7.74316 275.591 7.75869 279.319 8.4418L321.829 16.2319C325.345 16.8763 328.944 16.9269 332.477 16.3817L354.571 12.9721L382.075 11.3659C386.831 11.0882 391.589 11.8759 396.002 13.6716L410.55 19.5914C416.628 22.0645 423.319 22.6096 429.716 21.1527L442.85 18.1619C447.876 17.0175 453.103 17.104 458.088 18.4139L473.478 22.4583C477.933 23.6289 482.588 23.8241 487.124 23.0306L512.5 18.5925L527.543 16.7777C530.843 16.3797 534.184 16.4981 537.448 17.1287L559.937 21.4749C562.153 21.9032 564.408 22.0958 566.665 22.0495L592.702 21.5155C594.962 21.4691 597.212 21.1833 599.412 20.6627L624.837 14.6482C628.614 13.7545 632.524 13.5557 636.373 14.0615L660.83 17.2755L684.516 23.8384C688.293 24.8848 692.23 25.2286 696.131 24.8526L723.799 22.1859"
                      stroke="url(#paint0_linear_red)"
                      strokeWidth="0.987199"
                    />

                    {/* Teal path (Spotter) */}
                    <path
                      id="teal-line"
                      d="M 0 9 L 25.2349 8.6072 C 28.8177 9.3565 32.5026 9.4856 36.129 8.9889 L 48.0187 7.3601 C 51.5142 6.8813 55.0647 6.9838 58.5267 7.6635 L 76.393 11.1713 C 79.7741 11.8351 83.2403 11.9485 86.6575 11.5071 L 106.092 8.9966 C 108.488 8.6871 110.912 8.65 113.316 8.8858 L 161.078 13.5713 C 162.887 13.7487 164.708 13.7717 166.521 13.64 L 186.909 12.1588 C 191.422 11.8309 195.898 13.1749 199.484 15.9346 V 15.9346 C 202.041 17.9018 212 32 221 40 L 246 50 L 259 57 C 267 61 278 63 295 63 L 306 65 C 316 69 318 69 337 69 L 354 70 C 365 70 381 74 387 74 L 406 77 C 421 78 444 75 459 83 L 475 91 C 491 100 499 99 520 101 L 542 104 C 550 107 558 108 577 113 L 594 115 C 609 122 605 121 628 122 L 639 122 L 671 128 C 685 134 686 132 697 132 L 707 130 C 710 129 723 130 724 130"
                      stroke="url(#paint1_linear_teal)"
                      strokeWidth="0.987199"
                    />

                    {/* Red ball - positioned on red line path */}
                    <circle
                      className="red-ball"
                      cx={chartState.redBallX}
                      cy={chartState.redBallY}
                      r="4"
                      fill="#f84960"
                      style={{
                        visibility: chartState.isHovering ? 'visible' : 'hidden',
                      }}
                    />

                    {/* Teal ball - positioned on teal line path */}
                    <circle
                      className="teal-ball"
                      cx={chartState.tealBallX}
                      cy={chartState.tealBallY}
                      r="4"
                      fill="rgb(0, 128, 128)"
                      style={{
                        visibility: chartState.isHovering ? 'visible' : 'hidden',
                      }}
                    />

                    <defs>
                      <linearGradient
                        id="paint0_linear_red"
                        x1="-4.6933"
                        y1="13.2015"
                        x2="803.425"
                        y2="-184.156"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#f84960" stopOpacity="0" />
                        <stop offset="0.0506713" stopColor="#f84960" />
                        <stop offset="0.94928" stopColor="#f84960" />
                        <stop offset="0.998677" stopColor="#f84960" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_teal"
                        x1="-3.90509"
                        y1="47.3174"
                        x2="771.147"
                        y2="-107.433"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.00617269" stopColor="rgb(0, 128, 128)" stopOpacity="0" />
                        <stop offset="0.0789917" stopColor="rgb(0, 128, 128)" />
                        <stop offset="0.75" stopColor="rgb(0, 128, 128)" />
                        <stop offset="0.97" stopColor="rgb(0, 128, 128)" />
                      </linearGradient>
                    </defs>
                  </S.ChartSvg>

                  <S.ChartCard>
                    <S.ChartDays>{chartState.currentDay || 0} days</S.ChartDays>
                    <S.ChartValues>
                      <S.ChartValue>
                        <S.ChartCompany>Competitors</S.ChartCompany>
                        <S.ChartCompetitorValue>
                          {chartState.competitorRate || '0.0'}%
                        </S.ChartCompetitorValue>
                      </S.ChartValue>
                      <S.ChartValue>
                        <S.ChartCompany>Spotter</S.ChartCompany>
                        <S.ChartSpotterValue>
                          {chartState.spotterRate || '0.0'}%
                        </S.ChartSpotterValue>
                      </S.ChartValue>
                    </S.ChartValues>
                  </S.ChartCard>
                </S.ChartWrapper>
              </S.AccuracyChartContainer>

              <S.WhySpotterFeaturesGrid>
                <S.WhySpotterFeaturesColumn>
                  <S.WhySpotterFeature>
                    <S.WhySpotterFeatureIcon>
                      <img src={filterIcon} alt="Filter" />
                    </S.WhySpotterFeatureIcon>
                    <S.WhySpotterFeatureContent>
                      <S.WhySpotterFeatureTitle>CDL Pre-Screening</S.WhySpotterFeatureTitle>
                      <S.WhySpotterFeatureDescription>
                        Stop wasting money on MVR and PSP for drivers in our database that are known
                        safety risks
                      </S.WhySpotterFeatureDescription>
                    </S.WhySpotterFeatureContent>
                  </S.WhySpotterFeature>

                  <S.WhySpotterFeature>
                    <S.WhySpotterFeatureIcon>
                      <img src={databaseIcon} alt="Database" />
                    </S.WhySpotterFeatureIcon>
                    <S.WhySpotterFeatureContent>
                      <S.WhySpotterFeatureTitle>
                        Background checking across multiple platforms
                      </S.WhySpotterFeatureTitle>
                      <S.WhySpotterFeatureDescription>
                        Run background checks including DAC report and all other background check
                        services all in one place
                      </S.WhySpotterFeatureDescription>
                    </S.WhySpotterFeatureContent>
                  </S.WhySpotterFeature>
                </S.WhySpotterFeaturesColumn>

                <S.WhySpotterVisualizationColumn>
                  <S.RadarVisualization isVisible={isVisible['why-spotter']}>
                    <S.RadarGrid
                      ref={radarRef}
                      onMouseMove={handleRadarMouseMove}
                      onMouseLeave={handleRadarMouseLeave}
                    >
                      <S.RadarSvg
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                        viewBox="0 0 468 190"
                      >
                        <g fill="#D9D9D9">
                          {/* Generate dot grid */}
                          {Array.from({ length: 8 }, (_, row) =>
                            Array.from({ length: 22 }, (_, col) => (
                              <circle
                                key={`${row}-${col}`}
                                cx={24 + col * 20}
                                cy={13 + row * 22}
                                r="5"
                              />
                            ))
                          )}
                        </g>
                      </S.RadarSvg>

                      <S.RadarMagnifier>
                        <S.RadarMagnifierGlass>
                          <S.RadarSvg
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            viewBox="0 0 468 190"
                          >
                            <g fill="#D9D9D9">
                              {/* Generate highlighted dot grid */}
                              {Array.from({ length: 8 }, (_, row) =>
                                Array.from({ length: 22 }, (_, col) => {
                                  // Create pattern for highlighted dots
                                  const isHighlighted =
                                    (row === 0 && [0, 3, 4, 9, 14, 15, 16, 20].includes(col)) ||
                                    (row === 1 && [1, 2, 6, 7, 8, 12, 13, 17, 18].includes(col)) ||
                                    (row === 2 && [0, 1, 2, 9, 10, 14, 20, 21].includes(col)) ||
                                    (row === 3 && [4, 5, 10, 11, 15].includes(col)) ||
                                    (row === 4 && [0, 3, 4, 9, 14, 15].includes(col)) ||
                                    (row === 5 && [1, 5, 11, 12, 15, 21].includes(col)) ||
                                    (row === 6 && [0, 3, 7, 8, 11, 13, 18, 21].includes(col)) ||
                                    (row === 7 && [1, 4, 11, 16, 17, 21].includes(col));

                                  return (
                                    <circle
                                      key={`${row}-${col}`}
                                      cx={24 + col * 20}
                                      cy={13 + row * 22}
                                      r="5"
                                      fill={isHighlighted ? '#6b7280' : '#D9D9D9'}
                                    />
                                  );
                                })
                              )}
                            </g>
                          </S.RadarSvg>
                        </S.RadarMagnifierGlass>
                      </S.RadarMagnifier>
                    </S.RadarGrid>

                    <S.WhySpotterFeature>
                      <S.WhySpotterFeatureIcon>
                        <img src={scannerIcon} alt="Scanner" />
                      </S.WhySpotterFeatureIcon>
                      <S.WhySpotterFeatureContent>
                        <S.WhySpotterFeatureTitle>
                          MVR and PSP optical character recognition
                        </S.WhySpotterFeatureTitle>
                        <S.WhySpotterFeatureDescription>
                          Parse MVR and PSP information automatically using AI rather than typing
                          out safety violation history manually
                        </S.WhySpotterFeatureDescription>
                      </S.WhySpotterFeatureContent>
                    </S.WhySpotterFeature>
                  </S.RadarVisualization>
                </S.WhySpotterVisualizationColumn>
              </S.WhySpotterFeaturesGrid>
            </S.WhySpotterContainer>
          </S.Container>
        </S.WhySpotterSection>

        {/* Benefits Section */}
        <S.BenefitsSection id="benefits" data-animate>
          <S.BenefitsBackground />
          <S.BenefitsFloatingElements isScrolling={isScrolling}>
            {Array.from({ length: 4 }, (_, i) => (
              <S.BenefitsParticle
                key={`benefits-particle-${i}`}
                delay={`${i * 0.4}s`}
                position={i}
                type={i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle'}
              />
            ))}
          </S.BenefitsFloatingElements>

          <S.Container>
            <S.BenefitsContainer isVisible={isVisible.benefits}>
              <S.BenefitsHeader>
                <S.BenefitsBadge>
                  <S.BenefitsBadgeIcon>
                    <Sparkles size={16} />
                  </S.BenefitsBadgeIcon>
                  Benefits
                </S.BenefitsBadge>
                <S.BenefitsTitle>
                  Improve Carrier
                  <S.BenefitsHighlight> Safety</S.BenefitsHighlight>
                </S.BenefitsTitle>
                <S.BenefitsSubtitle>
                  AI-driven insights that transform driver data into risk predictions.
                </S.BenefitsSubtitle>
              </S.BenefitsHeader>

              <S.BenefitsGrid>
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <S.BenefitCard
                      key={benefit.id}
                      isVisible={isVisible.benefits}
                      delay={`${index * 0.15}s`}
                    >
                      <S.BenefitCardGlow />
                      <S.BenefitCardInner>
                        <S.BenefitContent>
                          <S.BenefitHeader>
                            <S.BenefitIconContainer>
                              <S.BenefitIcon>
                                <IconComponent size={24} />
                              </S.BenefitIcon>
                              <S.BenefitIconGlow />
                            </S.BenefitIconContainer>
                            <S.BenefitTitle>{benefit.title}</S.BenefitTitle>
                          </S.BenefitHeader>
                          <S.BenefitDescription>{benefit.description}</S.BenefitDescription>
                        </S.BenefitContent>
                      </S.BenefitCardInner>
                    </S.BenefitCard>
                  );
                })}
              </S.BenefitsGrid>
            </S.BenefitsContainer>
          </S.Container>
        </S.BenefitsSection>
        {/* Pricing Section */}
        <S.PricingSection id="pricing" data-animate>
          <S.PricingBackground />
          <S.PricingFloatingElements>
            {Array.from({ length: 6 }, (_, i) => (
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
                    <DollarSign size={16} />
                  </S.PricingBadgeIcon>
                  Pricing Plans
                </S.PricingBadge>
                <S.PricingTitle>
                  Choose your
                  <S.PricingHighlight> Safety Plan</S.PricingHighlight>
                </S.PricingTitle>
                <S.PricingSubtitle>
                  Start with our free plan or upgrade to Enterprise for advanced monitoring and 24/7
                  support.
                </S.PricingSubtitle>
              </S.PricingHeader>

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

              <S.PricingContent>
                {/* Starter Plan */}
                <S.PricingPlanCard
                  isVisible={isVisible.pricing}
                  delay="0.2s"
                  isAnimating={isPricingAnimating}
                >
                  <S.PricingCardGlow />
                  <S.PricingCardHeader>
                    <S.PricingPlanName>Starter</S.PricingPlanName>
                    <S.PricingAmount>
                      <S.PricingPrice>Free</S.PricingPrice>
                      <S.PricingPeriod>No subscription fees</S.PricingPeriod>
                    </S.PricingAmount>
                  </S.PricingCardHeader>

                  <S.PricingFeatures>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Start checking drivers instantly</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Pull MVR instantly</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Pull PSP instantly</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Check driver reviews</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>AI driver assessment</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Drag/drop driver assessment</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>No need to sign a contract</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>No subscription fees</S.PricingFeatureText>
                    </S.PricingFeature>
                  </S.PricingFeatures>

                  <S.PricingButton onClick={() => history.push('/payment?plan=starter')}>
                    <S.ButtonIcon>
                      <Rocket size={16} />
                    </S.ButtonIcon>
                    Get started →
                  </S.PricingButton>
                </S.PricingPlanCard>

                {/* Enterprise Plan */}
                <S.PricingPlanCard
                  isVisible={isVisible.pricing}
                  delay="0.3s"
                  isAnimating={isPricingAnimating}
                >
                  <S.PricingCardGlow />
                  <S.PricingCardHeader>
                    <S.PricingPlanName>Enterprise</S.PricingPlanName>
                    <S.PricingAmount>
                      <S.PricingPrice>${pricingPlan === 'monthly' ? '35' : '28'}</S.PricingPrice>
                      <S.PricingPeriod>per month</S.PricingPeriod>
                    </S.PricingAmount>
                    <S.PricingSavings isVisible={pricingPlan === 'yearly'}>
                      Save 20% annually
                    </S.PricingSavings>
                  </S.PricingCardHeader>

                  <S.PricingFeaturesEnterprise>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>MVR monitoring</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Start checking drivers instantly</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Pull MVR instantly</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Pull PSP instantly</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Check driver reviews</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>AI driver assessment</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>No need to sign a contract</S.PricingFeatureText>
                    </S.PricingFeature>
                    <S.PricingFeature>
                      <S.PricingFeatureIcon>
                        <Check size={16} />
                      </S.PricingFeatureIcon>
                      <S.PricingFeatureText>Drag/drop driver assessment</S.PricingFeatureText>
                    </S.PricingFeature>
                  </S.PricingFeaturesEnterprise>

                  <S.PricingButton onClick={() => history.push(`/payment?plan=${pricingPlan}`)}>
                    <S.ButtonIcon>
                      <Rocket size={16} />
                    </S.ButtonIcon>
                    Get started →
                  </S.PricingButton>
                </S.PricingPlanCard>
              </S.PricingContent>
            </S.PricingContainer>
          </S.Container>
        </S.PricingSection>

        {/* Testimonials Section */}
        <S.TestimonialsSection id="testimonials" data-animate>
          <S.TestimonialsBackground />
          <S.TestimonialsFloatingElements>
            {Array.from({ length: 4 }, (_, i) => (
              <S.TestimonialsParticle
                key={`testimonials-particle-${i}`}
                delay={`${i * 0.4}s`}
                position={i}
              />
            ))}
          </S.TestimonialsFloatingElements>

          <S.Container>
            <S.TestimonialsContainer isVisible={isVisible.testimonials}>
              <S.TestimonialsHeader>
                <S.TestimonialsBadge>
                  <S.TestimonialsBadgeIcon>
                    <Star size={16} />
                  </S.TestimonialsBadgeIcon>
                  Testimonials
                </S.TestimonialsBadge>
                <S.TestimonialsTitle>
                  Don&apos;t take our
                  <S.TestimonialsHighlight> Word for it</S.TestimonialsHighlight>
                </S.TestimonialsTitle>
                <S.TestimonialsSubtitle>
                  Our users are our best ambassadors. Discover why we&apos;re the top choice for
                  fleet safety management.
                </S.TestimonialsSubtitle>
              </S.TestimonialsHeader>

              <S.TestimonialShowcase
                role="region"
                aria-label="Customer testimonials"
                aria-live="polite"
              >
                <S.TestimonialCard
                  isVisible={isVisible.testimonials}
                  delay="0.3s"
                  isTransitioning={testimonialState.isTransitioning}
                  direction={testimonialState.direction}
                  onMouseEnter={useCallback(() => {
                    // Pause autoplay on hover
                    if (testimonialAutoplayRef.current) {
                      clearInterval(testimonialAutoplayRef.current);
                      testimonialAutoplayRef.current = null;
                    }
                  }, [])}
                  onMouseLeave={useCallback(() => {
                    // Resume autoplay on mouse leave only if it was stopped by hover
                    if (!testimonialAutoplayRef.current && shuffledTestimonials.length > 0) {
                      testimonialAutoplayRef.current = setInterval(() => {
                        goToNextTestimonial();
                      }, 5000);
                    }
                  }, [goToNextTestimonial, shuffledTestimonials.length])}
                >
                  <S.TestimonialCardGlow />

                  {/* Content Container with transition effects */}
                  <S.TestimonialContent
                    isTransitioning={testimonialState.isTransitioning}
                    direction={testimonialState.direction}
                  >
                    <S.TestimonialRating>
                      {Array.from({ length: 5 }, (_, i) => (
                        <S.TestimonialStar
                          key={i}
                          delay={`${0.7 + i * 0.1}s`}
                          isTransitioning={testimonialState.isTransitioning}
                        >
                          <Star size={16} fill="currentColor" />
                        </S.TestimonialStar>
                      ))}
                    </S.TestimonialRating>
                    {shuffledTestimonials.length > 0 &&
                    currentTestimonial < shuffledTestimonials.length ? (
                      <>
                        <S.TestimonialQuote>
                          {shuffledTestimonials[currentTestimonial].quote}
                        </S.TestimonialQuote>
                        <S.TestimonialAuthor>
                          <S.TestimonialAvatar>
                            <img
                              src={shuffledTestimonials[currentTestimonial].image}
                              alt={shuffledTestimonials[currentTestimonial].name}
                            />
                          </S.TestimonialAvatar>
                          <S.TestimonialAuthorInfo>
                            <S.TestimonialAuthorName>
                              {shuffledTestimonials[currentTestimonial].name}
                            </S.TestimonialAuthorName>
                            <S.TestimonialAuthorRole>
                              {shuffledTestimonials[currentTestimonial].role}
                            </S.TestimonialAuthorRole>
                            <S.TestimonialAuthorCompany>
                              {shuffledTestimonials[currentTestimonial].company}
                            </S.TestimonialAuthorCompany>
                          </S.TestimonialAuthorInfo>
                          <S.TestimonialCompanyLogo>
                            <img
                              src={shuffledTestimonials[currentTestimonial].logo}
                              alt={shuffledTestimonials[currentTestimonial].company}
                            />
                          </S.TestimonialCompanyLogo>
                        </S.TestimonialAuthor>
                      </>
                    ) : (
                      <p>Loading testimonials...</p> // Or some other placeholder
                    )}
                  </S.TestimonialContent>
                </S.TestimonialCard>
              </S.TestimonialShowcase>
            </S.TestimonialsContainer>
          </S.Container>
        </S.TestimonialsSection>

        {/* Maximize Productivity Section */}
        <S.ProductivitySection id="productivity" data-animate>
          <S.ProductivityBackground />
          <S.Container>
            <S.ProductivityContainer isVisible={isVisible.productivity}>
              <S.ProductivityGrid>
                <S.ProductivityImageColumn>
                  <S.ProductivityImage>
                    {/* You'll need to add the group.svg image to your assets */}
                    <img src={groupImage} alt="Productivity illustration" />
                  </S.ProductivityImage>
                </S.ProductivityImageColumn>

                <S.ProductivityContentColumn>
                  <S.ProductivityBadge>
                    <S.ProductivityBadgeIcon>
                      <TrendingUp size={16} />
                    </S.ProductivityBadgeIcon>
                    Maximize Productivity
                  </S.ProductivityBadge>

                  <S.ProductivityTitle>
                    Test the Sentinel,
                    <S.ProductivityHighlight> With Your Drivers</S.ProductivityHighlight>
                  </S.ProductivityTitle>

                  <S.ProductivityDescription>
                    Prepare 2 CDLs and request a demo with us, we will check 2 drivers for you free
                    of charge
                  </S.ProductivityDescription>

                  <S.ProductivityButton onClick={() => history.push('/payment?plan=monthly')}>
                    <S.ButtonIcon>
                      <Rocket size={16} />
                    </S.ButtonIcon>
                    Get started
                  </S.ProductivityButton>
                </S.ProductivityContentColumn>
              </S.ProductivityGrid>
            </S.ProductivityContainer>
          </S.Container>
        </S.ProductivitySection>

        {/* Statistics Section */}
        <S.BenefitsSection id="statistics" data-animate>
          <S.BenefitsBackground />
          <S.Container>
            <S.BenefitsContainer isVisible={isVisible.statistics}>
              <S.BenefitsHeader>
                <S.BenefitsBadge>
                  <S.BenefitsBadgeIcon>
                    <BarChart3 size={16} />
                  </S.BenefitsBadgeIcon>
                  Our Impact
                </S.BenefitsBadge>
                <S.BenefitsTitle>
                  Trusted by industry
                  <S.BenefitsHighlight> Leaders Nationwide</S.BenefitsHighlight>
                </S.BenefitsTitle>
                <S.BenefitsSubtitle>
                  Join thousands of transportation companies that rely on our platform for safer,
                  smarter hiring decisions.
                </S.BenefitsSubtitle>
              </S.BenefitsHeader>
              <S.StatisticsGrid>
                {statistics.map((stat, index) => (
                  <S.StatisticCard
                    key={stat.id}
                    isVisible={isVisible.statistics}
                    delay={`${index * 0.1 + 0.2}s`}
                  >
                    <S.StatisticIcon>
                      <img src={stat.image} alt={stat.title} />
                    </S.StatisticIcon>
                    <S.StatisticValue>{stat.value}</S.StatisticValue>
                    <S.StatisticTitle>{stat.title}</S.StatisticTitle>
                    <S.StatisticDescription>{stat.description}</S.StatisticDescription>
                  </S.StatisticCard>
                ))}
              </S.StatisticsGrid>
            </S.BenefitsContainer>
          </S.Container>
        </S.BenefitsSection>

        {/* CTA Section */}
        <S.CTASection id="cta" data-animate>
          <S.CTABackground />
          <S.CTAFloatingElements>
            {Array.from({ length: 5 }, (_, i) => (
              <S.CTAFloatingElement key={`cta-element-${i}`} delay={`${i * 0.5}s`} position={i} />
            ))}
          </S.CTAFloatingElements>

          <S.Container>
            <S.CTAContainer isVisible={isVisible.cta}>
              <S.CTAContent>
                <S.CTATitle>
                  Ready to revolutionize your
                  <S.CTAHighlight> Fleet Safety?</S.CTAHighlight>
                </S.CTATitle>
                <S.CTASubtitle>
                  Transform your driver screening process with AI-powered MVR, PSP, and background
                  checks. Join industry leaders who trust Spotter Sentinel.
                </S.CTASubtitle>

                <S.CTAFeatures>
                  <S.CTAFeature>
                    <S.CTAFeatureIcon>✓</S.CTAFeatureIcon>
                    <S.CTAFeatureText>2-minute processing time</S.CTAFeatureText>
                  </S.CTAFeature>
                  <S.CTAFeature>
                    <S.CTAFeatureIcon>✓</S.CTAFeatureIcon>
                    <S.CTAFeatureText>99.9% accuracy guarantee</S.CTAFeatureText>
                  </S.CTAFeature>
                  <S.CTAFeature>
                    <S.CTAFeatureIcon>✓</S.CTAFeatureIcon>
                    <S.CTAFeatureText>24/7 compliance support</S.CTAFeatureText>
                  </S.CTAFeature>
                </S.CTAFeatures>

                <S.CTAButtons>
                  <S.CTAPrimaryButton onClick={() => history.push('/payment?plan=monthly')}>
                    <S.ButtonIcon>
                      <Rocket size={16} />
                    </S.ButtonIcon>
                    Buy Now
                  </S.CTAPrimaryButton>
                  <S.CTASecondaryButton
                    onClick={() => history.push('/request-quote?product=sentinel')}
                  >
                    <S.ButtonIcon>
                      <MessageCircle size={16} />
                    </S.ButtonIcon>
                    Contact Sales
                  </S.CTASecondaryButton>
                </S.CTAButtons>
              </S.CTAContent>
            </S.CTAContainer>
          </S.Container>
        </S.CTASection>
      </S.Layout>
    </>
  );
};

export default Sentinel;
