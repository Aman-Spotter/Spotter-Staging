import React, { useEffect, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@googlemaps/js-api-loader';
import _ from 'lodash';
import { STATE } from 'utils/Constants';
import { GooglePlacesAutocompleteProps } from './types';
import * as S from './styles';
import AppPopover from '../AppPopover';

const autocompletionRequestBuilder = (autocompletionRequest, input, sessionToken) => {
  const { bounds, location, ...rest } = autocompletionRequest;

  const res = {
    input,
    ...rest,
  };

  if (sessionToken) {
    res.sessionToken = sessionToken;
  }

  if (bounds) {
    res.bounds = new window.google.maps.LatLngBounds(...bounds);
  }

  if (location) {
    res.location = new window.google.maps.LatLng(location);
  }

  return res;
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus();
    }
  };

  return [htmlElRef, setFocus];
};

const GooglePlacesAutocompletePopover = ({
  apiKey = '',
  autocompletionRequest = {},
  displayLocation,
  debounce = 300,
  minLengthAutocomplete = 0,
  onLoadFailed = console.error,
  withSessionToken = false,
  value,
  autoSelect,
  onChange,
  isLoading = false,
  preIcon,
  placeholder,
  height,
  popoverProps = {},
}) => {
  const [placesService, setPlacesService] = useState(undefined);
  const [sessionToken, setSessionToken] = useState(undefined);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(isLoading);
  const [places, setPlaces] = useState([]);
  const [selPlace, setSelPlace] = useState(null);
  const [inputRef, setInputFocus] = useFocus();

  /* eslint-disable consistent-return */
  const debounced = useDebouncedCallback((input, cb) => {
    if (!placesService || input.length === 0 || input.length < minLengthAutocomplete) {
      return cb([]);
    }

    const autocompletionReq = { ...autocompletionRequest };
    setLoading(true);

    placesService.getPlacePredictions(
      autocompletionRequestBuilder(autocompletionReq, input, withSessionToken && sessionToken),
      (suggestions) => {
        setLoading(false);
        const matches = (suggestions || []).map((suggestion) => ({
          label: suggestion.description.split(',').slice(0, -1).join(','),
          value: {
            ...suggestion,
            description: suggestion.description.split(',').slice(0, -1).join(','),
          },
        }));
        cb(matches);
      }
    );
  }, debounce);

  const initializeService = () => {
    if (!window.google)
      throw new Error('[react-google-places-autocomplete]: Google script not loaded');
    if (!window.google.maps)
      throw new Error('[react-google-places-autocomplete]: Google maps script not loaded');
    if (!window.google.maps.places)
      throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded');

    setPlacesService(new window.google.maps.places.AutocompleteService());
    setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
  };

  const onInputChange = (value, autoClose = false) => {
    setInputValue(value);
    // avoid auto select state
    if (_.filter(STATE, (s) => s.value === value.toUpperCase()).length >= 1) {
      return;
    }
    debounced(value, (pls) => {
      setPlaces(pls);
      let newSelPlace = null;
      // handle 5 digit zip input

      if (value.match(/^\d{5}$/) && value.length === 5) {
        if (pls.length > 0) {
          [newSelPlace] = pls;
        } else {
          newSelPlace = {
            label: value,
            value: {
              description: value,
              structured_formatting: {
                main_text: value,
              },
            },
          };
        }
        onChange(newSelPlace);
      }
      // Whether select suggestion autometically
      // If user type California and item in list has California, it set California
      if (autoSelect) {
        if (value.match(/^\d{5}$/) && pls.length > 0) {
          [newSelPlace] = pls;
        } else {
          const match = pls.filter(
            (pl) =>
              pl.label.toLowerCase().replace(/\s+|,/g, '') ===
              value.toLowerCase().replace(/\s+|,/g, '')
          );
          if (match.length > 0) {
            [newSelPlace] = match;
          } else if (pls.length > 0 && autoClose) {
            // If there are no match, but has some places, it might be because of the shortened location name.
            [newSelPlace] = pls;
          }
        }
      }
      if (newSelPlace) {
        if (
          !selPlace ||
          (selPlace &&
            selPlace.value.structured_formatting.main_text !==
              newSelPlace.value.structured_formatting.main_text)
        ) {
          setSelPlace(newSelPlace);
          onChange(newSelPlace);
        }
      }
    });
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const init = async () => {
      try {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
          await new Loader({ apiKey, ...{ libraries: ['places'] } }).load();
        }
        initializeService();
      } catch (error) {
        onLoadFailed(error);
      }
    };

    if (apiKey) init();
    else initializeService();
  }, []);

  useEffect(() => {
    if (value) {
      if (value.label) {
        if (places.length === 0) setPlaces([value]);
        if (selPlace && selPlace.label === value.label) return;
        setSelPlace(value);
      }
    } else {
      setPlaces([]);
      setSelPlace(null);
      setInputValue('');
    }
  }, [value]);

  return (
    <AppPopover
      fitWidth
      padding="10px"
      fillBgColor="#606873"
      filled={!!selPlace}
      closeIcon={false}
      icon={<img src={preIcon} alt="map" />}
      noPopover={places.length === 0 || !!selPlace}
      onClickHeader={() => setInputFocus()}
      isEdit
      height={height}
      handleOnClickOutside={() => {
        if (!selPlace) {
          let city = '';
          let state = '';
          const { value } = inputRef.current;
          const cityState = value.split(',');
          if (cityState.length >= 2) {
            [city, state] = cityState;
          } else {
            [city] = cityState;
            state = 'USA';
          }
          const newSelPlace = {
            label: value,
            value: {
              description: value,
              structured_formatting: {
                main_text: value,
              },
              terms: [{ value: city }, { value: state }],
            },
          };
          setSelPlace(newSelPlace);
          onChange(newSelPlace);
          // setInputFocus();
        }
      }}
      content={
        <S.Overlay>
          {places.length === 0 && <S.Option>No matches</S.Option>}
          {places.map((place) => (
            <S.Option
              color="#ffffff"
              onClick={(e) => {
                e.stopPropagation();
                setSelPlace(place);
                onChange(place);
                setInputFocus();
              }}
              key={place.value.place_id}
              bgColor="#77808c"
            >
              {place.label}
            </S.Option>
          ))}
        </S.Overlay>
      }
      header={
        <S.FormInput
          className="google-place-input"
          defaultValue={displayLocation}
          color="#ffffff"
          fontSize="14px"
          value={selPlace || displayLocation ? displayLocation || selPlace.label : inputValue}
          onClick={(evt) => {
            evt.target.value = '';
            if (selPlace) {
              setInputValue('');
              setSelPlace(null);
              setPlaces([]);
              onChange(''); // this will unset displayLocation
            } else {
              onChange(''); // this will unset displayLocation, if displayLoaction was set by initialDisplayLoction, selPlace will have null
            }
          }}
          onChange={(evt) => onInputChange(evt.target.value)}
          placeholder={placeholder}
          ref={inputRef}
        />
      }
      {...popoverProps}
    />
  );
};

GooglePlacesAutocompletePopover.propTypes = GooglePlacesAutocompleteProps;

export default GooglePlacesAutocompletePopover;
