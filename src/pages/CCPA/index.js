import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import * as S from './styles';

const CCPA = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    request: '',
    state: '',
    zipcode: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  const requestOptions = {
    unsubscribe: 'Unsubscribe me from future marketing communications',
    categories:
      'Provide the categories of personal information about me that the business collects and uses',
    selling: 'Does the business sell my personal information?',
    specific: 'Provide the specific personal information the business has about me',
    delete_specific: 'Delete specific data (You should specify in the text message field below)',
    delete_all: 'Delete all of my personal information',
  };

  const requestLabel = requestOptions[formData.request] || formData.request || '';

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          return 'Email address is required';
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'phone':
        // Phone is optional, but if provided it must be a valid US phone number
        if (value && value.trim()) {
          // Remove all non-digits
          const digitsOnly = value.replace(/\D/g, '');

          // Helper to check area and central office code
          const isValidAreaAndCentral = (area, central) =>
            /^[2-9]\d{2}$/.test(area) && /^[2-9]\d{2}$/.test(central);

          if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
            const area = digitsOnly.slice(1, 4);
            const central = digitsOnly.slice(4, 7);
            if (isValidAreaAndCentral(area, central)) {
              return '';
            }
            return 'Area and central office code must start with 2-9';
          }
          if (digitsOnly.length === 10) {
            const area = digitsOnly.slice(0, 3);
            const central = digitsOnly.slice(3, 6);
            if (isValidAreaAndCentral(area, central)) {
              return '';
            }
            return 'Area and central office code must start with 2-9';
          }
          return 'Enter a valid US phone number (e.g. 555-123-4567)';
        }
        return '';
      case 'state':
        if (!value) {
          return 'Please select a state';
        }
        return '';
      case 'zipcode':
        // ZIP code is optional, but if provided it must be exactly 5 digits
        if (value && !/^\d{5}$/.test(value)) {
          return 'Please enter a valid 5-digit ZIP code';
        }
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    // For ZIP code, allow only digits and limit to 5 characters
    if (name === 'zipcode') {
      processedValue = value.replace(/\D/g, '').slice(0, 5);
    }

    // For phone number, format as user types
    if (name === 'phone') {
      // Remove all non-digits
      const digitsOnly = value.replace(/\D/g, '');

      // Format based on length
      if (digitsOnly.length <= 3) {
        processedValue = digitsOnly;
      } else if (digitsOnly.length <= 6) {
        processedValue = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
      } else if (digitsOnly.length <= 10) {
        processedValue = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(
          6
        )}`;
      } else if (digitsOnly.length <= 11 && digitsOnly.startsWith('1')) {
        // Handle 11 digits with country code
        const withoutCountry = digitsOnly.slice(1);
        processedValue = `+1 ${withoutCountry.slice(0, 3)}-${withoutCountry.slice(
          3,
          6
        )}-${withoutCountry.slice(6)}`;
      } else {
        // Limit to 10 digits for standard US numbers
        const limitedDigits = digitsOnly.slice(0, 10);
        processedValue = `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(
          3,
          6
        )}-${limitedDigits.slice(6)}`;
      }
    }

    const newFormData = {
      ...formData,
      [name]: processedValue,
    };
    setFormData(newFormData);

    if (touchedFields[name]) {
      const fieldError = validateField(name, processedValue);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleDropdownChange = (name, value) => {
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    if (touchedFields[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleDropdownBlur = (name, value) => {
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailError = validateField('email', formData.email);
    if (emailError) newErrors.email = emailError;

    // Phone validation (only if provided)
    const phoneError = validateField('phone', formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    // State validation
    const stateError = validateField('state', formData.state);
    if (stateError) newErrors.state = stateError;

    // Zipcode validation (only if provided)
    const zipcodeError = validateField('zipcode', formData.zipcode);
    if (zipcodeError) newErrors.zipcode = zipcodeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouchedFields({
      name: true,
      surname: true,
      email: true,
      phone: true,
      request: true,
      state: true,
      zipcode: true,
      message: true,
    });

    if (!validateForm()) return;

    try {
      setIsSending(true);

      const response = await fetch('/api/ccpa-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to send CCPA request:', errorData);
        alert(errorData.error || 'Failed to submit your request. Please try again later.');
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('CCPA request error:', err);
      alert('Failed to submit your request. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const handleContinue = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      request: '',
      state: '',
      zipcode: '',
      message: '',
    });
    setErrors({});
    setTouchedFields({});
  };

  return (
    <S.Layout>
      <S.Container>
        <S.ContentSection>
          <S.Title>1. Your CCPA Rights</S.Title>
          <S.Description>
            If you are a California resident, you have the following rights under the CCPA:
          </S.Description>
          <S.RightsList>
            <S.RightItem>
              <S.Bullet>•</S.Bullet>
              <S.RightText>
                <strong>Right to Know</strong> – You have the right to request details about the
                personal information we collect, use, disclose, and sell.
              </S.RightText>
            </S.RightItem>
            <S.RightItem>
              <S.Bullet>•</S.Bullet>
              <S.RightText>
                <strong>Right to Delete</strong> – You may request that we delete personal
                information we have collected from you, subject to certain exceptions.
              </S.RightText>
            </S.RightItem>
            <S.RightItem>
              <S.Bullet>•</S.Bullet>
              <S.RightText>
                <strong>Right to Opt-Out</strong> – You have the right to opt-out of the sale of
                your personal information.
              </S.RightText>
            </S.RightItem>
            <S.RightItem>
              <S.Bullet>•</S.Bullet>
              <S.RightText>
                <strong>Right to Non-Discrimination</strong> – We will not discriminate against you
                for exercising your rights under the CCPA.
              </S.RightText>
            </S.RightItem>
          </S.RightsList>

          <S.SectionTitle>2. Information We Collect</S.SectionTitle>
          <S.Description>
            We collect personal information necessary to provide MVR (Motor Vehicle Records) and PSP
            (Pre-Employment Screening Program) reports. This may include:
          </S.Description>
          <S.InfoList>
            <S.InfoItem>• Driver&apos;s License Number (CDL)</S.InfoItem>
            <S.InfoItem>• Name and Contact Information</S.InfoItem>
            <S.InfoItem>• Payment Details (processed securely)</S.InfoItem>
            <S.InfoItem>• Device and Usage Data</S.InfoItem>
          </S.InfoList>
          <S.Description>
            For a full list of categories of personal information we collect, please refer to our
            Privacy Policy.
          </S.Description>
        </S.ContentSection>

        <S.FormSection>
          <S.Form onSubmit={handleSubmit}>
            <S.FormRow>
              <S.FormGroup>
                <S.Label>Name</S.Label>
                <S.Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Tom"
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.Label>Surname</S.Label>
                <S.Input
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Reinert"
                />
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow>
              <S.FormGroup>
                <S.Label>
                  Email address <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Please enter your email address"
                  $hasError={errors.email}
                />
                {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}
              </S.FormGroup>
              <S.FormGroup>
                <S.Label>Phone number</S.Label>
                <S.Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Optional - we never use this for marketing"
                  $hasError={errors.phone}
                />
                {errors.phone && <S.ErrorText>{errors.phone}</S.ErrorText>}
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow $fullWidth>
              <S.FormGroup>
                <S.Label>Request</S.Label>
                <S.Select
                  name="request"
                  value={formData.request}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                >
                  <option value="">Selection</option>
                  {Object.entries(requestOptions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </S.Select>
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow>
              <S.FormGroup>
                <S.Label>
                  State <S.Required>*</S.Required>
                </S.Label>
                <S.Select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  $hasError={errors.state}
                >
                  <option value="">Please select the state</option>
                  {stateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </S.Select>
                {errors.state && <S.ErrorText>{errors.state}</S.ErrorText>}
              </S.FormGroup>
              <S.FormGroup>
                <S.Label>Zip code</S.Label>
                <S.Input
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Enter zip code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  $hasError={errors.zipcode}
                />
                {errors.zipcode && <S.ErrorText>{errors.zipcode}</S.ErrorText>}
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow $fullWidth>
              <S.FormGroup>
                <S.Label>Additional Message</S.Label>
                <S.TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Please provide any additional details about your request..."
                  rows={4}
                />
              </S.FormGroup>
            </S.FormRow>

            <S.SubmitButton type="submit" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </S.SubmitButton>
          </S.Form>
        </S.FormSection>

        {isSubmitted && (
          <S.SuccessOverlay>
            <S.SuccessModal>
              <S.SuccessIcon>
                <CheckCircle size={48} />
              </S.SuccessIcon>
              <S.SuccessTitle>Form Submitted!</S.SuccessTitle>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <S.SuccessMessage>
                We&apos;ve sent a verification message to your email. Please verify your identity so
                we can process your request.
              </S.SuccessMessage>
              <S.ContinueButton onClick={handleContinue}>Continue</S.ContinueButton>
            </S.SuccessModal>
          </S.SuccessOverlay>
        )}
      </S.Container>
    </S.Layout>
  );
};

export default CCPA;
