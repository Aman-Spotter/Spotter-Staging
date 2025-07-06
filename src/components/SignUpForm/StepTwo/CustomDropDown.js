/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';
import * as S from '../styles';

const CustomDropdownRenderer = ({
  methods,
  state,
  props: { searchable, searchBy, labelField, options, loading },
}) => {
  const regexp = new RegExp(state.search, 'i');
  const isNum = /^\d+$/.test(state?.search);
  const items =
    searchable && options && options.length > 0
      ? options.filter((item) => regexp.test(item[searchBy] || item[labelField]))
      : options;
  if (items && items.length > 0 && state.search.length > 3) {
    return (
      <AutoSizer style={{ height: 'auto', maxHeight: '200px' }}>
        {({ width }) => (
          <S.StyledList
            height={40 * items.length}
            rowCount={items.length}
            rowHeight={40}
            width={width - 2}
            rowRenderer={({ index, style, key }) => (
              <S.Item
                key={key}
                style={style}
                onClick={() =>
                  methods.addItem({
                    label: items[index].value,
                    value: items[index].value,
                  })
                }
              >
                {items[index].label}
              </S.Item>
            )}
          />
        )}
      </AutoSizer>
    );
  }
  if (state.search !== '' && state.search.length > 3 && isNum && !loading) {
    return (
      <S.StyledNoData>
        Ooops! nothing found for&nbsp; <strong>{state.search}</strong>
      </S.StyledNoData>
    );
  }
  return null;
};

export default CustomDropdownRenderer;

CustomDropdownRenderer.defaultProps = {
  methods: null,
  state: null,
  props: null,
};

CustomDropdownRenderer.propTypes = {
  methods: PropTypes.shape({
    addItem: PropTypes.func.isRequired,
  }),
  state: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
  props: PropTypes.shape({
    searchable: PropTypes.string,
    searchBy: PropTypes.string,
    labelField: PropTypes.string,
    loading: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }),
};
