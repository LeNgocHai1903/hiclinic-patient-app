import { useEffect, useState } from "react";

import { apiWrapper } from "../../apiWrapper/apiWrapper";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

//Component
import MainSearchBar from "../../components/searchBar/mainSearchBar/MainSearchBar";
import ClinicItem from "../../modules/clinicItem/gridView/GridView";
import News from "../../modules/news/NewsItem";
import LoaddingSpinner from "../../components/loadingSpinner/LoadingSpinner";

//Route
import * as routeType from "../../constant/route/route";

//scss
import "./Homepage.scss";

//i18n
import { useTranslation } from "react-i18next";

const Homepage = () => {
  const { t } = useTranslation();
  const [top6Clinic, setTop6Clinic] = useState([]);
  const [clinicIsLoading, setClinicIsLoading] = useState(true);
  const [top3News, setTop3News] = useState([]);
  const [newsIsLoading, setNewsIsLoading] = useState(true);

  useEffect(() => {
    apiWrapper.get(`/top6clinic`).then((res) => {
      setTop6Clinic(res);
      setClinicIsLoading(false);
    });
  }, []);

  useEffect(() => {
    apiWrapper.get(`/top3news`).then((res) => {
      setTop3News(res);
      setNewsIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="main-search-on-homepage">
        <MainSearchBar />
      </div>

      <div className="container">
        <div className="clinic-list">
          <h1>{t("topClinic")}</h1>
          <div className="row justify-content-center">
            {clinicIsLoading ? (
              <div>
                <LoaddingSpinner />
              </div>
            ) : (
              <>
                {top6Clinic.map((item) => (
                  <ClinicItem data={item} key={item.id} />
                ))}
              </>
            )}
          </div>
          <div className="seeall-link">
            <Link to={`${routeType.ROUTE_CLINICLIST_LIST}`}>
              <button className="seeall-btn">
                {t("seeAllClinic")} <FaArrowCircleRight />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <h1>{t("topNews")}</h1>
          <div>
            {newsIsLoading ? (
              <div>
                <LoaddingSpinner />
              </div>
            ) : (
              <>
                {top3News.map((item) => (
                  <News data={item} key={item.id} />
                ))}
              </>
            )}
          </div>
          <div className="seeall-link">
            <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
              <button className="seeall-btn">
                {t("seeAllNews")} <FaArrowCircleRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Homepage;
