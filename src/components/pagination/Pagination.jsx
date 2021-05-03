import React, { useState } from 'react';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import './Pagination.scss';
const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(props.itemPerPage);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  console.log(props.data);
  let currentItems;
  switch (props.type) {
    case 'clinic':
      currentItems = props.data.filter((searchItem) =>
        searchItem.clinicName.toLowerCase().includes(props.search.toLowerCase()),
      );
      break;
    case 'news':
      currentItems = props.data;
      break;
    default:
      break;
  }
  const sortItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(currentItems.length / itemPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="row">{sortItems.map((data) => React.cloneElement(props.children, { data, key: data.id }))}</div>
      <div className="page">
        <ul className="page-list">
          <button
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'page-link-arrow' : 'page-link-arrow-active'}
            onClick={() => paginate(currentPage - 1)}
          >
            <IoIosArrowBack />
          </button>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? 'page-link-active' : 'page-link'}
              >
                {number}
              </button>
            </li>
          ))}
          <button
            disabled={currentPage === pageNumbers.length}
            className={currentPage === pageNumbers.length ? 'page-link-arrow' : 'page-link-arrow-active'}
            onClick={() => paginate(currentPage + 1)}
          >
            <IoIosArrowForward />
          </button>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
