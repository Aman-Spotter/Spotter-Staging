import styled from 'styled-components';

export const DayPickerWrapper = styled.div`
  margin: auto;
  color: white;
  .DayPicker-Day.DayPicker-Day--disabled {
    color: #919499;
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: #77808c;
    color: #008080;
    font-weight: 500;
  }
  .DayPicker-Day {
    border-radius: 5px;
  }
  .DayPicker-wrapper {
    padding-bottom: 10px;
  }
  .DayPicker-Day--today {
    color: white;
    font-weight: 800;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(
      .DayPicker-Day--outside
    ):hover {
    background: transparent;
    outline: 1px solid #008080;
    border-radius: 5px;
  }
  .DayPicker-Day--selected.DayPicker-Day--disabled {
    color: white;
  }
`;
