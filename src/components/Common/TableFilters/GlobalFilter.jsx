import React from 'react';

import PropTypes from 'prop-types';
import { useAsyncDebounce } from 'react-table';

import * as GS from 'globalStyles';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <GS.Row noMargin style={{ justifyContent: 'flex-end' }}>
      <GS.Column colNum={4} last>
        <GS.Input
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </GS.Column>
    </GS.Row>
  );
};

GlobalFilter.defaultProps = {
  globalFilter: '',
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.arrayOf(Object).isRequired,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default GlobalFilter;
