import React from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';
import MultiSelect from 'react-multi-select-component';
import styled from 'styled-components';

const StyledSelect = styled(MultiSelect)`
  --rmsc-h: 32px !important;
  padding-top: 2px;
  width: 100%;
`;

export const filterIncludedIn = (rows, id, filterValue, filterBy) => {
  const key = filterBy || id;
  const filtered = rows.filter((row) => {
    const rowValue = row.original[key];
    const values = filterValue.map((opt) => opt.value);
    return _.includes(values, rowValue);
  });
  return filtered;
};

const customItemRenderer = ({ checked, option, onClick, disabled }) => (
  <div className={`item-renderer ${disabled && 'disabled'}`}>
    <input
      type="checkbox"
      onChange={option.onClick || onClick}
      checked={option.checked !== undefined ? option.checked : checked}
      tabIndex={-1}
      disabled={disabled}
    />
    <span style={{ color: option.color || '#fff' }}>{option.label}</span>
  </div>
);

const MultiSelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
  filterBy,
  selectAllLabel,
  headerName,
  customOptions,
  getOptions,
  hasSelectAll,
}) => {
  const key = filterBy || id;

  const options = React.useMemo(() => {
    if (customOptions) {
      return customOptions;
    }
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.original[key]);
    });
    return getOptions(
      [...optionsSet.values()].map((opt) =>
        typeof opt === 'object'
          ? { ...opt, value: opt }
          : typeof opt === 'number' || typeof opt === 'undefined'
          ? { label: opt === 1 ? 'On' : 'Off', value: opt }
          : { label: opt, value: opt }
      )
    );
  }, [key, preFilteredRows, customOptions, filterValue]);

  return (
    <StyledSelect
      options={options}
      value={filterValue || options}
      onChange={setFilter}
      valueRenderer={() => headerName}
      labelledBy="Select"
      disableSearch
      ArrowRenderer={() => <></>}
      ClearSelectedIcon={<></>}
      ItemRenderer={customItemRenderer}
      hasSelectAll={hasSelectAll}
      selectAllLabel={selectAllLabel}
    />
  );
};

MultiSelectColumnFilter.defaultProps = {
  filterBy: null,
  selectAllLabel: 'All items',
  headerName: 'All',
  customOptions: null,
  getOptions: (options) => options,
  hasSelectAll: true,
};

MultiSelectColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
    ),
    preFilteredRows: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
    setFilter: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  selectAllLabel: PropTypes.string,
  filterBy: PropTypes.string,
  headerName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  customOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    })
  ),
  getOptions: PropTypes.func,
  hasSelectAll: PropTypes.bool,
};

export default MultiSelectColumnFilter;
