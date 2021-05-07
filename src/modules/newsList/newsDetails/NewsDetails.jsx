import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import apiWrapper from '../../../api/apiWrapper';
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner';

import {NEWS_URL} from '../../../api/apiUrl';

import './NewsDetails.scss';

const NewsDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsId = useParams();
  // const createMarkup = (content) => {
  //   return { __html: content };
  // };

  const { t } = useTranslation();

  useEffect(() => {
    apiWrapper({
      url: `${NEWS_URL}/${newsId.newsId}`,
      method: 'GET',
    }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [newsId.newsId]);
  if (data) {
    const createMarkup = () => {
      return { __html: data.content };
    };
    return (
      <div>
        {loading ? (
          <div className="loading">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="news-details">
            <h1 className="news-title">{data.title}</h1>
            <img src={data.imageUrl} alt="News" />
            <div className="news-info">
              <p className="author">
                {t('author')} {data.authorName}
              </p>
            </div>
            <p className="content">
              <div dangerouslySetInnerHTML={createMarkup(data.content)} />
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default NewsDetails;