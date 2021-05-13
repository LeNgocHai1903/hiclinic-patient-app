import { useState } from 'react';
import './DirectMenu.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {DropdownItem} from 'reactstrap';
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
  const [isShowSignOutModal, setIsShowSignOutModal] = useState(false);
  const { t } = useTranslation();

  const [state, actions] = useAuth();

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
            <SearchOnMenu />
            <DropdownItem divider />
            <DropdownItem id="menu-item">
              <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
                <FaNewspaper />
                {t('newsList')}
              </Link>
            </DropdownItem>
            <DropdownItem id="menu-item">
            <Link to={`${routeType.ROUTE_CLINICLIST_LIST}`}>
              <FaClinicMedical />
              {t('clinicList')}
            </Link>
            </DropdownItem>
          </>
        ) : (
          <>
            <SearchOnMenu />
            {/* <DropdownItem>Another Action</DropdownItem> */}
            <DropdownItem divider />
            <DropdownItem id="menu-item">
              <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
                <FaNewspaper />
                {t('newsList')}
              </Link>
            </DropdownItem>
            <DropdownItem id="menu-item">
            <Link to={`${routeType.ROUTE_CLINICLIST_LIST}`}>
              <FaClinicMedical />
              {t('clinicList')}
            </Link>
            </DropdownItem>
            <DropdownItem id="menu-item">
              <Link to={`${routeType.ROUTE_MY_PROFILE}`}>
                <FaUserCircle />
                {t('profile')}
              </Link>
            </DropdownItem>
            <DropdownItem id="menu-item">
              <Link className="signout-area" onClick={signOutHandler}>
                <FaRegArrowAltCircleLeft />
                {t('signOut')}
              </Link>
            </DropdownItem>
          </>
        )}
      </div>
      {isShowSignOutModal && (
        <div>
          <Modal isOpen={isShowSignOutModal} toggle={closeModal}>
            <ModalHeader toggle={isShowSignOutModal}>{t('youHavedSignOut')}</ModalHeader>
            <ModalBody className="signout-icon-success">
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
