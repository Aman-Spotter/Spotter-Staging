import styled from 'styled-components';
import { Form } from 'formik';
import { QuestionCircle } from '@styled-icons/bootstrap';
import { FaChevronDown } from 'react-icons/fa';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  svg {
    width: 100%;
  }

  svg:focus {
    outline: none;
  }

  svg rect {
    pointer-events: none;
  }
`;

export const TruckMapWrapper = styled.div`
  position: relative;
  height: ${(props) => (props.guestMode ? '80vw' : 'calc(100% - 80px)')};
  width: ${(props) => (props.guestMode ? '100%' : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  > svg {
    height: 112%;
    &:focus {
      outline: none;
    }
    & rect {
      pointer-events: auto;
    }
  }
`;

export const MarketHotnessMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props.legendVertical ? 'row' : 'column')};
  align-items: center;
  overflow: hidden;

  > svg {
    height: 112%;
    &:focus {
      outline: none;
    }
    & rect {
      pointer-events: auto;
    }
  }
`;

export const Heading = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 13px;
  font-weight: normal;
  display: inline;
`;

export const TruckMapHeader = styled.div`
  position: absolute;
  top: 10px;
  left: 15px;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 17px;
  font-weight: normal;
  display: inline;
`;

export const FooterLeft = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
  font-size: 13px;
  font-weight: normal;
  padding: 10px;
`;

export const FooterCenter = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  font-size: 13px;
  font-weight: normal;
  padding: 10px;
`;

export const FooterRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: black;
  font-size: 13px;
  font-weight: normal;
  padding: 10px;
`;

export const Legend = styled.div`
  background-color: ${(props) => props.theme.secondaryBgColor};
  border-radius: 5px;
  padding: 10px;
  min-width: 95px;
`;

export const LegendHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;

  > .react-toggle .react-toggle-track {
    height: 12px;
    width: 25px;
  }

  > .react-toggle .react-toggle-thumb {
    top: 0px;
    height: 12px;
    width: 12px;
  }

  > .react-toggle--checked .react-toggle-thumb {
    left: 15px;
  }
`;

export const LegendTitle = styled.h4`
  color: ${(props) => props.theme.primaryTextColor};
`;

export const LegendRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: between;
  padding-bottom: 4px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const LegendIconSolidColor = styled.span`
  min-height: 14px;
  min-width: 14px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
`;

export const MarketName = styled.span`
  color: ${(props) => props.theme.primaryButtonBgColor};
  font-weight: bold;
  display: block;
`;

export const StatusCell = styled.p`
  font-family: 'Open Sans Regular';
  font-size: 13px;
  color: ${({ color }) => color};
  display: inline;
  font-weight: normal;
`;

export const OnOffToggleLabel = styled.div`
  font-size: 8px;
  color: #fff;
  align-self: center;
  justify-self: center;
  height: 100%;
  line-height: 10px;
  text-align: center;
`;

export const ResetBtn = styled.button`
  background-color: #1c2227;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  min-width: 95px;
`;

export const Tip = styled.div`
  color: #9b9b9b;
  opactiy: 1;
  transition: opacity 1s;
  display: flex;
  align-items: center;
  gap: 5px;
  span {
    color: #008080;
  }
  button {
    background-color: transparent;
    padding: 5px 8px;
    border-radius: 5px;
    color: #9b9b9b;
    cursor: pointer;
    border: none;
    outline: none;
    font-style: italic;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

export const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LabelFont = styled.div`
  font-size: 13px;
  color: white;
  margin-right: 20px;
  label {
    display: flex;
    align-items: center;
  }
  input[type='radio'] {
    position: relative;
    cursor: pointer;
    width: 15px;
    height: 15px;
    background: transparent;
    border: 2px solid #ffffff;
    &:checked {
      border: none;
      background: ${({ theme }) => theme.highlightColor};
      color: #ffffff;
      &::before {
        position: absolute;
        left: -5.2px;
        top: 50%;
        height: 40%;
        width: 3px;
        background-color: #ffffff;
        content: '';
        transform: translateX(10px) rotate(-45deg);
        transform-origin: left bottom;
      }
      &::after {
        position: absolute;
        left: -5px;
        bottom: 1px;
        height: 3px;
        width: 80%;
        background-color: #ffffff;
        content: '';
        transform: translateX(10px) rotate(-45deg);
        transform-origin: left bottom;
      }
    }
  }
`;

export const MultiDateContainer = styled.div`
  width: ${(props) => (props.singleRow ? '150px' : '120px')};
  z-index: 0;

  & {
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(
        .DayPicker-Day--outside
      ) {
      background-color: #f0f8ff !important;
      color: #4a90e2;
    }
    .DayPicker-Day {
      border-radius: 0 !important;
    }
    .DayPicker-Day--start {
      border-top-left-radius: 50% !important;
      border-bottom-left-radius: 50% !important;
    }
    .DayPicker-Day--end {
      border-top-right-radius: 50% !important;
      border-bottom-right-radius: 50% !important;
    }
    .DayPickerInput-Overlay {
      width: 150px;

      @media screen and (max-width: 768px) {
        width: 150px;
      }
    }
    .InputFromTo-to .DayPickerInput-Overlay {
    }
    .DayPickerInput {
      svg {
        color: #ffffff;
        margin-left: 5px;
      }
      width: 100%;
      input {
        border-radius: 5px;
        background-color: #4b5159 !important;
        color: #ffffff !important;
        padding-left: ${({ icon }) => icon && '10px'};
        &::placeholder {
          color: #ffffff;
        }
      }
    }
    .DayPicker {
      font-size: 8.4px;
    }
  }
`;

export const HeaderWrapper = styled(Form)`
  background-color: #0d1e2d;
  width: 100%;
  height: 90px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  @media screen and (max-width: 768px) {
    pointer-events: all;
    padding: 5px 7px;
    align-items: start;
    height: 70px;
  }
`;

export const MarketHotnessHeader = styled.div`
  background-color: #0d1e2d;
  width: 100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  position: relative;
  @media screen and (max-width: 768px) {
    pointer-events: all;
    padding: 5px 7px;
    align-items: start;
    height: 70px;
  }
`;

export const MarketContent = styled.div`
  display: flex;
  width: auto;
  flex-direction: row;
  justify-content: flex-start;
  height: auto;
  position: relative;
  padding-top: 30px;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  svg g rect {
    width: 0 !important;
  }
`;

export const AvailableWrapper = styled.div`
  text-align: center;
  color: white;
  font-size: 24px;
  font-family: 'Open Sans Regular';
  font-weight: ${(props) => (props.isMobile ? '550' : 'normal')};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  flex: 1 1 60px;

  & > div:first-child {
    flex: 0 0 325px;
    text-align: left;
    white-space: nowrap;
  }
  & > .date-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    flex: 0 0 150px;
    & > div {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 0px;
    width: 100%;
    & > .date-filter {
      flex: 1;
      justify-content: right;
    }
    & > div:first-child {
      flex: 1;
      width: 100%;
    }
  }
`;

export const MarketHotnessTitle = styled.div`
  width: 300px;
  white-space: nowrap;
  text-align: center;
  color: #f5f5f7;
  font-size: 22px;
  font-family: 'Open Sans Regular';
  font-weight: ${(props) => (props.isMobile ? '550' : 'normal')};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  flex: 1 1 20px;
  position: absolute;
  top: 0;
  left: calc(50% - 80px);

  .rw-dropdown-list {
    max-width: 65px;
  }

  .rw-widget {
    border: none;
    color: #212529;
    font-size: 1em;
    font-family: inherit;
    outline: none;
    position: relative;
  }

  .rw-widget-picker {
    display: grid;
    overflow: hidden;
    min-height: 38px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    grid-template: 1fr/1fr 1.9em;
    width: 100%;
  }

  .rw-dropdown-list.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container,
  .jhRfBI .rw-multiselect.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container {
    max-width: 68px !important;
    background-color: #04283c;
  }

  .rw-widget-input.rw-widget-picker.rw-widget-container {
    border: 1px solid #0b3246 !important;
  }

  .rw-widget-picker {
    grid-template: 1fr / 1fr 0.7em;
  }

  .rw-dropdown-list-input {
    align-self: center;
    display: grid;
    min-width: 0;
    grid-template: 1fr/1fr;
  }

  .rw-btn {
    padding: 0;
    margin: 0;
    border: none;
    color: inherit;
    box-shadow: none;
    background: none;
    font: inherit;
    line-height: inherit;
    touch-action: manipulation;
    outline: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .rw-picker-caret {
    color: #f5f6f8;
  }

  .rw-dropdown-list-input {
    color: #f5f6f8 !important;
  }

  .rw-picker-caret svg {
    width: 8px;
  }

  .rw-detect-autofill:not(:-webkit-autofill) {
    -webkit-animation-name: react-widgets-autofill-cancel;
    animation-name: react-widgets-autofill-cancel;
    -webkit-animation-duration: 0.01ms;
    animation-duration: 0.01ms;
  }

  .rw-dropdown-list-input > * {
    grid-area: 1/1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .rw-detect-autofill {
    padding: 0;
    margin: 0;
    border: none;
    color: inherit;
    box-shadow: none;
    background: none;
    font: inherit;
    line-height: inherit;
    touch-action: manipulation;
    outline: 0;
  }

  .rw-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .rw-slide-transition-exited .rw-slide-transition,
  .rw-slide-transition-exiting .rw-slide-transition {
    opacity: 0;
    -webkit-transform: translateY(-10%);
    transform: translateY(-10%);
  }
  .rw-popup {
    display: flex;
    flex-direction: column;
  }
  .rw-slide-transition {
    transition: opacity 0.1s, -webkit-transform 0.13s;
    transition: transform 0.13s, opacity 0.1s;
    transition: transform 0.13s, opacity 0.1s, -webkit-transform 0.13s;
  }
  .rw-popup {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 2px;
    border-radius: 4px;
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.175);
    border: 1px solid #ccc;
    background: #fff;
  }
  .rw-slide-transition {
    margin-bottom: 1em;
  }

  .rw-popup .rw-list {
    max-height: 250px;
  }

  .rw-popup,
  .rw-popup .rw-list {
    background-color: #04283c !important;
  }

  .rw-list-option {
    background-color: #04283c;
    color: #d4dadf;
  }

  .rw-state-selected {
    background-color: #043344 !important;
    color: #f5f6f8 !important;
  }

  .rw-list-option:hover {
    background-color: #043344 !important;
    color: #f5f6f8 !important;
  }

  .rw-list {
    font-size: 1em;
    overflow-x: visible;
    overflow-y: auto;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  .rw-list-option {
    padding: 0px !important;
  }

  .rw-list-option.rw-state-selected,
  .rw-state-selected.rw-list-option-create {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  .rw-list-empty,
  .rw-list-optgroup,
  .rw-list-option,
  .rw-list-option-create {
    padding: 0.25em 1.5em;
    outline: none;
  }
  .rw-list-option,
  .rw-list-option-create {
    -webkit-user-select: none;
    user-select: none;
    color: #212529;
    cursor: pointer;
    border: 1px solid transparent;
  }

  .rw-slide-transition-exited {
    display: none;
  }
  .rw-slide-transition-exited,
  .rw-slide-transition-exiting {
    overflow: hidden;
  }
  .rw-popup-container {
    position: absolute;
    z-index: 1005;
    top: 100%;
    left: -1em;
    right: -1em;
    padding: 0px 1em;
  }

  .rw-dropdown-list-input > * {
    text-overflow: ellipsis;
    white-space-collapse: collapse;
    text-wrap: nowrap;
    grid-area: 1 / 1;
    overflow: hidden;
  }
`;

export const MarketHotnessMobileTitle = styled.div`
  white-space: nowrap;
  text-align: center;
  color: white;
  font-size: 20px;
  font-family: 'Open Sans Regular';
  font-weight: ${(props) => (props.isMobile ? '550' : 'normal')};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  flex: 1 1 20px;
  position: absolute;
  margin-bottom: 8px;

  .rw-dropdown-list {
    max-width: 65px;
  }
  .rw-picker-caret {
    color: white;
    svg {
      width: 8px;
      color: white;
    }
  }
  .rw-widget-picker {
    display: grid;
    grid-template: 1fr/1fr 0.7em;
  }

  .rw-dropdown-list.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container,
  .rw-multiselect.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container {
    max-width: 100px !important;
  }

  .rw-list-option {
    padding: 5px 4px;
  }

  .rw-popup,
  .rw-popup .rw-list {
    background-color: #04283c !important;
  }

  .rw-list-option {
    background-color: #04283c;
    color: #d4dadf;
  }

  .rw-state-selected {
    background-color: #043344 !important;
    color: #f5f6f8 !important;
  }

  .rw-list-option:hover {
    background-color: #043344 !important;
    color: #f5f6f8 !important;
  }

  .rw-dropdown-list.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container,
  .jhRfBI .rw-multiselect.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container {
    max-width: 78px !important;
    background-color: #04283c !important;
  }

  .rw-widget-input.rw-widget-picker.rw-widget-container {
    border: 1px solid #0b3246 !important;
  }

  .rw-widget {
    border: none;
    color: #212529;
    font-size: 1em;
    font-family: inherit;
    outline: none;
    position: relative;
  }

  .rw-widget-input {
    color: #495057;
    background-color: #fff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }

  .rw-widget-picker {
    display: grid;
    overflow: hidden;
    min-height: 38px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
  }

  .rw-popup-container {
    position: absolute;
    z-index: 1005;
    top: 100%;
    left: -1em;
    right: -1em;
    padding: 0 1em;
  }

  .rw-dropdown-list.rw-widget .rw-popup,
  .rw-multiselect.rw-widget .rw-popup {
    border: none;
    border-radius: 0 !important;
  }
  .rw-slide-transition-exited .rw-slide-transition,
  .rw-slide-transition-exiting .rw-slide-transition {
    opacity: 0;
    -webkit-transform: translateY(-10%);
    transform: translateY(-10%);
  }
  .rw-popup {
    display: flex;
    flex-direction: column;
  }
  .rw-slide-transition {
    transition: opacity 0.1s, -webkit-transform 0.13s;
    transition: transform 0.13s, opacity 0.1s;
    transition: transform 0.13s, opacity 0.1s, -webkit-transform 0.13s;
  }
  .rw-popup {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 2px;
    border-radius: 4px;
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.175);
    border: 1px solid #ccc;
    background: #fff;
  }
  .rw-slide-transition {
    margin-bottom: 1em;
  }

  .rw-popup .rw-list {
    max-height: 250px;
  }
  .rw-list {
    font-size: 1em;
    overflow-x: visible;
    overflow-y: auto;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  .bkPGyT .rw-dropdown-list.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container,
  .bkPGyT .rw-multiselect.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container {
    max-width: 100px !important;
  }

  @media screen and (max-width: 768px) .rw-dropdown-list.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container,
    .rw-multiselect.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container {
    min-height: 30px;
  }
  .rw-dropdown-list.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container,
  .rw-multiselect.rw-widget .rw-widget-input.rw-widget-picker.rw-widget-container {
    width: 100%;
    background-color: initial;
  }
  .rw-dropdown-list.rw-widget .rw-widget-input,
  .rw-multiselect.rw-widget .rw-widget-input {
    box-shadow: none;
  }
  .rw-widget-picker {
    grid-template: 1fr / 1fr 0.7em;
  }
  .rw-widget-input {
    color: #495057;
    background-color: #fff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }
  .rw-widget-picker {
    display: grid;
    overflow: hidden;
    min-height: 38px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
  }

  .rw-dropdown-list-input {
    padding: 0 0.857em;
    align-self: center;
    display: grid;
    min-width: 0;
  }

  .rw-detect-autofill:not(:-webkit-autofill) {
    -webkit-animation-name: react-widgets-autofill-cancel;
    animation-name: react-widgets-autofill-cancel;
    -webkit-animation-duration: 0.01ms;
    animation-duration: 0.01ms;
  }

  .rw-dropdown-list-input > * {
    grid-area: 1/1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .rw-detect-autofill {
    padding: 0;
    margin: 0;
    border: none;
    color: inherit;
    box-shadow: none;
    background: none;
    font: inherit;
    line-height: inherit;
    touch-action: manipulation;
    outline: 0;
  }
  .rw-widget,
  .rw-widget *,
  .rw-widget:after,
  .rw-widget :after,
  .rw-widget:before,
  .rw-widget :before {
    box-sizing: border-box;
  }
  .rw-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .rw-dropdown-list-input > * {
    grid-area: 1/1 !important;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px !important;
    color: #fff !important;
  }

  .rw-picker-caret {
    color: white;
  }

  .rw-btn {
    padding: 0;
    margin: 0;
    border: none;
    color: inherit;
    box-shadow: none;
    background: none;
    font: inherit;
    line-height: inherit;
    touch-action: manipulation;
    outline: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const HelpIcon = styled(QuestionCircle)`
  font-size: 14px;
  width: 15px;
  color: ${({ theme }) => theme.colors.teal};
  @media screen and (max-width: 768px) {
    width: 15px;
  }
`;

export const DropDownIcon = styled(FaChevronDown)`
  margin-left: -15px;
  margin-top: 0px;
  font-size: 6.5px;
  width: 6.5px;
  height: 6.5px;
  vertical-align: bottom;
`;

export const ColorScaleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: ${(props) => (props.legendVertical ? 'auto' : '100%')};
  column-gap: 20px;
  justify-content: ${(props) => (props.legendVertical ? 'flex-start' : 'center')};
  ${(props) => (props.legendVertical ? 'margin-left: 20px;align-self: center;' : '')}
  & > div:nth-child(2) {
    display: block;
    flex: 0 0 150px;
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ColorScale = styled.div`
  display: flex;
  width: 325px;
  height: 10px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    margin: 0;
    margin-top: -10px;
    width: 100%;
    max-width: 200px;
  }
`;

export const ColorBar = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ areaSelected, normal, selected }) => (!areaSelected ? normal : selected)};
  width: ${(props) => (props.legendVertical ? '10px' : '500px')};

  & > span {
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: calc(100% + 6px);
    &.left {
      left: 0;
      transform: translateX(-50%);
    }
    &.right {
      right: 0;
      transform: translateX(50%);
    }
    &.center {
      ${(props) => (props.legendVertical ? 'left: 250%' : 'left: 50%')};
      ${(props) => (props.legendVertical ? 'top: 50%;' : '')}

      transform: translateX(-50%) ${(props) => (props.legendVertical ? 'rotate(90deg)' : '')};
    }

    @media screen and (max-width: 768px) {
      top: calc(100% + 3px);
    }
  }
`;

export const ColorScaleBig = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.legendVertical ? '310px' : '10px')};
  margin-bottom: 20px;
  flex-direction: ${(props) => (props.legendVertical ? 'column-reverse' : 'row')};
  @media screen and (max-width: 768px) {
    margin: 0;
    margin-top: -10px;
    width: 100%;
    max-width: 400px;
  }

  span:first-child {
    margin-top: 10px;
  }

  span:last-child {
    margin-bottom: 10px;
  }

  > span {
    font-size: 12px;
    color: #fff;
  }
`;

export const AvailabilityFormContainer = styled.div`
  width: ${(props) => (props.isMobile ? '100%' : 'fit-content')};
  margin: auto;
  pointer-events: auto;
  @media screen and (max-width: 768px) {
    display: none;
`;
