import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {useTranslation} from 'react-i18next';

import {apiWrapper} from '../../apiWrapper/apiWrapper';

import './NewsDetails.scss';
import LoaddingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const NewsDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsId = useParams();

  const {t}  = useTranslation();

  useEffect(() => {
    apiWrapper.get(`/news/${newsId.newsId}`).then(res=>{
      setData(res);
      setLoading(false);
    })
  }, [newsId.newsId]);

  return (
    <div>
      {loading ? (
        <div className="loading"><LoaddingSpinner/></div>
      ) : (

        <div className="news-details">
          <h1 className="news-title">{data[0].title}</h1>
          <img src={data[0].image} alt="News" />
          <div className="news-info">
            <p className="author">
              {t('author')} {data[0].author}
            </p>
            <p className="created-date">
              {t('createdOn')} {data[0].createdDate}
            </p>
          </div>
          <p className="content">
            {data[0].content}
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
