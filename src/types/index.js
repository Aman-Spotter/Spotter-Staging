import PropTypes from 'prop-types';
import {
  LOAD_ASSIGNMENT_STATUS,
  DRIVER_TYPE,
  TRAILER_TYPE,
  TRUCK_MAKE,
  ATTRIBUTE_TYPE,
  TRUCK_POST_STATUS,
  SERVICE_TYPE,
  DRIVER_STRENGTH,
} from 'utils/Constants';

export const brokerageType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  mcNumber: PropTypes.string.isRequired,
  dotNumber: PropTypes.string,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  state: PropTypes.string,
  creditScore: PropTypes.string,
  daysToPay: PropTypes.number,
});

export const carrierType = PropTypes.shape({
  modifiedDt: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  ownerFirstName: PropTypes.string.isRequired,
  ownerLastName: PropTypes.string.isRequired,
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  phoneExt: PropTypes.string,
  email: PropTypes.string.isRequired,
  eldProvider: PropTypes.string,
  providerToken: PropTypes.string,
  logo: PropTypes.string,
});

export const dispatcherType = PropTypes.shape({
  modifiedDt: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string,
  phoneExt: PropTypes.string,
  email: PropTypes.string.isRequired,
  carrier: carrierType.isRequired,
});

export const brokerType = PropTypes.shape({
  modifiedDt: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  brokerage: brokerageType.isRequired,
  phone: PropTypes.string,
  phoneExt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

export const driverTypeType = PropTypes.oneOf(Object.values(DRIVER_TYPE));

export const trailerTypeType = PropTypes.oneOf(Object.values(TRAILER_TYPE));

export const truckMakeType = PropTypes.oneOfType([
  PropTypes.oneOf(Object.values(TRUCK_MAKE)),
  PropTypes.string,
]);

export const attributeType = PropTypes.arrayOf(PropTypes.oneOf(Object.values(ATTRIBUTE_TYPE)));

export const driverStrengthType = PropTypes.oneOfType([
  PropTypes.oneOf(Object.values(DRIVER_STRENGTH)),
  PropTypes.arrayOf(PropTypes.oneOf(Object.values(DRIVER_STRENGTH))),
]);

export const truckPostStatusType = PropTypes.oneOf(Object.values(TRUCK_POST_STATUS));

export const truckPostType = PropTypes.shape({
  modifiedDt: PropTypes.string,
  createdDt: PropTypes.string,
  id: PropTypes.string,
  minMiles: PropTypes.number,
  maxMiles: PropTypes.number,
  maxDeadhead: PropTypes.number,
  maxWeight: PropTypes.number,
  quoteWind: PropTypes.bool.isRequired,
  quoteSnow: PropTypes.bool.isRequired,
  quoteHurricane: PropTypes.bool.isRequired,
  status: truckPostStatusType,
  qdphOffset: PropTypes.number,
  queuePosition: PropTypes.number,
  srcZip3: PropTypes.string,
  maxDeadheadRounded: PropTypes.number,
  zip3Deadhead: PropTypes.string,
});

export const truckType = PropTypes.shape({
  modifiedDt: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dispatcher: dispatcherType.isRequired,
  name: PropTypes.string.isRequired,
  currentZip5: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  driverType: driverTypeType,
  driverZip5: PropTypes.string,
  driverStrength: driverStrengthType,
  driverWeeksout: PropTypes.number,
  trailerType: trailerTypeType,
  truckMake: truckMakeType,
  truckYear: PropTypes.string,
  attributes: attributeType,
  isDeleted: PropTypes.bool.isRequired,
  truckPost: truckPostType,
  truckEldStatusId: PropTypes.string,
  driverEldStatusId: PropTypes.string,
});

export const assignedEldType = PropTypes.shape({
  trucks: PropTypes.arrayOf(PropTypes.string),
  drivers: PropTypes.arrayOf(PropTypes.string),
});

export const loadAssignmentType = PropTypes.shape({
  modifiedDt: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  pk: PropTypes.number,
  price: PropTypes.string.isRequired,
  truckSearchData: PropTypes.string.isRequired,
  truckPostData: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(LOAD_ASSIGNMENT_STATUS)).isRequired,
  acceptRejectTime: PropTypes.string,
  rejectionReason: PropTypes.string.isRequired,
  broker: brokerType.isRequired,
  dispatcher: dispatcherType.isRequired,
});

export const bidType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  bidAmount: PropTypes.number.isRequired,
  bidRef: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  carrierId: PropTypes.number.isRequired,
  loadBoard: PropTypes.string.isRequired,
  dispatcherId: PropTypes.number.isRequired,
  truckPost: truckPostType.isRequired,
  load: PropTypes.string,
});

