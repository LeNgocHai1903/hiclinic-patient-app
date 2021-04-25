import './Header.scss';
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import HeaderLogo from '../../asset/img/logo.png';

import DirectMenu from '../directMenu/DirectMenu';

const Header = () => {
  // const isDesktop= useMediaQuery({
  //     query: '(min-width: 920px)'
  // })
  // const isMobile = useMediaQuery({
  //     query: '(max-width: 920px)'
  // })
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
              <a href="https://hiclinic-clinic-portal.herokuapp.com/" target="_blank">
                <button className="change-site-btn">Clinic Website</button>
              </a>
            </li>
            {/* <li className="site-nav-desktop-item">
              <a href="/">Your Link</a>
            </li>
            <li className="site-nav-desktop-item">
              <a href="/">Your Link</a>
            </li>
            <li className="site-nav-desktop-item">
              <a href="/">Your Link</a>
            </li> */}
          </ul>
        </div>

        <div className="site-nav-mobile-only site-nav-mobile-menu align-center">
          <a href="#">
            <AiOutlineMenu className="hamburger-button" />
          </a>
          <div className="dropdown-content">
            <a href="#">Sign up</a>
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
          {/* <li class="site-nav-action-item sign-up-form">
            <a href="/" class="sign-up">
              Sign up
            </a>
          </li> */}
        </ul>
      </header>
    </div>
  );
};

export default Header;