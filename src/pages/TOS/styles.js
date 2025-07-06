import styled from 'styled-components';
import * as styles from '../../globalStyles';

export const Container = styled.div`
  max-width: 100%;
  padding: 50px;
  padding-left: 80px;
  flex: 1;
  width: 100%;
  background-color: #fff;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 30px;
  }
`;

export const Title = styled.div`
  font-size: 33.25px;
  font-family: 'Open Sans Regular';
  margin: 20px 0;
  font-weight: 600;
`;

export const Accordion = styled.div`
  margin-bottom: 30px;
  & > .content {
    display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  }
`;

export const Content = styled.div`
  display: block;
`;

export const Header = styled.div`
  margin: 20px 0;
  font-family: 'Open Sans Regular';
  font-weight: 600;
  color: rgb(51, 51, 51);
  position: relative;
  cursor: pointer;
  display: flex;

  &.header {
    font-size: 33.25px;
    font-weight: 800;
  }
  &.sub-header {
    font-size: 22px;
  }
  &.grand-header {
    font-size: 17px;
  }
  &::before {
    content: '▶';
    ${({ isExpanded }) => (isExpanded ? 'transform: rotate(90deg)' : 'transform: rotate(0deg)')};
    opacity: ${({ isExpanded }) => (isExpanded ? '0' : '1')};
    font-size: 12px;
    color: rgb(141, 149, 161);
    position: absolute;
    top: 50%;
    left: -30px;
    ${({ isExpanded }) =>
      isExpanded
        ? 'transform: translateY(-50%) rotate(90deg)'
        : 'transform: translateY(-50%) rotate(0deg)'};
    transition: all 0.3s;
    @media screen and (max-width: 1024px) {
      ${({ isExpanded }) => (isExpanded ? 'position: absolute' : 'position: relative')};
      ${({ isExpanded }) => (isExpanded ? 'left: -20px' : 'left: 0')};
      transform: unset;
      margin-right: 10px;
    }
  }
  &:hover {
    &::before {
      opacity: 1;
    }
  }
  @media screen and (max-width: 1024px) {
    &.header {
      font-size: 25px;
      font-weight: 800;
      &::before {
        top: 10px;
      }
    }
    &.sub-header {
      font-size: 18px;
      &::before {
        top: 5px;
      }
    }
    &.grand-header {
      font-size: 14px;
      &::before {
        top: 2px;
      }
    }
  }
`;

export const Paragraph = styled.div`
  font-size: 14px;
  font-family: 'Open Sans Regular';
  margin-bottom: 15px;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`;
