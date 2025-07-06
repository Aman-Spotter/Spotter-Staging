import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import * as GS from '../../globalStyles';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0d1e2d !important;
  gap: 25px;
`;

export const MapContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 100px;
  width: 100%;
  height: 665px;
  grid-area: map;

  @media screen and (max-width: 1024px) {
    max-height: 400px;
  }
`;

export const DataRow = styled.div`
  display: flex;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 100px;
  width: 100%;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    margin-bottom: 20px;
  }
`;

export const RankBadge = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: ;
  background-color: #043344;
  color: #f3f4f9;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.5rem;
  margin-left: -3px;
`;

export const TimeRangeOption = styled.div`
  box-sizing: border-box;
  margin: 0px 8px 0px 0px;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$selected ? '#008080' : '#edeef0')};
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  padding: 4px;
  border-radius: 2px;

  :hover {
    background-color: #282b33;
  }
`;

export const MarketTitle = styled.div`
  color: #fffffe;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  max-width: 200px;

  h2 {
    font-size: 1.8em;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SearchLocationInputWrapper = styled.div`
  width: 50%;
  max-height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  height: 36px;

  > .app-popover-container {
    background-color: #265e6e;
    color: #f5f6f8;

    input::placeholder {
      color: #f5f6f8;
    }
  }

  @media screen and (max-width: 1024px) {
    max-width: 210px;
    min-width: 210px;
  }

  @media screen and (max-width: 500px) {
    margin-right: -30px;
    max-width: 150px;
    min-width: 150px;
  }
`;

export const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

ReactModal.setAppElement('body');

// eslint-disable-next-line
function ReactModalAdapter({ className, modalClassName, ...props }) {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      bodyOpenClassName="portalOpen"
      isOpen
      {...props}
    />
  );
}

export const StyledReactModal = styled(ReactModalAdapter).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Modal',
})`
  & {
  }
  & .Overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 120vh;
    z-index: 99999;

    background-color: rgba(160, 160, 160, 0.1);

    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9995;
  }
  & .Modal {
    height: 300px;
    width: min(720px, 95%);
    background-color: #0d1e2d;
    border-radius: 8px;
    border: 1px solid #043344;
    outline: none;
    display: flex;
    flex-direction: column;
  }
  &[class*='--after-open'] {
  }
  &[class*='--before-close'] {
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  padding: 24px 32px;
  display: flex;
`;

export const ModalTitle = styled.h1`
  color: #f5f6f8;
  align-self: center;
  font-family: 'Open Sans Regular';
  font-size: 24px;
  font-weight: 700;
  font-family: UberMove, UberMoveText, system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1;
  > span {
    font-weight: 850;
    color: #008080;
  }

  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

export const ModalSubtitle = styled.h2`
  color: #f5f6f8;
  align-self: center;
  font-family: 'Open Sans Regular';
  font-size: 16px;
  font-weight: 400;
  font-family: UberMove, UberMoveText, system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

export const Benefit = styled.div`
  font-size: 16px;
  color: #f5f6f8;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  width: 200px;

  span {
    font-family: 'Open Sans Regular';
    font-weight: 300;
  }

  b {
    font-family: Open Sans Semibold;
  }

  & > .checkmark {
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.teal};
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;

    & > .checkmark {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;

    & > .checkmark {
      width: 15px;
      height: 15px;
    }
  }
`;

export const ButtonWrapper = styled.div`
  button {
    background-color: ${(props) => props.theme.colors.teal};
    height: 56px;
    width: 240px;
    color: #f5f6f8;
    font-size: 18px;
    font-weight: 400;
  }
  align-self: center;

  @media screen and (max-width: 500px) {
    button {
      background-color: ${(props) => props.theme.colors.teal};
      height: 40px;
      width: 200px;
      color: #f5f6f8;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const SubscribeBenefitsRow = styled(GS.Row)`
  gap: 70px;
  width: 100%;

  @media screen and (max-width: 768px) {
    gap: 20px;
    margin: 10px 10px;
    flex-direction: row;
  }

  @media screen and (max-width: 500px) {
    gap: 0px;
    margin: 10px 10px;
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

export const SubscribeItemsCol = styled(GS.Column).attrs({ colNum: 12 })`
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    align-items: flex-start;
  }

  @media screen and (max-width: 768px) {
    gap: 20px;
    margin: 10px 10px;
  }
`;

export const SubscribeBenefitsCol = styled(GS.Column).attrs({ colNum: 12 })`
  @media screen and (max-width: 500px) {
    margin-bottom: 0px;
    align-items: flex-start;
  }
`;

export const SubscribeBanner = styled(GS.Row)`
  width: 100%;
  height: auto;
  background-color: #1d1d1d;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 500px) {
    gap: 0px;
  }
`;

export const BannerContentWrapper = styled(GS.Column)`
  width: auto;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;

  @media screen and (max-width: 500px) {
    justify-content: center;
    gap: 0px;
  }

  h1 {
    align-self: flex-start !important;
  }
`;

export const MarketTablesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: calc(100% - 10px);
  }
`;

export const DataGrid = styled.div`
  padding: 20px 0;
  padding-right: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 50% 50%;
  grid-template-areas:
    'sidetable map map'
    'sidetable marketchart markettable';
  width: 100%;
  height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
`;

export const SidetableArea = styled.div`
  grid-area: sidetable;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-bottom: 2px;
  justify-content: flex-end;
`;

export const MapArea = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 100px;
  width: 100%;
  height: 100%;
  grid-area: map;
`;

export const MarketChartArea = styled.div`
  width: 100%;
  height: 100%;
  grid-area: marketchart;
`;

export const Tab = styled.div`
  font-family: UberMoveText, system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.isActive ? props.theme.highlightColor : '#cad4de')};
  border: 1px solid #4a4f5e;
  background-color: #282b33;
  text-align: center;
  line-height: 40px;
  cursor: default;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const TableTabGroup = styled.div`
  display: flex;
  width: ${(props) => (props.sideways ? '50px' : 'calc(100% - 16px)')};
  margin-bottom: 5px;
  margin-top: 40px;
  margin-left: 5px;
  align-items: ${(props) => (props.sideways ? 'flex-start' : 'flex-start')};
  justify-content: ${(props) => (props.sideways ? 'flex-start' : 'flex-start')};
  gap: 5px;
  flex-direction: ${(props) => (props.sideways ? 'column' : 'row')};

  > ${Tab} {
    writing-mode: ${(props) => (props.sideways ? 'vertical-rl' : 'unset')};
    height: ${(props) => (props.sideways ? '100px' : '40px')};
    width: ${(props) => (props.sideways ? '40px' : 'calc(50% - 5px)')};
  }
`;

export const MarketTableArea = styled.div`
  grid-area: markettable;
  height: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background-color: #04283c;
  margin-top: -1px;
  margin-left: -1px;

  @media screen and (max-width: 768px) {
    padding-top: 0px;
    margin-right: 0px;
  }
`;

export const MarketTableRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: flex-start;
  justify-content: space-between;
  color: #fafbfa;
  padding: 10px 20px;
  max-width: 350px;
  outline: 1px solid #062f43;
  margin-top: 1px;
  margin-left: 1px;

  > span {
    width: 125px;
    font-size: 14px;
  }

  h3,
  div {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  div {
    text-align: right;
  }
`;
