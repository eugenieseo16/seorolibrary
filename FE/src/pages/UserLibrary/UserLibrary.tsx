import React from 'react';

import SearchHeader from '@components/SearchHeader/SearchHeader';
import UserHeader from '@components/UserLibrary/UserHeader';
import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import UserStat from '@components/UserLibrary/UserStat';
import BookTab from '@components/UserLibrary/BookTab';

import './UserLibrary.styles.scss';

function UserLibrary() {
  return (
    <div className="user-library-container">
      {/* api 연결되면 userId로 구분해서 구현할 예정 */}
      {/* 타 사용자의 도서관일 경우 */}
      {/* <SearchHeader text="나의 도서관" /> */}
      {/* 나의 도서관일 경우 */}
      <UserHeader/>
      <UserProfile />
      <UserStat />
      <BookTab />
    </div>
  );
}

export default UserLibrary;
