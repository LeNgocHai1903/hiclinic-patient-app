import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './MessageModal.scss';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import {useAuth} from '../../store/authenticate/store';

import * as routeType from '../../constant/route/route';

const MessageModal = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const { buttonLabel, className } = props;
  const [state, actions] = useAuth()

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const switchPageHander = (e) => {
    e.preventDefault();
    actions.savePreviousLocation(history.location.pathname);
    history.push(`${routeType.ROUTE_SIGN_IN}`);
  };

  return (
    <div>
      <Button id="button-modal" onClick={toggle}>
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
