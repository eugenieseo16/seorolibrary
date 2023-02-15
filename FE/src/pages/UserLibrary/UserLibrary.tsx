import React from 'react';
import { useParams } from 'react-router-dom';

import './UserLibrary.styles.scss';
import Header from '@components/Header/Header';
import UserHeader from '@components/UserLibrary/UserHeader';
import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import UserStat from '@components/UserLibrary/UserStat';
import BookTab from '@components/UserLibrary/BookTab';
import { getUserProfileAPI } from '@src/API/authAPI';
import { useUser } from '@src/hooks/useUser';

function UserLibrary() {
  const user = useUser();
  const { username } = useParams();
  const userProfile = username ? getUserProfileAPI(username) : '';
  console.log(username, user?.memberName);

  return (
    <div className="user-library-container">
      {user?.memberName == username || !username ? (
        <UserHeader />
      ) : (
        <Header text={userProfile?.memberName + '님의 도서관'} />
      )}

      <UserProfile isMe={user?.memberName == username || !username} />
      <UserStat />
      <BookTab />
    </div>
  );
}

export default UserLibrary;
