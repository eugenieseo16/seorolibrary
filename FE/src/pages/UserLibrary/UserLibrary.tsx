import React from 'react';
import { useParams } from 'react-router-dom';

import './UserLibrary.styles.scss';
import Header from '@components/Header/Header';
import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import UserStat from '@components/UserLibrary/UserStat';
import BookTab from '@components/UserLibrary/BookTab';
import { getUserProfileAPI } from '@src/API/authAPI';
import { useUser } from '@src/hooks/useUser';
import { libraryDataAPI } from '@src/API/libraryAPI';

function UserLibrary() {
  const { username } = useParams();
  const userProfile = username ? getUserProfileAPI(username) : '';
  const user = useUser();
  const libraryData = libraryDataAPI({
    me: user?.memberId,
    you: userProfile?.memberId,
  });
  console.log(libraryData);

  return (
    <div className="user-library-container">
      <Header text={userProfile?.memberName + '님의 도서관'} />
      <UserProfile />
      <UserStat libraryData={libraryData} />
      <BookTab libraryData={libraryData} />
    </div>
  );
}

export default UserLibrary;
