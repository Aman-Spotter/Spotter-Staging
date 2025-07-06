import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media screen and (max-width: 1024px) {
    min-height: 300px;
  }
`;

export const RankBadge = styled.div`
  diplay: inline-flex;
  border-radius: 5px;
  background-color: ;
  background-color: #282b33;
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  margin-left: -3px;
`;

export const TimeRangeOption = styled.div`
  box-sizing: border-box;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$selected ? '#159ea3' : '#cad4de')};
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
  height: 25px;
  user-select: none;

  text-decoration: ${(props) => (props.$selected ? 'underline' : 'none')};
  text-underline-offset: 5px;
`;

export const MarketTitle = styled.div`
  color: #cad4de;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  max-width: 200px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SearchLocationInputWrapper = styled.div`
  min-width: 300px;
  max-height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  height: 36px;
  border-bottom: solid 1px #747b8c;

  > .app-popover-container {
    background-color: #3b414f;
    color: #cad4de;

    input::placeholder {
      color: #cad4de;
    }
  }
`;

export const SearchIcon = styled(Search)`
  color: #ffffff;
`;
