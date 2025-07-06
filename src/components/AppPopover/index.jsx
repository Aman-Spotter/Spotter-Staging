import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'react-tiny-popover';
import { DownArrow } from '@styled-icons/boxicons-solid';
import { Close } from '@styled-icons/ionicons-outline';
import { User } from '@styled-icons/fa-solid';
import { useResize } from 'hooks';
import { useWindowSize } from 'utils/useWindowSize';
import {
  CloseWrapper,
  DownArrowWrapper,
  IconWrapper,
  ItemContainer,
  MainWrapper,
  Overlay,
} from './styles';

const AppPopover = ({
  header,
  content,
  icon,
  width,
  height,
  padding,
  fillBgColor,
  normalBgColor,
  activeBorderColor,
  fillBorderColor,
  normalBorderColor,
  isDownIcon,
  positions,
  headerWidth,
  filled,
  closeIcon,
  noPopover,
  onClickClear,
  onClickHeader,
  fitWidth,
  isEdit,
  reposition,
  clearClosePopover,
  borderOnHover,
  onOpen,
  children,
  handleOnClickOutside,
  overlayBgColor,
  overlayBorderRadius,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const [overlayWidth, setOverlayWidth] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    if (headerRef && headerRef.current) {
      setOverlayWidth(headerRef.current.clientWidth);
    }
  }, [headerRef, size]);

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen]);

  return (
    <Popover
      isOpen={isOpen}
      positions={positions || ['bottom']}
      onClickOutside={() => {
        if (handleOnClickOutside) {
          handleOnClickOutside();
        }
        setIsOpen(false);
      }}
      padding={1}
      align="start"
      reposition={reposition}
      boundaryTolerance={0}
      content={
        <Overlay
          noPopover={noPopover}
          bgColor={overlayBgColor}
          borderRadius={overlayBorderRadius}
          width={fitWidth ? `${overlayWidth}px` : width || '100%'}
        >
          {content}
        </Overlay>
      }
      ref={headerRef}
    >
      {children ? (
        React.cloneElement(React.Children.only(children), { onClick: () => setIsOpen(!isOpen) })
      ) : (
        <ItemContainer
          isEdit={isEdit}
          width={headerWidth}
          height={height}
          padding={padding}
          filled={filled}
          bgColor={filled ? fillBgColor : normalBgColor || fillBgColor}
          borderOnHover={borderOnHover}
          borderColor={
            isOpen
              ? activeBorderColor || '#008080'
              : filled
              ? fillBorderColor
              : normalBorderColor || 'transparent'
          }
          onClick={() => {
            setIsOpen(true);
            if (onClickHeader) onClickHeader();
          }}
          open={isOpen}
          className="app-popover-container"
        >
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <MainWrapper>{header}</MainWrapper>
          {isDownIcon && !filled && (
            <DownArrowWrapper>
              <DownArrow />
            </DownArrowWrapper>
          )}
          {filled && closeIcon && (
            <CloseWrapper
              onClick={(e) => {
                e.stopPropagation();
                if (onClickClear) {
                  setIsOpen(!clearClosePopover);
                  onClickClear();
                }
              }}
            >
              <Close />
            </CloseWrapper>
          )}
        </ItemContainer>
      )}
    </Popover>
  );
};

AppPopover.defaultProps = {
  header: null,
  icon: null,
  width: null,
  height: null,
  headerWidth: '100%',
  padding: null,
  fillBgColor: null,
  normalBgColor: null,
  overlayBgColor: '#606873',
  overlayBorderRadius: '10px',
  activeBorderColor: null,
  fillBorderColor: null,
  normalBorderColor: null,
  isDownIcon: false,
  positions: ['bottom', 'right'],
  filled: false,
  closeIcon: true,
  noPopover: false,
  onClickClear: null,
  onClickHeader: null,
  fitWidth: false,
  isEdit: false,
  reposition: true,
  clearClosePopover: false,
  borderOnHover: true,
  onOpen: () => null,
  children: null,
  handleOnClickOutside: null,
};

AppPopover.propTypes = {
  header: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.object]),
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.object])
    .isRequired,
  headerWidth: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.object]),
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  fillBgColor: PropTypes.string,
  normalBgColor: PropTypes.string,
  overlayBgColor: PropTypes.string,
  overlayBorderRadius: PropTypes.string,
  activeBorderColor: PropTypes.string,
  fillBorderColor: PropTypes.string,
  normalBorderColor: PropTypes.string,
  isDownIcon: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.string),
  filled: PropTypes.bool,
  closeIcon: PropTypes.bool,
  noPopover: PropTypes.bool,
  onClickClear: PropTypes.func,
  onClickHeader: PropTypes.func,
  fitWidth: PropTypes.bool,
  isEdit: PropTypes.bool,
  reposition: PropTypes.bool,
  clearClosePopover: PropTypes.bool,
  borderOnHover: PropTypes.bool,
  onOpen: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.object]),
  handleOnClickOutside: PropTypes.func,
};

export default AppPopover;
