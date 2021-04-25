import { useState, useEffect } from "react";

import "./ClinicList.scss";

import axios from "axios";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GridClinicItem from "../../modules/clinicItem/clinicItem-grid/ClinicItem-Grid";
import ListClinicItem from "../../modules/clinicItem/clinicItem-list/ClinicItem-List";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/mainSearchBar/MainSearchBar";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const ClinicList = (props) => {
  console.log(props.location.search.substr(6))
  const [isLoading, setIsLoading] = useState(false);
  const [listStyle, setListStyle] = useState("grid");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://hiclinic-patient-portal-server.herokuapp.com/api/clinic"
      );
      setData(result.data.sort((a, b) => a.name.localeCompare(b.name)));
    };
    fetchData();
    setIsLoading(true);
  }, []);

  const changeStyleHandler = (e) => {
    setListStyle(e.target.value);
  };

  const changeSortHandler = (e) => {
    if (e.target.value === "alphabet inc") {
      setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setData([...data].sort((a, b) => a.name.localeCompare(b.name)).reverse());
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="clinicList-search-bar">
        <SearchBar />
        </div>
          <div className="select-group">
            <select
              id="grid-list"
              className="style-option"
              onChange={changeStyleHandler}
            >
              <option value="grid"> Grid </option>
              <option value="list"> List </option>
            </select>

            <select
              id="sort-list"
              onChange={changeSortHandler}
              className="sort-option"
            >
              <option value="alphabet inc"> A - Z </option>
              <option value="alphabet desc"> Z - A </option>
            </select>
          </div>
          {!isLoading ? (
            <div className="loading">
              <LoadingSpinner />
            </div>
          ) : (
            <Pagination data={data} type="clinic" search={props.location.search.substr(6)} itemPerPage={6}>
              {listStyle === "grid" ? <GridClinicItem /> : <ListClinicItem />}
            </Pagination>
          )}
        </div>
        <Footer />
    </>
  );
};

export default ClinicList;
