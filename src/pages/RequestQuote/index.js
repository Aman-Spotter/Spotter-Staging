import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  Truck,
  Brain,
  Search,
  Shield,
  Chrome,
  Smartphone,
  BarChart3,
  User,
  Building,
  Phone,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import InputMask from 'react-input-mask';
import styled from 'styled-components';
import { useIsMobile } from 'hooks';
import { Navbar, Footer } from 'components';
import * as S from './styles';

const RequestQuote = () => {
  const history = useHistory();
  const location = useLocation();
  const { isMobile } = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  // Check if coming from product pages with product parameter
  const urlParams = new URLSearchParams(location.search);
  const productParam = urlParams.get('product');
  const isSentinelFlow = productParam === 'sentinel';
  const isTMSFlow = productParam === 'tms';
  const nameInputRef = useRef(null);

  const placeholderText = isSentinelFlow
    ? "Additional Message - Tell us about your fleet size, current safety challenges, or specific Sentinel features you're interested in..."
    : isTMSFlow
    ? "Additional Message - Tell us about your fleet size, current TMS challenges, or specific TMS features you're interested in..."
    : 'Additional Message - Tell us more about your specific needs, company size, or any questions you have...';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    selectedApps: isSentinelFlow ? ['sentinel'] : isTMSFlow ? ['tms'] : [],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const apps = [
    {
      id: 'lens',
      name: 'Spotter Lens',
      description: 'Market data analytics and freight rankings',
      icon: BarChart3,
    },
    {
      id: 'crm',
      name: 'Spotter CRM',
      description: 'Recruiting engine with engagement visibility',
      icon: User,
    },
    {
      id: 'driver-app',
      name: 'Driver App',
      description: 'Load score optimization and matching',
      icon: Smartphone,
    },
    {
      id: 'tms',
      name: 'Spotter TMS',
      description: 'Visibility engine with data automation',
      icon: Truck,
    },
    {
      id: 'sentinel',
      name: 'Spotter Sentinel',
      description: 'Driver score and safety automation',
      icon: Shield,
    },
    {
      id: 'extension',
      name: 'Load Board Extension',
      description: 'Browser automation for Chrome & Firefox',
      icon: Chrome,
    },
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    setIsVisible(true);
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Individual field validation functions
  const validateField = (fieldName, value, allFormData = formData) => {
    switch (fieldName) {
      case 'name':
        if ((isSentinelFlow || isTMSFlow) && !value.trim()) {
          return 'Full name is required';
        }
        return '';

      case 'email':
        if (!value.trim()) {
          return 'Email address is required';
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';

      case 'company':
        if ((isSentinelFlow || isTMSFlow) && !value.trim()) {
          return 'Company name is required';
        }
        return '';

      case 'phone': {
        const { phone } = allFormData;
        // Remove all non-digits
        const cleanedPhone = phone.replace(/[^\d]/g, '');

        if (!cleanedPhone) {
          return 'Phone number is required';
        }

        // If the input is not fully filled (less than 10 digits)
        if (phone.includes('_') || cleanedPhone.length < 10) {
          return 'Enter a 10-digit US phone number.';
        }

        // Only allow 10 digits, area code 2-9
        const isValid = /^[2-9]\d{9}$/.test(cleanedPhone);
        if (!isValid) {
          return 'Enter a 10-digit US phone number.';
        }

        return '';
      }

      case 'selectedApps': {
        const selectedApps = allFormData.selectedApps || [];
        if (selectedApps.length === 0) {
          return 'Please select at least one product';
        }
        return '';
      }

      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    if (touchedFields[name]) {
      const fieldError = validateField(name, value, newFormData);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate the field on blur
    const fieldError = validateField(name, value, formData);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handlePhoneInputChange = (e) => {
    const { value } = e.target;
    const newFormData = { ...formData, phone: value };
    setFormData(newFormData);

    // ONLY validate on change if the field has already been touched (blurred)
    if (touchedFields.phone) {
      const fieldError = validateField('phone', value, newFormData);
      setValidationErrors((prev) => ({
        ...prev,
        phone: fieldError,
      }));
    }
  };

  const handleAppToggle = (appId) => {
    // If coming from product-specific flow, prevent toggling any apps (they're all disabled except the selected product)
    if (isSentinelFlow || isTMSFlow) {
      return;
    }

    const newSelectedApps = formData.selectedApps.includes(appId)
      ? formData.selectedApps.filter((id) => id !== appId)
      : [...formData.selectedApps, appId];

    const newFormData = {
      ...formData,
      selectedApps: newSelectedApps,
    };

    setFormData(newFormData);

    // Mark selectedApps as touched
    setTouchedFields((prev) => ({
      ...prev,
      selectedApps: true,
    }));

    // Clear any previous submit errors
    if (submitError) {
      setSubmitError('');
    }

    // Validate selectedApps field on selection
    const fieldError = validateField('selectedApps', newSelectedApps, newFormData);
    setValidationErrors((prev) => ({
      ...prev,
      selectedApps: fieldError,
    }));
  };

  const sendToSlack = async (formData) => {
    try {
      const selectedAppNames = formData.selectedApps
        .map((appId) => apps.find((app) => app.id === appId)?.name)
        .filter(Boolean);

      const requestData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        selectedApps: formData.selectedApps,
        selectedAppNames,
        message: formData.message,
        isSentinelFlow,
        isTMSFlow,
      };

      // Use environment variable for API base URL, fallback to localhost:3001 for development
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const apiUrl = `${apiBaseUrl}/api/request-quote`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit request');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Request quote API failed:', error);
      return { success: false, error: error.message };
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate all fields using the validateField function
    const fieldsToValidate = ['name', 'email', 'company', 'phone', 'selectedApps'];

    fieldsToValidate.forEach((fieldName) => {
      const fieldError = validateField(fieldName, formData[fieldName], formData);
      if (fieldError) {
        errors[fieldName] = fieldError;
      }
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched for validation display
    const allFields = ['name', 'email', 'company', 'phone', 'selectedApps'];
    const touchedState = {};
    allFields.forEach((field) => {
      touchedState[field] = true;
    });
    setTouchedFields(touchedState);

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setValidationErrors({});

    try {
      // Create the full phone number in E.164 format
      const fullPhoneNumber = `+1${formData.phone.replace(/[^\d]/g, '')}`;
      // If coming from product-specific flow, send to Slack
      if (isSentinelFlow || isTMSFlow) {
        const slackResult = await sendToSlack({ ...formData, phone: fullPhoneNumber });

        if (!slackResult.success) {
          throw new Error(
            slackResult.error ||
              'Failed to send notification. Please try again or contact us directly.'
          );
        }

        // Store the success message for display
        setSuccessMessage(slackResult.message);
      } else {
        // For non-product-specific flows, we could either:
        // 1. Still send to backend but with different handling
        // 2. Just simulate the old behavior

        // Option 1: Send all requests through backend (recommended)
        const result = await sendToSlack({ ...formData, phone: fullPhoneNumber });

        if (!result.success) {
          throw new Error(result.error || 'Failed to submit request. Please try again.');
        }

        setSuccessMessage(result.message);

        // Option 2: Just simulate delay for non-Sentinel (uncomment if preferred)
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error.message || 'There was an error submitting your request. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    // Check if all required fields are filled and valid
    const email = formData.email.trim();
    const isEmailValid = email && /\S+@\S+\.\S+/.test(email);

    // For product-specific flows, selectedApps is automatically valid (pre-selected)
    // For general flow, user must select at least one product
    const hasSelectedApps = isSentinelFlow || isTMSFlow ? true : formData.selectedApps.length > 0;

    let isValid = isEmailValid && hasSelectedApps;

    // Additional required fields for Sentinel and TMS flows
    if (isSentinelFlow || isTMSFlow) {
      const name = formData.name.trim();
      const company = formData.company.trim();
      const phone = formData.phone.trim();

      // Check phone format if provided
      const cleaned = phone.replace(/[^\d]/g, '');
      const isPhoneValid = cleaned && /^(1)?\d{10}$/.test(cleaned);

      isValid = isValid && name && company && isPhoneValid;
    }

    // Also check if there are any current validation errors
    const hasValidationErrors = Object.values(validationErrors).some(
      (error) => error && error.trim() !== ''
    );

    // Form is valid if all requirements are met and there are no validation errors
    return isValid && !hasValidationErrors;
  };

  if (isSubmitted) {
    return (
      <S.Layout>
        <Navbar absolute showAuthUrls />
        <S.SuccessSection>
          <S.SuccessContainer isVisible={isVisible}>
            <S.SuccessIcon>
              <CheckCircle size={64} />
            </S.SuccessIcon>
            <S.SuccessTitle>
              {isSentinelFlow
                ? 'Sentinel Quote Request Submitted!'
                : isTMSFlow
                ? 'TMS Quote Request Submitted!'
                : 'Quote Request Submitted!'}
            </S.SuccessTitle>
            <S.SuccessMessage>{successMessage}</S.SuccessMessage>
            <S.SuccessActions>
              <S.PrimaryButton onClick={() => history.push('/')}>
                Return to Homepage
              </S.PrimaryButton>
              <S.SecondaryButton onClick={() => window.location.reload()}>
                Submit Another Request
              </S.SecondaryButton>
            </S.SuccessActions>
          </S.SuccessContainer>
        </S.SuccessSection>
        <Footer />
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <S.BackgroundElements>
        {Array.from({ length: 8 }, (_, i) => (
          <S.ParticleElement
            key={`particle-${i}`}
            delay={`${i * 0.3}s`}
            position={i}
            type={i % 2 === 0 ? 'dot' : 'ring'}
            size={i % 3 === 0 ? 'large' : i % 3 === 1 ? 'medium' : 'small'}
            color={i % 3 === 0 ? 'logo-teal' : i % 3 === 1 ? 'logo-red' : 'logo-cyan'}
            speed={i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'medium' : 'fast'}
          />
        ))}
      </S.BackgroundElements>

      <Navbar absolute showAuthUrls />

      <S.HeroSection>
        <S.Container isVisible={isVisible}>
          <S.Header>
            <S.Title>
              Request <S.Highlight>a Quote</S.Highlight>
            </S.Title>
            {(isSentinelFlow || isTMSFlow) && (
              <S.Subtitle>
                Complete the form below to get a personalized quote for{' '}
                {isSentinelFlow ? 'Spotter Sentinel' : 'Spotter TMS'}
              </S.Subtitle>
            )}
          </S.Header>

          <S.FormContainer>
            <S.Form onSubmit={handleSubmit}>
              {/* Name Field */}
              <S.FormGroup delay="0.1s">
                <S.Label htmlFor="name" className={formData.name.trim() ? 'has-content' : ''}>
                  Full Name
                  <S.FieldStatus>
                    {formData.name.trim() && !validationErrors.name && (
                      <S.FieldValidIcon>
                        <CheckCircle2 size={16} />
                      </S.FieldValidIcon>
                    )}
                    {validationErrors.name && (
                      <S.FieldErrorIcon>
                        <AlertCircle size={16} />
                      </S.FieldErrorIcon>
                    )}
                  </S.FieldStatus>
                </S.Label>
                <S.InputWrapper>
                  <S.InputIcon>
                    <User size={20} />
                  </S.InputIcon>
                  <S.Input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    hasError={touchedFields.name && validationErrors.name}
                    aria-describedby={
                      touchedFields.name && validationErrors.name ? 'name-error' : undefined
                    }
                    aria-invalid={!!(touchedFields.name && validationErrors.name)}
                  />
                </S.InputWrapper>
                <S.ErrorMessage
                  id="name-error"
                  show={!!(touchedFields.name && validationErrors.name)}
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  {touchedFields.name && validationErrors.name}
                </S.ErrorMessage>
              </S.FormGroup>

              {/* Email Field */}
              <S.FormGroup delay="0.2s">
                <S.Label htmlFor="email" className={formData.email.trim() ? 'has-content' : ''}>
                  Email Address
                  <S.FieldStatus>
                    {formData.email.trim() &&
                      !validationErrors.email &&
                      /\S+@\S+\.\S+/.test(formData.email) && (
                        <S.FieldValidIcon>
                          <CheckCircle2 size={16} />
                        </S.FieldValidIcon>
                      )}
                    {validationErrors.email && (
                      <S.FieldErrorIcon>
                        <AlertCircle size={16} />
                      </S.FieldErrorIcon>
                    )}
                  </S.FieldStatus>
                </S.Label>
                <S.InputWrapper>
                  <S.InputIcon>
                    <Mail size={20} />
                  </S.InputIcon>
                  <S.Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    hasError={touchedFields.email && validationErrors.email}
                    aria-describedby={
                      touchedFields.email && validationErrors.email ? 'email-error' : undefined
                    }
                    aria-invalid={!!(touchedFields.email && validationErrors.email)}
                  />
                </S.InputWrapper>
                <S.ErrorMessage
                  id="email-error"
                  show={!!(touchedFields.email && validationErrors.email)}
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  {touchedFields.email && validationErrors.email}
                </S.ErrorMessage>
              </S.FormGroup>

              {/* Company Field */}
              <S.FormGroup delay="0.3s">
                <S.Label htmlFor="company" className={formData.company.trim() ? 'has-content' : ''}>
                  Company Name
                  <S.FieldStatus>
                    {formData.company.trim() && !validationErrors.company && (
                      <S.FieldValidIcon>
                        <CheckCircle2 size={16} />
                      </S.FieldValidIcon>
                    )}
                    {validationErrors.company && (
                      <S.FieldErrorIcon>
                        <AlertCircle size={16} />
                      </S.FieldErrorIcon>
                    )}
                  </S.FieldStatus>
                </S.Label>
                <S.InputWrapper>
                  <S.InputIcon>
                    <Building size={20} />
                  </S.InputIcon>
                  <S.Input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    hasError={touchedFields.company && validationErrors.company}
                    aria-describedby={
                      touchedFields.company && validationErrors.company
                        ? 'company-error'
                        : undefined
                    }
                    aria-invalid={!!(touchedFields.company && validationErrors.company)}
                  />
                </S.InputWrapper>
                <S.ErrorMessage
                  id="company-error"
                  show={!!(touchedFields.company && validationErrors.company)}
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  {touchedFields.company && validationErrors.company}
                </S.ErrorMessage>
              </S.FormGroup>

              {/* Phone Field */}
              <S.FormGroup delay="0.4s">
                <S.Label htmlFor="phone" className={formData.phone.trim() ? 'has-content' : ''}>
                  Phone Number
                  <S.FieldStatus>
                    {formData.phone.replace(/[^\d]/g, '').length === 10 &&
                      !validationErrors.phone && (
                        <S.FieldValidIcon>
                          <CheckCircle2 size={16} />
                        </S.FieldValidIcon>
                      )}
                    {validationErrors.phone && (
                      <S.FieldErrorIcon>
                        <AlertCircle size={16} />
                      </S.FieldErrorIcon>
                    )}
                  </S.FieldStatus>
                </S.Label>
                <S.InputWrapper>
                  <S.InputIcon>
                    <Phone size={20} />
                  </S.InputIcon>
                  <InputMask
                    mask="(999) 999-9999"
                    value={formData.phone}
                    onChange={handlePhoneInputChange}
                    onBlur={handleInputBlur}
                  >
                    {(inputProps) => (
                      <S.Input
                        {...inputProps}
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="(555) 123-4567"
                        inputMode="numeric"
                        hasError={touchedFields.phone && validationErrors.phone}
                        aria-describedby={
                          touchedFields.phone && validationErrors.phone ? 'phone-error' : undefined
                        }
                        aria-invalid={!!(touchedFields.phone && validationErrors.phone)}
                      />
                    )}
                  </InputMask>
                </S.InputWrapper>
                <S.ErrorMessage
                  id="phone-error"
                  show={!!(touchedFields.phone && validationErrors.phone)}
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  {touchedFields.phone && validationErrors.phone}
                </S.ErrorMessage>
              </S.FormGroup>
              {/* Message Field - Full Width */}
              <S.FormGroup className="full-width" delay="0.5s">
                <S.Label htmlFor="message" className={formData.message.trim() ? 'has-content' : ''}>
                  Additional Message
                  <S.FieldStatus>
                    {formData.message.trim() && (
                      <S.FieldValidIcon>
                        <CheckCircle2 size={16} />
                      </S.FieldValidIcon>
                    )}
                  </S.FieldStatus>
                </S.Label>
                <S.TextareaWrapper>
                  <S.TextareaIcon>
                    <MessageSquare size={20} />
                  </S.TextareaIcon>
                  <S.Textarea
                    id="message"
                    name="message"
                    placeholder={placeholderText}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    rows={4}
                    hasError={touchedFields.message && validationErrors.message}
                    aria-describedby={
                      touchedFields.message && validationErrors.message
                        ? 'message-error'
                        : undefined
                    }
                    aria-invalid={!!(touchedFields.message && validationErrors.message)}
                  />
                </S.TextareaWrapper>
                <S.ErrorMessage
                  id="message-error"
                  show={!!(touchedFields.message && validationErrors.message)}
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  {touchedFields.message && validationErrors.message}
                </S.ErrorMessage>
              </S.FormGroup>

              {/* Products Section - Full Width */}
              <S.FormGroup className="full-width" delay="0.6s">
                <S.Label className="apps-grid-label">
                  Product Interest:
                  <S.FieldStatus>
                    {formData.selectedApps.length > 0 && (
                      <S.FieldValidIcon>
                        <CheckCircle2 size={16} />
                      </S.FieldValidIcon>
                    )}
                    {touchedFields.selectedApps && validationErrors.selectedApps && (
                      <S.FieldErrorIcon>
                        <AlertCircle size={16} />
                      </S.FieldErrorIcon>
                    )}
                  </S.FieldStatus>
                </S.Label>
                <S.FormHelperText>
                  Please select at least one product you&apos;re interested in.
                </S.FormHelperText>
                <S.AppsGrid hasError={touchedFields.selectedApps && validationErrors.selectedApps}>
                  {apps.map((app, index) => {
                    const IconComponent = app.icon;
                    const isSelected = formData.selectedApps.includes(app.id);
                    const isDisabled =
                      (isSentinelFlow && app.id !== 'sentinel') || (isTMSFlow && app.id !== 'tms');

                    return (
                      <S.AppCard
                        key={app.id}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        onClick={() => handleAppToggle(app.id)}
                        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      >
                        <S.AppIcon isSelected={isSelected} isDisabled={isDisabled}>
                          <IconComponent size={32} />
                        </S.AppIcon>
                        <S.AppInfo>
                          <S.AppName isDisabled={isDisabled}>{app.name}</S.AppName>
                          <S.AppDescription isDisabled={isDisabled}>
                            {app.description}
                          </S.AppDescription>
                        </S.AppInfo>
                        <S.AppCheckbox isSelected={isSelected} isDisabled={isDisabled}>
                          {isSelected && <CheckCircle size={20} />}
                        </S.AppCheckbox>
                      </S.AppCard>
                    );
                  })}
                </S.AppsGrid>
                <S.ErrorMessage
                  id="selectedApps-error"
                  show={!!(touchedFields.selectedApps && validationErrors.selectedApps)}
                  aria-live="polite"
                >
                  <AlertCircle size={16} />
                  {touchedFields.selectedApps && validationErrors.selectedApps}
                </S.ErrorMessage>
              </S.FormGroup>

              {/* Error Message - Full Width */}
              {submitError && (
                <S.FormGroup className="full-width" delay="0.8s">
                  <S.ErrorMessage className="error-message" show>
                    <AlertCircle size={16} />
                    {submitError}
                  </S.ErrorMessage>
                </S.FormGroup>
              )}

              {/* Submit Button - Full Width */}
              <S.FormGroup className="full-width" delay="0.9s">
                <S.SubmitButton
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  isSubmitting={isSubmitting}
                >
                  <S.ButtonIcon isSubmitting={isSubmitting}>
                    {isSubmitting ? <Clock size={20} /> : <Send size={20} />}
                  </S.ButtonIcon>
                  {isSubmitting ? 'Submitting Request...' : 'Request Quote'}
                </S.SubmitButton>
              </S.FormGroup>
            </S.Form>
          </S.FormContainer>
        </S.Container>
      </S.HeroSection>

      <Footer />
    </S.Layout>
  );
};

export default RequestQuote;

export const FixedCountryCode = styled.span`
  position: absolute;
  left: 40px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  color: #b0b0b0; // greyed out
  font-size: 1rem;
  font-weight: 500;
  pointer-events: none;
  z-index: 2;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 14px; // or whatever fits your design
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px; // left padding for icon
  // ...rest of your styles
`;

export const ErrorMessage = styled.div`
  color: #f84960;
  font-size: 0.75rem;
  font-weight: 400;
  min-height: 16px;
  margin-top: 0px;
  margin-bottom: 0;
  line-height: 1.2;
  grid-column: 1 / -1;
  transition: opacity 0.2s, transform 0.2s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  padding-left: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FormGroup = styled.div``;
