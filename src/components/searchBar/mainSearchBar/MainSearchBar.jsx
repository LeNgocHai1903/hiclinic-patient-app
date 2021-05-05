import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import apiWrapper from '../../../api/apiWrapper';
import { Formik } from 'formik';
import * as yup from 'yup';
import './MainSearchBar.scss';
import { FaSearch } from 'react-icons/fa';
import * as routeType from '../../../constant/route/route.js';

const MainSearchBar = (props) => {
  const history = useHistory();
  const [clinics, setClinics] = useState([]);
  const [data,setData] = useState(null);
  const [searchType, setSearchType] = useState('clinic');
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);
  const typingTimeOutRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  let dataOption = [];
  const { t } = useTranslation();
  const variableSearchType = [t('clinic'), t('department'), t('doctor')];

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      apiWrapper({
        url: `${process.env.REACT_APP_PATIENT_SEARCH_SERVER}?field=${searchType}&value=${searchValue}`,
        method: 'GET',
      }).then((res) => {
        setData(res);
        setClinics(res.clinics)
        setLoading(false);
      });
    }
    return () => {
      clearTimeout(typingTimeOutRef.current);
    };
  }, [searchValue]);

  const selectChangeHandler = (e) => {
    setSearchType(e.target.value);
  };
  const searchChangeHandler = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 300);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: `${routeType.ROUTE_CLINICLIST_LIST}`,
      state: {
        searchValue: searchValue,
        searchType: searchType
      },
      search: `?search=${searchValue}`,
    });
  };

  //formik
  const initialValueSearch = {
    searchValues: '',
  };
  const validationSchema = yup.object().shape({
    searchValue: yup.string().required(t('requiredField')),
  });

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

  if (clinics !== null ){
    dataOption = clinics.filter((d) => {
        return d.clinicName.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue;
      })
      .sort((a, b) => a.clinicName.localeCompare(b.clinicName));
  }
  return (
    <>
      <Formik inititalValue={initialValueSearch} validationSchema={validationSchema}>
        {(formik) => {
          const { handleBlur, handleSubmit } = formik;
          return (
            <form onSubmit={formSubmit}>
              <div className="main-search-bar">
                <div className="search-icon-input-area">
                  <FaSearch className="search-icon" />
                  <input
                    name="search"
                    className="search-input"
                    type="search"
                    placeholder={t('searchFor') + ' ' + searchType}
                    onChange={searchChangeHandler}
                    // value={searchValue}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>

                <select className="search-type" onChange={selectChangeHandler}>
                  {variableSearchType.map((type) => (
                    <option value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="clinic-list-for-search" ref={wrapperRef}>
                <ListGroup className="main-search-bar-list">
                  {!!dataOption &&
                    !loading &&
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
                  {display && dataOption.length === 0 && !loading && (
                    <ListGroupItem>{t('resultNotFound')}</ListGroupItem>
                  )}
                </ListGroup>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
export default MainSearchBar;