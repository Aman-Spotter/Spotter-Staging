import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import * as S from './styles';

export const PaymentForm = ({
  email,
  name,
  surname,
  phoneNumber,
  planPrice,
  planName,
  planType,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!clientSecret || !stripe || !elements) {
      setError('Payment session not initialized properly');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: validationError } = await elements.submit();
      if (validationError) {
        throw validationError;
      }

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${
            window.location.origin
          }/payment-success?payment_status=succeeded&email=${encodeURIComponent(
            email
          )}&plan=${planName}&planType=${planType}&amount=${planPrice}`,
          payment_method_data: {
            billing_details: {
              name: `${name} ${surname}`,
              email,
              phone: phoneNumber,
              address: {
                country: 'US',
                postal_code: '10001',
              },
            },
          },
        },
      });

      if (paymentError) {
        throw paymentError;
      }
    } catch (err) {
      console.error('Checkout Error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <S.PaymentFormContainer>
      <S.PaymentFormWrapper onSubmit={handleSubmit}>
        <S.PaymentElementContainer>
          <PaymentElement
            options={{
              fields: {
                billingDetails: {
                  email: 'never',
                  address: {
                    country: 'never',
                    postalCode: 'never',
                  },
                },
              },
              layout: {
                type: 'tabs',
                defaultCollapsed: false,
                radios: false,
                spacedAccordionItems: true,
              },
              paymentMethodOrder: ['card'],
              defaultValues: {
                billingDetails: {
                  name: `${name} ${surname}`,
                  email,
                  phone: phoneNumber,
                  address: {
                    country: 'US',
                    postal_code: '10001',
                  },
                },
              },
            }}
            onChange={(event) => {
              setCardComplete(event.complete);
              if (event.error) {
                setError(event.error.message);
              } else {
                setError(null);
              }
            }}
          />
        </S.PaymentElementContainer>

        {error && (
          <S.PaymentErrorContainer>
            <AlertTriangle size={20} />
            <S.PaymentErrorMessage>{error}</S.PaymentErrorMessage>
          </S.PaymentErrorContainer>
        )}

        <S.PaymentSubmitButton
          type="submit"
          disabled={!stripe || loading || !cardComplete}
          loading={loading}
          ready={cardComplete}
        >
          {loading ? (
            <>
              <S.PaymentSpinner />
              Processing Payment...
            </>
          ) : (
            <>
              Pay ${planPrice}
              <ArrowRight size={16} />
            </>
          )}
        </S.PaymentSubmitButton>

        <S.PaymentSecurityBadge>
          <Shield size={16} />
          <span>Secure payment powered by Stripe</span>
        </S.PaymentSecurityBadge>
      </S.PaymentFormWrapper>
    </S.PaymentFormContainer>
  );
};

PaymentForm.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  planPrice: PropTypes.number.isRequired,
  planName: PropTypes.string.isRequired,
  planType: PropTypes.string.isRequired,
  clientSecret: PropTypes.string.isRequired,
};
