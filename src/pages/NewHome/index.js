import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BarChart3,
  Truck,
  Brain,
  Search,
  Database,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Cpu,
  Cloud,
  Settings,
  Target,
  Lightbulb,
  Rocket,
  Star,
  ChevronDown,
  MessageCircle,
  Globe,
  Zap,
  FileText,
  User,
  Smartphone,
  Chrome,
} from 'lucide-react';
import { useIsMobile } from 'hooks';
import BgSvg from 'assets/svgs/background.svg';
import MobileBgSvg from 'assets/svgs/mobile_bg.svg';
import {
  WernerLogo,
  SchneiderLogo,
  PepsicoLogo,
  FedExLogo,
  CHRobinsonLogo,
  PenskeLogo,
} from 'assets/logos';
import DashboardArtifact from './DashboardArtifact';
import * as S from './styles';

const NewHome = () => {
  const history = useHistory();
  const { isMobile } = useIsMobile();
  const [isVisible, setIsVisible] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const features = [
    {
      id: 'lens',
      icon: BarChart3,
      title: 'Spotter Lens',
      subtitle: 'Market intelligence at your fingertips',
      description:
        'Real-time freight market data analytics with comprehensive rankings and pricing insights.',
      badge: null,
    },
    {
      id: 'crm',
      icon: User,
      title: 'Spotter CRM',
      subtitle: 'Recruiting engine with visibility',
      description:
        'Streamline your recruiting process with engagement tracking and performance visibility.',
      badge: null,
    },
    {
      id: 'driver-app',
      icon: Smartphone,
      title: 'Driver App',
      subtitle: 'Load optimization made simple',
      description:
        'AI-powered load scoring and matching system with real-time performance metrics.',
      badge: null,
    },
    {
      id: 'tms',
      icon: Truck,
      title: 'Spotter TMS',
      subtitle: 'Visibility engine for operations',
      description:
        'Complete transportation management system with data automation and operational visibility.',
      badge: null,
    },
    {
      id: 'sentinel',
      icon: Shield,
      title: 'Spotter Sentinel',
      subtitle: 'Safety automation and scoring',
      description:
        'Advanced driver scoring system with safety automation and compliance monitoring.',
      badge: null,
    },
    {
      id: 'extension',
      icon: Chrome,
      title: 'Load Board Extension',
      subtitle: 'Browser automation tools',
      description:
        'Chrome and Firefox extension that automates load board workflows with advanced filtering.',
      badge: null,
    },
  ];

  const stats = [
    {
      label: 'Active Fleet Managers',
      value: '10K+',
      icon: Users,
      description: 'Managing operations daily',
      growth: '+127%',
    },
    {
      label: 'Load Matches Processed',
      value: '2.8M+',
      icon: Truck,
      description: 'Loads optimized monthly',
      growth: '+89%',
    },
    {
      label: 'Cost Savings Generated',
      value: '$50M+',
      icon: TrendingUp,
      description: 'Saved across all customers',
      growth: '+156%',
    },
    {
      label: 'AI Predictions Accuracy',
      value: '96.7%',
      icon: Brain,
      description: 'Market prediction precision',
      growth: '+12%',
    },
  ];

  const integrations = [
    { name: 'Werner', logo: WernerLogo },
    { name: 'Schneider', logo: SchneiderLogo },
    { name: 'Pepsico', logo: PepsicoLogo },
    { name: 'FedEx', logo: FedExLogo },
    { name: 'C.H. Robinson', logo: CHRobinsonLogo },
    { name: 'Penske', logo: PenskeLogo },
  ];

  // ANIMATED PARTICLES - Only particles animation
  const particleElements = [
    { id: 'particle-1', type: 'dot', size: 'large', color: 'logo-teal', speed: 'slow' },
    { id: 'particle-2', type: 'dot', size: 'medium', color: 'logo-red', speed: 'medium' },
    { id: 'particle-3', type: 'dot', size: 'small', color: 'logo-cyan', speed: 'fast' },
    { id: 'particle-4', type: 'ring', size: 'medium', color: 'logo-teal', speed: 'slow' },
    { id: 'particle-5', type: 'dot', size: 'large', color: 'logo-red', speed: 'medium' },
    { id: 'particle-6', type: 'ring', size: 'small', color: 'logo-cyan', speed: 'fast' },
    { id: 'particle-7', type: 'dot', size: 'medium', color: 'logo-teal', speed: 'slow' },
    { id: 'particle-8', type: 'ring', size: 'large', color: 'logo-red', speed: 'medium' },
    { id: 'particle-9', type: 'dot', size: 'small', color: 'logo-cyan', speed: 'fast' },
    { id: 'particle-10', type: 'ring', size: 'medium', color: 'logo-teal', speed: 'slow' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <S.Layout>
      {/* Hero Section */}
      <S.HeroSection id="hero" data-animate>
        <S.HeroBackground background={isMobile ? MobileBgSvg : BgSvg} />

        {/* Animated Particles */}
        <S.FloatingDecorations>
          {particleElements.map((element, index) => (
            <S.ParticleElement
              key={element.id}
              delay={`${index * 0.4}s`}
              position={index}
              index={index}
              {...element}
            />
          ))}
        </S.FloatingDecorations>

        {/* Centered Hero Content */}
        <S.CenteredHeroContainer>
          <S.CenteredHeroContent isVisible={isVisible.hero}>
            <S.HeroTitle>
              Trucking <S.HeroHighlight>Automation</S.HeroHighlight>
              <br />
              that works for you.
            </S.HeroTitle>
          </S.CenteredHeroContent>

          {/* Product Showcase */}
          <S.ProductShowcase isVisible={isVisible.hero}>
            <S.ProductShowcaseContainer>
              {/* Desktop Dashboard Mockup */}
              <S.DesktopMockup>
                <DashboardArtifact />
              </S.DesktopMockup>
            </S.ProductShowcaseContainer>
          </S.ProductShowcase>

          <S.HeroButtons>
            <S.PrimaryButton onClick={() => history.push('/request-quote')}>
              Unlock the Future of Freight
              <S.ButtonIcon>
                <ChevronDown size={16} />
              </S.ButtonIcon>
            </S.PrimaryButton>
          </S.HeroButtons>
        </S.CenteredHeroContainer>
      </S.HeroSection>

      {/* Features Section */}
      <S.FeaturesSection id="features" data-animate>
        <S.FeaturesContainer isVisible={isVisible.features}>
          <S.FeaturesHeader>
            <S.FeaturesTitle>
              Explore Spotter&apos;s
              <S.FeaturesHighlight> Capabilities</S.FeaturesHighlight>
            </S.FeaturesTitle>
            <S.FeaturesSubtitle>
              Everything you need to optimize your logistics operations, powered by cutting-edge AI
            </S.FeaturesSubtitle>
          </S.FeaturesHeader>

          <S.FeaturesGrid>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <S.FeatureCard
                  key={feature.id}
                  isVisible={isVisible.features}
                  delay={`${index * 0.15}s`}
                >
                  <S.FeatureCardInner>
                    <S.FeatureCardGlow />
                    {feature.badge && <S.FeatureBadge>{feature.badge}</S.FeatureBadge>}
                    <S.FeatureIconContainer>
                      <S.FeatureIcon>
                        <IconComponent size={28} />
                      </S.FeatureIcon>
                      <S.FeatureIconGlow />
                    </S.FeatureIconContainer>
                    <S.FeatureContent>
                      <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                      <S.FeatureSubtitle>{feature.subtitle}</S.FeatureSubtitle>
                      <S.FeatureDescription>{feature.description}</S.FeatureDescription>
                    </S.FeatureContent>
                  </S.FeatureCardInner>
                </S.FeatureCard>
              );
            })}
          </S.FeaturesGrid>
        </S.FeaturesContainer>
      </S.FeaturesSection>

      {/* Trusted By Section */}
      {/* <S.TrustedSection id="trusted" data-animate>
        <S.TrustedBackground />
        <S.TrustedFloatingElements>
          {Array.from({ length: 12 }, (_, i) => (
            <S.TrustedFloatingElement
              key={`trusted-element-${i}`}
              delay={`${i * 0.3}s`}
              position={i}
              type={i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle'}
            />
          ))}
        </S.TrustedFloatingElements>

        <S.TrustedContainer isVisible={isVisible.trusted}>
          <S.TrustedHeader>
            <S.TrustedBadge>
              <S.TrustedBadgeIcon>
                <Star size={16} />
              </S.TrustedBadgeIcon>
              Trusted Worldwide
            </S.TrustedBadge>
            <S.TrustedTitle>
              Everything Your Fleet Needs.
              <S.TrustedHighlight> One Smart Platform</S.TrustedHighlight>
            </S.TrustedTitle>
            <S.TrustedSubtitle>
              Join 10,000+ logistics professionals who&apos;ve transformed their operations with our
              AI-powered platform
            </S.TrustedSubtitle>
          </S.TrustedHeader>

          <S.TrustedShowcase>
            <S.TrustedMetrics>
              <S.TrustedMetric delay="0.2s" isVisible={isVisible.trusted}>
                <S.MetricIcon>
                  <Users size={24} />
                </S.MetricIcon>
                <S.MetricValue>10K+</S.MetricValue>
                <S.MetricLabel>Active Users</S.MetricLabel>
                <S.MetricProgress>
                  <S.MetricProgressBar delay="0.5s" width="85%" />
                </S.MetricProgress>
              </S.TrustedMetric>

              <S.TrustedMetric delay="0.4s" isVisible={isVisible.trusted}>
                <S.MetricIcon>
                  <Shield size={24} />
                </S.MetricIcon>
                <S.MetricValue>99.9%</S.MetricValue>
                <S.MetricLabel>Uptime</S.MetricLabel>
                <S.MetricProgress>
                  <S.MetricProgressBar delay="0.7s" width="99%" />
                </S.MetricProgress>
              </S.TrustedMetric>

              <S.TrustedMetric delay="0.6s" isVisible={isVisible.trusted}>
                <S.MetricIcon>
                  <Database size={24} />
                </S.MetricIcon>
                <S.MetricValue>500M+</S.MetricValue>
                <S.MetricLabel>Data Points</S.MetricLabel>
                <S.MetricProgress>
                  <S.MetricProgressBar delay="0.9s" width="95%" />
                </S.MetricProgress>
              </S.TrustedMetric>
            </S.TrustedMetrics>

            <S.TrustedLogos>
              <S.TrustedLogosTitle>Trusted by industry leaders</S.TrustedLogosTitle>
              <S.IntegrationsGrid>
                {integrations.map((integration, index) => {
                  const IconComponent = integration.logo;
                  // Enhanced sizing for larger, more prominent logos with mobile responsiveness
                  const getLogoSize = (name) => {
                    const baseSizes = {
                      Werner: { desktop: 200, tablet: 150, mobile: 100, small: 80 },
                      Schneider: { desktop: 130, tablet: 100, mobile: 80, small: 60 },
                      Pepsico: { desktop: 125, tablet: 95, mobile: 75, small: 60 },
                      FedEx: { desktop: 150, tablet: 115, mobile: 90, small: 70 },
                      'C.H. Robinson': { desktop: 180, tablet: 135, mobile: 105, small: 85 },
                      Penske: { desktop: 135, tablet: 105, mobile: 80, small: 65 },
                    };

                    const sizes = baseSizes[name] || {
                      desktop: 130,
                      tablet: 100,
                      mobile: 80,
                      small: 65,
                    };

                    if (windowWidth <= 375) return sizes.small;
                    if (windowWidth <= 480) return sizes.mobile;
                    if (windowWidth <= 768) return sizes.tablet;
                    return sizes.desktop;
                  };

                  return (
                    <S.IntegrationItem
                      key={integration.name}
                      delay={`${index * 0.15 + 1}s`}
                      isVisible={isVisible.trusted}
                    >
                      <S.IntegrationIcon>
                        <IconComponent size={getLogoSize(integration.name)} />
                      </S.IntegrationIcon>
                      <S.IntegrationGlow />
                    </S.IntegrationItem>
                  );
                })}
              </S.IntegrationsGrid>
            </S.TrustedLogos>
          </S.TrustedShowcase>

          <S.TrustedTestimonial>
            <S.TestimonialCard delay="1.2s" isVisible={isVisible.trusted}>
              <S.TestimonialQuote>
                &ldquo;Spotter made it easier to streamline every part of our logistics workflow
                efficiently. The AI insights have saved us millions in operational costs.&rdquo;
              </S.TestimonialQuote>
              <S.TestimonialAuthor>
                <S.AuthorAvatar>
                  <S.AvatarImage>MC</S.AvatarImage>
                </S.AuthorAvatar>
                <S.AuthorInfo>
                  <S.AuthorName>Mary Caldwell</S.AuthorName>
                  <S.AuthorTitle>Logistics Lead, Schneider</S.AuthorTitle>
                  <S.AuthorCompany>Fortune 500 Logistics Company</S.AuthorCompany>
                </S.AuthorInfo>
                <S.TestimonialRating>
                  {Array.from({ length: 5 }, (_, i) => (
                    <S.StarIcon key={i} delay={`${1.4 + i * 0.1}s`}>
                      <Star size={16} fill="currentColor" />
                    </S.StarIcon>
                  ))}
                </S.TestimonialRating>
              </S.TestimonialAuthor>
            </S.TestimonialCard>
          </S.TrustedTestimonial>
        </S.TrustedContainer>
      </S.TrustedSection> */}

      {/* Stats Section */}
      <S.StatsSection id="stats" data-animate>
        <S.StatsContainer isVisible={isVisible.stats}>
          <S.StatsHeader>
            <S.StatsTitle>
              Delivering
              <S.StatsHighlight> Measurable Results</S.StatsHighlight> across the industry
            </S.StatsTitle>
            <S.StatsSubtitle>
              Real impact from real customers who&apos;ve transformed their freight operations with
              our AI-powered platform
            </S.StatsSubtitle>
          </S.StatsHeader>

          <S.StatsGrid>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <S.FeatureCard
                  key={stat.label}
                  isVisible={isVisible.stats}
                  delay={`${index * 0.15}s`}
                >
                  <S.StatsCardInner>
                    <S.FeatureCardGlow />
                    <S.StatsIconContainer>
                      <S.FeatureIcon>
                        <IconComponent size={28} />
                      </S.FeatureIcon>
                      <S.FeatureIconGlow />
                    </S.StatsIconContainer>
                    <S.StatsContent>
                      <S.FeatureTitle>{stat.value}</S.FeatureTitle>
                      <S.FeatureSubtitle>{stat.label}</S.FeatureSubtitle>
                      <S.FeatureDescription>
                        {stat.description}
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginTop: '8px',
                            justifyContent: 'center',
                            color: '#10b981',
                            fontWeight: '600',
                            fontSize: '18px',
                          }}
                        >
                          <TrendingUp size={24} />
                          {stat.growth}
                        </span>
                      </S.FeatureDescription>
                    </S.StatsContent>
                  </S.StatsCardInner>
                </S.FeatureCard>
              );
            })}
          </S.StatsGrid>

          <S.StatsFooter>
            <S.StatsFooterText>
              &ldquo;SpotterAI has completely transformed our logistics operations. We&apos;ve seen
              a{' '}
              <span style={{ color: '#14b8a6', fontWeight: '600' }}>
                40% reduction in operational costs
              </span>{' '}
              and{' '}
              <span style={{ color: '#14b8a6', fontWeight: '600' }}>60% faster load matching</span>.
              The AI insights are game-changing for our decision-making process.&rdquo;
            </S.StatsFooterText>
            <S.StatsFooterAuthor>
              <S.StatsAuthorAvatar />
              <S.StatsAuthorInfo>
                <S.StatsAuthorName>Mary Caldwell</S.StatsAuthorName>
                <S.StatsAuthorTitle>Logistics Director, Schneider National</S.StatsAuthorTitle>
              </S.StatsAuthorInfo>
            </S.StatsFooterAuthor>
          </S.StatsFooter>
        </S.StatsContainer>
      </S.StatsSection>

      {/* CTA Section */}
      <S.CTASection id="cta" data-animate>
        <S.CTABackground />
        <S.CTAFloatingElements>
          {Array.from({ length: 8 }, (_, i) => (
            <S.CTAFloatingElement key={`cta-element-${i}`} delay={`${i * 0.5}s`} position={i} />
          ))}
        </S.CTAFloatingElements>

        <S.CTAContainer isVisible={isVisible.cta}>
          <S.CTAContent>
            <S.CTATitle>
              Ready to revolutionize your
              <S.CTAHighlight> Freight Operations?</S.CTAHighlight>
            </S.CTATitle>
            <S.CTASubtitle>
              From dispatch to safety and hiring. Join 10,000+ logistics pros already optimizing
              with SpotterAI.
            </S.CTASubtitle>

            {/* <S.CTAFeatures>
              <S.CTAFeature>
                <S.CTAFeatureIcon>✓</S.CTAFeatureIcon>
                <S.CTAFeatureText>Free 14-day trial</S.CTAFeatureText>
              </S.CTAFeature>
              <S.CTAFeature>
                <S.CTAFeatureIcon>✓</S.CTAFeatureIcon>
                <S.CTAFeatureText>No credit card required</S.CTAFeatureText>
              </S.CTAFeature>
              <S.CTAFeature>
                <S.CTAFeatureIcon>✓</S.CTAFeatureIcon>
                <S.CTAFeatureText>24/7 expert support</S.CTAFeatureText>
              </S.CTAFeature>
            </S.CTAFeatures> */}

            <S.CTAButtons>
              <S.PrimaryButton onClick={() => history.push('/request-quote')}>
                <S.ButtonIcon>
                  <FileText size={16} />
                </S.ButtonIcon>
                Request a quote
              </S.PrimaryButton>
            </S.CTAButtons>

            <S.CTATrust>
              <S.CTATrustText>Trusted by industry leaders</S.CTATrustText>
              <S.CTATrustLogos>
                {integrations.map((integration, index) => {
                  const IconComponent = integration.logo;
                  // Enhanced sizing for CTA section - matching Trusted By section but slightly smaller
                  const getLogoSize = (name) => {
                    const baseSizes = {
                      Werner: { desktop: 60, tablet: 50, mobile: 40, small: 35 },
                      Schneider: { desktop: 85, tablet: 70, mobile: 55, small: 45 },
                      Pepsico: { desktop: 80, tablet: 65, mobile: 50, small: 40 },
                      FedEx: { desktop: 100, tablet: 80, mobile: 60, small: 50 },
                      'C.H. Robinson': { desktop: 120, tablet: 95, mobile: 75, small: 60 },
                      Penske: { desktop: 90, tablet: 75, mobile: 55, small: 45 },
                    };

                    const sizes = baseSizes[name] || {
                      desktop: 85,
                      tablet: 70,
                      mobile: 55,
                      small: 45,
                    };

                    if (windowWidth <= 375) return sizes.small;
                    if (windowWidth <= 480) return sizes.mobile;
                    if (windowWidth <= 768) return sizes.tablet;
                    return sizes.desktop;
                  };

                  return (
                    <S.CTATrustLogo key={integration.name} delay={`${index * 0.1}s`}>
                      <IconComponent size={getLogoSize(integration.name)} />
                    </S.CTATrustLogo>
                  );
                })}
              </S.CTATrustLogos>
            </S.CTATrust>
          </S.CTAContent>
        </S.CTAContainer>
      </S.CTASection>
    </S.Layout>
  );
};

export default NewHome;
