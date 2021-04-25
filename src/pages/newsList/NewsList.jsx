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

  const changeSortHandler = (e) => {
    if (e.target.value === "alphabet inc") {
      setData([...data].sort((a, b) => a.title.localeCompare(b.name)));
    } else {
      setData(
        [...data].sort((a, b) => a.title.localeCompare(b.name)).reverse()
      );
    }
  };

  return (
    <div>
      <>
        <Header />
        {loading ? (
          <div className="loading">
            <LoaddingSpinner />
          </div>
        ) : (
          <div>
            <h1>News List</h1>
            <div className="news-sort">
              <select
                id="sort-list"
                onChange={changeSortHandler}
                className="sort-option"
              >
                <optgroup label="Alphabet">
                  <option value="alphabet inc"> A - Z </option>
                  <option value="alphabet desc"> Z - A </option>
                </optgroup>
              </select>
            </div>
            <Pagination data={data} type={"news"} itemPerPage={6}>
              <NewsItem />
            </Pagination>
          </div>
        )}
        <Footer />
      </>
    </div>
  );
};

export default NewsList;
