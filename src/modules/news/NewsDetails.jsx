import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import apiWrapper from '../../api/apiWrapper';

import './NewsDetails.scss';

const NewsDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsId = useParams();

  const { t } = useTranslation();

  useEffect(() => {
    apiWrapper({
      url: `${process.env.REACT_APP_PATIENT_NEWS_DETAILS_SERVER}/${newsId.newsId}`,
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
          <div className="loading">{t('loading')}</div>
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
              <div dangerouslySetInnerHTML={createMarkup()} />
            </p>
          </div>
        )}
      </div>
    );
  }
  // else {
  //   return <div></div>;
  // }
};

export default NewsDetails;
