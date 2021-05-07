import { useEffect, useState } from 'react';
import './NewsList.scss';
import { useTranslation } from 'react-i18next';

import NewsItem from '../../modules/news/NewsItem';

import apiWrapper from '../../api/apiWrapper';
import * as sortType from '../../constant/sorting/sorting';
import { NEWS_URL } from '../../api/apiUrl';

const NewsList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    apiWrapper({ url: `${NEWS_URL}/news`, method: 'GET' }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

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

  return (
    <div>
      <>
        {loading ? (
          <div className="loading">
            {/* <LoaddingSpinner /> */}
            {t('loading')}
          </div>
        ) : (
          <div>
            <h1>{t('newsList')}</h1>
            <div className="news-sort">
              <select id="sort-list" onChange={changeSortHandler} className="sort-option">
                <optgroup label="Alphabet">
                  <option value="alphabet inc"> {t('a_z')} </option>
                  <option value="alphabet desc"> {t('z_a')} </option>
                </optgroup>
              </select>
            </div>
            <NewsItem />
          </div>
        )}
      </>
    </div>
  );
};

export default NewsList;
