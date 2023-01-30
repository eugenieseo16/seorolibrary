import React from 'react';
import { MdSearch } from 'react-icons/md';

import './SearchHeader.styles.scss';

function SearchHeader() {
  return (
    <div className="search-header-container">
      <h1>독서모임 추천</h1>
      <MdSearch size={'2rem'} />
    </div>
  );
}

export default SearchHeader;
