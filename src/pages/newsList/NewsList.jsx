import { useEffect, useState } from "react";
import "./NewsList.scss";

import axios from "axios";

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NewsItem from "../../modules/news/NewsItem";
import LoaddingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/pagination/Pagination";

const NewsList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        "https://hiclinic-patient-portal-server.herokuapp.com/api/news"
      );
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <>
        <Header />
        {loading ? (
          <div className="loading">
            <LoaddingSpinner />
          </div>
        ) : (
          <Pagination data={data} type={"news"}  itemPerPage={6}>
            <NewsItem />
          </Pagination>
        )}
        <Footer />
      </>
    </div>
  );
};

export default NewsList;
