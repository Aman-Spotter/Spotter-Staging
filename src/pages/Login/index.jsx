import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BarChart3,
  Truck,
  Shield,
  TrendingUp,
  Target,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from 'components';
import * as S from './styles';

const Login = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTMSLogin = () => {
    window.open('https://tms.spotter.ai/login', '_blank', 'noopener,noreferrer');
  };

  const handleSentinelLogin = () => {
    window.open('https://safetyapp.spotter.ai/login', '_blank', 'noopener,noreferrer');
  };

  return (
    <S.Container>
      <S.BackgroundElements>
        {Array.from({ length: 12 }, (_, i) => (
          <S.FloatingElement
            key={`floating-${i}`}
            delay={`${i * 0.5}s`}
            position={i}
            type={i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle'}
          />
        ))}
      </S.BackgroundElements>

      <Navbar absolute showAuthUrls />

      <S.SplitContainer isVisible={isVisible}>
        <S.LoginSection variant="tms" onClick={handleTMSLogin} isVisible={isVisible} delay="0.3s">
          <S.SectionGlow variant="tms" />
          <S.SectionContent>
            <S.SectionIcon variant="tms">
              <S.IconSVG viewBox="0 0 944.7 623.7" xmlns="http://www.w3.org/2000/svg">
                <g id="dots_copy">
                  <circle className="st0" cx="150" cy="472.7" r="147.4" />
                  <circle className="st1" cx="150" cy="150.8" r="147.4" />
                  <circle className="st2" cx="472.3" cy="472.7" r="147.4" />
                  <circle className="st2" cx="794.7" cy="472.7" r="147.4" />
                </g>
              </S.IconSVG>
            </S.SectionIcon>

            <S.SectionTitle variant="tms">Spotter TMS</S.SectionTitle>
            <S.SectionSubtitle>Transportation Management System</S.SectionSubtitle>
            <S.SectionDescription>
              Streamline your logistics operations with our comprehensive TMS platform. Manage
              routes, track shipments, and optimize your fleet efficiency.
            </S.SectionDescription>

            <S.FeatureList>
              <S.Feature>
                <BarChart3 size={16} />
                Real-time Analytics
              </S.Feature>
              <S.Feature>
                <Truck size={16} />
                Fleet Management
              </S.Feature>
              <S.Feature>
                <Target size={16} />
                Route Optimization
              </S.Feature>
            </S.FeatureList>

            <S.LoginButton variant="tms">
              <span>Access TMS Platform</span>
              <S.ButtonArrow>
                <ArrowRight size={16} />
              </S.ButtonArrow>
            </S.LoginButton>
          </S.SectionContent>
        </S.LoginSection>

        <S.Divider isVisible={isVisible} />

        <S.LoginSection
          variant="sentinel"
          onClick={handleSentinelLogin}
          isVisible={isVisible}
          delay="0.6s"
        >
          <S.SectionGlow variant="sentinel" />
          <S.SectionContent>
            <S.SectionIcon variant="sentinel">
              <S.IconSVG viewBox="0 0 944.7 623.7" xmlns="http://www.w3.org/2000/svg">
                <g id="dots_copy">
                  <circle className="st0" cx="150" cy="472.7" r="147.4" />
                  <circle className="st1" cx="150" cy="150.8" r="147.4" />
                  <circle className="st2" cx="472.3" cy="472.7" r="147.4" />
                  <circle className="st2" cx="794.7" cy="472.7" r="147.4" />
                </g>
              </S.IconSVG>
            </S.SectionIcon>

            <S.SectionTitle variant="sentinel">Spotter Sentinel</S.SectionTitle>
            <S.SectionSubtitle>Safety Management System</S.SectionSubtitle>
            <S.SectionDescription>
              Enhance safety compliance and risk management with our advanced monitoring system.
              Track driver behavior and ensure regulatory compliance.
            </S.SectionDescription>

            <S.FeatureList>
              <S.Feature>
                <Shield size={16} />
                Safety Monitoring
              </S.Feature>
              <S.Feature>
                <TrendingUp size={16} />
                Compliance Tracking
              </S.Feature>
              <S.Feature>
                <AlertTriangle size={16} />
                Risk Assessment
              </S.Feature>
            </S.FeatureList>

            <S.LoginButton variant="sentinel">
              <span>Access Sentinel Platform</span>
              <S.ButtonArrow>
                <ArrowRight size={16} />
              </S.ButtonArrow>
            </S.LoginButton>
          </S.SectionContent>
        </S.LoginSection>
      </S.SplitContainer>

      <S.Footer isVisible={isVisible}>
        <S.FooterText>
          Need help? Contact our support team at{' '}
          <S.FooterLink href="mailto:support@spotter.ai">support@spotter.ai</S.FooterLink>
        </S.FooterText>
      </S.Footer>
    </S.Container>
  );
};

export default Login;
