import React, { useState, useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { Link, withRouter, useHistory } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import './MainSearchBar.scss';
import { FaSearch } from 'react-icons/fa';
import apiWrapper from '../../../api/apiWrapper';

import * as routeType from '../../../constant/route/route.js';

const MainSearchBar = (props) => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState('clinic');
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  const { t } = useTranslation();
  const variableSearchType = [t('clinic'), t('department'), t('doctor')];

  useEffect(() => {
    apiWrapper({ url: `${process.env.REACT_APP_PATIENT_SEARCH_SERVER}?field=${searchType}&value=${searchValue}`, method: 'GET' }).then((res) => {
      setData(res.clinics);
    });
  }, [searchType,searchValue]);

  const changeHandler = (e) => {
    setSearchType(e.target.value);
  };

  //formik
  const initialValueSearch = {
    searchValue: '',
  };
  const validationSchema = yup.object().shape({
    searchValue: yup.string().required(t('requiredField')),
  });

  const onSubmit = (values, actions) => {
    history.push(`/clinicList?searchValue=${searchValue}`)
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
  const dataOption = data
    .filter((d) => {
      return d.clinicName.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue;
    })
    .sort((a, b) => a.clinicName.localeCompare(b.clinicName));

  return (
    <>
      <Formik inititalValue={initialValueSearch} validationSchema={validationSchema}>
        {({ handleBlur, searchValue }) => (
          <form onSubmit={onSubmit}>
            <div className="main-search-bar">
              <div className="search-icon-input-area">
                <FaSearch className="search-icon" />
                <input
                  name="searchValue"
                  className="search-input"
                  type="search"
                  placeholder={t('searchFor') + ' ' + searchType}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  value={searchValue}
                  onBlur={handleBlur}
                  autoComplete = "off"
                />
              </div>

              <select className="search-type" onChange={changeHandler}>
                {variableSearchType.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="clinic-list-for-search" ref={wrapperRef}>
              <ListGroup className="main-search-bar-list">
                {dataOption.length > 0
                  ? dataOption.map(
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
                    )
                  : display && <ListGroupItem >{t('resultNotFound')}</ListGroupItem>}
              </ListGroup>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
export default withRouter(MainSearchBar);
