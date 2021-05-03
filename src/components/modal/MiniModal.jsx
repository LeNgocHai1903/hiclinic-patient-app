import './MiniModal.scss';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';

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
          <Button color="danger" onClick={props.toggle}>
            {t('cancle')}
          </Button>
          <Button color="success" onClick={props.onclick}>
            {t('submit')}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
