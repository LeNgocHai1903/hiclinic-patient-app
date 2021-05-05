import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, useHistory } from 'react-router-dom';
import apiWrapper from '../../../api/apiWrapper';
import { Formik } from 'formik';
import * as yup from 'yup';
import './SearchOnMenu.scss';
import { FaSearch } from 'react-icons/fa';
import * as routeType from '../../../constant/route/route.js';

const SearchOnMenu = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const typingTimeOutRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();
  const searchType = 'clinic';
  useEffect(() => {
    if (searchValue) {
      apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SEARCH_SERVER}?field=${searchType}&value=${searchValue}`,
        method: 'GET',
      }).then((res) => {
        setData(res.clinics);
      });
    }
    return () => {
      clearTimeout(typingTimeOutRef.current);
    };
  }, [searchValue]);

  const searchChangeHandler = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 300);
  };
  const filterChangeHandler = () => {
    history.replace(`${routeType.ROUTE_CLINICLIST_LIST}/?search=${searchValue}`);
  };

  //formik
  const initialValueSearch = {
    searchValue: '',
  };
  const validationSchema = yup.object().shape({
    searchValue: yup.string().required(t('requiredField')),
  });

  // if (data !== null) {
  //   dataOption = data
  //     .filter((d) => {
  //       return d.clinicName.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue;
  //     })
  //     .sort((a, b) => a.clinicName.localeCompare(b.clinicName));
  // }

  return (
    <>
      <Formik inititalValue={initialValueSearch} validationSchema={validationSchema}>
        {({ handleBlur }) => (
          <form onSubmit={filterChangeHandler}>
            <div className="search-on-menu-container">
              <div className="search-on-menu">
                <FaSearch className="search-icon-on-menu" />
                <input
                  name="searchValue"
                  className="search-input-on-menu"
                  type="search"
                  onChange={searchChangeHandler}
                  // value={searchValue}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
export default withRouter(SearchOnMenu);