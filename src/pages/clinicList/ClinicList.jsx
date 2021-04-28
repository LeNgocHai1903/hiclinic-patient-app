import { useState, useEffect } from 'react';

import './ClinicList.scss';

import {apiWrapper} from '../../apiWrapper/apiWrapper';
import * as sortType from '../../constant/sorting/sorting';

import { useTranslation } from 'react-i18next';

import GridView from '../../modules/clinicItem/gridView/GridView';
import ListView from '../../modules/clinicItem/listView/ListView';
import Pagination from '../../components/pagination/Pagination';
import SearchBar from '../../components/searchBar/mainSearchBar/MainSearchBar';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ClinicList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listStyle, setListStyle] = useState("grid");
  const [data, setData] = useState([]);

  const { t } = useTranslation();
  
  const search = props.location.search;
  useEffect(() => {
    apiWrapper.get('/clinic').then(res => {
      console.log(res.sort((a, b) => a.name.localeCompare(b.name)))
      setData(res.sort((a, b) => a.name.localeCompare(b.name)));
      setIsLoading(false)
    })
  }, []);

  const changeStyleHandler = (e) => {
    setListStyle(e.target.value);
  };

  const changeSortHandler = (e) => {
    switch (e.target.value) {
      case sortType.SORT_BY_ALPHABET_INC:
        setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case sortType.SORT_BY_ALPHABET_DECS:
        setData(
          [...data].sort((a, b) => a.name.localeCompare(b.name)).reverse()
        );
        break;
      case sortType.SORT_BY_RATING_INC:
        setData([...data].sort((a, b) => b.rating - a.rating));
        break;
      case sortType.SORT_BY_RATING_DECS:
        setData([...data].sort((a, b) => a.rating - b.rating));
        break;
      default:
        return setData([...data]);
    }
  };
  return (
    <>
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
              <option value="grid"> {t("grid")} </option>
              <option value="list"> {t("list")} </option>
            </optgroup>
          </select>

          <select
            id="sort-list"
            onChange={changeSortHandler}
            className="sort-option"
          >
            <optgroup label="Alphabet">
              <option value="alphabet inc"> {t("a_z")}</option>
              <option value="alphabet desc"> {t("z_a")}</option>
            </optgroup>
            <optgroup label="Rating">
              <option value="rating inc"> {t("fromTop")}</option>
              <option value="rating desc"> {t("fromBottom")} </option>
            </optgroup>
          </select>
        </div>
        {isLoading ? (
          <div className="loading">
            <LoadingSpinner />
          </div>
        ) : (
          <Pagination
            data={data}
            type="clinic"
            search={!search  ? '' : search.substr(6)}
            itemPerPage={6}
          >
            {listStyle === "grid" ? <GridView /> : <ListView />}
          </Pagination>
        )}
      </div>
    </>
  );
};

export default ClinicList;
