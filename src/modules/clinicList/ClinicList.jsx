import { useState, useEffect } from 'react';

import './ClinicList.scss';

import apiWrapper from '../../api/apiWrapper';
import * as sortType from '../../constant/sorting/sorting';
import * as variableType from '../../constant/variable/variableNumber';

import { useTranslation } from 'react-i18next';

import GridView from './clinicItem/gridView/GridView';
import ListView from './clinicItem/listView/ListView';
import Pagination from '../../components/pagination/Pagination';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ClinicList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listStyle, setListStyle] = useState('grid');
  const [data, setData] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    apiWrapper({ url: `${process.env.REACT_APP_PATIENT_SERVER_URL_FAKE}/clinic`, method: 'GET' }).then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);
  console.log(data);

  const changeStyleHandler = (e) => {
    setListStyle(e.target.value);
  };

  const changeSortHandler = (e) => {
    switch (e.target.value) {
      case sortType.SORT_BY_ALPHABET_INC:
        setData(
          [...data].sort((a, b) => {
            a = a.name || '';
            b = b.name || '';
            return a.localeCompare(b);
          }),
        );
        break;
      case sortType.SORT_BY_ALPHABET_DECS:
        setData(
          [...data]
            .sort((a, b) => {
              a = a.name || '';
              b = b.name || '';
              return a.localeCompare(b);
            })
            .reverse(),
        );
        break;
      default:
        return setData([...data]);
    }
  };
  return (
    <>
      <div className="container">
        <div className="select-group">
          <select id="grid-list" className="style-option" onChange={changeStyleHandler}>
            <optgroup label="View Styles">
              <option value="grid"> {t('grid')} </option>
              <option value="list"> {t('list')} </option>
            </optgroup>
          </select>

          <select id="sort-list" onChange={changeSortHandler} className="sort-option">
            <optgroup label="Alphabet">
              <option value="alphabet inc"> {t('a_z')}</option>
              <option value="alphabet desc"> {t('z_a')}</option>
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
            search={!props.location.state ? '' : props.location.state.clinicName}
            itemPerPage={variableType.NUMBER_OF_PAGE_CLINIC_LIST}
          >
            {listStyle === 'grid' ? <GridView /> : <ListView />}
          </Pagination>
        )}
      </div>
    </>
  );
};

export default ClinicList;
