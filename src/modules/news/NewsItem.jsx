
import './NewsItem.scss';
import { Link } from 'react-router-dom';

const NewsItem = (props) => {

  return (
    <div className="news-item-container">
      <Link to ={`/news/detail/${props.data.id}`} className="news-href">
        <div className="news-item">
          <img src={props.data.image} alt="" />
          <div className="news-item-content">
            <h3>{props.data.title}</h3>
            <p className="news-item-description">{props.data.shortDescription}</p>
            <Link to={`/news/detail/${props.data.id}`} className="news-item-details">
                More Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsItem;
