import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useApolloClient, useQuery } from '@apollo/client';
import _ from 'lodash';
import { LOCATION, HOT_MARKET_MAP_AREAS } from 'apollo/query';
import * as Utils from 'utils/Utils';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import GooglePlacesAutocompletePopover from './GooglePlacesAutocompletePopover';

const CustomGooglePlacesAutoComplete = ({
  onChange,
  onChangeLocation,
  initialValue,
  onChangeTest,
  autoSelect,
  location,
  isPopover,
  preIcon,
  placeholder,
  height,
  popoverProps,
}) => {
  const client = useApolloClient();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('');
  const { data: { hotMarketMapAreas = [] } = {} } = useQuery(HOT_MARKET_MAP_AREAS, {
    fetchPolicy: 'cache-only',
  });
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setDisplayLocation(
      location && location.postal && location.city && location.state
        ? `${location.city} ${location.state}, ${location.postal}`
        : ''
    );
  }, [location]);

  const getLocationByCityState = async (param) => {
    const {
      data: { location = {} },
    } = await client.query({
      query: LOCATION,
      variables: param,
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
    });
    const response = location && location.postal ? location : { error: 'Error from query' };
    return response;
  };

  const getAddressFromLabel = async (label) => {
    const strParts = _.split(label, ',');
    if (strParts.length !== 2) {
      return null;
    }
    const strParts2 = _.split(_.trim(strParts[1]), ' ');
    if (strParts2.length !== 2) {
      return null;
    }

    return {
      city: _.trim(strParts[0]),
      state: _.trim(strParts2[0]),
      postal: _.trim(strParts2[1]),
      lat: null,
      lon: null,
    };
  };

  const getLocation = async (postal) => {
    if (!postal) return null;
    if (postal.match(/^\d{5}$/)) {
      if (Array.isArray(hotMarketMapAreas)) {
        const matchedArea = hotMarketMapAreas.find(
          (area) => area.originZipFive === postal.toString()
        );
        if (matchedArea) {
          return {
            city: matchedArea.originCity || '',
            lat: matchedArea.centerLatitude || '',
            lon: matchedArea.centerLongitude || '',
            postal: matchedArea.originZipFive || '',
            state: matchedArea.originState || '',
          };
        }
      }

      const {
        data: { location = {} },
      } = await client.query({
        query: LOCATION,
        variables: { postal },
        errorPolicy: 'ignore',
        fetchPolicy: 'network-only',
      });
      return location;
    }
    return null;
  };

  return isPopover ? (
    <GooglePlacesAutocompletePopover
      isRequired={{}}
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      value={value}
      displayLocation={displayLocation}
      isLoading={isLoading}
      height={height}
      autoSelect={autoSelect}
      onChange={async (val) => {
        if (onChange) onChange(val);
        setValue(val);
        const testPass = !onChangeTest ? true : Boolean(val && onChangeTest && onChangeTest(val));
        if (val && testPass) {
          setIsLoading(true);
          let location = await getAddressFromLabel(val.label);
          if (!location) {
            location = await getLocation(Utils.getZipcode(val));
          }
          if (!location && val.value?.terms?.[0]?.value && val.value?.terms?.[1]?.value) {
            location = await getLocationByCityState({
              city: val.value.terms[0].value,
              state: val.value.terms[1].value,
            });
          }
          setIsLoading(false);
          if (onChangeLocation) onChangeLocation(location);
          if (location && location.postal && location.city && location.state) {
            setDisplayLocation(`${location.city}, ${location.state} ${location.postal}`);
          }
        } else {
          if (onChangeLocation) onChangeLocation(null);
          setDisplayLocation('');
        }
      }}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['us'],
        },
        types: ['(regions)'],
      }}
      preIcon={preIcon}
      placeholder={placeholder}
      popoverProps={popoverProps}
    />
  ) : (
    <GooglePlacesAutocomplete
      isRequired={{}}
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      value={value}
      displayLocation={displayLocation}
      isLoading={isLoading}
      placeholder={placeholder}
      onChange={async (val) => {
        if (onChange) onChange(val);
        setValue(val);
        const testPass = !onChangeTest ? true : Boolean(val && onChangeTest && onChangeTest(val));
        if (val && testPass) {
          setIsLoading(true);
          let location = await getAddressFromLabel(val.label);
          if (!location) {
            location = await getLocation(Utils.getZipcode(val));
          }
          if (!location && val.value?.terms?.[0]?.value && val.value?.terms?.[1]?.value) {
            location = await getLocationByCityState({
              city: val.value.terms[0].value,
              state: val.value.terms[1].value,
            });
          }
          setIsLoading(false);
          if (onChangeLocation) onChangeLocation(location);
          if (location && location.postal && location.city && location.state) {
            setDisplayLocation(`${location.city}, ${location.state} ${location.postal}`);
          }
        } else {
          if (onChangeLocation) onChangeLocation(null);
          setDisplayLocation('');
        }
      }}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['us'],
        },
        types: ['(regions)'],
      }}
    />
  );
};

CustomGooglePlacesAutoComplete.defaultProps = {
  onChange: null,
  autoSelect: false,
  onChangeLocation: null,
  initialValue: undefined,
  onChangeTest: null,
  location: null,
  isPopover: false,
  preIcon: null,
  placeholder: null,
  height: null,
  popoverProps: {},
};

CustomGooglePlacesAutoComplete.propTypes = {
  onChange: PropTypes.func,
  onChangeLocation: PropTypes.func,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.any)]),
  autoSelect: PropTypes.bool,
  onChangeTest: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
  isPopover: PropTypes.bool,
  preIcon: PropTypes.string,
  placeholder: PropTypes.string,
  height: PropTypes.string,
  popoverProps: PropTypes.objectOf(PropTypes.any),
};

export default CustomGooglePlacesAutoComplete;
