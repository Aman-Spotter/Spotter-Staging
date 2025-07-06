import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Truck,
  BarChart3,
  Route,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Settings,
  Database,
  Zap,
  Target,
  Shield,
  CheckCircle,
  Star,
  MessageCircle,
  Globe,
  FileText,
  Calendar,
  DollarSign,
  Activity,
  Wrench,
  User,
  CreditCard,
  Brain,
} from 'lucide-react';
import { useIsMobile } from 'hooks';
import * as S from './styles';
import spotterTmsVideo from '../../assets/gifs/spotter-tms.mp4';
import spotterTmsVideo2 from '../../assets/gifs/spotter-tms2.mp4';

const stats = [
  {
    label: 'Average RPG Improvement',
    value: '18%',
    icon: DollarSign,
    description: 'Revenue per gallon increase',
    growth: '+24%',
  },
  {
    label: 'Fuel Efficiency Gains',
    value: '12%',
    icon: Activity,
    description: 'MPG optimization',
    growth: '+16%',
  },
  {
    label: 'Driver Retention Rate',
    value: '89%',
    icon: Users,
    description: 'With driver week management',
    growth: '+31%',
  },
  {
    label: 'Maintenance Savings',
    value: '25%',
    icon: Wrench,
    description: 'Through preventive scheduling',
    growth: '+19%',
  },
];

const features = [
  {
    id: 'metrics-monitoring',
    icon: BarChart3,
    title: 'Metrics Monitoring',
    subtitle: 'Track gross, RPG, and MPG performance',
    description:
      'Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.',
    badge: 'Essential',
  },
  {
    id: 'driver-week',
    icon: User,
    title: 'Driver Week Management',
    subtitle: 'Weekly performance and earnings tracking',
    description:
      'Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.',
    badge: null,
  },
  {
    id: 'eld-monitoring',
    icon: Activity,
    title: 'ELD & Wellness Monitoring',
    subtitle: 'Hours of service and driver wellness',
    description:
      'Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.',
    badge: 'New',
  },
  {
    id: 'maintenance-management',
    icon: Wrench,
    title: 'Maintenance Management',
    subtitle: 'PMs, PTIs, and maintenance notes',
    description:
      'Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.',
    badge: null,
  },
  {
    id: 'payroll-accounts',
    icon: CreditCard,
    title: 'Multi-Account Payroll',
    subtitle: 'Streamlined payroll processing',
    description:
      'Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.',
    badge: 'Popular',
  },
  {
    id: 'fleet-optimization',
    icon: Truck,
    title: 'Fleet Optimization',
    subtitle: 'Complete fleet oversight',
    description:
      'Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.',
    badge: null,
  },
];

// Add these optimized components before the TMS component
const MemoizedMetricCard = React.memo(({ metric }) => (
  <S.MetricCard style={{ willChange: 'transform' }}>
    <S.MetricHeader>
      <S.MetricIcon>
        <metric.icon size={20} />
      </S.MetricIcon>
      <S.MetricLabel>{metric.label}</S.MetricLabel>
    </S.MetricHeader>
    <S.MetricValue>{metric.value}</S.MetricValue>
    <S.MetricTrend positive={metric.trend.positive}>
      {metric.trend.positive ? <TrendingUp size={14} /> : <Activity size={14} />}
      {metric.trend.value} {metric.trend.text}
    </S.MetricTrend>
  </S.MetricCard>
));

