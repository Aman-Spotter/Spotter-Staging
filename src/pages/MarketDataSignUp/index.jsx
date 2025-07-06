/* global fbq */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation, useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { SignupStepOne, SignupStepTwo, SignupStripePayment, Header, Footer } from 'components';
import { USER_TYPE } from 'constant/Utils';
import * as MUTATION from 'apollo/mutation';
import * as QUERY from 'apollo/query';
import * as S from './styles';
import { errorHandling } from '../Signup';

const MarketDataSignUp = () => {
  const userType = 'MarketData';

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
  const [redirectTo, setRedirectTo] = useState('/success');

  useEffect(() => {
    if (Cookies.get('trackFb')) {
      fbq('trackCustom', 'MarketDataSignUpStart');
    }

    Cookies.set('sign-up-from', 'MarketData');
  }, []);

  useEffect(() => {
    if (location?.state?.data) {
      setWizardStep(1);
      setData({ ...data, ...location.state.data });
    }

    if (location?.state?.clientSecret) {
      setClientSecret(location.state.clientSecret);
      setWizardStep(2);
      setRedirectTo('/lens');
    }
  }, [location]);

  const validateStep = async (isNext, newData) => {
    if (isNext) {
      const {
        data: { verifyEmailAlreadyUsed },
      } = await apolloClient.query({
        query: QUERY.VERIFY_EMAIL_ALREADY_USED,
        variables: { email: newData.email },
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

  const onCreateUser = async (parsingData) => {
    setLoading(true);
    try {
      const userRole = parsingData.entityType.toUpperCase().includes('BROKER')
        ? 'broker'
        : 'dispatcher';

      const {
        data: {
          register: { success, errors: newerrors, subscription },
        },
        errors,
      } = await apolloClient.mutate({
        mutation: MUTATION.REGISTER_CUSTOM_SUBSCRIPTION(),
        variables: {
          username: parsingData.email,
          email: parsingData.email,
          userDisplayName: parsingData.email.split('@')[0],
          type: USER_TYPE.MARKET_DATA,
          firstName: parsingData.name.split(' ')[0] || ' ',
          lastName: parsingData.name.split(' ')[1] || ' ',
          phone: parsingData.phoneNumber.replace(/^\+[0-9]/, ''),
          phoneExt: '+1',
          [userRole]: {
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
        history.push('/market-sign-up');
      }
      if (errors) {
        setData({ type: userType });
        throw new Error(errors);
      }
      if (success) {
        if (Cookies.get('trackFb')) {
          fbq('trackCustom', 'MarketDataSignUpCompleted', parsingData);
        }

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
      console.error(err);

      setData({ type: userType });
      setWizardStep(0);
      setError(err.message);
      setIsClearForm(true);
      setLoading(false);
      // history.push('/market-sign-up');
    }
  };

  const onSubmitHandler = async (newData) => {
    setData({ ...data, ...newData });

    const webhookUrl =
      process.env.REACT_APP_ENV === 'PRODUCTION'
        ? 'https://hooks.slack.com/services/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'
        : 'https://hooks.slack.com/services/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';

    const formatedText = `A new user signed up for MarketData,
    Below are details information of it:
           ${JSON.stringify({ ...newData, ...data }, null, 4)}
          `;
    const stringFormattedData = {
      text: formatedText,
    };

    console.log('stringFormattedData', stringFormattedData);
    console.log('webhookUrl', webhookUrl);
    const res = await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(stringFormattedData),
    });

    if (res.status === 200) {
      // clear form
      await onCreateUser({ ...newData, ...data });
    } else {
      console.error('There was an error.  Please try again later.');
    }
  };

  return (
    <S.Layout>
      <S.Container>
        {wizardStep === 0 && (
          <SignupStepOne
            title="sign up"
            onNextStepHandler={onNextStepHandler}
            clearForm={isClearForm}
            data={data}
            apierror={error}
            alreadyEmailLoading={alreadyEmailLoading}
          />
        )}
        {wizardStep === 1 && (
          <SignupStepTwo
            userType={null}
            loading={loading}
            onSubmitHandler={onSubmitHandler}
            clearForm={isClearForm}
          />
        )}
        {wizardStep === 2 && !!clientSecret && (
          <SignupStripePayment
            title="process payment"
            description="$299/mo"
            clientSecret={clientSecret}
            redirectPath={redirectTo}
          />
        )}
      </S.Container>
    </S.Layout>
  );
};

export default MarketDataSignUp;
