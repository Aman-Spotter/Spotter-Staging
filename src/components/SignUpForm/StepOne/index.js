/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as S from '../styles';
import { Heading, SubHeading, Row, Column } from '../../../globalStyles';
import Button from '../../LandingPageButton';

const StepOne = ({ title, onNextStepHandler, clearForm, data, apierror, alreadyEmailLoading }) => {
  const [feilds, setFeilds] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clearForm) {
      setFeilds({});
      setErrors({});
    }

    if (data && data.interested) {
      setFeilds({ ...data.interested });
    }
  }, [clearForm, data]);

  const handleValidation = () => {
    const copyFields = { ...feilds };
    const tempErrors = {};
    let formIsValid = true;

    // Name
    if (!copyFields.name) {
      formIsValid = false;
      tempErrors.name = 'Name can not be empty';
    }

    if (!copyFields.phoneNumber) {
      formIsValid = false;
      tempErrors.phoneNumber = 'Phone Number can not be empty';
    }

    if (!copyFields.email) {
      formIsValid = false;
      tempErrors.email = 'Email can not be empty';
    }

    if (
      copyFields &&
      copyFields.phoneNumber &&
      isValidPhoneNumber(copyFields.phoneNumber) === false
    ) {
      formIsValid = false;
      tempErrors.phoneNumber = 'Please enter valid phone number.';
    }

    if (typeof copyFields.email !== 'undefined') {
      const lastAtPos = copyFields.email.lastIndexOf('@');
      const lastDotPos = copyFields.email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          copyFields.email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          copyFields.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        tempErrors.email = 'Email is not valid';
      }
    }
    setErrors({ ...tempErrors });
    return formIsValid;
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (handleValidation()) {
      onNextStepHandler(true, feilds);
      setLoading(false);
    } else {
      console.log(errors);
      setLoading(false);
    }
  };
  const handleChange = (e, name = null) => {
    const copyFields = { ...feilds };
    if (name) {
      copyFields[name] = e.value;
      setErrors({ ...errors, [name]: '' });
    } else {
      copyFields[e.target.name] = e.target.value;
      setErrors({ ...errors, [e.target.name]: '' });
    }

    setFeilds({ ...copyFields });
  };

  return (
    <S.Wrapper lightMode>
      <Heading id="stepone">{title}</Heading>
      <SubHeading color="rgb(28, 34, 55)">contact information</SubHeading>
      {apierror && <S.Error>{apierror}</S.Error>}
      <S.InputWarp>
        <S.FormInput
          name="name"
          placeholder="name"
          onChange={handleChange}
          value={feilds && feilds.name}
        />
        <span>&nbsp;</span>
      </S.InputWarp>
      <S.Error>{errors && errors.name && errors.name}</S.Error>
      <S.InputWarp>
        <S.PhoneFormInput
          country="US"
          placeholder="phone number"
          value={feilds && feilds.phoneNumber}
          onChange={(value) => handleChange({ target: { name: 'phoneNumber', value } })}
        />
        <span>&nbsp;</span>
      </S.InputWarp>
      <S.Error>{errors && errors.phoneNumber && errors.phoneNumber}</S.Error>
      <S.InputWarp>
        <S.FormInput
          name="email"
          value={feilds && feilds.email}
          placeholder="email"
          type="email"
          onChange={handleChange}
        />
        <span>&nbsp;</span>
      </S.InputWarp>
      <S.Error>{errors && errors.email && errors.email}</S.Error>
      <Row alignItems="center">
        <Column colNum={10} alignItems="center" last>
          <Button
            title="next"
            color="#ffffff"
            type="button"
            maxWidth="200px"
            iconColor="#ffac12"
            isLoading={alreadyEmailLoading || loading}
            onClick={(e) => submitHandler(e)}
          />
        </Column>
      </Row>
    </S.Wrapper>
  );
};

export default StepOne;