export const userType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  lastLogin: PropTypes.string,
  // isSuperuser: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isStaff: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  dateJoined: PropTypes.string.isRequired,
  broker: brokerType,
  dispatcher: dispatcherType,
});

export const truckSearchType = PropTypes.shape({
  modifiedDt: PropTypes.string,
  createdDt: PropTypes.string,
  id: PropTypes.string,
  broker: brokerType,
  trailerType: trailerTypeType,
  commodityType: PropTypes.string,
  driverType: driverTypeType,
  weight: PropTypes.number,
  pickupStyle: PropTypes.oneOf([SERVICE_TYPE.fcfs, SERVICE_TYPE.appt]).isRequired,
  pickupStart: PropTypes.string,
  pickupEnd: PropTypes.string,
  pickupDays: PropTypes.string.isRequired,
  dropoffStyle: PropTypes.oneOf([SERVICE_TYPE.fcfs, SERVICE_TYPE.appt]).isRequired,
  dropoffStart: PropTypes.string,
  dropoffEnd: PropTypes.string,
  dropoffDays: PropTypes.string.isRequired,
  srcZip5: PropTypes.string.isRequired,
  srcCity: PropTypes.string,
  srcState: PropTypes.string,
  dstZip5: PropTypes.string.isRequired,
  dstCity: PropTypes.string,
  dstState: PropTypes.string,
  isGuest: PropTypes.bool,
  loadRef: PropTypes.string,
  specialInstruction: PropTypes.string,
  zip3DstMarket: PropTypes.string,
});

export const autoFillType = PropTypes.shape({
  initialData: PropTypes.objectOf(PropTypes.any),
  autofillPuLocation: PropTypes.objectOf(PropTypes.any),
  autofillDoLocation: PropTypes.objectOf(PropTypes.any),
});

export const matchedTruckType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  truckPostId: PropTypes.string.isRequired,
  zip3DstMarket: PropTypes.string.isRequired,
  carrierId: PropTypes.string.isRequired,
  mcNumber: PropTypes.string.isRequired,
  carrierName: PropTypes.string.isRequired,
  deadhead: PropTypes.string.isRequired,
  calculatedTruckPrice: PropTypes.number.isRequired,
});

export const truckPostRowType = PropTypes.shape({
  index: PropTypes.number,
  id: PropTypes.number,
  carrierName: PropTypes.string,
  deadhead: PropTypes.number,
  safety: PropTypes.string,
  acceptance: PropTypes.string,
  price: PropTypes.string,
});

export const templateType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  markets: PropTypes.string.isRequired,
  competitiveness: PropTypes.number.isRequired,
  minMiles: PropTypes.number.isRequired,
  maxMiles: PropTypes.number.isRequired,
  maxDeadhead: PropTypes.number.isRequired,
  dispatcher: PropTypes.string.isRequired,
  createdDt: PropTypes.string.isRequired,
  modifiedDt: PropTypes.string.isRequired,
  favorite: PropTypes.bool,
});

export const rpmFilterItemType = PropTypes.shape({
  color: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testPriceIncluded: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
});

export const tosParagraph = PropTypes.shape({
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
});

export const tosAccordionType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  class: PropTypes.string,
  text: PropTypes.string.isRequired,
  children: PropTypes.arrayOf([PropTypes.any]),
});
