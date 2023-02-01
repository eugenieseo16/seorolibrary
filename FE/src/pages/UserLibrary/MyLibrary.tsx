import React from 'react';

import SearchHeader from '@components/SearchHeader/SearchHeader';
import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import BookTab from '@components/UserLibrary/BookTab';

import './UserLibrary.styles.scss';

function UserLibrary() {
  return (
    <div className="user-library-container">
      <SearchHeader text="나의 도서관" />
      <UserProfile />
      <BookTab />
    </div>
  );
}

export default UserLibrary;
