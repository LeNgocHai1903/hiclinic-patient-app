import './Header.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import HeaderLogo from '../../asset/img/logo.png';
import DirectMenu from '../directMenu/DirectMenu';

import {CLINIC_URL} from '../../constant/apiUrl/apiUrl';

import {useTranslation} from 'react-i18next';

const Header = () => {
  const {t} =useTranslation();
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
              <a href={`${CLINIC_URL}`} target="_blank" rel="noreferrer" >
                <button className="change-site-btn">{t('clinicWebsite')}</button>
              </a>
            </li>
          </ul>
        </div>

        <div className="site-nav-mobile-only site-nav-mobile-menu align-center">
          <a href="#">
            <AiOutlineMenu className="hamburger-button" />
          </a>
          <div className="dropdown-content">
            <a href="#">{t('signUp')}</a>
            <a href="#">Your link</a>
            <a href="#">Your link</a>
            <a href="#">Your link</a>
            <a href="#">Your link</a>
            <a href="#">Your link</a>
          </div>
        </div>

        <div className="site-nav-mobile-only mobile-logo">
          <a href="/">
            <img src={HeaderLogo} alt="HiClinic Logo" />
          </a>
        </div>

        <ul className="site-nav-action">
          <li  className="direct-menu ">
            <DirectMenu/>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;