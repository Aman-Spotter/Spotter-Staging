import ReactDOM from 'react-dom';
import _ from 'lodash';
import parser from 'parse-address';
import zipcodes from 'zipcodes';
import * as moment from 'moment-timezone';
import hotMarketAreaZipCodes from 'components/HotMarketMap/datasource/hotMarketAreasZipCodes.json';
import { LOCATION } from 'apollo/query';

import {
  TIMEZONE_MAP,
  ZIPCODE_TIMEZONE,
  MARKETAREA_ZIPCODE,
  HOTMARKET_MAP_DATA,
  BIG_CITIES,
  ZIP_ZONES,
  STATE,
} from './Constants';

export const lookupTimezone = (postalCode = '') => {
  if (!postalCode) return undefined;
  if (Object.prototype.hasOwnProperty.call(ZIPCODE_TIMEZONE, postalCode.substring(0, 3))) {
    const timezoneIndex = ZIPCODE_TIMEZONE[postalCode.substring(0, 3)];
    if (Object.prototype.hasOwnProperty.call(TIMEZONE_MAP, timezoneIndex)) {
      return TIMEZONE_MAP[timezoneIndex];
    }
  } else {
    const alternativePostalCode = _.find(
      Object.keys(ZIPCODE_TIMEZONE),
      (item) => item.substring(0, 3) === postalCode.substring(0, 3)
    );
    const timezoneIndex = ZIPCODE_TIMEZONE[alternativePostalCode];
    return TIMEZONE_MAP[timezoneIndex];
  }
  return undefined;
};

export const getTimezone = (postalCode = '') => {
  const timezone = lookupTimezone(postalCode);
  return timezone || TIMEZONE_MAP[0];
};

export const localizeDT = (postalCode, dt = moment()) => {
  const localDT = dt.clone().tz(getTimezone(postalCode));
  return localDT;
};

export const replaceTimezoneOfDT = (dt, tz) => {
  const datestring = dt.format('YYYY-MM-DD;HH:mm:ss').toString();
  const d = datestring.split(';')[0];
  const t = datestring.split(';')[1];
  const localDT = moment.tz(`${d} ${t}`, tz);
  return localDT;
};

export const localizeDTKeepTime = (postalCode, input = moment()) => {
  const TZ = getTimezone(postalCode);
  return replaceTimezoneOfDT(input, TZ);
};

export const roundTimeUp = (time) => {
  const increment = Math.floor(1 + moment(time).minute() / 15) * 15 - moment(time).minute();
  const dateTime = moment(time).add(increment, 'minutes');
  return dateTime;
};

export const convertDeviceTime = (dt) =>
  new Date(`${dt.format('YYYY-MM-DDTHH:mm:ss')}${moment().format('Z')}`);

export const next15Minutes = (time = new Date()) => {
  const next15Min = moment(time).clone().add(15, 'minutes');
  next15Min.minutes(Math.floor(next15Min.minutes() / 15) * 15);
  return next15Min;
};

export const measureElement = (element) => {
  const containerStyle = {
    display: 'inline-block',
    position: 'absolute',
    visibility: 'hidden',
    zIndex: -1,
  };
  // Creates the hidden div appended to the document body
  const container = document.createElement('div');
  container.style = containerStyle;
  document.body.appendChild(container);

  // Renders the React element into the hidden div
  ReactDOM.render(element, container);

  // Gets the element size
  const height = container.clientHeight;
  const width = container.clientWidth;

  // Removes the element and its wrapper from the document
  ReactDOM.unmountComponentAtNode(container);
  container.parentNode.removeChild(container);
  return { height, width };
};

export const defaultOrderByFn = (arr, funcs, dirs) =>
  [...arr].sort((rowA, rowB) => {
    const funcsInverted = _.reverse(funcs);
    const dirsInverted = _.reverse(dirs);
    for (let i = 0; i < funcsInverted.length; i += 1) {
      const sortFn = funcsInverted[i];
      const desc = dirsInverted[i] === false || dirsInverted[i] === 'desc';
      const sortInt = sortFn(rowA, rowB);
      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt;
      }
    }
    return dirsInverted[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
  });

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

export const trampoline =
  (fn) =>
  (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };

