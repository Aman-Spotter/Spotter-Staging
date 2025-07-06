import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';

import moment from 'moment';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

import { LoadingIndicator, PaymentMethodModal, PublicLayout } from 'components';
import { ConfirmDialog } from 'components/Common';

import * as extensionApi from 'trbsextension/api';

import * as GS from 'globalStyles';

import { DATE_FORMAT } from 'utils/Constants';

import * as S from './styles';

const ExtensionBilling = () => {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmSubscription, setShowConfirmSubscription] = useState(false);
  const [showConfirmDefaultMethod, setShowConfirmDefaultMethod] = useState(false);
  const [paymentMethodIdToRemove, setPaymentMethodIdToRemove] = useState(null);
  const history = useHistory();

  const accessToken = Cookies.get('extension_access_token');

  const onSubscriptionFetch = async () => {
    try {
      const data = await extensionApi.getSubscription(accessToken);
      if (data) {
        setCurrentSubscription({
          ...data,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      onSubscriptionFetch();
    } else {
      history.replace('/');
    }
  }, [accessToken]);

  const handleSubscribe = useCallback(async () => {
    try {
      setLoading(true);
      const { success } = await extensionApi.activateSubscription({
        token: accessToken,
        subscriptionId: currentSubscription.id,
      });
      setCurrentSubscription(null);
      await onSubscriptionFetch();

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowConfirmSubscription(false);
    }
  }, [currentSubscription]);

  const handleCreateSubscription = useCallback(async () => {
    try {
      setLoading(true);
      const data = await extensionApi.createSubscription({
        token: accessToken,
        allowIncomplete: false,
      });

      setCurrentSubscription(null);
      await onSubscriptionFetch();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowConfirmSubscription(false);
    }
  }, [currentSubscription]);

  const handleCancelSubscription = useCallback(async () => {
    try {
      setLoading(true);
      const { success } = await extensionApi.cancelSubscription({
        token: accessToken,
        subscriptionId: currentSubscription.id,
      });
      setCurrentSubscription(null);
      await onSubscriptionFetch();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowConfirmSubscription(false);
    }
  }, [currentSubscription]);

  const onAddPaymentMethodSubmit = useCallback(
    async (setupIntent) => {
      setLoading(true);
      try {
        if (['incomplete', 'past_due'].indexOf(currentSubscription.status) >= 0) {
          const { data } = await extensionApi.confirmStripePaymentIntent({
            token: accessToken,
            subscriptionId: currentSubscription.id,
            paymentIntentId: currentSubscription.latestInvoice.payment_intent.id,
            paymentMethodId: setupIntent.payment_method,
          });
        }
        setCurrentSubscription(null);
        await onSubscriptionFetch();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
    [currentSubscription]
  );

  const onAddPaymentMethodClick = useCallback(async () => {
    try {
      setLoading(true);
      const { clientSecret: newClientSecret } = await extensionApi.createSetupIntent(accessToken);

      setClientSecret(newClientSecret);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubscribeClick = useCallback(() => {
    if (currentSubscription?.paymentMethods?.length > 0) {
      setShowConfirmSubscription(true);
    } else {
      setSubscribing(true);
      onAddPaymentMethodClick();
    }
  }, [currentSubscription?.paymentMethods]);

  const changeDefaultPaymentMethod = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await extensionApi.changeDefaultPaymentMethod({
        token: accessToken,
        paymentMethodId: showConfirmDefaultMethod.id,
      });

      setCurrentSubscription({
        ...currentSubscription,
        defaultPaymentMethod: showConfirmDefaultMethod.id,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowConfirmDefaultMethod(null);
    }
  }, [showConfirmDefaultMethod]);

  const deletePaymentMethod = useCallback(async () => {
    try {
      setLoading(true);

      const { success } = await extensionApi.detachPaymentMethod({
        token: accessToken,
        paymentMethodId: paymentMethodIdToRemove,
      });

      if (success) {
        setCurrentSubscription((oldSub) => ({
          ...oldSub,
          paymentMethods: oldSub.paymentMethods.filter(
            (paymentMethod) => paymentMethod.id !== paymentMethodIdToRemove
          ),
        }));
        setPaymentMethodIdToRemove(null);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [paymentMethodIdToRemove]);

  const paymentMethods = useMemo(
    () =>
      _.uniqBy(
        _.sortBy(
          _.map(currentSubscription?.paymentMethods || [], (pm) => ({
            ...pm,
            imageUri: `/cards/${pm.card.brand}.png`,
            uniqueid: `${pm.card.last4}-${pm.card.brand}-${pm.card.exp_month}-${pm.card.exp_year}`,
          })),
          (pm) => (pm.id === currentSubscription?.defaultPaymentMethod ? -1 : 1)
        ),
        'uniqueid'
      ),
    [
      currentSubscription,
      currentSubscription?.paymentMethods,
      currentSubscription?.defaultPaymentMethod,
    ]
  );

  return (
    <PublicLayout showAuthUrls={false}>
      <Suspense fallback={<LoadingIndicator />}>
        <GS.Container>
          <S.Wrapper>
            {!currentSubscription || loading ? (
              <S.LoadingContainer>
                <LoadingIndicator />
              </S.LoadingContainer>
            ) : (
              <>
                {error && <GS.Error>{error}</GS.Error>}
                <S.Section id="currentPlanContainer">
                  <S.Title>current subscription ({currentSubscription.status})</S.Title>
                  {['canceled', 'incomplete_expired'].includes(currentSubscription.status) && (
                    <GS.Row noMargin padding="0.5rem 0">
                      <GS.Column colNum={6}>
                        <S.Text>your subscription is expired. please subscribe again.</S.Text>
                      </GS.Column>
                      <GS.Column colNum={4} alignItems="flex-end" last>
                        <S.AdminActionButton onClick={onSubscribeClick}>
                          subscribe
                        </S.AdminActionButton>
                      </GS.Column>
                    </GS.Row>
                  )}
                  {['incomplete', 'past_due'].includes(currentSubscription.status) && (
                    <GS.Row noMargin padding="0.5rem 0">
                      <GS.Column colNum={6}>
                        <S.Text>
                          <>${currentSubscription?.upcomingInvoice?.amount_due || '15'}/month</>
                        </S.Text>
                        {/* <S.Text noMargin>{currentSubscription.description}</S.Text> */}
                      </GS.Column>
                      <GS.Column colNum={4} alignItems="flex-end" last>
                        <S.AdminActionButton onClick={onSubscribeClick}>
                          subscribe
                        </S.AdminActionButton>
                      </GS.Column>
                    </GS.Row>
                  )}
                  {['trialing', 'active'].includes(currentSubscription.status) &&
                    ((currentSubscription.subscriptionInvoices &&
                      currentSubscription.subscriptionInvoices?.length) ||
                      (typeof currentSubscription.items === 'object' &&
                        currentSubscription.items.data &&
                        currentSubscription.items.data.length > 0)) && (
                      <GS.Row noMargin padding="0.5rem 0">
                        <GS.Column colNum={8} gap="10%">
                          <S.Text>
                            ${currentSubscription.upcomingInvoice.amount_due || '15'}/month
                          </S.Text>
                          {!currentSubscription.canceledAt && (
                            <S.Text noMargin>
                              {currentSubscription.status === 'active'
                                ? 'your subscription renews on '
                                : 'your trial period ends on '}
                              {moment(currentSubscription.currentPeriodEnd).format(DATE_FORMAT)}
                            </S.Text>
                          )}
                          {currentSubscription.canceledAt && (
                            <S.Text noMargin>
                              {currentSubscription.status === 'active'
                                ? 'your subscription is active until '
                                : 'your trial period ends on '}
                              {moment(currentSubscription.currentPeriodEnd).format(DATE_FORMAT)}
                            </S.Text>
                          )}
                        </GS.Column>
                        <GS.Column colNum={2} last>
                          {currentSubscription.canceledAt && (
                            <S.AdminActionButton onClick={onSubscribeClick}>
                              subscribe
                            </S.AdminActionButton>
                          )}
                        </GS.Column>
                      </GS.Row>
                    )}
                </S.Section>
                <S.Section id="paymentMethodsContainer">
                  <GS.Row noMargin alignItems="center">
                    <GS.Column colNum={8} gap="10%">
                      <S.Title>payment method</S.Title>
                    </GS.Column>
                    <GS.Column colNum={2} last>
                      <S.AdminActionButton onClick={onAddPaymentMethodClick}>
                        add
                      </S.AdminActionButton>
                    </GS.Column>
                  </GS.Row>
                  {Array.isArray(paymentMethods) && paymentMethods?.length ? (
                    paymentMethods.map((paymentMethod) => (
                      <GS.Row
                        noMargin
                        style={{ height: 46 }}
                        padding="0.5rem 0"
                        key={paymentMethod.id}
                        alignItems="center"
                      >
                        <GS.Column colNum={5}>
                          <GS.Row noMargin>
                            {paymentMethod.imageUri && (
                              <img
                                className="icon"
                                src={paymentMethod.imageUri}
                                alt={paymentMethod.card.brand}
                                height={20}
                              />
                            )}
                            <S.CardNumber>
                              **** **** **** {paymentMethod.card.last4}{' '}
                              {currentSubscription.defaultPaymentMethod === paymentMethod.id && (
                                <span>(Default)</span>
                              )}
                            </S.CardNumber>
                          </GS.Row>
                        </GS.Column>
                        <GS.Column colNum={3}>
                          <S.Text noMargin>
                            {moment()
                              .set('month', paymentMethod.card.exp_month - 1)
                              .set('year', paymentMethod.card.exp_year)
                              .format('MM/YYYY')}
                          </S.Text>
                        </GS.Column>
                        <GS.Column colNum={2} alignItems="flex-end" last>
                          {currentSubscription.defaultPaymentMethod !== paymentMethod.id && (
                            <GS.Row noMargin alignItems="center">
                              <S.MakeDefaultButton
                                onClick={() => setShowConfirmDefaultMethod(paymentMethod)}
                              >
                                make default
                              </S.MakeDefaultButton>
                              <GS.DeleteIcon
                                size={20}
                                color="#f84861"
                                onClick={() => setPaymentMethodIdToRemove(paymentMethod.id)}
                              />
                            </GS.Row>
                          )}
                        </GS.Column>
                      </GS.Row>
                    ))
                  ) : (
                    <GS.Row noMargin style={{ height: 46 }} padding="0.5rem 0" alignItems="center">
                      <GS.Column colNum={12}>
                        <S.Text>you haven&apos;t added a payment method yet.</S.Text>
                      </GS.Column>
                    </GS.Row>
                  )}
                </S.Section>
                <S.Section id="invoicesContainer">
                  {Array.isArray(currentSubscription.subscriptionInvoices) && (
                    <>
                      <S.Title>invoice history</S.Title>

                      {currentSubscription.subscriptionInvoices.map((invoice) => (
                        <GS.Row noMargin padding="0.5rem 0" key={invoice.id}>
                          <GS.Column colNum={5}>
                            <S.Text noMargin>{moment(invoice.created).format(DATE_FORMAT)}</S.Text>
                          </GS.Column>
                          <GS.Column colNum={3}>
                            <S.Text noMargin>
                              $
                              {invoice.amountPaid
                                ? invoice.amountPaid / 100
                                : invoice.amountDue / 100}
                            </S.Text>
                          </GS.Column>
                          <GS.Column colNum={2} last>
                            <S.InvoiceStatus className={invoice.status}>
                              {invoice.status.toLowerCase()}
                            </S.InvoiceStatus>
                          </GS.Column>
                        </GS.Row>
                      ))}
                    </>
                  )}
                </S.Section>
                {['trialing', 'active'].includes(currentSubscription.status) &&
                  ((currentSubscription.subscriptionInvoices &&
                    currentSubscription.subscriptionInvoices?.length) ||
                    (typeof currentSubscription.items === 'object' &&
                      currentSubscription.items.data &&
                      currentSubscription.items.data.length > 0)) &&
                  !currentSubscription.canceledAt && (
                    <S.Section id="cancel-sub-section">
                      <S.Text
                        small
                        noMargin
                        // onClick={() => setShowConfirmSubscription(true)}
                      >
                        Would you like to cancel your subscription? Click{' '}
                        <S.TextCancel
                          color="primary"
                          onClick={() => setShowConfirmSubscription(true)}
                        >
                          here
                        </S.TextCancel>
                      </S.Text>
                    </S.Section>
                  )}

                {clientSecret && (
                  <PaymentMethodModal
                    clientSecret={clientSecret}
                    onClose={(setupIntent) => {
                      if (setupIntent) {
                        onAddPaymentMethodSubmit(setupIntent);
                        if (subscribing) {
                          setShowConfirmSubscription(true);
                        }
                        // refetch();
                        // refetchSubscription();
                      }
                      setClientSecret(null);
                    }}
                  />
                )}

                {paymentMethodIdToRemove && (
                  <ConfirmDialog
                    onClose={() => setPaymentMethodIdToRemove(null)}
                    description="are you sure to delete the payment method?"
                    confirmBtnLabel="delete"
                    onConfirm={deletePaymentMethod}
                  />
                )}
                {showConfirmDefaultMethod && (
                  <ConfirmDialog
                    onClose={() => setShowConfirmDefaultMethod(null)}
                    cancelBtnLabel="no"
                    description={`are you sure you want to make card ending in ${showConfirmDefaultMethod.card.last4} as your default form of payment?`}
                    onConfirm={changeDefaultPaymentMethod}
                  />
                )}

                {showConfirmSubscription && (
                  <ConfirmDialog
                    onClose={() => setShowConfirmSubscription(false)}
                    cancelBtnLabel="no"
                    description={
                      currentSubscription.canceledAt ? (
                        'are you sure you want to activate your subscription?'
                      ) : currentSubscription.status === 'incomplete' ? (
                        <>
                          are you sure you want to subscribe for ${currentSubscription.priceAmount}?
                        </>
                      ) : (
                        'are you sure you want to cancel your subscription?'
                      )
                    }
                    onConfirm={
                      currentSubscription.canceledAt
                        ? handleSubscribe
                        : currentSubscription.status === 'incomplete'
                        ? handleCreateSubscription
                        : handleCancelSubscription
                    }
                  />
                )}
              </>
            )}
          </S.Wrapper>
        </GS.Container>
      </Suspense>
    </PublicLayout>
  );
};

export default ExtensionBilling;
