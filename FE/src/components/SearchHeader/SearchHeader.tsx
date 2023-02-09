import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MdSearch } from 'react-icons/md';

import './SearchHeader.styles.scss';

interface ISearchHeaderProps {
  text: string;
  search?: boolean;
}

function SearchHeader({ text, search = true }: ISearchHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="search-header-container">
      <h1>{text}</h1>
      {search && <MdSearch size={'2rem'} onClick={() => navigate(`/search`)} />}
    </div>
  );
}

export default SearchHeader;
