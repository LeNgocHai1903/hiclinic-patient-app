import { useState, useEffect } from "react";

import "./ClinicList.scss";

import axios from "axios";
import {useTranslation} from 'react-i18next';

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GridClinicItem from "../../modules/clinicItem/clinicItem-grid/ClinicItem-Grid";
import ListClinicItem from "../../modules/clinicItem/clinicItem-list/ClinicItem-List";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/mainSearchBar/MainSearchBar";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";


const ClinicList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listStyle, setListStyle] = useState("grid");
  const [data, setData] = useState([]);

  const {t} = useTranslation();

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
    switch (e.target.value) {
      case "alphabet inc":
        setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "alphabet desc":
        setData(
          [...data].sort((a, b) => a.name.localeCompare(b.name)).reverse()
        );
        break;
      case "rating inc":
        setData([...data].sort((a, b) => b.rating - a.rating));
        break;
      case "rating desc":
        setData([...data].sort((a, b) => a.rating - b.rating));
        break;
      default:
        return setData([...data]);
    }
  };
  console.log(data);
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
            <optgroup label="View Styles">
            <option value="grid"> {t('Grid')} </option>
            <option value="list"> {t('List')} </option>
            </optgroup>
          </select>

          <select
            id="sort-list"
            onChange={changeSortHandler}
            className="sort-option"
          >
            <optgroup label="Alphabet">
              <option value="alphabet inc"> {t('A - Z')}</option>
              <option value="alphabet desc"> {t('Z - A')}</option>
            </optgroup>
            <optgroup label="Rating">
              <option value="rating inc"> {t('From top')}</option>
              <option value="rating desc"> {t('From bottom')} </option>
            </optgroup>
          </select>
        </div>
        {!isLoading ? (
          <div className="loading">
            <LoadingSpinner />
          </div>
        ) : (
          <Pagination
            data={data}
            type="clinic"
            search={props.location.search.substr(6)}
            itemPerPage={6}
          >
            {listStyle === "grid" ? <GridClinicItem /> : <ListClinicItem />}
          </Pagination>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ClinicList;
