import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Header from '@components/Header/Header';
import UserHeader from '@components/UserLibrary/UserHeader';
import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import UserStat from '@components/UserLibrary/UserStat';
import BookTab from '@components/UserLibrary/BookTab';

import './UserLibrary.styles.scss';
import { getUserProfileAPI } from '@src/API/authAPI';

function UserLibrary() {
  const { state } = useLocation();

  const location = useLocation();
  const path = location.pathname;
  const params = useParams();
  console.log(params);
  const userProfile = params.userId ? getUserProfileAPI(params.userId) : '';
  return (
    <div className="user-library-container">
      {path === '/profile' ? (
        <UserHeader />
      ) : (
        <Header text={userProfile?.memberName + '님의 도서관'} />
      )}

      <UserProfile isMe={state} />
      <UserStat />
      <BookTab />
    </div>
  );
}

export default UserLibrary;
