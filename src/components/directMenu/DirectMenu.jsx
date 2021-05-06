import { useState } from 'react';
import './DirectMenu.scss';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import SearchOnMenu from '../searchBar/searchOnMenu/SearchOnMenu';

import { useAuth } from '../../store/authenticate/store';

import * as routeType from '../../constant/route/route';

import {
  FaAlignJustify,
  FaNewspaper,
  FaUserCircle,
  FaRegArrowAltCircleLeft,
  FaCheckCircle,
  FaClinicMedical,
} from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DirectMenu = () => {
  const history = useHistory();
  const location = useLocation();
  const [isShowSignOutModal, setIsShowSignOutModal] = useState(false);
  const { t } = useTranslation();

  const [state, actions] = useAuth();

  const signInHandler = () => {
    actions.savePreviousLocation(location.pathname);
    history.push(`${routeType.ROUTE_SIGN_IN}`);
  };

  const signOutHandler = () => {
    setIsShowSignOutModal(true);
  };

  const closeModal = () => {
    setIsShowSignOutModal(false);
    actions.deletePreviousLocation();
    actions.signOut();
  };

  return (
    <div className="dropdown" style={{ float: 'right' }}>
      <button className="dropbtn">
        <FaAlignJustify />
      </button>
      <div className="dr-dropdown-content">
        {!state.accessToken ? (
          <>
            <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
              <FaNewspaper />
              {t('news')}
            </Link>
            <Link to={`${routeType.ROUTE_CLINICLIST_LIST}`}>
              <FaClinicMedical />
              {t('clinicList')}
            </Link>
          </>
        ) : (
          <>
            <SearchOnMenu />
            <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
              <FaNewspaper />
              {t('news')}
            </Link>
            <Link to={`${routeType.ROUTE_CLINICLIST_LIST}`}>
              <FaClinicMedical />
              {t('clinicList')}
            </Link>
            <Link to="/">
              <FaUserCircle />
              {t('profile')}
            </Link>
            <Link className="signout-area" onClick={signOutHandler}>
              <FaRegArrowAltCircleLeft />
              {t('signOut')}
            </Link>
          </>
        )}
      </div>
      {isShowSignOutModal && (
        <div>
          <Modal isOpen={isShowSignOutModal} toggle={closeModal}>
            <ModalHeader toggle={isShowSignOutModal}>{t('youHavedSignOut')}</ModalHeader>
            <ModalBody>
              <FaCheckCircle className="checked-icon" />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={closeModal}>
                {t('confirm')}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </div>
  );
};
export default DirectMenu;
