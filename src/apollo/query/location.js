import { gql } from '@apollo/client';

export const LOCATION = gql`
  query LOCATION($postal: String, $city: String, $state: String, $lat: Float, $lon: Float) {
    location(postal: $postal, city: $city, state: $state, lat: $lat, lon: $lon) {
      lat
      lon
      state
      city
      postal
    }
  }
`;
