import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 8px;
  font-weight: 400;
  cursor: pointer !important;
  display: inline;
  position: absolute;
  right: ${({ right }) => `${right}px`};
  top: calc(50% - 10px);
`;

const IconContainer = styled.div`
  margin: auto;
  height: 20px;
  font-size: 15px;
  margin-right: 5px;
  cursor: pointer !important;
  margin-left: 5px;
  display: inline;
`;

const StyledSpan = styled.span`
  font-size: ${(props) => props.size}px;
  &:hover,
  &:focus {
    color: #cad4de !important;
  }
`;

const AbsoluteSortIcon = ({
  isSorted,
  isActive,
  desc,
  sortsCount,
  size,
  onClick,
  onPress,
  right,
  ...props
}) => (
  <Wrapper right={right}>
    <IconContainer
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
        onPress();
      }}
      data-tip={
        !isSorted && sortsCount > 0 && sortsCount < 2
          ? 'Tip: Press Shift + Click for multisort'
          : ''
      }
      title=""
    >
      {!desc && (
        <StyledSpan
          size={size}
          style={{
            color: isActive ? '#cad4de' : '#747b8c',
          }}
        >
          ▲
        </StyledSpan>
      )}
      {desc && (
        <StyledSpan
          size={size}
          style={{
            color: isActive ? '#cad4de' : '#747b8c',
          }}
        >
          ▼
        </StyledSpan>
      )}
    </IconContainer>
    <ReactTooltip effect="solid" type="info" />
  </Wrapper>
);

AbsoluteSortIcon.defaultProps = {
  isSorted: false,
  isActive: false,
  desc: false,
  sortsCount: 0,
  size: 14,
  right: 4,
  onPress: () => {},
};

AbsoluteSortIcon.propTypes = {
  isSorted: PropTypes.bool,
  isActive: PropTypes.bool,
  desc: PropTypes.bool,
  sortsCount: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  right: PropTypes.number,
};

export default AbsoluteSortIcon;
