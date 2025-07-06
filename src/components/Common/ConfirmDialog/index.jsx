import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

const LoadingIndicator = lazy(() => import('components/LoadingIndicator'));
const ActionButton = lazy(() => import('components/ActionButton'));

const ConfirmOverwriteTemplateModal = ({
  onClose,
  onConfirm,
  cancelBtnLabel,
  confirmBtnLabel,
  confirmBtnColor,
  description,
}) => {
  const [isProcess, setIsProcess] = React.useState(false);

  return (
    <S.StyledReactModal isOpen shouldCloseOnOverlayClick onRequestClose={onClose}>
      <Suspense fallback={<LoadingIndicator />}>
        <S.ModalContent>
          <S.Message>{description}</S.Message>
        </S.ModalContent>
        <S.ModalAction>
          <ActionButton
            isLoading={isProcess}
            color={confirmBtnColor}
            onClick={() => {
              setIsProcess(true);
              onConfirm();
            }}
          >
            {confirmBtnLabel}
          </ActionButton>
          <ActionButton color="#f84861" onClick={onClose}>
            {cancelBtnLabel}
          </ActionButton>
        </S.ModalAction>
      </Suspense>
    </S.StyledReactModal>
  );
};

ConfirmOverwriteTemplateModal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
  confirmBtnLabel: 'yes',
  cancelBtnLabel: 'cancel',
  confirmBtnColor: 'primary',
  description: () => null,
};
ConfirmOverwriteTemplateModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmBtnLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  confirmBtnColor: PropTypes.string,
  description: PropTypes.node,
};
export default ConfirmOverwriteTemplateModal;
