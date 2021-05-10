import { useEffect, useState } from 'react';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import Pusher from 'pusher-js';

import HeaderLogo from '../../asset/img/logo.png';
import DirectMenu from '../directMenu/DirectMenu';
import Noti from '../notification/Noti';

import * as routeType from '../../constant/route/route';
import { useAuth } from '../../store/authenticate/store';
import { useHistory } from 'react-router-dom';

import { MdNotificationsActive } from 'react-icons/md';

const Header = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [state, actions] = useAuth();
  const [noti, setNoti] = useState([]);
  const [notiModal, setNotiModal] = useState(false);
  const noti1 = [
    {
      bookingNotification: {
        map: {
          doctor: {
            map: {
              departmentName: 'SURGICAL',
              fullName: 'John',
              id: '609016bc6953fc209e695e9d',
            },
          },
          bookFrom: '11:00',
          patient: {
            map: {
              phone: '0983333333',
              fullName: 'Patient 03',
              id: '608fc1009a2345833cd489e3',
              email: 'patient03@gmail.com',
            },
          },
          reasonCancelled: {},
          bookingStatus: 'CONFIRMED',
          bookingDate: '2021-05-04',
          id: '609019be33a8ea1f813c7644',
          clinic: {
            map: {
              clinicName: 'HiClinic',
              id: '609016bc6953fc209e695e9d',
            },
          },
          updatedAt: '2021-05-03T11:36:23',
        },
      },
    },
    {
      bookingNotification: {
        map: {
          doctor: {
            map: {
              departmentName: 'SURGICAL',
              fullName: 'John',
              id: '609016bc6953fc209e695e9d',
            },
          },
          bookFrom: '11:00',
          patient: {
            map: {
              phone: '0983333333',
              fullName: 'Patient 03',
              id: '608fc1009a2345833cd489e3',
              email: 'patient03@gmail.com',
            },
          },
          reasonCancelled: {},
          bookingStatus: 'CANCELLED',
          bookingDate: '2021-05-04',
          id: '609019be33a8ea1f813c7644',
          clinic: {
            map: {
              clinicName: 'HiClinic',
              id: '609016bc6953fc209e695e9d',
            },
          },
          updatedAt: '2021-05-03T11:36:23',
        },
      },
    },
    {
      bookingNotification: {
        map: {
          doctor: {
            map: {
              departmentName: 'SURGICAL',
              fullName: 'John',
              id: '609016bc6953fc209e695e9d',
            },
          },
          bookFrom: '11:00',
          patient: {
            map: {
              phone: '0983333333',
              fullName: 'Patient 03',
              id: '608fc1009a2345833cd489e3',
              email: 'patient03@gmail.com',
            },
          },
          reasonCancelled: {},
          bookingStatus: 'CONFIRMED',
          bookingDate: '2021-05-04',
          id: '609019be33a8ea1f813c7644',
          clinic: {
            map: {
              clinicName: 'HiClinic',
              id: '609016bc6953fc209e695e9d',
            },
          },
          updatedAt: '2021-05-03T11:36:23',
        },
      },
    },
  ];

  useEffect(() => {
    const pusher = new Pusher('468b6ccde7891ded73ef', {
      cluster: 'ap1',
      encrypted: true,
    });
    const channel = pusher.subscribe(`booking-response-${state.userEmail}`);
    channel.bind(`booking-response-handler-${state.userEmail}`, (data) => {
      console.log(data);
      if (data) {
        setNoti((noti) => [...noti, data]);
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
                <span class='badge badge-warning' id='lblCartCount'> {noti.length} </span>
                {notiModal ? (
                  <div className="noti-wrraper">
                    {noti1.map((item) => (
                      <Noti data={item} closeNotiModal={closeNotiModal} />
                    ))}
                  </div>
                ) : null}
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
