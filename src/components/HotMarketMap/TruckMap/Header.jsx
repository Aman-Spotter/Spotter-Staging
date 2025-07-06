import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

import { MultiDatePicker } from 'components';
import * as S from '../styles';
import 'customRadio.css';

const VALIDATION_SCHEMA = Yup.object({
  puDays: Yup.array().of(Yup.date()),
});

const TruckMapHeader = ({ totalTruckCount, areaSelected, breakpoints, onChangeValue }) => {
  const [initialValues, setInitialValues] = useState({
    date: 'now',
    puDays: [],
  });

  useEffect(() => {
    if (moment().hour() >= 17) {
      setInitialValues({
        date: 'dateRange',
        puDays: [moment().format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')],
      });
    }
    if (moment().hour() >= 13 && moment().day() === 6) {
      setInitialValues({
        date: 'dateRange',
        puDays: [
          moment().format('YYYY-MM-DD'),
          moment().add(1, 'days').format('YYYY-MM-DD'),
          moment().add(2, 'days').format('YYYY-MM-DD'),
        ],
      });
    }
  }, []);

  return (
    <Formik enableReinitialize validationSchema={VALIDATION_SCHEMA} initialValues={initialValues}>
      {({ values, setFieldValue }) => {
        useEffect(() => {
          onChangeValue(values);
        }, [values]);

        return (
          <S.HeaderWrapper>
            <S.AvailableWrapper>
              <div id="truck_map_available_destinations">
                {areaSelected
                  ? 'available destinations'
                  : `${totalTruckCount} available truck${totalTruckCount < 2 ? '' : 's'}`}
              </div>
              <div className="date-filter">
                <S.LabelFont>
                  <label htmlFor="date">
                    <Field
                      type="radio"
                      name="date"
                      value="now"
                      onFocus={(evt) => evt.target.blur()}
                    />
                    now
                  </label>
                </S.LabelFont>
                <S.LabelFont>
                  <label htmlFor="date">
                    <Field
                      type="radio"
                      name="date"
                      value="dateRange"
                      onFocus={(evt) => evt.target.blur()}
                    />
                    date
                  </label>
                </S.LabelFont>
              </div>
            </S.AvailableWrapper>
            <S.ColorScaleWrapper>
              <S.ColorScale>
                <S.ColorBar areaSelected={areaSelected} normal="#a1d3d2" selected="#FDCF7D">
                  <span className="left">0</span>
                </S.ColorBar>
                <S.ColorBar areaSelected={areaSelected} normal="#fff6b6" selected="#FD950A">
                  <span className="left">{breakpoints[0]}</span>
                </S.ColorBar>
                <S.ColorBar areaSelected={areaSelected} normal="#ffb227" selected="#DF5E18">
                  <span className="left">{breakpoints[1]}</span>
                </S.ColorBar>
                <S.ColorBar areaSelected={areaSelected} normal="#ff7c27" selected="#C42416">
                  <span className="left">{breakpoints[2]}</span>
                </S.ColorBar>
                <S.ColorBar areaSelected={areaSelected} normal="#e94c0e" selected="#A2001A">
                  <span className="left">{breakpoints[3]}</span>
                  <span className="right">{breakpoints[4]}+</span>
                </S.ColorBar>
              </S.ColorScale>
              <S.MultiDateContainer singleRow icon={values.puDays.length === 0}>
                <MultiDatePicker
                  max={moment().add(3, 'weeks').format('YYYY-MM-DD')}
                  min={moment().format('YYYY-MM-DD')}
                  name="puDays"
                  placeholder="select days"
                  value={values.puDays}
                  icon={values.puDays.length === 0}
                  onChange={(days) => {
                    setFieldValue('puDays', days);
                    setFieldValue('date', 'dateRange');
                  }}
                />
              </S.MultiDateContainer>
            </S.ColorScaleWrapper>
          </S.HeaderWrapper>
        );
      }}
    </Formik>
  );
};

TruckMapHeader.defaultProps = {
  totalTruckCount: 0,
  areaSelected: false,
};
TruckMapHeader.propTypes = {
  totalTruckCount: PropTypes.number,
  areaSelected: PropTypes.bool,
  onChangeValue: PropTypes.func.isRequired,
  breakpoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TruckMapHeader;
