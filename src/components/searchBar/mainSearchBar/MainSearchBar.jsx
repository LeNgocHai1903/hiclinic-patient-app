import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import {apiWrapper} from "../../../apiWrapper/apiWrapper";
import { BASE_URL } from "../../../constant/apiUrl/apiUrl";
import * as routeType from "../../../constant/route/route";

import { Link, withRouter } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import "./MainSearchBar.scss";
import { FaSearch } from "react-icons/fa";

import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const MainSearchBar = (props) => {
  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState("Clinic");
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  const { t } = useTranslation();

  const variableSearchType = ["Clinic", "Department", "Doctor"];

  useEffect(() => {
    apiWrapper.get('/clinic').then(res => {
      setData(res);
    })
  }, []);

  const changeHandler = (e) => {
    setSearchType(e.target.value);
  };

  //formik
  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },

    onSubmit: (values) => {
      props.history.push(
        `${routeType.ROUTE_CLINICLIST_LIST}?sort=${values.searchValue}`
      );
    },

    validationSchema: yup.object({
      searchValue: yup.string().required("Required field"),
    }),
  });

  useEffect(() => {
    if (formik.values.searchValue === "") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [formik.values.searchValue]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDisplay(false);
    }
  };
  const dataOption = data.filter((d) => {
    return (
      d.name.toLowerCase().includes(formik.values.searchValue.toLowerCase()) ||
      !formik.values.searchValue
    );
  });

  return (
    <>
          <form onSubmit={formik.handleSubmit}>
            <div className="main-search-bar">
              <FaSearch />
              <input
                name="searchValue"
                className="search-input"
                type="search"
                placeholder={"Search for " + searchType}
                onChange={formik.handleChange}
                value={formik.values.searchValue}
                onBlur={formik.handleBlur}
              />

              <select className="search-type" onChange={changeHandler}>
                {variableSearchType.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="clinic-list-for-search" ref={wrapperRef}>
              <ListGroup className="main-search-bar-list">
                {dataOption.length > 0
                  ? dataOption
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(
                        (item) =>
                          display && (
                            <Link
                              to={`${routeType.ROUTE_CLINICLIST_LIST}?sort=${item.name}`}
                            >
                              <ListGroupItem
                                className="listgroup-item"
                                key={item.id}
                              >
                                {item.name}
                              </ListGroupItem>
                            </Link>
                          )
                      )
                  : display && (
                      <ListGroupItem>{t("resultNotFound")}</ListGroupItem>
                    )}
              </ListGroup>
            </div>
          </form>
    </>
  );
};
export default withRouter(MainSearchBar);
