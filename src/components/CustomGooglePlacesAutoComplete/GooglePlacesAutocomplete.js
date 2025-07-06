import React, { useEffect, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@googlemaps/js-api-loader';
import _ from 'lodash';
import { STATE } from 'utils/Constants';
import { GooglePlacesAutocompleteProps } from './types';
import * as S from './styles';

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

const GooglePlacesAutocomplete = ({
  apiKey = '',
  autocompletionRequest = {},
  displayLocation,
  debounce = 300,
  minLengthAutocomplete = 0,
  onLoadFailed = console.error,
  withSessionToken = false,
  value,
  onChange,
  isLoading = false,
  placeholder,
}) => {
  const [placesService, setPlacesService] = useState(undefined);
  const [sessionToken, setSessionToken] = useState(undefined);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(isLoading);
  const [places, setPlaces] = useState([]);
  const [open, setOpen] = useState(false);
  const [selPlace, setSelPlace] = useState(null);
  const closePopup = () => {
    window.removeEventListener('click', closePopup);
    setOpen(false);
  };

  const [inputRef, setInputFocus] = useFocus();

  const bindClickListener = () => {
    setTimeout(() => {
      window.addEventListener('click', closePopup);
    }, 100);
  };

  /* eslint-disable consistent-return */
  const debounced = useDebouncedCallback((input, cb) => {
    if (!placesService || input.length === 0 || input.length < minLengthAutocomplete) {
      setOpen(false);
      return cb([]);
    }

    const autocompletionReq = { ...autocompletionRequest };
    setLoading(true);

    placesService.getPlacePredictions(
      autocompletionRequestBuilder(autocompletionReq, input, withSessionToken && sessionToken),
      (suggestions) => {
        setLoading(false);
        setOpen(true);

        const matches = (suggestions || []).map((suggestion) => ({
          label: suggestion.description.split(',').slice(0, -1).join(','),
          value: {
            ...suggestion,
            description: suggestion.description.split(',').slice(0, -1).join(','),
          },
        }));
        bindClickListener();
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
        closePopup();
      }

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
      if (newSelPlace) {
        if (
          !selPlace ||
          (selPlace &&
            selPlace.value.structured_formatting.main_text !==
              newSelPlace.value.structured_formatting.main_text)
        ) {
          setSelPlace(newSelPlace);
        }
      }

      if (autoClose) {
        setOpen(false);
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
    <S.AutoComplete className="google-place-input">
      <S.FormInput
        defaultValue={displayLocation}
        placeholderColor="#707070"
        value={selPlace || displayLocation ? displayLocation || selPlace.label : inputValue}
        onClick={() => {
          if (selPlace) {
            setInputValue('');
            setSelPlace(null);
            setPlaces([]);
            onChange(''); // this will unset displayLocation
          } else {
            setOpen(places.length > 0);
            onChange(''); // this will unset displayLocation, if displayLoaction was set by initialDisplayLoction, selPlace will have null
            bindClickListener();
          }
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Backspace' && !loading) {
            inputRef.current.click();
          }
        }}
        onChange={(evt) => onInputChange(evt.target.value)}
        placeholder={placeholder || 'zip code or city, state'}
        ref={inputRef}
      />
      {loading && (
        <S.SpinContainer>
          <S.SpinIcon />
        </S.SpinContainer>
      )}
      {open && (
        <S.OptionContainer>
          {places.length === 0 && <S.Option>No matches</S.Option>}
          {places.map((place) => (
            <S.Option
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                setSelPlace(place);
                onChange(place);
                setInputFocus();
                window.removeEventListener('click', closePopup);
              }}
              key={place.value.place_id}
            >
              {place.label}
            </S.Option>
          ))}
        </S.OptionContainer>
      )}
    </S.AutoComplete>
  );
};

GooglePlacesAutocomplete.propTypes = GooglePlacesAutocompleteProps;

export default GooglePlacesAutocomplete;
