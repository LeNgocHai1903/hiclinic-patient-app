import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import './NewsDetails.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import LoaddingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const NewsDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsId = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://hiclinic-patient-portal-server.herokuapp.com/api/news/${newsId.newsId}`
      );
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [newsId.newsId]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="loading"><LoaddingSpinner/></div>
      ) : (

        <div className="news-details">
          <h1 className="news-title">{data[0].title}</h1>
          <img src={data[0].image} alt="News" />
          <div className="news-info">
            <p className="author">
              Author: {data[0].author}
            </p>
            <p className="created-date">
              Created on: {data[0].createdDate}
            </p>
          </div>
          <p className="content">
            {data[0].content}
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default NewsDetails;
