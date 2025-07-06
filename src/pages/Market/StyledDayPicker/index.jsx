import React from 'react';
import _ from 'lodash';
import DayPicker from 'react-day-picker8';
import * as S from './styles';

const StyledDayPicker = ({ ...props }) => (
  <S.DayPickerWrapper>
    <DayPicker {...props} />
  </S.DayPickerWrapper>
);

export default StyledDayPicker;
