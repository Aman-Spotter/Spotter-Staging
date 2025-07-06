/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';

import { useQuery } from '@apollo/client';
import CreatableSelect from 'react-select/creatable';

import { STATE } from 'constant/Utils';
import { MCS } from 'apollo/query';
import * as S from '../styles';
import { Heading, SubHeading, Row, Column } from '../../../globalStyles';
import Button from '../../LandingPageButton';

const customStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(238, 238, 238);',
  }),
  input: (provided) => ({
    ...provided,
    opacity: 1,
  }),
  valueContainer: (provided) => ({
    ...provided,
    opacity: 1,
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(238, 238, 238);',
  }),
};

const selectStyles = {
  input: (styles) => ({
    ...styles,
    width: '100%',
    div: {
      input: {
        opacity: '1 !important',
      },
    },
  }),
};

const USER_TYPE_TO_TITLE = {
  CARRIER: 'carrier',
};

const StepTwo = ({ userType, onSubmitHandler, clearForm, loading }) => {
  const [fields, setFields] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isBorder, setIsBorder] = useState(false);
  const [mcInput, setMcInput] = useState('');
  const [selectedMc, setSelectedMc] = useState({});
  const [allowEdit, setAllowEdit] = useState(false);

  const customMc = {
    dbaName: '',
    legalName: '',
    mCity: '',
    mState: '',
    mStreet: '',
    mZipCode: '',
    mailingAddress: '',
    mcMxFfNumber: '',
  };

  const { data: { allMcs = [] } = {}, loading: mcListLoading } = useQuery(MCS, {
    variables: {
      fourDigitMcNumber: mcInput.indexOf('MC-') > -1 ? mcInput.slice(3) : mcInput,
      userType,
    },
    skip: mcInput.length < 5,
  });

  const updateMc = (newSelectedMc) => {
    const value = newSelectedMc.mcMxFfNumber || newSelectedMc.label;
    setMcInput(value);
    setSelectedMc({ ...newSelectedMc, value });
    setFields({
      ...fields,
      mcNumber: value,
      companyName: newSelectedMc?.legalName,
      city: newSelectedMc?.mCity,
      zip: newSelectedMc?.mZipCode,
      state: newSelectedMc?.mState,
      street: newSelectedMc?.mailingAddress,
      dotNum: newSelectedMc?.usdotNumber,
      companyDisplayName: newSelectedMc?.dbaName || newSelectedMc?.legalName,
      ...newSelectedMc,
    });
    setErrors(null);
  };

  const mcOptions = useMemo(() => {
    // if (allMcs.length === 1) {
    //   updateMc(allMcs[0]);
    // }
    if (allMcs.length === 1) {
      updateMc(allMcs[0]);
    }
    return [
      ...allMcs.map((mc) => ({
        label: `${mc.mcMxFfNumber} ${mc.legalName}` || `${mc.label} ${mc.legalName}`,
        value: mc.id,
      })),
    ];
  }, [allMcs]);

  const showDetailsForm = useMemo(
    () => selectedMc && mcInput === selectedMc.value,
    [mcInput, selectedMc]
  );

  useEffect(() => {
    if (clearForm) {
      setFields({});
      setErrors({});
    }
  }, [clearForm]);

  useEffect(() => {
    if (allMcs && allMcs.length > 0) {
      setIsBorder(true);
    } else {
      setIsBorder(false);
    }
  }, [allMcs]);

  const isUsZipCode = (str) => {
    const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return regexp.test(str);
  };

  const isValidAlphaNumeric = (str) => {
    const regexp = /^([a-zA-Z0-9_-]){3,10}$/;
    return regexp.test(str);
  };

  const handleValidation = () => {
    const copyFields = { ...fields };
    const tempErrors = {};
    let formIsValid = true;
    // Name
    if (!copyFields.companyName) {
      formIsValid = false;
      tempErrors.companyName = 'Company Name can not be empty';
    }
    if (!copyFields.street) {
      formIsValid = false;
      tempErrors.street = 'Street Address can not be empty';
    }
    if (!copyFields.city) {
      formIsValid = false;
      tempErrors.city = 'City can not be empty';
    }
    if (!copyFields.dotNum) {
      formIsValid = false;
      tempErrors.city = 'Dot Number can not be empty';
    }
    if (!copyFields.zip) {
      formIsValid = false;
      tempErrors.zip = 'Zip can not be empty';
    }
    if (!copyFields.mcNumber) {
      formIsValid = false;
      tempErrors.mcNumber = 'Select your MC Number';
    }

    if (!copyFields.state) {
      formIsValid = false;
      tempErrors.state = 'State can not be empty';
    }

    if (typeof copyFields.zip !== 'undefined' && !isUsZipCode(copyFields.zip)) {
      formIsValid = false;
      tempErrors.zip = 'Please use valid zip code';
    }
    if (typeof copyFields.mcNumber !== 'undefined' && !isValidAlphaNumeric(copyFields.mcNumber)) {
      formIsValid = false;
      tempErrors.mcNumber = 'Please use 3 to 10 alphanumeric number.';
    }

    setErrors({ ...tempErrors });
    return formIsValid;
  };

  const submitFinalHandler = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      onSubmitHandler(fields);
    } else {
      console.log(errors);
    }
  };

  const onHandleMCChange = (opt) => {
    /* eslint no-underscore-dangle: 0 */
    if (opt.__isNew__) {
      setAllowEdit(true);
    }
    /* eslint no-underscore-dangle: 0 */
    const newSelectedMc = opt.__isNew__
      ? { ...customMc, mcMxFfNumber: `${opt.value}` }
      : allMcs.find((mc) => mc.id === opt.value);
    updateMc(newSelectedMc);
  };

  const selectedValue = (dropdownVal) => {
    const selectedObj = STATE.find((o) => o.value === dropdownVal);
    return selectedObj;
  };

  const handleChange = (e) => {
    if (allowEdit) {
      const { name } = e.target;
      const newVar = {};
      newVar[name] = e.target.value;
      setFields({ ...fields, ...newVar });
    }
  };

  const handleStateChange = (opt) => {
    if (allowEdit) {
      setFields({ ...fields, state: opt.value });
    }
  };

  const handleEntityTypeChange = (opt) => {
    if (allowEdit) {
      setFields({ ...fields, entityType: opt.value });
    }
  };

  return (
    <S.Wrapper lightMode>
      <Heading>{`${USER_TYPE_TO_TITLE[userType] ?? ''}`} sign up</Heading>
      <SubHeading color="rgb(28, 34, 55)">Company Details</SubHeading>
      <S.InputWarpCustom isBorder={isBorder} noMenu={mcOptions.length === 1}>
        <CreatableSelect
          options={[...mcOptions]}
          onChange={onHandleMCChange}
          placeholder="MC/MX Number e.g. 123456"
          onInputChange={(v, { action }) => {
            if (action === 'input-change') setMcInput(v.replace(/\D/g, ''));
          }}
          inputValue={mcInput || ''}
          value={selectedMc.id}
          isLoading={mcListLoading}
          styles={selectStyles}
          filterOption={({ label, value }) => label.length > 0 && value.length > 0}
          formatCreateLabel={(inputValue) => `Use "${inputValue}"`}
        />

        <span>&nbsp;</span>
      </S.InputWarpCustom>
      <S.Error>{errors && errors.mcNumber && errors.mcNumber}</S.Error>
      {showDetailsForm && (
        <>
          <S.InputWarp>
            <S.FormInput
              name="companyName"
              placeholder="Company Name"
              onChange={handleChange}
              value={fields && fields.companyName ? fields.companyName : ''}
            />
            <span>&nbsp;</span>
          </S.InputWarp>
          <S.Error>{errors && errors.companyName && errors.companyName}</S.Error>
          <S.InputWarp>
            <S.FormInput
              name="street"
              placeholder="Street Address"
              value={fields?.street || ''}
              onChange={handleChange}
            />
            <span>&nbsp;</span>
          </S.InputWarp>
          <S.Error>{errors && errors.street && errors.street}</S.Error>
          <S.InputWarp>
            <S.FormInput
              name="city"
              placeholder="City"
              value={fields && fields.city ? fields.city : ''}
              onChange={handleChange}
            />
            <span>&nbsp;</span>
          </S.InputWarp>
          <S.Error>{errors && errors.city && errors.city}</S.Error>
          <S.InputWarp>
            <S.FormInput
              name="zip"
              placeholder="Zip Code"
              value={fields && fields.zip ? fields.zip : ''}
              onChange={handleChange}
            />
            <span>&nbsp;</span>
          </S.InputWarp>
          <S.Error>{errors && errors.zip && errors.zip}</S.Error>
          <S.InputWarp select>
            <S.Dropdown
              styles={customStyles}
              name="state"
              placeholder="State"
              value={fields && fields.state ? selectedValue(fields.state) : ''}
              options={STATE}
              onChange={handleStateChange}
            />
          </S.InputWarp>
          {!userType && (
            <S.InputWarp select>
              <S.Dropdown
                styles={customStyles}
                name="carrier"
                placeholder="Entity Type"
                value={fields && fields.entityType ? selectedValue(fields.entityType) : ''}
                options={[
                  { label: 'Carrier', value: 'CARRIER' },
                  { label: 'Broker', value: 'BROKER' },
                ]}
                onChange={handleEntityTypeChange}
              />
            </S.InputWarp>
          )}
          <S.Error>{errors && errors.state && errors.state}</S.Error>
          <S.InputWarp>
            <S.FormInput
              name="dotNum"
              placeholder="Dot Number"
              value={fields && fields.dotNum ? fields.dotNum : ''}
              onChange={handleChange}
            />
            <span>&nbsp;</span>
          </S.InputWarp>
          <S.Error>{errors && errors.dotNum && errors.dotNum}</S.Error>
        </>
      )}

      <Row alignItems="center">
        <Column colNum={10} alignItems="center" last>
          <Button
            title="Submit"
            width="200px"
            color="#ffffff"
            iconColor="#ffac12"
            isLoading={loading}
            onClick={submitFinalHandler}
          />
        </Column>
      </Row>
    </S.Wrapper>
  );
};

export default StepTwo;
