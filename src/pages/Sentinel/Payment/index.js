import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  ArrowLeft,
  Shield,
  Check,
  CreditCard,
  Lock,
  Sparkles,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

import { Footer, Navbar } from 'components';
import { PaymentForm } from './PaymentForm';
import * as S from './styles';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : Promise.resolve(null);

const Payment = () => {
  const history = useHistory();
  const location = useLocation();
  const [step, setStep] = useState('email'); // 'email', 'payment'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [isVisible, setIsVisible] = useState({
    'payment-content': true, // Set to true by default
  });

  // Get plan details from URL params or default
  const urlParams = new URLSearchParams(location.search);
  const planType = urlParams.get('plan') || 'monthly';
  const displayPrice = planType === 'yearly' ? 28 : 35; // Display price per month
  const planName = 'Professional';

  // Debug log
  console.log('Payment page loaded with plan:', planType, 'display price:', displayPrice);

  // Floating particles for background
  const paymentParticles = [
    { id: 'payment-1', type: 'dollar', size: 'large', color: 'teal', speed: 'slow' },
    { id: 'payment-2', type: 'check', size: 'medium', color: 'green', speed: 'medium' },
    { id: 'payment-3', type: 'shield', size: 'small', color: 'blue', speed: 'fast' },
    { id: 'payment-4', type: 'lock', size: 'medium', color: 'purple', speed: 'slow' },
    { id: 'payment-5', type: 'card', size: 'large', color: 'cyan', speed: 'medium' },
    { id: 'payment-6', type: 'star', size: 'small', color: 'orange', speed: 'fast' },
  ];

  // Features included in the plan
  const planFeatures = [
    'Pull MVR',
    'Pull PSP',
    'Check CDL scan',
    'Check DAC',
    'AI extraction of CDL, MVR and PSP',
    'AI Driver Assessment',
  ];

  useEffect(() => {
    // Set initial visibility immediately
    setIsVisible({
      'payment-content': true,
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
  };

  const handleEmailSubmit = async () => {
    // Reset all errors
    setEmailError('');
    setNameError('');
    setSurnameError('');
    setPhoneError('');

    let hasErrors = false;

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    // Validate name
    if (!name.trim()) {
      setNameError('First name is required');
      hasErrors = true;
    } else if (name.trim().length < 2) {
      setNameError('First name must be at least 2 characters');
      hasErrors = true;
    }

    // Validate surname
    if (!surname.trim()) {
      setSurnameError('Last name is required');
      hasErrors = true;
    } else if (surname.trim().length < 2) {
      setSurnameError('Last name must be at least 2 characters');
      hasErrors = true;
    }

    // Validate phone number
    if (!phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      hasErrors = true;
    } else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Check if Stripe is configured
    if (!stripePublishableKey) {
      setError('Payment system is not configured. Please check your environment variables.');
      return;
    }

    setLoading(true);
    setError('');
    setEmailError('');

    try {
      // Use environment variable for API base URL, fallback to localhost:3001 for development
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const apiUrl = `${apiBaseUrl}/api/create-subscription`;

      console.log('Sending subscription request:', { email, planType, apiUrl });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name.trim(),
          surname: surname.trim(),
          phoneNumber: phoneNumber.trim(),
          planType, // Pass plan type to server
        }),
      });

      const data = await response.json();
      console.log('Subscription response:', { status: response.status, data });

      if (!response.ok) {
        // Use server's detailed error message if available
        const errorMessage = data.details
          ? `${data.error}: ${data.details}`
          : data.error || 'Failed to initialize payment';
        throw new Error(errorMessage);
      }

      if (!data.clientSecret) {
        throw new Error('No client secret received from server');
      }

      setClientSecret(data.clientSecret);
      sessionStorage.setItem(
        'subscriptionData',
        JSON.stringify({
          subscriptionId: data.subscriptionId,
          customerId: data.customerId,
          email,
          name: name.trim(),
          surname: surname.trim(),
          phoneNumber: phoneNumber.trim(),
        })
      );

      setStep('payment');
    } catch (err) {
      console.error('Payment initialization error:', err);

      // Check if it's a network error
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError(
          'Unable to connect to payment server. Please check your internet connection and try again.'
        );
      } else {
        setError(err.message || 'Failed to initialize subscription');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('email');
    setClientSecret(null);
    setError('');
  };

  const handleBackToSentinel = () => {
    history.push('/sentinel#pricing');
  };

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#008080',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont, sans-serif',
        spacingUnit: '6px',
        borderRadius: '8px',
      },
    },
    loader: 'auto',
  };

  return (
    <>
      <Navbar absolute showAuthUrls />

      <S.PaymentLayout>
        <S.PaymentBackground />

        {/* Floating Elements */}
        <S.PaymentFloatingElements>
          {paymentParticles.map((particle, index) => (
            <S.PaymentParticle
              key={particle.id}
              delay={`${index * 0.3}s`}
              position={index}
              {...particle}
            />
          ))}
        </S.PaymentFloatingElements>

        <S.PaymentContainer>
          <S.PaymentContent id="payment-content" data-animate>
            {!stripePublishableKey && (
              <S.DevNotice>
                <AlertTriangle size={20} />
                <div>
                  <strong>Development Notice:</strong> Stripe is not configured. Please add your
                  Stripe keys to the .env file to test payments.
                  <br />
                  <small>See STRIPE_SETUP.md for setup instructions.</small>
                </div>
              </S.DevNotice>
            )}

            <S.PaymentHeader isVisible={isVisible['payment-content']}>
              <S.BackButton onClick={handleBackToSentinel}>
                <ArrowLeft size={20} />
                Back to Plans
              </S.BackButton>

              <S.PaymentTitle>
                Secure Payment
                <S.PaymentHighlight> Checkout</S.PaymentHighlight>
              </S.PaymentTitle>

              <S.PaymentSubtitle>Complete your {planName} plan subscription</S.PaymentSubtitle>
            </S.PaymentHeader>

            <S.PaymentMainContent>
              <S.PaymentFormSection>
                <S.ProgressSteps>
                  <S.ProgressStep active={step === 'email'} completed={step === 'payment'}>
                    <S.StepNumber>1</S.StepNumber>
                    <S.StepLabel>Information</S.StepLabel>
                  </S.ProgressStep>
                  <S.ProgressLine />
                  <S.ProgressStep active={step === 'payment'}>
                    <S.StepNumber>2</S.StepNumber>
                    <S.StepLabel>Payment</S.StepLabel>
                  </S.ProgressStep>
                </S.ProgressSteps>

                {step === 'email' ? (
                  <S.EmailStep isVisible={isVisible['payment-content']}>
                    {/* Name fields in a row */}
                    <S.NameRow>
                      <S.NameInputContainer>
                        <S.InputLabel>First Name</S.InputLabel>
                        <S.EmailInput
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setNameError('');
                            setError('');
                          }}
                          placeholder="First name"
                          hasError={nameError}
                          autoFocus
                        />
                        {nameError && <S.ErrorText>{nameError}</S.ErrorText>}
                      </S.NameInputContainer>

                      <S.NameInputContainer>
                        <S.InputLabel>Last Name</S.InputLabel>
                        <S.EmailInput
                          type="text"
                          value={surname}
                          onChange={(e) => {
                            setSurname(e.target.value);
                            setSurnameError('');
                            setError('');
                          }}
                          placeholder="Last name"
                          hasError={surnameError}
                        />
                        {surnameError && <S.ErrorText>{surnameError}</S.ErrorText>}
                      </S.NameInputContainer>
                    </S.NameRow>

                    <S.EmailInputContainer>
                      <S.InputLabel>Phone Number</S.InputLabel>
                      <S.EmailInput
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          setPhoneError('');
                          setError('');
                        }}
                        placeholder="Enter your phone number"
                        hasError={phoneError}
                      />
                      {phoneError && <S.ErrorText>{phoneError}</S.ErrorText>}
                    </S.EmailInputContainer>

                    <S.EmailInputContainer>
                      <S.InputLabel>Email Address</S.InputLabel>
                      <S.EmailInput
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                          setError('');
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleEmailSubmit();
                          }
                        }}
                        placeholder="Enter your email address"
                        hasError={emailError}
                      />
                      {emailError && <S.ErrorText>{emailError}</S.ErrorText>}
                    </S.EmailInputContainer>

                    <S.ContinueButton
                      onClick={handleEmailSubmit}
                      disabled={loading || !email || !name || !surname || !phoneNumber}
                      loading={loading}
                    >
                      {loading ? (
                        <>
                          <S.Spinner />
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue to Payment
                          <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                        </>
                      )}
                    </S.ContinueButton>
                  </S.EmailStep>
                ) : (
                  <S.PaymentStep isVisible={isVisible['payment-content']}>
                    <S.BackToEmailButton onClick={handleBack}>
                      <ArrowLeft size={16} />
                      Back to Information
                    </S.BackToEmailButton>

                    {clientSecret && (
                      <Elements stripe={stripePromise} options={options}>
                        <PaymentForm
                          email={email}
                          name={name}
                          surname={surname}
                          phoneNumber={phoneNumber}
                          planPrice={displayPrice}
                          planName={planName}
                          planType={planType}
                          clientSecret={clientSecret}
                        />
                      </Elements>
                    )}
                  </S.PaymentStep>
                )}

                {error && (
                  <S.ErrorContainer>
                    <AlertTriangle size={20} />
                    <S.ErrorMessage>{error}</S.ErrorMessage>
                  </S.ErrorContainer>
                )}
              </S.PaymentFormSection>

              <S.PaymentSummarySection>
                <S.SummaryCard isVisible={isVisible['payment-content']}>
                  <S.SummaryHeader>
                    <S.SummaryTitle>{planName} Plan</S.SummaryTitle>
                    <S.PriceBadge>
                      <S.Currency>$</S.Currency>
                      <S.Amount>{displayPrice}</S.Amount>
                      <S.Period>/month</S.Period>
                    </S.PriceBadge>
                    {planType === 'yearly' && (
                      <S.SavingsNote>Billed annually - Save 20%</S.SavingsNote>
                    )}
                  </S.SummaryHeader>

                  <S.SummaryFeatures>
                    <S.FeaturesTitle>What&apos;s included:</S.FeaturesTitle>
                    {planFeatures.map((feature) => (
                      <S.FeatureItem key={feature}>
                        <S.FeatureIcon>
                          <Check size={16} />
                        </S.FeatureIcon>
                        <S.FeatureText>{feature}</S.FeatureText>
                      </S.FeatureItem>
                    ))}
                  </S.SummaryFeatures>

                  <S.SecurityBadge>
                    <Shield size={16} />
                    <span>Secure payment powered by Stripe</span>
                  </S.SecurityBadge>
                </S.SummaryCard>
              </S.PaymentSummarySection>
            </S.PaymentMainContent>
          </S.PaymentContent>
        </S.PaymentContainer>
      </S.PaymentLayout>
    </>
  );
};

export default Payment;
