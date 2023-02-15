import React from 'react';

import './Near.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import NearBooks from '@components/NearBooks/NearBooks';
import UserAddressToggle from '@components/NearBooks/UserAddressToggle';
import { useUser } from '@src/hooks/useUser';
import { BiMap } from 'react-icons/bi';

function Near() {
  const user = useUser();
  return (
    <div className="near-container">
      <SearchHeader text="근처 빌릴 수 있는 도서" />
      <div className="location-item">
        <BiMap size={'1.5rem'} />
        <span>⠀{user?.memberDongCode}</span>
      </div>

      {/* <UserAddressToggle /> */}
      <NearBooks />
    </div>
  );
}

export default Near;
