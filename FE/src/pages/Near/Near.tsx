import React from 'react';

import './Near.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import NearBooks from '@components/InfiniteScroll/NearBooks';
import UserAddressToggle from '@components/UserAddressToggle';

function Near() {
  return (
    <div className="near-container">
      <SearchHeader text="근처 빌릴 수 있는 도서" />
      <UserAddressToggle />
      <NearBooks />
    </div>
  );
}

export default Near;
