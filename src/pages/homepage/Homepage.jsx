import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import {FaArrowCircleRight} from 'react-icons/fa';

//Component
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MainSearchBar from "../../components/searchBar/mainSearchBar/MainSearchBar";
import ClinicItem from "../../modules/clinicItem/clinicItem-grid/ClinicItem-Grid";
import News from "../../modules/news/NewsItem";
import LoaddingSpinner from "../../components/loadingSpinner/LoadingSpinner";

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
    const fetchTopClinic = async () => {
      const result = await axios(
        "https://hiclinic-patient-portal-server.herokuapp.com/api/top6clinic"
      );
      setTop6Clinic(result.data);
    };
    fetchTopClinic();
    setClinicIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchTopNews = async () => {
      const result = await axios(
        "https://hiclinic-patient-portal-server.herokuapp.com/api/top3news"
      );
      setTop3News(result.data);
    };
    fetchTopNews();
    setNewsIsLoading(false);
  }, []);

  return (
    <>
      <Header />
      <div className="main-search-on-homepage">
        <MainSearchBar />
      </div>

      <div className="container">
        <div className="clinic-list">
          <h1>{t("Top Clinic")}</h1>
          <div
            className="row justify-content-center"
            style={{ marginTop: "15px", marginBottom: "15px" }}
          >
            {clinicIsLoading ? (
              <div>
                <LoaddingSpinner />
              </div>
            ) : (
              <>
                {top6Clinic.map((item) => (
                  <ClinicItem data={item} />
                ))}
              </>
            )}
          </div>
          <div className="seeall-link">
            <Link to="/clinicList">
              <button className="seeall-btn">{t("See all clinic")}&nbsp;<FaArrowCircleRight/></button>
            </Link>
          </div>
        </div>
        <div>
          <h1>{t("Top News")}</h1>
          <div
            // className="row justify-content-center"
            style={{ marginTop: "15px" }}
          >
            {newsIsLoading ? (
              <div>
                <LoaddingSpinner />
              </div>
            ) : (
              <>
                {top3News.map((item) => (
                  <News data={item} />
                ))}
              </>
            )}
          </div>
          <div className="seeall-link">
            <Link to="/news">
              <button className="seeall-btn">{t("See all news")}&nbsp;<FaArrowCircleRight/></button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Homepage;
