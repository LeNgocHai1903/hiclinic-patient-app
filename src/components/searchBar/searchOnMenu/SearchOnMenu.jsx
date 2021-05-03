import React from 'react';
import './SearchOnMenu.scss';
const SearchOnMenu = () => {
  return (
    <div className="search-on-menu">
      <input className="search-on-menu-input" />
      <i className="fa fa-search" style={{ fontSize: '20px' }}></i>
    </div>
  );
};

export default SearchOnMenu;
