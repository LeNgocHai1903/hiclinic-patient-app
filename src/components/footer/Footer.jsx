import { FaFacebookSquare, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-copyright">
          <p>&copy; 2021 HiClinic Inc. All Rights Reserved.</p>
          <ul className="terms-and-conditions">
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Legal Notices</a>
            </li>
            <li>
              <a href="#">Privacy & Security</a>
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