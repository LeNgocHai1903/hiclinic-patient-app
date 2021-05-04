import { useState } from "react";
import "./DirectMenu.scss";
import SearchOnMenu from "../searchBar/searchOnMenu/SearchOnMenu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../../store/authenticate/store";

import * as routeType from "../../constant/route/route.js";

import {
  FaAlignJustify,
  FaNewspaper,
  FaUserCircle,
  FaRegArrowAltCircleLeft,
  FaCheckCircle
} from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DirectMenu = () => {
  const [isShowSignOutModal, setIsShowSignOutModal] = useState(false);
  const { t } = useTranslation();

  const [state, actions] = useAuth();

  const signOutHandler = () => {
    setIsShowSignOutModal(true);

  };

  const closeModal = () => {
    setIsShowSignOutModal(false);
    actions.signOut();
  }

  return (
    <div className="dropdown" style={{ float: "right" }}>
      <button className="dropbtn">
        <FaAlignJustify />
      </button>
      <div className="dr-dropdown-content">
        {!state.accessToken ? (
          <>
            <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
              <FaNewspaper />
              {t("news")}
            </Link>
            <Link to={`${routeType.ROUTE_SIGN_IN}`}>
              <FaRegArrowAltCircleLeft />
              {t("signIn")}
            </Link>
          </>
        ) : (
          <>
            <p>
              <img
                className="header-avatar"
                src={state.userImage}
                alt="avarta"
              />
              {t("welcome")} {state.userName}{" "}
            </p>
            <SearchOnMenu />
            <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
              <FaNewspaper />
              {t("news")}
            </Link>
            <Link to="/">
              <FaUserCircle />
              {t("profile")}
            </Link>
            <Link className="signout-area" onClick={signOutHandler}>
              <FaRegArrowAltCircleLeft />
              {t("signOut")}
            </Link>
          </>
        )}
      </div>
      {isShowSignOutModal && (
        <div>
          <Modal isOpen={isShowSignOutModal} toggle={closeModal} >
            <ModalHeader toggle={isShowSignOutModal}>{t('youHavedSignOut')}</ModalHeader>
            <ModalBody>
              <FaCheckCircle className="checked-icon"/>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={closeModal}>
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
