/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

const RadioButton = ({ data, selectedValue, setSelectedValue }) => (
  <S.InputGroup>
    {data.map((singleInput, index) => {
      const kebabCase = toKebabCase(singleInput.value);
      const key = index + 1;
      return (
        <React.Fragment key={key}>
          <S.Label
            htmlFor={kebabCase}
            selected={singleInput.value === selectedValue}
            disabled={singleInput.value === 'Reefer' || singleInput.value === 'Flatbed'}
          >
            <S.Input
              type="radio"
              name="radiotype"
              id={kebabCase}
              value={singleInput.value}
              disabled={singleInput.value === 'Reefer' || singleInput.value === 'Flatbed'}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <S.Img src={require(`../../assets/svgs/${singleInput.icon}.svg`).default} alt="#" />
            {singleInput.value}
          </S.Label>
        </React.Fragment>
      );
    })}
  </S.InputGroup>
);

RadioButton.defaultProps = {
  data: null,
};

RadioButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
  selectedValue: PropTypes.string.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
};

export default RadioButton;
