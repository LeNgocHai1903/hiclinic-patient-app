import { useEffect, useState } from 'react';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { Media, Button } from 'reactstrap';
import { FaGenderless } from 'react-icons/fa';
import Pusher from 'pusher-js';

import HeaderLogo from '../../asset/img/logo.png';
import DirectMenu from '../directMenu/DirectMenu';
import Noti from '../notification/Noti';

import * as routeType from '../../constant/route/route';
import { useAuth } from '../../store/authenticate/store';
import { useHistory } from 'react-router-dom';

import { MdNotificationsActive } from 'react-icons/md';
//import constant
import { APP_KEY } from '../../constant/pusher/appKey';
const Header = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [state, actions] = useAuth();
  const [notiModal, setNotiModal] = useState(false);

  useEffect(() => {
    const pusher = new Pusher(APP_KEY, {
      cluster: 'ap1',
      encrypted: true,
    });
    const channel = pusher.subscribe(`booking-response-${state.userEmail}`);
    channel.bind(`booking-response-handler-${state.userEmail}`, (data) => {
      console.log(data);
      if (data) {
        actions.saveNoti(data);
      }
    });
  }, []);

  const changeToSigninPage = () => {
    actions.savePreviousLocation(history.location.pathname);
    actions.clearErrorMessage();
    history.push(`${routeType.ROUTE_SIGN_IN}`);
  };

  const changeToSignUpPage = () => {
    actions.savePreviousLocation(history.location.pathname);
    actions.clearErrorMessage();
    history.push(`${routeType.ROUTE_SIGN_UP}`);
  };

  const openNotiModal = () => {
    setNotiModal(!notiModal);
  };

  const closeNotiModal = () => {
    setNotiModal(false);
  };

  return (
    <div className="header-container">
      <header className="site-nav site-nav-container">
        <div className="site-nav-desktop-only align-center">
          <div className="header-logo">
            <a href="/">
              <img src={HeaderLogo} alt="HiClinic Logo" />
            </a>
          </div>

          <ul className="site-nav-desktop-nav">
            <li className="site-nav-desktop-item">
              <a href={`${process.env.REACT_APP_CLINIC_PORTAL}`} target="_blank" rel="noreferrer">
                <button className="btn btn-primary">{t('Clinic Website')}</button>
              </a>
            </li>
          </ul>
        </div>

        <div className="site-nav-mobile-only mobile-logo">
          <a href="/">
            <img src={HeaderLogo} alt="HiClinic Logo" />
          </a>
        </div>
        <ul className="site-nav-action">
          {state.accessToken ? (
            <>
              <li>
                {t('welcome')} {state.userName}
              </li>
              <li className="notification-icon">
                <MdNotificationsActive onClick={openNotiModal} />
                <span class="badge badge-warning" id="lblCartCount">
                  {' '}
                  {state.noti.length}{' '}
                </span>
                {notiModal && (
                  <div className="noti-wrraper">
                    {state.noti.length === 0 ? (
                      <Media className="notificaiton-modal">
                        <Media middle left className="mr-3">
                          <FaGenderless size={35} color="primary" />
                        </Media>
                        <Media body>
                          <Media heading tag="h6">
                            {t('empty')}
                          </Media>
                          <Media className="noti-content">{t('noNotification')}</Media>
                          <div className="d-flex mt-2">
                            <Button color="link" onClick={closeNotiModal} className={`ml-2 text-success`}>
                                {t('confirm')}
                            </Button>
                          </div>
                        </Media>
                      </Media>
                    ) : (
                      <>
                        {state.noti.map((item,index) => (
                          <Noti data={item} index={index} closeNotiModal={closeNotiModal} />
                        ))}
                      </>
                    )}
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="direct-menu " onClick={changeToSigninPage}>
                {' '}
                {t('signIn')}
              </li>
              <li className="direct-menu " onClick={changeToSignUpPage}>
                {' '}
                {t('signUp')}
              </li>
            </>
          )}
          <li className="direct-menu ">
            <DirectMenu />
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
