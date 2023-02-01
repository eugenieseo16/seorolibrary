import React from 'react';
import { MdSearch } from 'react-icons/md';

import './SearchHeader.styles.scss';

interface ISearchHeaderProps {
  text: string;
  search?: boolean;
}

function SearchHeader({ text, search = true }: ISearchHeaderProps) {
  return (
    <div className="search-header-container">
      <h1>{text}</h1>
      {search && <MdSearch size={'2rem'} />}
    </div>
  );
}

export default SearchHeader;
