import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  Download,
  Mail,
  Calendar,
  Shield,
  AlertTriangle,
} from 'lucide-react';

import { Navbar } from 'components';
import * as S from './styles';

const PaymentSuccess = () => {
  const history = useHistory();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('pending'); // 'pending', 'success', 'error'
  const [registrationError, setRegistrationError] = useState('');

  // Get payment details from URL params
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get('email') || '';
  const plan = urlParams.get('plan') || 'Professional';
  const planType = urlParams.get('planType') || 'monthly';
  const amount = planType === 'yearly' ? '28' : '35'; // Display monthly equivalent
  const paymentIntent = urlParams.get('payment_intent') || '';

  const registerUser = async () => {
    try {
      setRegistrationStatus('pending');

      // Use environment variable for API base URL, fallback to localhost:3001 for development
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const apiUrl = `${apiBaseUrl}/api/register-paid-user`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          paymentIntent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register user');
      }

      console.log('User registration successful:', data);
      setRegistrationStatus('success');
    } catch (error) {
      console.error('User registration error:', error);
      setRegistrationStatus('error');
      setRegistrationError(error.message);
    }
  };

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Call user registration API if we have payment intent
    if (email && paymentIntent) {
      registerUser();
    } else {
      console.error('Missing required parameters for user registration:', {
        email,
        paymentIntent,
      });
      setRegistrationStatus('error');
      setRegistrationError('Missing payment information');
    }

    return () => clearTimeout(timer);
  }, [email, paymentIntent]);

  const handleGoToDashboard = () => {
    // Redirect to safety app
    window.location.href = 'https://safetyapp.spotter.ai/';
  };

  const handleBackToHome = () => {
    history.push('/sentinel');
  };

  return (
    <>
      <Navbar absolute showAuthUrls />

      <S.SuccessLayout>
        <S.SuccessBackground />

        <S.SuccessContainer>
          <S.SuccessContent isVisible={isVisible}>
            <S.SuccessIcon>
              <CheckCircle size={80} />
            </S.SuccessIcon>

            <S.SuccessTitle>Payment Successful!</S.SuccessTitle>

            <S.SuccessSubtitle>Welcome to Spotter Sentinel {plan} Plan</S.SuccessSubtitle>

            {/* Registration Status */}
            {registrationStatus === 'pending' && (
              <S.StatusMessage type="info">
                <S.StatusIcon>
                  <S.Spinner />
                </S.StatusIcon>
                <S.StatusText>Setting up your account...</S.StatusText>
              </S.StatusMessage>
            )}

            {registrationStatus === 'success' && (
              <S.StatusMessage type="success">
                <S.StatusIcon>
                  <CheckCircle size={20} />
                </S.StatusIcon>
                <S.StatusText>
                  Account created successfully! Check your email for login credentials.
                </S.StatusText>
              </S.StatusMessage>
            )}

            {registrationStatus === 'error' && (
              <S.StatusMessage type="error">
                <S.StatusIcon>
                  <AlertTriangle size={20} />
                </S.StatusIcon>
                <S.StatusText>
                  Account setup failed: {registrationError}
                  <br />
                  <small>
                    Don&apos;t worry, your payment was successful. Our team will contact you
                    shortly.
                  </small>
                </S.StatusText>
              </S.StatusMessage>
            )}

            <S.PaymentDetails>
              <S.DetailItem>
                <Mail size={20} />
                <div>
                  <S.DetailLabel>Email</S.DetailLabel>
                  <S.DetailValue>{email}</S.DetailValue>
                </div>
              </S.DetailItem>

              <S.DetailItem>
                <Calendar size={20} />
                <div>
                  <S.DetailLabel>Plan</S.DetailLabel>
                  <S.DetailValue>
                    {plan} - ${amount}/month{planType === 'yearly' ? ' (billed annually)' : ''}
                  </S.DetailValue>
                </div>
              </S.DetailItem>

              <S.DetailItem>
                <Shield size={20} />
                <div>
                  <S.DetailLabel>Status</S.DetailLabel>
                  <S.DetailValue>Active</S.DetailValue>
                </div>
              </S.DetailItem>
            </S.PaymentDetails>

            <S.NextSteps>
              <S.NextStepsTitle>What&apos;s Next?</S.NextStepsTitle>
              <S.StepsList>
                <S.StepItem>
                  <S.StepNumber>1</S.StepNumber>
                  <S.StepText>Check your email for login credentials</S.StepText>
                </S.StepItem>
                <S.StepItem>
                  <S.StepNumber>2</S.StepNumber>
                  <S.StepText>Access your dashboard to start screening drivers</S.StepText>
                </S.StepItem>
                <S.StepItem>
                  <S.StepNumber>3</S.StepNumber>
                  <S.StepText>Upload your first CDL to begin</S.StepText>
                </S.StepItem>
              </S.StepsList>
            </S.NextSteps>

            <S.ActionButtons>
              <S.PrimaryButton onClick={handleGoToDashboard}>
                Go to Dashboard
                <ArrowRight size={16} />
              </S.PrimaryButton>
              <S.SecondaryButton onClick={handleBackToHome}>Back to Home</S.SecondaryButton>
            </S.ActionButtons>

            <S.SupportNote>
              Need help? Contact our support team at{' '}
              <S.SupportLink href="mailto:support@spotter.ai">support@spotter.ai</S.SupportLink>
            </S.SupportNote>
          </S.SuccessContent>
        </S.SuccessContainer>
      </S.SuccessLayout>
    </>
  );
};

export default PaymentSuccess;
