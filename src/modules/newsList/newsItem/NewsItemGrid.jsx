import './NewsItemGrid.scss';
import { Link, withRouter } from 'react-router-dom';
import * as routeType from '../../../constant/route/route';

const NewsGridItem = (props) => {
  const { data } = props;

  const moveToDetail = (e) => {
    e.preventDefault();
    props.history.push(`${routeType.ROUTE_NEWS_DETAIL_BUILD(props.data.id)}`);
  };

  return (
    <div className={`col-lg-4 news-grid-items`}>
      <Link to={`${routeType.ROUTE_NEWS_DETAIL_BUILD(props.data.id)}`} className="news-href">
        <div onClick={moveToDetail}>
          <div className="news-grid-item">
            <div className="news-grid-item-img">
              <img alt="news-grid-img" src={data.imageUrl} />
            </div>
            <div className="news-grid-item-content">
              <div className="news-grid-item-content-header">
                <div className="news-grid-title">
                  <b data-test-name="name">{data.title}</b>
                </div>
              </div>
              <p className="news-grid-item-description">{data.description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withRouter(NewsGridItem);
