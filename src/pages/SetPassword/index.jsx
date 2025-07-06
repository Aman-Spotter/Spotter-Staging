/* global fbq */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useApolloClient } from '@apollo/client';
import { PASSWORD_SET } from 'apollo/mutation';
import Button from 'components/LandingPageButton';
import { SubHeading } from 'globalStyles';
import * as S from './styles';

const SetPassword = () => {
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [passwordSetSuccess, setPasswordSetSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState('password');
  const [loading, setLoading] = useState(false);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const { passwordSetToken } = useParams();

  const passwordSetHandler = async () => {
    try {
      const {
        data: {
          passwordSet: { success, errors },
        },
      } = await apolloClient.mutate({
        mutation: PASSWORD_SET,
        variables: { token: passwordSetToken, newPassword1: password1, newPassword2: password2 },
        fetchPolicy: 'no-cache',
      });
      setLoading(false);
      if (errors) {
        const errkeys = Object.keys(errors) || [];
        const errorStr = errkeys.map((key) => errors[key]).flat();
        if (errorStr.find((err) => err.code === 'invalid_token')) {
          setError({
            loginErr: <>Password set link has invalid. Please request a new password on App</>,
          });
          return;
        }
        if (errorStr.find((err) => err.code === 'expired_token')) {
          setError({
            loginErr: <>Password set link has invalid. Please request a new password on App</>,
          });
          return;
        }
        throw new Error(`Password set Failed, ${errorStr.map((err) => err.message).join('\n')}`);
      }
      if (success) {
        if (Cookies.get('sign-up-from') === 'MarketData') {
          history.push({
            pathname: '/login',
          });
        } else {
          history.push({
            pathname: '/success',
            state: {
              description: 'You are all set! Download the app to login and get started.',
            },
          });
        }
      }
    } catch (err) {
      setError({ loginErr: err.message });
    }
  };

  const passwordValidator = (str) => str && str.length >= 8;

  const handleValidation = () => {
    const tempErrors = {};
    let formIsValid = true;

    if (!password1) {
      formIsValid = false;
      tempErrors.password1 = 'Cannot be empty';
    }

    if (password1 && !passwordValidator(password1)) {
      formIsValid = false;
      tempErrors.password1 = 'Minimum eight characters';
    }
    if (!password2) {
      formIsValid = false;
      tempErrors.password2 = 'Cannot be empty';
    }

    if (password2 && password1 !== password2) {
      formIsValid = false;

      tempErrors.password2 = 'Password did not match';
    }

    setError({ ...tempErrors });
    return formIsValid;
  };

  const onPasswordSetHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (handleValidation()) {
      passwordSetHandler();
    } else {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'password1') {
      setPassword1(e.target.value);
    } else {
      setPassword2(e.target.value);
    }
    setError({ ...error, [e.target.name]: '' });
  };

  const togglePasswordVisibility = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <S.Wrapper>
          {!passwordSetSuccess && (
            <>
              <SubHeading color="rgb(28, 34, 55)" marginBottom="20px">
                Please set your password
              </SubHeading>
              <S.InputWarp>
                <S.FormInput
                  name="password1"
                  type={type}
                  value={password1 || ''}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span>&nbsp;</span>
              </S.InputWarp>
              <S.Error>{error && error.password1 && error.password1}</S.Error>

              <S.InputWarp>
                <S.FormInput
                  name="password2"
                  type={type}
                  value={password2 || ''}
                  placeholder="Confirm your password"
                  onChange={handleChange}
                />
                <span>&nbsp;</span>
              </S.InputWarp>
              <S.Error>{error && error.password2 && error.password2}</S.Error>
              <S.InputWarp>
                <input type="checkbox" onClick={togglePasswordVisibility} /> &nbsp;Show Password
              </S.InputWarp>
              <S.ButtonContainer>
                <Button
                  title="Submit"
                  maxWidth="200px"
                  color="#ffffff"
                  iconColor="#ffac12"
                  onClick={onPasswordSetHandler}
                  isLoading={loading}
                />
              </S.ButtonContainer>
              <S.Error center>{error && error.loginErr && error.loginErr}</S.Error>
            </>
          )}
        </S.Wrapper>
      </S.Container>
    </S.Layout>
  );
};

export default SetPassword;
