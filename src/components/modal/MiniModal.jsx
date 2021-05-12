import './MiniModal.scss';
import { useTranslation } from 'react-i18next';

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalExample = (props) => {
  const { t } = useTranslation();

  const { className } = props;

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>{t('confirm')}</ModalHeader>
        <ModalBody>
          <div className="mini-modal">{props.children}</div>
        </ModalBody>
        <div className="mini-modal-footer">
          <Button color="secondary" onClick={props.toggle}>
            {t('cancle')}
          </Button>
          <Button color="primary" onClick={props.confirmBooking}>
            {t('submit')}
          </Button>{' '}
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;
