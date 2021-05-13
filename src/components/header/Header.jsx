import { useEffect, useState } from 'react';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { Media, Button, DropdownMenu, DropdownItem, Dropdown, DropdownToggle } from 'reactstrap';
import { FaGenderless } from 'react-icons/fa';
import Pusher from 'pusher-js';
import BackDrop from '../backdrop/BackDrop';
import { Link } from 'react-router-dom';

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
    var callback = (data) => {
      if (data) {
        console.log(data);
        actions.saveNoti(data);
      }
      
    };
    channel.bind(`booking-response-handler-${state.userEmail}`, callback);
    return ()=>{channel.unbind(`booking-response-handler-${state.userEmail}`)}
  }, []);


  const changeToSigninPage = () => {
    actions.savePreviousLocation(history.location.pathname);
    history.push(`${routeType.ROUTE_SIGN_IN}`);
  };

  const changeToSignUpPage = () => {
    actions.savePreviousLocation(history.location.pathname);
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
              <img src={HeaderLogo} alt="HiClinic Logo" className="header-logo"/>
            </a>
          </div>
          <ul id="list-page">
            <li className="list-item">
              <Link className="list-item" to={`${routeType.ROUTE_NEWS_LIST}`}>
                {t('newsList')}
              </Link>
            </li>
            <li className="list-item">
            <Link className="list-item" to={`${routeType.ROUTE_CLINICLIST_LIST}`}>
              {t('clinicList')}
            </Link>
            </li>
        </ul>
        </div>

        <div className="site-nav-mobile-only mobile-logo">
          <a href="/">
            <img src={HeaderLogo} alt="HiClinic Logo" />
          </a>
        </div>
        
        <ul id="site-nav-action">
          {state.accessToken ? (
            <>
              <li id="welcome-title">
                {t("welcome")}, {state.userName}
              </li>
              <Dropdown toggle={openNotiModal} isOpen={notiModal}>
              <li className="notification-icon">
                <DropdownToggle id="notification-icon">
                <MdNotificationsActive onClick={openNotiModal} />
                <span className="badge badge-warning" id="lblCartCount">
                  {' '}
                  {state.noti.length}{' '}
                </span>
                </DropdownToggle>
                {notiModal && (
                  <>
                    {/* <BackDrop className="noti-backdrop" show={true} clicked={closeNotiModal} /> */}
                    <DropdownMenu right className="noti-dropdown">
                    <DropdownItem header>{t("notification")}</DropdownItem>
                      {state.noti.length === 0 ? (
                        <DropdownItem>
                          <Media >
                          <Media middle left className="mr-3">
                            <FaGenderless size={35} color="primary" />
                          </Media>
                          <Media body>
                            <Media heading tag="h6">
                              {t('empty')}
                            </Media>
                            <Media className="noti-content">{t('noNotification')}</Media>
                            {/* <div className="d-flex mt-2">
                              <Button color="link" onClick={closeNotiModal} className={`ml-2 text-success`}>
                                  {t('confirm')}
                              </Button>
                            </div> */}
                          </Media>
                        </Media>
                        </DropdownItem>
                        
                      ) : (
                        <>
                          {state.noti.map((item, index) => (
                            <DropdownItem>
                              <Noti data={item} index={index} closeNotiModal={closeNotiModal} />
                            </DropdownItem>
                            
                          ))}
                        </>
                      )}
                    
                    </DropdownMenu>
                  </>
                )}
              </li>
              </Dropdown>
              <li className="direct-menu-button">
                <DirectMenu />
              </li>
            </>
          ) : (
            <>
              <li>
                <Button color="primary" id="sign-button" onClick={changeToSigninPage}>
                {t('signIn')}
                </Button>
              </li>
              <li >
              <Button color="primary" id="sign-button" onClick={changeToSignUpPage}>
                {t('signUp')}
                </Button>
              </li>
              <li className="direct-menu-button">
                <DirectMenu />
              </li>
            </>
          )}
        </ul>
        {/* <div className="direct-menu-button">
          <DirectMenu />
        </div> */}
      </header>
    </div>
  );
};

export default Header;
