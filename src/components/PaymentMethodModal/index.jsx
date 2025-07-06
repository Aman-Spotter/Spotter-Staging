import React, { lazy } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

import * as GS from 'globalStyles';

import * as S from './styles';

const LoadingIndicator = lazy(() => import('components/LoadingIndicator'));
const ActionButton = lazy(() => import('components/ActionButton'));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentMethodModal = ({ clientSecret, onClose }) => {
  const [error, setError] = React.useState('');
  const [isProcess, setIsProcess] = React.useState(false);

  const addPaymentMethod = async (event, stripe, elements) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcess(true);
    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement('card'),
      },
    });
    if (result.setupIntent) {
      onClose(result.setupIntent);
    }
    if (result.error) {
      setError(result.error.message);
    }
    setIsProcess(false);
  };

  return (
    <S.StyledReactModal
      isOpen
      onRequestClose={() => onClose(false)}
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          width: '35%',
          height: '25%',
        },
      }}
    >
      <S.ModalHeader>
        <S.Title>add payment method</S.Title>
        <S.ModalAction>
          <S.CloseBtn onClick={() => onClose(false)} />
        </S.ModalAction>
      </S.ModalHeader>
      <S.ModalContent>
        <S.SettingsContent>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'night',
                variables: { colorPrimary: '#008080', colorBackground: '#04283c' },
              },
            }}
          >
            <ElementsConsumer>
              {({ stripe, elements }) =>
                !stripe ? (
                  <LoadingIndicator />
                ) : (
                  <form>
                    <CardElement
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            color: '#fffefe',
                          },
                        },
                      }}
                    />
                    <GS.Error>{error}</GS.Error>
                    <GS.Row alignItems="center">
                      <GS.Column colNum={10} alignItems="center" last>
                        <ActionButton
                          color="primary"
                          type="button"
                          isLoading={!stripe || isProcess}
                          onClick={(evt) => addPaymentMethod(evt, stripe, elements)}
                        >
                          add
                        </ActionButton>
                      </GS.Column>
                    </GS.Row>
                  </form>
                )
              }
            </ElementsConsumer>
          </Elements>
        </S.SettingsContent>
      </S.ModalContent>
    </S.StyledReactModal>
  );
};

PaymentMethodModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  clientSecret: PropTypes.string.isRequired,
};

export default PaymentMethodModal;
