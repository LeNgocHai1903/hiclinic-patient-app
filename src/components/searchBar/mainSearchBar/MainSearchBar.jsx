import React, { useState, useEffect, useRef } from 'react';
import apiWrapper from '../../../api/apiWrapper';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as routeType from '../../../constant/route/route.js';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';

import './MainSearchBar.scss';
const MainSearchBar = (props) => {
  const history = useHistory();
  const [clinics, setClinics] = useState([]);
  const [data, setData] = useState(null);
  const [searchType, setSearchType] = useState('clinic');
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);
  const typingTimeOutRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const variableSearchType = [t('clinic'), t('department'), t('doctor')];
  let dataOption = [];
  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SEARCH_SERVER}?field=${searchType.toLowerCase()}&value=${searchValue}`,
        method: 'GET',
      })
        .then((res) => {
          setData(res);
          setClinics(res.clinics);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      clearTimeout(typingTimeOutRef.current);
    };
  }, [searchValue, searchType]);

  const selectChangeHandler = (e) => {
    setSearchType(e.target.value);
  };
  const searchChangeHandler = (e) => {
    setLoading(true);
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 200);
  };
  const formSubmit = (e) => {
    history.push({
      pathname: `${routeType.ROUTE_CLINICLIST_LIST}`,
      state: {
        searchValue: searchValue,
        searchType: searchType,
      },
      search: `?search=${searchValue}`,
    });
  };

  //formik
  const initialValueSearch = {
    searchValue: '',
  };
  const validationSchema = yup.object().shape({
    searchValue: yup.string().required(t('requiredField')),
  });

  const onSubmit = (values, actions) => {
    history.push(`/clinicList?searchValue=${searchValue}`);
  };

  useEffect(() => {
    if (searchValue === '') {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [searchValue]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDisplay(false);
    }
  };
  if (clinics !== null) {
    dataOption = clinics
      .filter((d) => {
        return d.clinicName.toLowerCase();
      })
      .sort((a, b) => a.clinicName.localeCompare(b.clinicName));
  }
  return (
    <>
      <Formik inititalValue={initialValueSearch} validationSchema={validationSchema}>
        {(formik) => {
          const { handleBlur } = formik;
          return (
            <form className="main-form" onSubmit={formSubmit}>
              <div className="main-search-bar">
                <div className="search-icon-input-area">
                  <FaSearch className="search-icon" />
                  <input
                    name="search"
                    className="search-input"
                    type="search"
                    placeholder={t('searchFor') + ' ' + searchType.toLowerCase()}
                    onChange={searchChangeHandler}
                    // value={searchValue}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {loading && display ? (
                    <div className="loading-result">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <div className="clinic-list-for-search" ref={wrapperRef}>
                      <ListGroup className="main-search-bar-list">
                        {!!dataOption &&
                          dataOption.map(
                            (item) =>
                              display && (
                                <Link
                                  to={{
                                    pathname: `${routeType.ROUTE_CLINICLIST_LIST}`,
                                    state: item,
                                    search: `?search=${item.clinicName}`,
                                  }}
                                >
                                  <ListGroupItem className="list-group-item" key={item.id}>
                                    {item.clinicName}
                                  </ListGroupItem>
                                </Link>
                              ),
                          )}
                        {display && dataOption.length === 0 && <ListGroupItem>{t('resultNotFound')}</ListGroupItem>}
                      </ListGroup>
                    </div>
                  )}
                </div>

                <select className="search-type" onChange={selectChangeHandler}>
                  {variableSearchType.map((type) => (
                    <option value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
export default withRouter(MainSearchBar);