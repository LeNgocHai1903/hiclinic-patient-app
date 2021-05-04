import { useContext } from 'react';
import './DirectMenu.scss';
import SearchOnMenu from '../searchBar/searchOnMenu/SearchOnMenu';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { FaAlignJustify, FaNewspaper, FaUserCircle, FaRegArrowAltCircleLeft } from 'react-icons/fa';

const DirectMenu = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <div className="dropdown" style={{ float: 'right' }}>
      <button className="dropbtn">
        <FaAlignJustify />
      </button>
      <div className="dr-dropdown-content">
        {!auth.isLoggedIn ? (
          <>
            <Link to="/news">
              <FaNewspaper />
              {t('news')}
            </Link>
            <Link to="/signin">
              <FaRegArrowAltCircleLeft />
              {t('signIn')}
            </Link>
          </>
        ) : (
          <>
            <p>
              <img className="header-avatar" src={auth.authTokens.image} alt="avarta" />
              {t('welcome')} {auth.authTokens.userName}{' '}
            </p>
            <SearchOnMenu />
            <Link to="/news">
              <FaNewspaper />
              {t('news')}
            </Link>
            <Link to="/">
              <FaUserCircle />
              {t('profile')}
            </Link>
            <Link className="signout-area" onClick={auth.logout}>
              <FaRegArrowAltCircleLeft />
              {t('signOut')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default DirectMenu;
