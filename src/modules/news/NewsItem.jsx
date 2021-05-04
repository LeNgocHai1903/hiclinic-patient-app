import './NewsItem.scss';
import { Link, withRouter } from 'react-router-dom';
import * as routeType from '../../constant/route/route';

import { useTranslation } from 'react-i18next';

const NewsItem = (props) => {
  const { t } = useTranslation();

  const moveToDetail = (e) => {
    e.preventDefault();
    props.history.push(`${routeType.ROUTE_NEWS_DETAIL_BUILD(props.data.id)}`);
  };

  return (
    <div className="news-item-container">
      <div onClick={moveToDetail} className="news-href">
        <div className="news-item">
          <img src={props.data.imageUrl} alt="" />
          <div className="news-item-content">
            <h3>{props.data.title}</h3>
            <p className="news-item-description">{props.data.description}</p>
            <Link to={`${routeType.ROUTE_NEWS_DETAIL_BUILD(props.data.id)}`} className="news-item-details">
              {t('moreDetails')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NewsItem);
