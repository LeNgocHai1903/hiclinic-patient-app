import { FaFacebookSquare, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-copyright">
          <p>&copy; {t('copyright')}</p>
          <ul className="terms-and-conditions">
            <li>
              <a href="#">{t('termsOfUse')}</a>
            </li>
            <li>
              <a href="#">{t('legalNotices')}</a>
            </li>
            <li>
              <a className="last-child" href="#">{t('privacyAndSecurity')}</a>
            </li>
          </ul>
        </div>

        <ul className="social-icons">
          <li>
            <a href="#">
              <FaLinkedin className="linkedin-icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaFacebookSquare className="facebook-icon" />
            </a>
          </li>
          <li>
            <a href="">
              <FaYoutubeSquare className="youtube-icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
