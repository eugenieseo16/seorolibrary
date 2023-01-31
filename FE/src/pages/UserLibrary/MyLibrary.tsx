import React from 'react';

import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import BookTab from '@components/UserLibrary/BookTab';

import './UserLibrary.styles.scss';

function UserLibrary() {
  return (
    <div className="user-library-container">
      <h1>나의 도서관</h1>
      <UserProfile />
      <BookTab />

    </div>
  );
}

export default UserLibrary;