export const isValidDate = (date) => {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (Number.isNaN(date.getTime())) {
      return false;
    }
    return true;
  }
  return false;
};

export const marketAreaZipCode = (marketArea = '') => {
  if (Object.prototype.hasOwnProperty.call(MARKETAREA_ZIPCODE, marketArea)) {
    return MARKETAREA_ZIPCODE[marketArea];
  }
  return undefined;
};

export const sortFunc = (data, key, direction, type) => {
  if (type === 'string') {
    return data.sort(
      (a, b) => `${a[key]}`.localeCompare(`${b[key]}`) * (direction === 'asc' ? 1 : -1)
    );
  }
  if (type === 'date') {
    return data.sort((a, b) => {
      const aa = new Date(a[key]);
      const bb = new Date(b[key]);
      return (aa - bb) * (direction === 'asc' ? 1 : -1);
    });
  }
  return data.sort(
    (a, b) => (parseFloat(a[key]) - parseFloat(b[key])) * (direction === 'asc' ? 1 : -1)
  );
};

export const filterTrucksByDate = (truckMapMarketAreas, datesInput, time) => {
  if (!Array.isArray(truckMapMarketAreas)) {
    return [truckMapMarketAreas, 0];
  }

  const dates = time === 'now' ? [moment().format('YYYY-MM-DD')] : [...datesInput];

  const truckMapMarketAreasFiltered = _.map(truckMapMarketAreas, (marketArea) => {
    const zipcode = marketAreaZipCode(marketArea.id);
    const marketAreaTruckList = _.reduce(
      dates,
      (prev, date) => [
        ...prev,
        ..._.map(
          _.entries(JSON.parse(marketArea.postedTrucksReadyBy)),
          ([readyByDate, puBeforeDates]) => {
            let currentTruckReadyBydate;
            if (readyByDate === 'Ready') {
              currentTruckReadyBydate = moment().subtract(2, 'years');
            } else {
              currentTruckReadyBydate = readyByDate;
            }
            const localizedReadyBy = localizeDT(zipcode, moment(currentTruckReadyBydate));
            const localizedReadyByDate = localizedReadyBy.format('YYYY-MM-DD');

            return _.entries(puBeforeDates).reduce((localTrucksAgg, [puBefore, LocalTruckList]) => {
              let currentPuBeforeDate;
              if (puBefore === 'Nolimit') {
                currentPuBeforeDate = moment().add(4, 'years');
              } else {
                currentPuBeforeDate = puBefore;
              }
              const localizedPuBefore = localizeDT(zipcode, moment(currentPuBeforeDate));
              const localizedPuBeforeDate = localizedPuBefore.format('YYYY-MM-DD');

              if (
                moment(date).isBetween(localizedReadyByDate, localizedPuBeforeDate, undefined, '[]')
              ) {
                return [...localTrucksAgg, ...LocalTruckList];
              }
              return [...localTrucksAgg];
            }, []);
          }
        ),
      ],
      []
    );

    const truckListUniq = _.uniq(_.flatten(marketAreaTruckList));

    const destinationsMap = JSON.parse(marketArea.destinationsMap);
    const destinationsMapFiltered = _.mapValues(destinationsMap, (destinationTruckList) =>
      _.intersection(truckListUniq, destinationTruckList)
    );

    return {
      ...marketArea,
      postedTrucksCount: truckListUniq.length,
      truckList: truckListUniq,
      destinationsMap: destinationsMapFiltered,
    };
  });
  const truckCount = _.uniq(
    _.reduce(
      truckMapMarketAreasFiltered,
      (prev, marketArea) => [...prev, ...marketArea.truckList],
      []
    )
  ).length;
  return [truckMapMarketAreasFiltered, truckCount];
};

export const cityToZip = (city, code, fallbackZip) => {
  if (city) {
    const l = zipcodes.lookupByName(city, code);
    if (l && l.length > 0 && l[0].zip) {
      return l[0].zip;
    }
  }
  return fallbackZip;
};

