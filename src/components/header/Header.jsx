import './Header.scss';
import { useTranslation } from 'react-i18next';

import HeaderLogo from '../../asset/img/logo.png';
import DirectMenu from '../directMenu/DirectMenu';

import * as routeType from '../../constant/route/route';
import { useAuth } from '../../store/authenticate/store';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [state, actions] = useAuth();

  const changeToSigninPage = () => {
    actions.savePreviousLocation(window.location.pathname);
    history.push(`${routeType.ROUTE_SIGN_IN}`);
  };

  const changeToSignUpPage = () => {
    history.push(`${routeType.ROUTE_SIGN_UP}`);
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
              <a href="https://hiclinic-clinic-portal.herokuapp.com/" target="_blank" rel="noreferrer">
                <button className="change-site-btn">{t('Clinic Website')}</button>
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="site-nav-mobile-only site-nav-mobile-menu align-center">
          <a href="#">
            <AiOutlineMenu className="hamburger-button" />
          </a>
          <div className="dropdown-content">
            <a href="#">{t('signIn')}</a>
            <a href="#">{t('yourLink')}</a>
            <a href="#">{t('yourLink')}</a>
            <a href="#">{t('yourLink')}</a>
            <a href="#">{t('yourLink')}</a>
            <a href="#">{t('yourLink')}</a>
          </div>
        </div> */}

        <div className="site-nav-mobile-only mobile-logo">
          <a href="/">
            <img src={HeaderLogo} alt="HiClinic Logo" />
          </a>
        </div>
        <ul className="site-nav-action">
          {state.accessToken ? (
            <li>
              {t('welcome')} {state.userEmail}
            </li>
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
