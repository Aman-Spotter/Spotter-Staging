import React from 'react';
import PropTypes from 'prop-types';

import DropdownList from 'react-widgets/DropdownList';
import MultiSelect from 'react-widgets/Multiselect';

import './styles.scss';

const Dropdown = ({
  data,
  defaultValue,
  disabled,
  filter,
  onChange,
  onFocus,
  name,
  value,
  type,
  placeholder,
  isEmptyBorder,
}) =>
  type === 'default' ? (
    <DropdownList
      data={data}
      dataKey="value"
      defaultValue={defaultValue}
      disabled={disabled}
      filter={filter}
      onChange={onChange}
      onFocus={onFocus}
      onToggle={onFocus}
      name={name}
      textField="label"
      value={value}
      placeholder={placeholder}
      containerClassName={isEmptyBorder ? 'no-border' : ''}
    />
  ) : (
    <MultiSelect
      data={data}
      dataKey="value"
      defaultValue={defaultValue}
      disabled={disabled}
      filter={filter}
      onChange={onChange}
      onFocus={onFocus}
      onToggle={onFocus}
      name={name}
      textField="label"
      value={value}
      placeholder={placeholder}
      containerClassName={isEmptyBorder ? 'no-border' : ''}
    />
  );

Dropdown.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  filter: false,
  type: 'default',
  value: undefined,
  placeholder: undefined,
  isEmptyBorder: false,
  onFocus: () => {},
};
Dropdown.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ])
  ).isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
  ]),
  isEmptyBorder: PropTypes.bool,
  filter: PropTypes.oneOfType([PropTypes.oneOf(['startsWith', 'eq', 'contains']), PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.oneOf(['default', 'multi-select']),
};

export default Dropdown;
