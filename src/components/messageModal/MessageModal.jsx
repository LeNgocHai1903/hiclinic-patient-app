import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './MessageModal.scss';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MessageModal = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const switchPageHander = (e) => {
    e.preventDefault();
    history.push('/signin');
  };

  return (
    <div>
      <Button className="button-modal" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{t('anonymousUserMsg')}</ModalHeader>
        <ModalBody>{t('signinMsg')}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={switchPageHander}>
            {t('signIn')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('cancle')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MessageModal;
