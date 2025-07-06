import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSendResetPasswordEmail } from 'apollo/hook';

import { ActionButton } from 'components';

import * as S from '../Login/styles';

const INITIAL_VALUES = {
  email: '',
};

const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const ForgotPassword = () => {
  const history = useHistory();

  const sendResetPasswordEmail = useSendResetPasswordEmail();

  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmit = async ({ email }) => {
    try {
      setLoading(true);
      setEmailSent(false);

      const {
        data: {
          sendPasswordResetEmail: { errors: secondaryErrors },
        },
        errors: primaryErrors,
      } = await sendResetPasswordEmail(email);

      if (primaryErrors) setError(primaryErrors[0].message);
      if (secondaryErrors) setError(secondaryErrors.email[0].message);

      setEmailSent(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <S.ForgotPasswordForm autoComplete="off" onSubmit={handleSubmit}>
            <S.Title>
              <span>forgot Password</span>
            </S.Title>
            <S.ForgotPasswordFormContent>
              <S.Row>
                <S.RowContent>
                  <S.Label>email:</S.Label>
                  <S.Input type="text" name="email" value={values.email} onChange={handleChange} />
                </S.RowContent>
                <S.Error>{errors.email || <div>&nbsp;</div>}</S.Error>
              </S.Row>
            </S.ForgotPasswordFormContent>
            <S.ForgotPasswordFormActions>
              {emailSent ? (
                <>
                  <S.EmailSentMessage>
                    Your password reset link has been sent to your email address.
                  </S.EmailSentMessage>
                  <ActionButton
                    isLoading={false}
                    type="button"
                    onClick={() => history.push('/login')}
                  >
                    return to login
                  </ActionButton>
                </>
              ) : (
                <>
                  <ActionButton isLoading={loading} type="submit">
                    submit
                  </ActionButton>
                  <S.ActionError>{error || ''}</S.ActionError>
                </>
              )}
            </S.ForgotPasswordFormActions>
          </S.ForgotPasswordForm>
        )}
      </Formik>
    </S.Container>
  );
};

export default ForgotPassword;
