import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './MainSearchBar.scss';

import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner';

const MainSearchBar = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState("Clinic");

  const variableSearchType = ["Clinic", "Department", "Doctor"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          "https://hiclinic-patient-portal-server.herokuapp.com/api/clinic"
        );
        setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const changeHandler = (e) => {
    setSearchType(e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },

    onSubmit: (values) => {
      window.location.href=`/clinicList?sort=${values.searchValue}`
    },

    validationSchema: yup.object({
      searchValue: yup.string().required("Required field"),
    }),
  });

  console.log(formik.values)

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className="main-search-bar">
              <input
                name= "searchValue"
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
            <div className="clinic-list-for-search">
              <ListGroup className="main-search-bar-list">
                {data
                  .filter((d) => {
                    if (formik.values.searchValue === "") {
                      return;
                    } else if (
                      d.name.toLowerCase().includes(formik.values.searchValue.toLowerCase())
                    ) {
                      return d;
                    }
                  })
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Link to={`/clinicList?sort=${item.name}`}>
                      <ListGroupItem className="listgroup-item" key={item.id}>
                        {item.name}
                      </ListGroupItem>
                    </Link>
                  ))}
              </ListGroup>
            </div>
          </form>
        </>
      )}
    </>
  );
};
export default MainSearchBar;