export const getZipcode = (value) => {
  try {
    if (!value) return null;
    if (typeof value === 'string') return value;

    if (value.postalCode) return value.postalCode;
    if (
      value &&
      value.value &&
      value.value.structured_formatting &&
      value.value.structured_formatting.main_text.match(/^\d+$/)
    )
      return value.value.structured_formatting.main_text;

    // Adding the static street because the parseLocation was working incorrectly without any stree
    const addressParser = parser.parseLocation(`street ${value.label}`);
    const zipcode = addressParser.zip
      ? addressParser.zip
      : addressParser.number
      ? addressParser.number
      : cityToZip(
          value.value?.terms[0].value,
          value.value?.terms[1].value,
          value.value?.structured_formatting.main_text
        );
    return zipcode;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const formatMcNumber = (mcNumber = '') => {
  if (!mcNumber) return '';
  if (/^mc-/i.exec(mcNumber)) {
    return `MC-${mcNumber.slice(3)}`;
  }
  return `MC-${mcNumber}`;
};

export const getHotmarketMapDataFromZip3 = (zip3) =>
  HOTMARKET_MAP_DATA.filter((mkt) => mkt.zip3 === zip3)[0];

export const checkNotBigCities = (data) => {
  if (data.label.match(/\d{5}$/)) return true;
  const mainText = data.value.structured_formatting.main_text;
  if (_.indexOf(BIG_CITIES, mainText) >= 0) {
    return false;
  }
  return true;
};

export const getMarketAreaIDfromZip5 = (zip5) => _.get(hotMarketAreaZipCodes, zip5.slice(0, 3));

export const formatDays = (days = []) => {
  if (days.length > 2) {
    return `${days
      .slice(0, 2)
      .map((d) => moment(d).format('MMM DD'))
      .join(', ')}   (${days.length - 2} more)`;
  }

  return days.map((d) => moment(d).format('MMM DD')).join(', ');
};

export const getDisabledDays = (from = moment().format('YYYY-MM-DD'), days = []) => {
  if (moment(from).isSameOrAfter(moment(), 'day')) return [];

  const disabledDays = [];
  const d = moment(from).startOf('day');

  while (d.isBefore(moment(), 'day')) {
    if (days.findIndex((dd) => dd === d.format('YYYY-MM-DD')) === -1) {
      disabledDays.push(d.format('YYYY-MM-DD'));
    }
    d.add(1, 'day');
  }

  return disabledDays;
};

export const getRandomIndex = (values, property) => {
  const total = _.reduce(
    values,
    (sum, curr) => sum + (property ? curr[property] : curr) * (property ? curr[property] : curr),
    0
  );
  const random = Math.ceil(Math.random() * total);
  let sum = 0;
  let result = 0;
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    const next = sum + (property ? value[property] : value) * (property ? value[property] : value);
    if (random > sum && random <= next) {
      result = index;
      break;
    }
    sum = next;
  }
  return result;
};

export const getSelectedMarkets = async (hotMarketAreas, noGoMarkets, dstMarket, client) => {
  const hotMarkets = hotMarketAreas.map((hma) => hma.marketAreaId);
  if (!dstMarket) return hotMarkets.filter((hma) => noGoMarkets.indexOf(hma) === -1);

  // check for city, state
  const cityState = dstMarket.split(',');
  if (cityState.length === 2) {
    const city = cityState[0].trim();
    const state = cityState[1].trim();

    const {
      data: { location = {} },
    } = await client.query({
      query: LOCATION,
      variables: { city, state },
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
    });
    if (location && location.postal) {
      return [getMarketAreaIDfromZip5(location.postal)];
    }
  } else {
    let states = [];
    const zoneRegex = new RegExp(`^(Z[0-9])+$`, 'i');
    const stateRegex = new RegExp(`^(${STATE.map((state) => state.value).join('|')})+$`, 'i');
    if (zoneRegex.exec(dstMarket)) {
      for (let i = 0; i < dstMarket.length - 1; i += 2) {
        states = [...states, ...ZIP_ZONES[dstMarket.slice(i, i + 2).toUpperCase()]];
      }
    }
    if (stateRegex.exec(dstMarket)) {
      for (let i = 0; i < dstMarket.length - 1; i += 2) {
        states.push(dstMarket.slice(i, i + 2).toUpperCase());
      }
    }
    return states
      .map((st) =>
        hotMarkets.reduce((mkts, mkt) => (mkt.indexOf(st) === 0 ? [...mkts, mkt] : mkts), [])
      )
      .flat();
  }
  return [];
};
