/* global fbq */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation, useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { VERIFY_EMAIL_ALREADY_USED } from 'apollo/query';
import { REGISTER_CUSTOM_SUBSCRIPTION } from 'apollo/mutation';
import StepTwo from 'components/SignUpForm/StepTwo';
import StepOne from 'components/SignUpForm/StepOne';
import Header from 'components/Header';
import Footer from 'components/FooterLandingPage';
import * as S from './styles';

export const errorHandling = (randomErr) => {
  if (randomErr && typeof randomErr === 'object') {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in randomErr) {
      if (Object.prototype.hasOwnProperty.call(randomErr, key)) {
        return randomErr[key][0];
      }
    }
  }
  return null;
};

const CarrierSignUp50 = () => {
  const userType = 'Carrier';
  const [alreadyEmailLoading, setAlreadyEmailLoading] = useState(false);
  const [wizardStep, setWizardStep] = useState(0); // 0: Email/Phone number, 1: User details, 2: Stripe Payment
  const [isClearForm, setIsClearForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ type: userType });
  const location = useLocation();
  const history = useHistory();
  const apolloClient = useApolloClient();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (Cookies.get('trackFb')) {
      fbq('trackCustom', 'CarrierSignUpStart');
    }
  }, []);

  useEffect(() => {
    if (location?.state?.data) {
      setWizardStep(1);
      setData({ ...data, ...location.state.data });
    }
  }, [location]);

  const validateStep = async (isNext, newData) => {
    if (isNext) {
      const {
        data: { verifyEmailAlreadyUsed },
      } = await apolloClient.query({
        query: VERIFY_EMAIL_ALREADY_USED,
        variables: { email: newData.email },
        fetchPolicy: 'network-only',
      });
      setError('A user with that email already exists.');
      return !verifyEmailAlreadyUsed;
    }
    return true;
  };

  const onNextStepHandler = async (isNext, newData) => {
    setAlreadyEmailLoading(true);
    const isStepValid = await validateStep(isNext, newData);
    setAlreadyEmailLoading(false);
    if (isStepValid) {
      setWizardStep((oldWizardStep) => (isNext ? oldWizardStep + 1 : oldWizardStep));
      setData({ ...data, ...newData });
    }
  };

  const onCreateCarrier = async (parsingData) => {
    setLoading(true);
    try {
      const {
        data: {
          register: { success, errors: newerrors, subscription },
        },
        errors,
      } = await apolloClient.mutate({
        mutation: REGISTER_CUSTOM_SUBSCRIPTION(),
        variables: {
          username: parsingData.email,
          email: parsingData.email,
          userDisplayName: parsingData.email.split('@')[0],
          type: 'CARRIER',
          firstName: parsingData.name.split(' ')[0] || ' ',
          lastName: parsingData.name.split(' ')[1] || ' ',
          phone: parsingData.phoneNumber.replace(/^\+[0-9]/, ''),
          phoneExt: '+1',
          isDriverApp: true,
          dispatcher: {
            mcNumber: parsingData.mcNumber,
            name: parsingData.companyName,
            dotNumber: parsingData.dotNum,
            displayName: parsingData.companyDisplayName,
            state: parsingData.state,
            city: parsingData.city,
            street: parsingData.street,
            zipCode: parsingData.zip,
          },
          subscriptionItem: {
            priceId: process.env.REACT_APP_STRIPE_OWNER_PRICE_ID,
            itemQty: 1,
          },
        },
        fetchPolicy: 'no-cache',
      });

      if (newerrors) {
        setData({ type: userType });
        setWizardStep(0);
        setError(errorHandling(newerrors).message);
        setIsClearForm(true);
        setLoading(false);
        history.push('/');
      }
      if (errors) {
        setData({ type: userType });
        throw new Error(errors);
      }
      if (success) {
        setClientSecret(subscription.clientSecret);
        setIsClearForm(true);
        setLoading(false);
        history.push({
          pathname: '/success',
          state: {
            title: 'Thanks for signing up!',
            description: 'Please check your email to set your password.',
          },
        });
      }
    } catch (err) {
      setData({ type: userType });
      setWizardStep(0);
      setError(err.message);
      setIsClearForm(true);
      setLoading(false);
      history.push('/');
    }
  };

  const onSubmitHandler = async (newData) => {
    setData({ ...data, ...newData });

    // clear form
    await onCreateCarrier({ ...newData, ...data });
  };

  return (
    <S.Layout>
      <S.Container>
        {wizardStep === 0 && (
          <StepOne
            title={
              <>
                <span>carrier</span>
                <span>sign up</span>
              </>
            }
            onNextStepHandler={onNextStepHandler}
            clearForm={isClearForm}
            data={data}
            apierror={error}
            alreadyEmailLoading={alreadyEmailLoading}
          />
        )}
        {wizardStep === 1 && (
          <StepTwo
            userType="CARRIER"
            loading={loading}
            onSubmitHandler={onSubmitHandler}
            clearForm={isClearForm}
          />
        )}
      </S.Container>
    </S.Layout>
  );
};

export default CarrierSignUp50;
