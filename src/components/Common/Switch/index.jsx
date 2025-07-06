import React from 'react';

import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

import * as S from './styles';

const Switch = ({ checked, disabled, onChange }) => (
  <Toggle
    checked={checked}
    icons={{
      checked: <S.OnOffToggleLabel>ON</S.OnOffToggleLabel>,
      unchecked: <S.OnOffToggleLabel>OFF</S.OnOffToggleLabel>,
    }}
    disabled={disabled}
    onChange={onChange}
  />
);

Switch.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
};

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Switch;
