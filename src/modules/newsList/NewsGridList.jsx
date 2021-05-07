import { useEffect, useState } from 'react';
import './NewsGridList.scss';
import { useTranslation } from 'react-i18next';

import MainSearchBar from '../../components/searchBar/mainSearchBar';
import NewsItemGrid from '../../modules/newsList/newsItem/NewsItemGrid';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { Pagination, PaginationItem, Paginationitem, PaginationLink } from 'reactstrap';
import apiWrapper from '../../api/apiWrapper';
import * as sortType from '../../constant/sorting/sorting';
import * as variableType from '../../constant/variable/variableNumber';

const NewsGridList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changePage, setChangePage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    apiWrapper({
      url: `${process.env.REACT_APP_PATIENT_NEWS_SERVER}/?size=${variableType.NUMBER_OF_PAGE_NEWS_LIST_HOMEPAGE}&page=${changePage}`,
      method: 'GET',
    }).then((res) => {
      setData(res);
      setNumberOfPages(res.numberOfPage);
      setLoading(false);
    });
  }, [changePage]);

  const changeSortHandler = (e) => {
    switch (e.target.value) {
      case sortType.SORT_BY_ALPHABET_INC:
        setData([...data].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case sortType.SORT_BY_ALPHABET_DECS:
        setData([...data].sort((a, b) => a.title.localeCompare(b.title)).reverse());
        break;
      default:
        return setData([...data]);
    }
  };

  const displayPagination = [];

  const changePageHandler = (index) => {
    setChangePage(index);
  };

  if (numberOfPages) {
    for (let i = 0; i < numberOfPages; i++) {
      displayPagination.push(
        <PaginationItem active={i === changePage}>
          <PaginationLink onClick={() => changePageHandler(i)}>{++i}</PaginationLink>
        </PaginationItem>,
      );
    }
  }

  return (
    <div>
      <>
        {loading ? (
          <div className="loading">
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <MainSearchBar />
            <h1>{t('newsList')}</h1>
            <div className="news-sort">
              <select id="sort-list" onChange={changeSortHandler} className="sort-option">
                <optgroup label="Alphabet">
                  <option value="alphabet inc"> {t('a_z')} </option>
                  <option value="alphabet desc"> {t('z_a')} </option>
                </optgroup>
              </select>
            </div>
            {/* <Pagination data={data} type={'news'} itemPerPage={3}>
              <NewsItemGrid />
            </Pagination> */}
            {data.map((item) => {
              return <NewsItemGrid data={item} />;
            })}
            <Pagination className="list-pagination">
              <Paginationitem disabled={changePage === 0}>
                <PaginationLink previous onClick={() => changePageHandler(changePage)} />
              </Paginationitem>
              {displayPagination}
              <Paginationitem disabled={changePage === 0}>
                <PaginationLink next onClick={() => changePageHandler(changePage)} />
              </Paginationitem>
            </Pagination>
          </div>
        )}
      </>
    </div>
  );
};

export default NewsGridList;
