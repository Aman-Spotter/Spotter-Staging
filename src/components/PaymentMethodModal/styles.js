import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { XSquare } from '@styled-icons/bootstrap';
import ActionButton from 'components/ActionButton';

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  background: #00000066;
  left: -30px;
  right: -30px;
  bottom: -20px;
  top: -20px;
`;
export const TruckCountLoadingContainer = styled.div`
  display: inline-block;
  background: #00000066;
  height: 15px;
  weight: 15px;
`;
export const LoadingIcon = styled.div`
  display: inline-block;
  font-size: 1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.1s infinite ease;
  transform: translateZ(0);
  margin-left: 5px;
  margin-right: 5px;
  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
        2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
        0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
        -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff,
        2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
        0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
        -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5),
        1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff,
        1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
        1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7),
        1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
        1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5),
        1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff,
        -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
        1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
        1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7),
        -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
        1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
        1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5),
        -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff,
        -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
        1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
        1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
        -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7),
        -1.8em -1.8em 0 0em #ffffff;
    }
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  margin: 10px 0px;
`;

export const Container = styled.div`
  position: relative;
  min-height: 100%;

  > button {
    max-width: 150px;
    margin: 20px 0px;
  }
`;

export const Section = styled.div`
  &:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`;

export const Text = styled.p`
  margin: ${({ noMargin }) => (noMargin ? '0px' : '10px 0px')};
  font-size: 14px;
`;

export const TextCancel = styled.span`
  margin: ${({ noMargin }) => (noMargin ? '0px' : '10px 0px')};
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: #008080;
  }
  text-decoration: underline;
`;

export const CardNumber = styled.span`
  margin-left: 1rem;
  font-size: 14px;
`;

export const InvoiceStatus = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${(props) => props.theme.danger};
  &.paid {
    background-color: ${(props) => props.theme.success};
  }
`;

export const MakeDefaultButton = styled.a`
  margin-right: 1rem;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  color: ${(props) => props.theme.secondaryTextColor};

  &:hover {
    color: ${(props) => props.theme.primaryTextColor};
  }
`;

export const AdminActionButton = styled(ActionButton)`
  width: 192px;
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
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(160, 160, 160, 0.1);

    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9998;
    padding: 28px;
  }
  & .Modal {
    height: 720px;
    width: 1080px;
    background-color: rgb(13, 30, 45);
    border-radius: 5px;
    border: 0.5px solid rgb(1, 99, 105);
    color: #fffefe;
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
  width: 100%;
  overflow-x: auto;
  height: 100%;
  display: flex;

  & .pro-sidebar {
    z-index: 1;
  }
`;

export const SettingsContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: ${(props) => props.theme.primaryTextColor};
  border-left: ${(props) => `1px solid ${props.theme.primaryBorderColor}`};
  position: relative;
  overflow-y: hidden;
`;

export const ModalAction = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export const ModalHeader = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  min-height: 70px;
  padding: 10px 28px;
  width: 100%;
  border-bottom: ${(props) => `1px solid ${props.theme.primaryBorderColor}`};
`;

export const CloseBtn = styled(XSquare)`
  font-size: 14px;
  width: 24px;
  height: 24px;
  color: #eb1c26;
  cursor: pointer;
`;
