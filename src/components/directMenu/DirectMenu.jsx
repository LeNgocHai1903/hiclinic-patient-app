import "./DirectMenu.scss";
import SearchOnMenu from "../searchBar/searchOnMenu/SearchOnMenu";
import { useTranslation } from "react-i18next";

import {
  FaAlignJustify,
  FaNewspaper,
  FaUserCircle,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";

const DirectMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="dropdown" style={{ float: "right" }}>
      <button className="dropbtn">
        <FaAlignJustify />
      </button>
      <div className="dr-dropdown-content">
        <p>{t("welcome")} </p>
        <SearchOnMenu />
        <a href="/news">
          <FaNewspaper />
           {t("news")}
        </a>
        <a href="/">
          <FaUserCircle />
           {t("profile")}
        </a>
        <a className="signout-area" href="/">
          <FaRegArrowAltCircleLeft />
          {t("signOut")}
        </a>
      </div>
    </div>
  );
};
export default DirectMenu;
