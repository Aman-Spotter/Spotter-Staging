import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

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
    height: 100%;

    background-color: rgba(160, 160, 160, 0.1);

    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9999;
  }
  & .Modal {
    height: 240px;
    width: 480px;
    background-color: rgb(13, 30, 45);
    border-radius: 5px;
    border: 0.5px solid rgb(1, 99, 105);
    color: #fffefe;
    border-radius: 5px;
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
  align-items: center;
  justify-content: center;
`;

export const ModalAction = styled.div`
  padding-left: 80px;
  padding-right: 80px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
`;

export const Message = styled.div`
  font-family: 'Open Sans Regular';
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
  text-align: center;
  line-height: 24px;
  letter-spacing: 1px;
`;
