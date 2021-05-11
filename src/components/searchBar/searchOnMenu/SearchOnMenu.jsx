import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import './SearchOnMenu.scss';
import { FaSearch } from 'react-icons/fa';
import * as routeType from '../../../constant/route/route.js';

const SearchOnMenu = (props) => {
  const history = useHistory();
  const typingTimeOutRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();
  const searchType = 'clinic';

  const searchChangeHandler = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 30);
  };

  //formik
  const initialValueSearch = {
    searchValue: '',
  };
  const validationSchema = yup.object().shape({
    searchValue: yup.string().required(t('requiredField')),
  });
  const formSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: `${routeType.ROUTE_CLINICLIST_LIST}`,
      state: {
        searchValue: searchValue,
        searchType: searchType,
      },
      search: `?search=${searchValue}`,
    });
  };
  return (
    <>
      <Formik inititalValue={initialValueSearch} validationSchema={validationSchema}>
        {({ handleBlur }) => (
          <form onSubmit={formSubmit}>
            <div className="search-on-menu-container">
              <div className="search-on-menu">
                <FaSearch className="search-icon-on-menu" />
                <input
                  name="search"
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