MemoizedMetricCard.propTypes = {
  metric: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    trend: PropTypes.shape({
      value: PropTypes.string.isRequired,
      positive: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const MemoizedDashboardFeatureCard = React.memo(({ icon: Icon, title, description }) => (
  <S.DashboardFeatureCard style={{ willChange: 'transform' }}>
    <S.CircularFeatureCardIcon>
      <Icon size={24} />
    </S.CircularFeatureCardIcon>
    <S.FeatureCardContent>
      <S.FeatureCardTitle>{title}</S.FeatureCardTitle>
      <S.FeatureCardDescription>{description}</S.FeatureCardDescription>
    </S.FeatureCardContent>
  </S.DashboardFeatureCard>
));

MemoizedDashboardFeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Enhanced realistic chart data and interactive chart component
const RevenueChart = React.memo(() => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [chartData] = useState(() => {
    // Generate realistic TMS revenue data for 7 days with proper scaling
    const currentWeekData = [
      { day: 'Mon', value: 45600, loads: 48, avgRPG: 3.2, efficiency: 94.2 },
      { day: 'Tue', value: 52800, loads: 55, avgRPG: 3.4, efficiency: 96.1 },
      { day: 'Wed', value: 48200, loads: 51, avgRPG: 3.1, efficiency: 95.3 },
      { day: 'Thu', value: 58900, loads: 62, avgRPG: 3.7, efficiency: 97.8 },
      { day: 'Fri', value: 67400, loads: 71, avgRPG: 3.9, efficiency: 98.5 },
      { day: 'Sat', value: 44300, loads: 46, avgRPG: 3.0, efficiency: 93.7 },
      { day: 'Sun', value: 38100, loads: 39, avgRPG: 2.8, efficiency: 91.2 },
    ];

    const previousWeekData = [
      { day: 'Mon', value: 42300, loads: 45, avgRPG: 3.0, efficiency: 92.8 },
      { day: 'Tue', value: 47900, loads: 50, avgRPG: 3.2, efficiency: 94.5 },
      { day: 'Wed', value: 44800, loads: 47, avgRPG: 2.9, efficiency: 93.1 },
      { day: 'Thu', value: 51200, loads: 54, avgRPG: 3.3, efficiency: 95.2 },
      { day: 'Fri', value: 59800, loads: 63, avgRPG: 3.6, efficiency: 96.7 },
      { day: 'Sat', value: 41700, loads: 43, avgRPG: 2.8, efficiency: 91.9 },
      { day: 'Sun', value: 35600, loads: 37, avgRPG: 2.6, efficiency: 89.4 },
    ];

    return { currentWeek: currentWeekData, previousWeek: previousWeekData };
  });

  // Calculate proper min/max values for better scaling
  const allValues = [
    ...chartData.currentWeek.map((d) => d.value),
    ...chartData.previousWeek.map((d) => d.value),
  ];
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const valueRange = maxValue - minValue;
  const chartPadding = valueRange * 0.1; // 10% padding
  const chartMin = Math.max(0, minValue - chartPadding);
  const chartMax = maxValue + chartPadding;

  // FIXED: Proper Y-axis positioning - 0 at bottom, higher values at top
  const getYPosition = (value) => {
    const normalizedValue = (value - chartMin) / (chartMax - chartMin);
    return 85 - normalizedValue * 70; // Start from 85% (near bottom) and go up to 15% (near top)
  };

  const generatePath = (data) => {
    const points = data.map((point, index) => {
      const x = 5 + (index / (data.length - 1)) * 90; // 5% margin on each side
      const y = getYPosition(point.value);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const formatCompactCurrency = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.AdvancedChartContainer>
      <S.ChartSVG viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Enhanced Gradient Definitions */}
        <defs>
          <linearGradient id="currentWeekGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(64, 224, 208, 0.4)" />
            <stop offset="50%" stopColor="rgba(64, 224, 208, 0.2)" />
            <stop offset="100%" stopColor="rgba(64, 224, 208, 0.02)" />
          </linearGradient>
          <linearGradient id="previousWeekGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(156, 163, 175, 0.3)" />
            <stop offset="50%" stopColor="rgba(156, 163, 175, 0.15)" />
            <stop offset="100%" stopColor="rgba(156, 163, 175, 0.02)" />
          </linearGradient>

          {/* Glow Effect for Lines */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Enhanced Glow for Data Points */}
          <filter id="pointGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Improved Grid lines with proper positioning */}
        {[20, 35, 50, 65, 80].map((y) => (
          <line
            key={y}
            x1="5"
            y1={y}
            x2="95"
            y2={y}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.3"
            strokeDasharray="2,2"
          />
        ))}

        {/* Previous week area with corrected path */}
        <path
          d={`${generatePath(chartData.previousWeek)} L 95,85 L 5,85 Z`}
          fill="url(#previousWeekGradient)"
          stroke="rgba(156, 163, 175, 0.6)"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Current week area with corrected path */}
        <path
          d={`${generatePath(chartData.currentWeek)} L 95,85 L 5,85 Z`}
          fill="url(#currentWeekGradient)"
          stroke="#40e0d0"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Enhanced current week line */}
        <path
          d={generatePath(chartData.currentWeek)}
          fill="none"
          stroke="#40e0d0"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            strokeDasharray: isAnimating ? '300' : 'none',
            strokeDashoffset: isAnimating ? '300' : '0',
            animation: isAnimating ? 'drawLine 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
          }}
        />

        {/* Simple dots for current week */}
        {chartData.currentWeek.map((point, index) => {
          const x = 5 + (index / (chartData.currentWeek.length - 1)) * 90;
          const y = getYPosition(point.value);
          return (
            <circle
              key={`current-${point.day}-${point.value}`}
              cx={x}
              cy={y}
              r="0.5"
              fill="#40e0d0"
              style={{
                cursor: 'pointer',
                animation: isAnimating
                  ? `pointAnimation 0.6s ease-out ${index * 0.1 + 1.5}s both`
                  : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={() => setHoveredPoint({ ...point, x, y, type: 'current', index })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}

        {/* Simple dots for previous week */}
        {chartData.previousWeek.map((point, index) => {
          const x = 5 + (index / (chartData.previousWeek.length - 1)) * 90;
          const y = getYPosition(point.value);
          return (
            <circle
              key={`previous-${point.day}-${point.value}`}
              cx={x}
              cy={y}
              r="0.4"
              fill="rgba(156, 163, 175, 0.8)"
              style={{
                cursor: 'pointer',
                animation: isAnimating
                  ? `pointAnimation 0.6s ease-out ${index * 0.1 + 2}s both`
                  : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={() => setHoveredPoint({ ...point, x, y, type: 'previous', index })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}
      </S.ChartSVG>

      {/* Enhanced Chart labels */}
      <S.ChartLabels>
        {chartData.currentWeek.map((point, index) => (
          <S.ChartLabel
            key={point.day}
            style={{
              animation: isAnimating
                ? `fadeInScale 0.6s ease-out ${index * 0.1 + 0.8}s both`
                : 'none',
              fontWeight: '600',
            }}
          >
            {point.day}
          </S.ChartLabel>
        ))}
      </S.ChartLabels>

      {/* Fixed Y-axis labels with proper positioning */}
      <S.YAxisLabels>
        {[0, 25, 50, 75, 100].map((percent) => {
          // Properly calculate values from bottom to top
          const value = chartMin + ((chartMax - chartMin) * percent) / 100;
          const yPosition = 85 - percent * 0.65; // Position from bottom (85%) to top (20%)
          return (
            <S.YAxisLabel
              key={percent}
              style={{
                top: `${yPosition}%`,
                transform: 'translateY(-50%)',
                fontSize: '10px',
                fontWeight: '500',
              }}
            >
              {formatCompactCurrency(value)}
            </S.YAxisLabel>
          );
        })}
      </S.YAxisLabels>

      {/* Enhanced Tooltip */}
      {hoveredPoint && (
        <S.ChartTooltip
          style={{
            left: `${hoveredPoint.x}%`,
            top: `${hoveredPoint.y}%`,
          }}
        >
          <S.TooltipHeader>
            {hoveredPoint.day} - {hoveredPoint.type === 'current' ? 'This Week' : 'Last Week'}
          </S.TooltipHeader>
          <S.TooltipRow>
            <S.TooltipLabel>Revenue:</S.TooltipLabel>
            <S.TooltipValue>{formatCurrency(hoveredPoint.value)}</S.TooltipValue>
          </S.TooltipRow>
          <S.TooltipRow>
            <S.TooltipLabel>Loads:</S.TooltipLabel>
            <S.TooltipValue>{hoveredPoint.loads}</S.TooltipValue>
          </S.TooltipRow>
          <S.TooltipRow>
            <S.TooltipLabel>Avg RPG:</S.TooltipLabel>
            <S.TooltipValue>${hoveredPoint.avgRPG}</S.TooltipValue>
          </S.TooltipRow>
          {hoveredPoint.efficiency && (
            <S.TooltipRow>
              <S.TooltipLabel>Efficiency:</S.TooltipLabel>
              <S.TooltipValue>{hoveredPoint.efficiency}%</S.TooltipValue>
            </S.TooltipRow>
          )}
        </S.ChartTooltip>
      )}
    </S.AdvancedChartContainer>
  );
});

const TMS = () => {
  const history = useHistory();
  const { isMobile } = useIsMobile();
  const [isVisible, setIsVisible] = useState({
    'hero-title': false,
    'hero-subtitle': false,
    'hero-actions': false,
    'features-header': true,
    'stats-section': true,
    'stats-header': true,
    'stats-footer': true,
    'cta-section': true,
    'dashboard-section': true,
    'load-management-section': true,
    'driver-portal-section': true,
    'maintenance-section': true,
    'financial-section': true,
    'financial-header': true,
    'integration-section': true,
    'integration-header': true,
    'security-section': true,
    'security-header': true,
    'testimonials-section': true,
    'testimonials-header': true,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Add interactive states for enhanced UX
  const [interactiveStates, setInteractiveStates] = useState({
    dashboardHovered: false,
    loadCardHovered: null,
    driverPortalActive: false,
    maintenanceMetricHovered: null,
    financialCardHovered: null,
    integrationNodeActive: null,
    securityFeatureHovered: null,
    testimonialHovered: null,
  });
  // Initialize to start from the middle section for infinite scrolling
  const TOTAL_ORIGINAL_CARDS = stats.length;
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(TOTAL_ORIGINAL_CARDS);

  // Infinite vertical scroll for mobile preview
  const mobileScrollRef = useRef(null);
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (container) {
      const speed = 1; // px per tick
      const delay = 16; // ms per tick (~60fps)
      const pauseDuration = 1000; // ms pause at top
      let isPaused = false;

      const scrollStep = () => {
        if (!container) return;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          isPaused = true;
          setTimeout(() => {
            container.scrollTop = 0;
            isPaused = false;
          }, pauseDuration);
        } else if (!isPaused) {
          container.scrollTop += speed;
        }
      };

      const interval = setInterval(scrollStep, delay);
      return () => clearInterval(interval);
    }
    return undefined;
  }, []);

  useEffect(() => {
    // Animate hero elements immediately on mount with staggered delays
    const heroTimers = [
      setTimeout(() => setIsVisible((prev) => ({ ...prev, 'hero-title': true })), 100),
      setTimeout(() => setIsVisible((prev) => ({ ...prev, 'hero-subtitle': true })), 300),
      setTimeout(() => setIsVisible((prev) => ({ ...prev, 'hero-actions': true })), 500),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Use a timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach((el) => {
        if (el.id && !el.id.startsWith('hero-')) {
          observer.observe(el);
        }
      });

      // Add specific observer for features section elements
      document.querySelectorAll('#features [data-animate]').forEach((el) => {
        if (el.id) {
          observer.observe(el);
        }
      });

      // Force visibility for all headers and sections that should be immediately visible
      setIsVisible((prev) => ({
        ...prev,
        'features-header': true,
        'cta-section': true,
        'financial-header': true,
        'integration-header': true,
        'security-header': true,
        'testimonials-header': true,
      }));
    }, 1500); // Further increased timeout for better reliability

    return () => {
      heroTimers.forEach((timer) => clearTimeout(timer));
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create infinite carousel data (duplicate stats for seamless loop)
  const infiniteStats = [...stats, ...stats, ...stats]; // Triple the data for infinite effect

  // Responsive cards per view based on screen width
  const getCardsPerView = () => {
    if (windowWidth <= 580) return 1; // Mobile: 1 card
    if (windowWidth <= 768) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const CARDS_PER_VIEW = getCardsPerView();

  // Carousel autoplay effect
  useEffect(() => {
    if (autoPlayPaused) return undefined;

    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => prevIndex + 1);
    }, 3500); // Slightly faster, smoother transitions

    return () => clearInterval(interval);
  }, [autoPlayPaused]);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentCarouselIndex >= TOTAL_ORIGINAL_CARDS * 2) {
      // Reset to the beginning without animation
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentCarouselIndex(TOTAL_ORIGINAL_CARDS);
        setTimeout(() => setIsTransitioning(true), 100);
      }, 800); // Increased to match the new transition duration
    }
  }, [currentCarouselIndex, TOTAL_ORIGINAL_CARDS]);

  // Initialize stats and features card visibility
  useEffect(() => {
    // Set initial visibility for stats cards
    const initialStatsVisibility = {};
    for (let i = 0; i < TOTAL_ORIGINAL_CARDS; i += 1) {
      initialStatsVisibility[`stat-${i}`] = true;
    }

    // Set initial visibility for feature cards
    const initialFeaturesVisibility = {};
    features.forEach((feature, index) => {
      initialFeaturesVisibility[`feature-${index}`] = true;
      initialFeaturesVisibility[`feature-${feature.id}`] = true;
    });

    setIsVisible((prev) => ({
      ...prev,
      ...initialStatsVisibility,
      ...initialFeaturesVisibility,
      'features-header': true,
    }));
  }, [TOTAL_ORIGINAL_CARDS, features]);

  // Calculate transform position
  const getTransformValue = () => {
    const cardWidth = 100 / CARDS_PER_VIEW; // Each card takes 33.333% of the container
    return -(currentCarouselIndex * cardWidth);
  };
  const handleDotClick = (index) => {
    setCurrentCarouselIndex(TOTAL_ORIGINAL_CARDS + index);
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleGetStarted = () => {
    history.push('/request-quote?product=tms');
  };

  const handleContactSales = () => {
    history.push('/contact');
  };

  // Replace the dashboardMetrics with useMemo
  const dashboardMetrics = useMemo(
    () => [
      {
        id: 'daily-revenue',
        icon: DollarSign,
        label: 'Daily Revenue',
        value: '$24,580',
        trend: { value: '+12%', positive: true, text: 'vs yesterday' },
      },
      {
        id: 'active-drivers',
        icon: Users,
        label: 'Active Drivers',
        value: '89',
        trend: { value: '+3', positive: true, text: 'drivers' },
      },
      {
        id: 'loads-in-transit',
        icon: Truck,
        label: 'Loads in Transit',
        value: '156',
        trend: { value: '-2', positive: false, text: 'from peak' },
      },
      {
        id: 'fleet-efficiency',
        icon: Target,
        label: 'Fleet Efficiency',
        value: '94.8%',
        trend: { value: '+2.1%', positive: true, text: 'this week' },
      },
    ],
    []
  );

  // Replace the dashboardAnimationState with useMemo
  const dashboardAnimationState = useMemo(
    () => ({
      'dashboard-section': true,
      'dashboard-header': true,
      'dashboard-metrics': true,
      'dashboard-chart': true,
      'dashboard-features': true,
    }),
    []
  );

  return (
    <S.Container>
      {/* Hero Section with Integrated Stats */}
      <S.HeroSection>
        <S.CenteredHeroContainer>
          <S.CenteredHeroContent data-animate id="hero-content" isVisible={isVisible['hero-title']}>
            <S.HeroTitle data-animate id="hero-title" isVisible={isVisible['hero-title']}>
              <S.HeroLogoContainer>
                <S.HeroLogoSVG viewBox="0 0 944.7 623.7" xmlns="http://www.w3.org/2000/svg">
                  <g id="dots_copy">
                    <circle className="st0" cx="150" cy="472.7" r="147.4" />
                    <circle className="st1" cx="150" cy="150.8" r="147.4" />
                    <circle className="st2" cx="472.3" cy="472.7" r="147.4" />
                    <circle className="st2" cx="794.7" cy="472.7" r="147.4" />
                  </g>
                </S.HeroLogoSVG>
              </S.HeroLogoContainer>
              <S.HeroBrandText>
                Spotter <S.HeroColoredText>TMS</S.HeroColoredText>
              </S.HeroBrandText>
            </S.HeroTitle>
            <S.HeroSubtitle data-animate id="hero-subtitle" isVisible={isVisible['hero-subtitle']}>
              Complete Fleet Management & Driver Operations Platform
            </S.HeroSubtitle>
          </S.CenteredHeroContent>
          <S.DashboardHeaderPreview isHero>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '17px',
              }}
            >
              <source src={spotterTmsVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </S.DashboardHeaderPreview>
          {/* Hero Actions moved below stats */}
          <S.HeroActionsContainer>
            <S.HeroActions data-animate id="hero-actions" isVisible={isVisible['hero-actions']}>
              <S.HeroPrimaryButton onClick={handleGetStarted}>
                <Truck size={20} />
                Get Started Today
              </S.HeroPrimaryButton>
              <S.HeroSecondaryButton onClick={scrollToFeatures}>
                <BarChart3 size={20} />
                See All Features
              </S.HeroSecondaryButton>
            </S.HeroActions>
          </S.HeroActionsContainer>
        </S.CenteredHeroContainer>

        {/* Integrated Performance Metrics */}
      </S.HeroSection>
      <S.StatsContainer data-animate id="stats-section" isVisible={isVisible['stats-section']}>
        <S.StatsContentWrapper>
          <S.SectionHeader data-animate id="stats-header" isVisible={isVisible['stats-header']}>
            <S.SectionTitle>
              <TrendingUp size={32} style={{ marginRight: '16px' }} />
              Proven Performance Results
            </S.SectionTitle>
            <S.TrustIndicators data-animate id="stats-footer" isVisible={isVisible['stats-footer']}>
              <S.TrustItem>
                <Shield size={24} />
                <span>
                  <strong>Trusted by 500+ fleets</strong> across North America
                </span>
              </S.TrustItem>
              <S.TrustBadge>
                <Star size={16} />
                <span>4.8/5 Rating</span>
              </S.TrustBadge>
            </S.TrustIndicators>
          </S.SectionHeader>

          <S.StatsCarousel
            onMouseEnter={() => setAutoPlayPaused(true)}
            onMouseLeave={() => setAutoPlayPaused(false)}
          >
            <S.StatsCarouselTrack
              translateX={getTransformValue()}
              isTransitioning={isTransitioning}
            >
              {infiniteStats.map((stat, index) => (
                <S.StatCard
                  key={`infinite-stat-${stat.label}-${Math.floor(index / TOTAL_ORIGINAL_CARDS)}-${
                    index % TOTAL_ORIGINAL_CARDS
                  }`}
                  data-animate
                  id={`stat-${index}`}
                  isVisible={isVisible[`stat-${index % TOTAL_ORIGINAL_CARDS}`]}
                  index={index % TOTAL_ORIGINAL_CARDS}
                >
                  <S.StatIcon>
                    <stat.icon size={32} />
                  </S.StatIcon>

                  <S.StatValue>{stat.value}</S.StatValue>
                  <S.StatLabel>{stat.label}</S.StatLabel>
                  <S.StatDescription>{stat.description}</S.StatDescription>

                  <S.StatGrowth positive>
                    <TrendingUp size={16} style={{ marginRight: '4px' }} />
                    {stat.growth}
                  </S.StatGrowth>
                </S.StatCard>
              ))}
            </S.StatsCarouselTrack>

            <S.StatsCarouselControls>
              <S.CarouselDots>
                {stats.map((stat, index) => (
                  <S.CarouselDot
                    key={`carousel-dot-${stat.label}`}
                    active={index === currentCarouselIndex % TOTAL_ORIGINAL_CARDS}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </S.CarouselDots>
            </S.StatsCarouselControls>
          </S.StatsCarousel>
        </S.StatsContentWrapper>
      </S.StatsContainer>

      {/* Features Section */}
      <S.FeaturesSection id="features">
        <S.FeaturesContainer>
          <S.SectionHeader
            style={{
              textAlign: 'center',
            }}
            data-animate
            id="features-header"
            isVisible={isVisible['features-header']}
          >
            <S.SectionTitle>Essential Fleet Management Tools</S.SectionTitle>
            <S.SectionSubtitle>
              Everything you need to manage drivers, monitor performance, and optimize your fleet
              operations in one powerful platform
            </S.SectionSubtitle>
          </S.SectionHeader>

          <S.FeaturesGrid>
            {features.map((feature, index) => (
              <S.FeatureCard
                key={feature.id}
                className={isVisible[`feature-${index}`] ? 'animation-complete' : ''}
                data-animate
                id={`feature-${feature.id}`}
                isVisible={isVisible[`feature-${index}`] || true}
                index={index}
              >
                {feature.badge && (
                  <S.FeatureBadge type={feature.badge.toLowerCase()}>
                    {feature.badge}
                  </S.FeatureBadge>
                )}
                <S.FeatureIcon>
                  <feature.icon size={28} />
                </S.FeatureIcon>
                <S.FeatureContent>
                  <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                  <S.FeatureSubtitle>{feature.subtitle}</S.FeatureSubtitle>
                  <S.FeatureDescription>{feature.description}</S.FeatureDescription>
                </S.FeatureContent>
              </S.FeatureCard>
            ))}
          </S.FeaturesGrid>
        </S.FeaturesContainer>
      </S.FeaturesSection>

      {/* Real-Time Dashboard Section */}
      <S.DashboardSection
        data-animate
        id="dashboard-section"
        isVisible={dashboardAnimationState['dashboard-section']}
      >
        <S.SectionContainer>
          <S.DashboardHeader
            data-animate
            id="dashboard-header"
            isVisible={dashboardAnimationState['dashboard-header']}
          >
            <S.SectionBadge>
              <S.BadgeIcon>
                <BarChart3 size={16} />
              </S.BadgeIcon>
              Live Analytics Engine
            </S.SectionBadge>
            <S.SectionTitle>
              Real-Time Fleet Dashboard &
              <S.SectionHighlight> Performance Intelligence</S.SectionHighlight>
            </S.SectionTitle>
            <S.SectionDescription style={{ margin: '0 auto' }}>
              Monitor your entire fleet operation from a single, intelligent dashboard. Track driver
              performance, vehicle status, load progress, and financial metrics in real-time with
              AI-powered insights and predictive analytics.
            </S.SectionDescription>
          </S.DashboardHeader>

          <S.DashboardHeaderPreview style={{ marginBottom: '100px' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '17px',
              }}
            >
              <source src={spotterTmsVideo2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </S.DashboardHeaderPreview>

          <S.DashboardGrid>
            <S.DashboardMain>
              <S.DashboardCard
                style={{
                  willChange: 'transform',
                  transform: `translateZ(0)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <S.DashboardCardHeader>
                  <S.DashboardTitle>Fleet Control Center</S.DashboardTitle>
                  <S.LiveIndicator>
                    <S.LivePulse />
                    <span>Live Data</span>
                  </S.LiveIndicator>
                </S.DashboardCardHeader>

                <S.DashboardMetricsGrid
                  data-animate
                  id="dashboard-metrics"
                  isVisible={dashboardAnimationState['dashboard-metrics']}
                  style={{ willChange: 'transform' }}
                >
                  {dashboardMetrics.map((metric) => (
                    <MemoizedMetricCard key={metric.id} metric={metric} />
                  ))}
                </S.DashboardMetricsGrid>

                <S.DashboardChart
                  data-animate
                  id="dashboard-chart"
                  isVisible={dashboardAnimationState['dashboard-chart']}
                  style={{
                    willChange: 'transform',
                    transform: `translateZ(0)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <S.ChartHeader>
                    <span>Revenue Trend (7 days)</span>
                    <S.ChartLegend>
                      <S.LegendItem>
                        <S.LegendDot color="#40e0d0" />
                        Current Week
                      </S.LegendItem>
                      <S.LegendItem>
                        <S.LegendDot color="rgba(255,255,255,0.6)" />
                        Previous Week
                      </S.LegendItem>
                    </S.ChartLegend>
                  </S.ChartHeader>
                  <RevenueChart />
                </S.DashboardChart>
              </S.DashboardCard>
            </S.DashboardMain>

            <S.DashboardSidebar
              data-animate
              id="dashboard-features"
              isVisible={dashboardAnimationState['dashboard-features']}
              style={{ willChange: 'transform' }}
            >
              <MemoizedDashboardFeatureCard
                icon={BarChart3}
                title="Performance Analytics"
                description="Real-time RPG, MPG, and gross revenue tracking with predictive insights"
              />
              <MemoizedDashboardFeatureCard
                icon={MapPin}
                title="Live Fleet Tracking"
                description="GPS integration with ELD and intelligent route optimization"
              />
              <MemoizedDashboardFeatureCard
                icon={Shield}
                title="Safety Monitoring"
                description="HOS compliance, driver wellness alerts, and safety score tracking"
              />
              <MemoizedDashboardFeatureCard
                icon={Brain}
                title="AI Insights"
                description="Machine learning powered recommendations for fleet decision making"
              />
            </S.DashboardSidebar>
          </S.DashboardGrid>
        </S.SectionContainer>
      </S.DashboardSection>

      {/* Advanced Load Management Section */}
      <S.LoadManagementSection
        data-animate
        id="load-management-section"
        isVisible={isVisible['load-management-section']}
      >
        <S.SectionContainer>
          <S.LoadManagementHeader>
            <S.SectionBadge>
              <S.BadgeIcon>
                <Route size={16} />
              </S.BadgeIcon>
              Load Operations Engine
            </S.SectionBadge>
            <S.SectionTitle>
              Advanced Load Management &
              <S.SectionHighlight> Intelligent Dispatching</S.SectionHighlight>
            </S.SectionTitle>
            <S.SectionDescription style={{ margin: '0 auto' }}>
              From dispatch to delivery, manage every aspect of your loads with our comprehensive
              load management system featuring AI-powered routing, automated billing, and real-time
              tracking with predictive analytics.
            </S.SectionDescription>
          </S.LoadManagementHeader>

          <S.LoadManagementContainer>
            <S.LoadStatsOverview>
              <S.LoadStatCard>
                <S.LoadStatIcon>
                  <Route size={32} />
                </S.LoadStatIcon>
                <S.LoadStatContent>
                  <S.LoadStatValue>2,847</S.LoadStatValue>
                  <S.LoadStatLabel>Active Loads</S.LoadStatLabel>
                  <S.LoadStatTrend positive>+18% this month</S.LoadStatTrend>
                </S.LoadStatContent>
              </S.LoadStatCard>

              <S.LoadStatCard>
                <S.LoadStatIcon>
                  <DollarSign size={32} />
                </S.LoadStatIcon>
                <S.LoadStatContent>
                  <S.LoadStatValue>$1.2M</S.LoadStatValue>
                  <S.LoadStatLabel>Monthly Revenue</S.LoadStatLabel>
                  <S.LoadStatTrend positive>+24% vs last month</S.LoadStatTrend>
                </S.LoadStatContent>
              </S.LoadStatCard>

              <S.LoadStatCard>
                <S.LoadStatIcon>
                  <Clock size={32} />
                </S.LoadStatIcon>
                <S.LoadStatContent>
                  <S.LoadStatValue>96.8%</S.LoadStatValue>
                  <S.LoadStatLabel>On-Time Delivery</S.LoadStatLabel>
                  <S.LoadStatTrend positive>+3.2% improvement</S.LoadStatTrend>
                </S.LoadStatContent>
              </S.LoadStatCard>
            </S.LoadStatsOverview>

            <S.LoadFeaturesGrid>
              <S.LoadFeatureCard
                onMouseEnter={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: 'smart-dispatch' }))
                }
                onMouseLeave={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: null }))
                }
                isHovered={interactiveStates.loadCardHovered === 'smart-dispatch'}
              >
                <S.LoadFeatureHeader>
                  <S.LoadFeatureIcon>
                    <Brain size={28} />
                  </S.LoadFeatureIcon>
                  <S.LoadFeatureBadge>AI-Powered</S.LoadFeatureBadge>
                </S.LoadFeatureHeader>
                <S.LoadFeatureContent>
                  <S.LoadFeatureTitle>Smart Dispatching</S.LoadFeatureTitle>
                  <S.LoadFeatureDescription>
                    AI-powered load assignment based on driver location, preferences, equipment
                    compatibility, and historical performance data for optimal routing.
                  </S.LoadFeatureDescription>
                  <S.LoadFeatureDetails>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Automated load-driver matching with ML algorithms</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Dynamic route optimization with traffic analysis</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Real-time availability tracking and preferences</span>
                    </S.LoadFeatureItem>
                  </S.LoadFeatureDetails>
                </S.LoadFeatureContent>
                <S.LoadFeatureMetric>
                  <S.MetricValue>23%</S.MetricValue>
                  <S.MetricLabel>efficiency increase</S.MetricLabel>
                </S.LoadFeatureMetric>
              </S.LoadFeatureCard>

              <S.LoadFeatureCard
                onMouseEnter={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: 'auto-billing' }))
                }
                onMouseLeave={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: null }))
                }
                isHovered={interactiveStates.loadCardHovered === 'auto-billing'}
              >
                <S.LoadFeatureHeader>
                  <S.LoadFeatureIcon>
                    <FileText size={28} />
                  </S.LoadFeatureIcon>
                  <S.LoadFeatureBadge>Automated</S.LoadFeatureBadge>
                </S.LoadFeatureHeader>
                <S.LoadFeatureContent>
                  <S.LoadFeatureTitle>Automated Billing</S.LoadFeatureTitle>
                  <S.LoadFeatureDescription>
                    Generate invoices, rate confirmations, and settlements automatically with
                    customizable templates and integrated payment processing.
                  </S.LoadFeatureDescription>
                  <S.LoadFeatureDetails>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Instant invoice generation with custom templates</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Automated rate confirmation distribution</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Integrated settlement and payment processing</span>
                    </S.LoadFeatureItem>
                  </S.LoadFeatureDetails>
                </S.LoadFeatureContent>
                <S.LoadFeatureMetric>
                  <S.MetricValue>85%</S.MetricValue>
                  <S.MetricLabel>time reduction</S.MetricLabel>
                </S.LoadFeatureMetric>
              </S.LoadFeatureCard>

              <S.LoadFeatureCard
                onMouseEnter={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: 'live-tracking' }))
                }
                onMouseLeave={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: null }))
                }
                isHovered={interactiveStates.loadCardHovered === 'live-tracking'}
              >
                <S.LoadFeatureHeader>
                  <S.LoadFeatureIcon>
                    <MapPin size={28} />
                  </S.LoadFeatureIcon>
                  <S.LoadFeatureBadge>Real-Time</S.LoadFeatureBadge>
                </S.LoadFeatureHeader>
                <S.LoadFeatureContent>
                  <S.LoadFeatureTitle>Live Tracking & Analytics</S.LoadFeatureTitle>
                  <S.LoadFeatureDescription>
                    Monitor load progress in real-time with GPS integration, delivery confirmations,
                    customer updates, and predictive arrival times.
                  </S.LoadFeatureDescription>
                  <S.LoadFeatureDetails>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>GPS-based tracking with ETA predictions</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Automated delivery confirmations and PODs</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Proactive customer notifications and updates</span>
                    </S.LoadFeatureItem>
                  </S.LoadFeatureDetails>
                </S.LoadFeatureContent>
                <S.LoadFeatureMetric>
                  <S.MetricValue>99.2%</S.MetricValue>
                  <S.MetricLabel>visibility accuracy</S.MetricLabel>
                </S.LoadFeatureMetric>
              </S.LoadFeatureCard>

              <S.LoadFeatureCard
                onMouseEnter={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: 'analytics' }))
                }
                onMouseLeave={() =>
                  setInteractiveStates((prev) => ({ ...prev, loadCardHovered: null }))
                }
                isHovered={interactiveStates.loadCardHovered === 'analytics'}
              >
                <S.LoadFeatureHeader>
                  <S.LoadFeatureIcon>
                    <BarChart3 size={28} />
                  </S.LoadFeatureIcon>
                  <S.LoadFeatureBadge>Intelligence</S.LoadFeatureBadge>
                </S.LoadFeatureHeader>
                <S.LoadFeatureContent>
                  <S.LoadFeatureTitle>Advanced Analytics</S.LoadFeatureTitle>
                  <S.LoadFeatureDescription>
                    Comprehensive reporting on load profitability, on-time performance, customer
                    metrics, and predictive insights for business optimization.
                  </S.LoadFeatureDescription>
                  <S.LoadFeatureDetails>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Profitability analysis by route and customer</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Performance metrics and benchmarking</span>
                    </S.LoadFeatureItem>
                    <S.LoadFeatureItem>
                      <CheckCircle size={16} />
                      <span>Customer scorecards and relationship insights</span>
                    </S.LoadFeatureItem>
                  </S.LoadFeatureDetails>
                </S.LoadFeatureContent>
                <S.LoadFeatureMetric>
                  <S.MetricValue>700+</S.MetricValue>
                  <S.MetricLabel>analytics reports</S.MetricLabel>
                </S.LoadFeatureMetric>
              </S.LoadFeatureCard>
            </S.LoadFeaturesGrid>
          </S.LoadManagementContainer>
        </S.SectionContainer>
      </S.LoadManagementSection>

      {/* Smart Maintenance System Section */}
      <S.MaintenanceSection
        data-animate
        id="maintenance-section"
        isVisible={isVisible['maintenance-section']}
      >
        <S.SectionContainer>
          <S.MaintenanceLayout>
            <S.MaintenanceContent>
              <S.SectionBadge>
                <S.BadgeIcon>
                  <Wrench size={16} />
                </S.BadgeIcon>
                Equipment Care
              </S.SectionBadge>
              <S.SectionTitle>Smart Maintenance System</S.SectionTitle>
              <S.SectionDescription>
                Stay ahead of repairs, maximize uptime, and extend your fleet&apos;s lifespan with
                our cutting-edge maintenance system that watches your vehicles 24/7. Never let
                maintenance issues slow you down again.
              </S.SectionDescription>

              <S.MaintenanceMetrics>
                <S.MaintenanceMetric>
                  <S.MetricNumber>25%</S.MetricNumber>
                  <S.MetricDescription>Reduction in unplanned downtime</S.MetricDescription>
                </S.MaintenanceMetric>
                <S.MaintenanceMetric>
                  <S.MetricNumber>$2,800</S.MetricNumber>
                  <S.MetricDescription>Average annual savings per truck</S.MetricDescription>
                </S.MaintenanceMetric>
              </S.MaintenanceMetrics>
            </S.MaintenanceContent>

            <S.MaintenanceFeatures>
              <S.MaintenanceFeature>
                <S.MaintenanceFeatureIcon>
                  <Calendar size={24} />
                </S.MaintenanceFeatureIcon>
                <div>
                  <h4>Preventive Maintenance</h4>
                  <p>Automated PM scheduling based on mileage, engine hours, and time intervals</p>
                </div>
              </S.MaintenanceFeature>

              <S.MaintenanceFeature>
                <S.MaintenanceFeatureIcon>
                  <CheckCircle size={24} />
                </S.MaintenanceFeatureIcon>
                <div>
                  <h4>Pre-Trip Inspections</h4>
                  <p>Digital PTI forms with photo documentation and automatic reporting</p>
                </div>
              </S.MaintenanceFeature>

              <S.MaintenanceFeature>
                <S.MaintenanceFeatureIcon>
                  <Activity size={24} />
                </S.MaintenanceFeatureIcon>
                <div>
                  <h4>Vehicle Health Monitoring</h4>
                  <p>Real-time diagnostics, fault code alerts, and performance tracking</p>
                </div>
              </S.MaintenanceFeature>

              <S.MaintenanceFeature>
                <S.MaintenanceFeatureIcon>
                  <Database size={24} />
                </S.MaintenanceFeatureIcon>
                <div>
                  <h4>Complete Service History</h4>
                  <p>Detailed maintenance records, cost tracking, and vendor management</p>
                </div>
              </S.MaintenanceFeature>
            </S.MaintenanceFeatures>
          </S.MaintenanceLayout>
        </S.SectionContainer>
      </S.MaintenanceSection>

      {/* Financial Control Center Section */}
      <S.FinancialSection
        data-animate
        id="financial-section"
        isVisible={isVisible['financial-section']}
      >
        <S.FinancialFloatingElements>
          {Array.from({ length: 8 }, (_, i) => (
            <S.FinancialParticle
              key={`financial-particle-${i}`}
              type={['dollar', 'circle', 'square'][i % 3]}
              position={i}
              size={['small', 'medium', 'large'][i % 3]}
              speed={['slow', 'medium', 'fast'][i % 3]}
              delay={`${i * 0.5}s`}
            />
          ))}
        </S.FinancialFloatingElements>

        <S.SectionContainer>
          <S.SectionHeader
            center
            data-animate
            id="financial-header"
            isVisible={isVisible['financial-header']}
          >
            <S.SectionBadge>
              <S.BadgeIcon>
                <CreditCard size={16} />
              </S.BadgeIcon>
              Financial Management
            </S.SectionBadge>
            <S.SectionTitle>Complete Financial Control Center</S.SectionTitle>
            <S.SectionDescription>
              Streamline your financial operations with automated payroll processing, multi-account
              management, expense tracking, and comprehensive financial reporting.
            </S.SectionDescription>
          </S.SectionHeader>

          <S.FinancialGrid>
            <S.FinancialCard primary>
              <S.FinancialCardHeader>
                <CreditCard size={32} />
                <S.FinancialCardTitle>Advanced Payroll System</S.FinancialCardTitle>
              </S.FinancialCardHeader>
              <S.FinancialCardContent>
                <p>
                  Automated weekly payroll calculations with support for multiple pay structures,
                  deductions, bonuses, and settlement processing.
                </p>
                <S.FinancialFeatureList>
                  <li>Multi-account payroll processing</li>
                  <li>Automated tax calculations</li>
                  <li>Direct deposit integration</li>
                  <li>Driver settlement summaries</li>
                </S.FinancialFeatureList>
              </S.FinancialCardContent>
            </S.FinancialCard>

            <S.FinancialCard>
              <S.FinancialCardHeader>
                <DollarSign size={24} />
                <S.FinancialCardTitle>Expense Management</S.FinancialCardTitle>
              </S.FinancialCardHeader>
              <S.FinancialCardContent>
                <p>
                  Track fuel, maintenance, tolls, and operational expenses with automated
                  categorization.
                </p>
              </S.FinancialCardContent>
            </S.FinancialCard>

            <S.FinancialCard>
              <S.FinancialCardHeader>
                <BarChart3 size={24} />
                <S.FinancialCardTitle>Financial Analytics</S.FinancialCardTitle>
              </S.FinancialCardHeader>
              <S.FinancialCardContent>
                <p>
                  Comprehensive P&L reports, cost per mile analysis, and profitability tracking.
                </p>
              </S.FinancialCardContent>
            </S.FinancialCard>

            <S.FinancialCard>
              <S.FinancialCardHeader>
                <Globe size={24} />
                <S.FinancialCardTitle>Multi-Entity Support</S.FinancialCardTitle>
              </S.FinancialCardHeader>
              <S.FinancialCardContent>
                <p>
                  Manage multiple companies, franchises, and business entities from one platform.
                </p>
              </S.FinancialCardContent>
            </S.FinancialCard>
          </S.FinancialGrid>
        </S.SectionContainer>
      </S.FinancialSection>

      {/* CTA Section */}
      <S.CTASection data-animate id="cta-section" isVisible={isVisible['cta-section']}>
        <S.CTAContainer>
          <S.CTAContent>
            <S.CTATitle>Ready to Transform Your Fleet Operations?</S.CTATitle>
            <S.CTADescription>
              Join thousands of fleet managers using Spotter TMS to optimize their operations
            </S.CTADescription>
            <S.CTAActions>
              <S.CTAPrimaryButton onClick={handleGetStarted}>
                <Truck size={20} />
                Get Started Today
              </S.CTAPrimaryButton>
            </S.CTAActions>
          </S.CTAContent>
        </S.CTAContainer>
      </S.CTASection>
    </S.Container>
  );
};

export default TMS;
