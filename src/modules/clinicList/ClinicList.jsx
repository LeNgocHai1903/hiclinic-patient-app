import { useState, useEffect } from "react";

import "./ClinicList.scss";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import apiWrapper from "../../api/apiWrapper";
import * as routeType from "../../api/apiUrl";
import * as sortType from "../../constant/sorting/sorting";
import * as variableType from "../../constant/variable/variableNumber";

import { useTranslation } from "react-i18next";

import GridView from "./clinicItem/gridView/GridView";
import ListView from "./clinicItem/listView/ListView";

import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import MainSearchBar from "../../components/searchBar/mainSearchBar/MainSearchBar";

const ClinicList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listStyle, setListStyle] = useState("grid");
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [data, setData] = useState([]);
  const [changePage, setChangePage] = useState(1);

  const { t } = useTranslation();

  useEffect(() => {
    apiWrapper({
      url: `${routeType.GET_ALL_CLINIC}?size=${variableType.NUMBER_OF_PAGE_CLINIC_LIST}&page=${changePage}`,
      method: "GET",
    }).then((res) => {
      setData(res.clinics);
      setNumberOfPages(res.numberOfPage);
      setIsLoading(false);
    });
  }, [changePage]);

  const displayPagination = [];

  const changePageHandler = (i) => {
    setChangePage(i);
  };

  if (numberOfPages) {
    for (let i = 1; i < numberOfPages; i++) {
      displayPagination.push(
        <PaginationItem  active={i === changePage}>
          <PaginationLink onClick={() => changePageHandler(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }

  const changeStyleHandler = (e) => {
    setListStyle(e.target.value);
  };

  const changeSortHandler = (e) => {
    switch (e.target.value) {
      case sortType.SORT_BY_ALPHABET_INC:
        setData(
          [...data].sort((a, b) => {
            a = a.name || "";
            b = b.name || "";
            return a.localeCompare(b);
          })
        );
        break;
      case sortType.SORT_BY_ALPHABET_DECS:
        setData(
          [...data]
            .sort((a, b) => {
              a = a.name || "";
              b = b.name || "";
              return a.localeCompare(b);
            })
            .reverse()
        );
        break;
      default:
        return setData([...data]);
    }
  };

  return (
    <>
      <MainSearchBar />
      <div className="container">
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
          </select>
        </div>
        {isLoading ? (
          <div className="loading">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="row">
              {data.map((item) => {
                if (listStyle === "grid") {
                  return <GridView data={item} />;
                } else return <ListView />;
              })}
            </div>
            <Pagination className="list-pagination">
              <PaginationItem disabled={changePage === 1}>
                <PaginationLink previous onClick={() => changePageHandler(changePage -1)}/>
              </PaginationItem>
              {displayPagination}
              <PaginationItem disabled={numberOfPages-1 === changePage}>
                <PaginationLink next onClick={() => changePageHandler(changePage + 1)} />
              </PaginationItem>
            </Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default ClinicList;
