import PropTypes from 'prop-types';

export const LatLng = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});

export const AutocompletionRequest = PropTypes.shape({
  bounds: [LatLng, LatLng],
  componentRestrictions: PropTypes.shape({
    country: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
  location: LatLng,
  offset: PropTypes.number,
  radius: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.string),
});

export const GooglePlacesAutocompleteProps = PropTypes.shape({
  apiKey: PropTypes.string,
  autocompletionRequest: AutocompletionRequest,
  displayLocation: PropTypes.string,
  debounce: PropTypes.number,
  minLengthAutocomplete: PropTypes.number,
  onLoadFailed: PropTypes.func,
  withSessionToken: PropTypes.bool,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.shape(PropTypes.any)]),
  autoSelect: PropTypes.bool,
  onChange: PropTypes.func,
  preIcon: PropTypes.string,
  placeholder: PropTypes.string,
  popoverProps: PropTypes.objectOf(PropTypes.any),
});
