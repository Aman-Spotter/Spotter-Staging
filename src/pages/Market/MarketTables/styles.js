import styled from 'styled-components';
import { ArrowUpShort, ArrowDownShort, QuestionCircle } from '@styled-icons/bootstrap';
import { MinusSmall } from '@styled-icons/heroicons-solid';

export const RankRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

export const RankChangeGroup = styled.div`
  display: grid;
  grid-template-columns: 20px 26px;
  align-items: center;
  justify-content: center;
`;

export const ColoredSpan = styled.span`
  color: ${(props) => (props.value > 0 ? '#14d29b' : props.value < 0 ? '#ff7979' : '#c4d0d6')};
`;

export const RankChangeSpan = styled(ColoredSpan)`
  color: ${({ value }) => (value >= 0 ? '#14d29b' : '#ff7979')};
  margin-left: -4px;
  text-align: left;
`;

export const TBISpan = styled.span`
  display: flex;
  column-gap: 2px;
  &::before {
    content: '$';
    font-size: 13px;
    opacity: 0.8;
  }
  &::after {
    content: '/hr';
    font-size: 13px;
    opacity: 0.8;
  }
`;

export const UpArrow = styled(ArrowUpShort)`
  color: #14d29b;
`;

export const DownArrow = styled(ArrowDownShort)`
  color: #ff7979;
`;

export const EqualIcon = styled(MinusSmall)`
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
  color: #c4d0d6;
`;

export const DPHHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    margin-top: 40px;
  }

  @media screen and (min-width: 769px) {
    min-width: 450px;
  }
  @media screen and (max-width: 768px) {
    max-height: 800px;
    min-height: 800px;
  }
`;

export const Header = styled.thead`
  position: sticky;
  top: 0;
`;

export const THeadRow = styled.tr`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  width: calc(100% - 12px);
  background-color: #282b33;
  & > th {
    border-width: 1px;
    border-style: solid;
    &:not(:last-child) {
      border-right: none;
    }
  }
`;

export const TableHead = styled.th`
  height: 40px;
  background-color: #04283c;
  font-family: 'Open Sans Regular';
  font-size: 14px;
  color: #f4f7f8;
  text-align: center;
  z-index: ${({ zIndex }) => zIndex || 2};
  padding-left: 10px;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  border-color: #042a3e;

  ::placeholder {
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding-left: 5px;
  }
`;

export const TBody = styled.tbody`
  width: 100%;
  height: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  background-color: #04283c;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #04283c;
  }

  &::-webkit-scrollbar-corner {
    background: #04283c;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0b3d52;
    border: 1px solid #04283c;
  }

  & > tr:first-child {
    position: sticky;
    top: 0;
    z-index: 2;
  }
`;

export const TBodyLanes = styled.tbody`
  width: 100%;
  height: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  background-color: #282b33;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #23252a;
  }

  &::-webkit-scrollbar-corner {
    background: #1a1e22;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #757679;
    border-radius: 20px;
    border: 3px solid #1a1e22;
  }
`;

export const TBodyRow = styled.tr`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  align-items: center;
  width: 100%;
  height: 40px;
  color: #c4d0d6;
  border-bottom: 1px solid #0b3d52;
  border-left: 1px solid #0b3d52;
  border-right: 1px solid #0b3d52;
  cursor: pointer;

  &:nth-child(odd) {
    background-color: #043344;
  }
  &:nth-child(even) {
    background-color: #04283c;
  }
  &:hover {
    background: #0b3d52;
    color: #fff;
  }
`;

export const TableCell = styled.td`
  padding-left: 10px;
  font-family: 'Open Sans Regular';
  font-size: 14px;
  position: relative;
  text-align: left;
  line-height: 16px;
  color: ${(props) => props.theme.textGray};
  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding-left: 5px;
  }
`;

export const RankCell = styled.span`
  min-width: 75px;
`;

export const MarketCell = styled.span`
  min-width: 98px;
  max-width: 150px;
  ${({ $bold }) => ($bold ? 'font-family: Open Sans SemiBold;' : '')}
`;

export const TBICell = styled.span`
  min-width: 50px;
  max-width: 75px;
  ${({ $bold }) => ($bold ? 'font-family: Open Sans SemiBold;' : '')}
`;

export const ChangeCell = styled.span`
  min-width: 80px;
  max-width: 100px;
  ${({ $bold }) => ($bold ? 'font-family: Open Sans SemiBold;' : '')}
`;

export const DestinationCell = styled.span`
  min-width: 98px;
`;

export const RPMCell = styled.span`
  width: 50px;
`;

export const TollsCell = styled.span`
  width: 50px;
`;

export const FuelCell = styled.span`
  width: 50px;
`;

export const VolumnCell = styled.span`
  width: 80px;
`;

export const HelpIcon = styled(QuestionCircle)`
  font-size: 14px;
  width: 15px;
  color: ${({ theme }) => theme.colors.teal};
  @media screen and (max-width: 768px) {
    width: 15px;
  }
`;
