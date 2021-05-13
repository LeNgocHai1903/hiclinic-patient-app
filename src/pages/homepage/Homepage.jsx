import { useEffect, useState } from 'react';
import {Button} from 'reactstrap';
//i18n
import { useTranslation } from 'react-i18next';

//scss
import './Homepage.scss';

import apiWrapper from '../../api/apiWrapper';
import { Link } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import {MdKeyboardArrowRight} from 'react-icons/md'

//Component
import MainSearchBar from '../../components/searchBar/mainSearchBar/MainSearchBar';
import ClinicItem from '../../modules/clinicList/clinicItem/gridView/GridView';
import LoaddingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import News from '../../modules/newsList/newsItem/NewsItemGrid';

//Route
import * as routeType from '../../constant/route/route';
import { GET_HIGHTLIGHT_CLINIC, NEWS_URL } from '../../api/apiUrl';

const Homepage = () => {
  const { t } = useTranslation();
  const [top6Clinic, setTop6Clinic] = useState([]);
  const [top3News, setTop3News] = useState([]);
  const [clinicIsLoading, setClinicIsLoading] = useState(true);
  const [newsIsLoading, setNewsIsLoading] = useState(true);

  useEffect(() => {
    apiWrapper({ url: `${GET_HIGHTLIGHT_CLINIC}`, method: 'GET' }).then((res) => {
      setTop6Clinic(res.clinics);
      setClinicIsLoading(false);
    });
  }, []);

  useEffect(() => {
    apiWrapper({ url: `${NEWS_URL}/?size=3`, method: 'GET' }).then((res) => {
      setTop3News(res.listNews);
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
          <h1>{t('topClinic')}</h1>
          <div className="row">
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
              <Button className="seeall-btn">
              {t('seeAllClinic')} <MdKeyboardArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <h1>{t('topNews')}</h1>
          <div>
            {newsIsLoading ? (
              <div>
                <LoaddingSpinner />
              </div>
            ) : (
              <div className="row">
                {top3News.map((item) => (
                  <News data={item} key={item.id} />
                ))}
              </div>
            )}
          </div>
          <div className="seeall-link">
            <Link to={`${routeType.ROUTE_NEWS_LIST}`}>
              <Button className="seeall-btn">
              {t('seeAllNews')} <MdKeyboardArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Homepage;
