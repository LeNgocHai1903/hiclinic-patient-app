import './MiniModal.scss';
import { useTranslation } from 'react-i18next';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            {t('cancle')}
          </Button>
          <Button color="primary" onClick={props.confirmBooking}>
            {t('submit')}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
