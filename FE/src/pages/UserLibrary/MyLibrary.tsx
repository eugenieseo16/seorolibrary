import React from 'react';

import './UserLibrary.styles.scss';
import UserHeader from '@components/UserLibrary/UserHeader';
import UserStat from '@components/UserLibrary/UserStat';
import BookTab from '@components/UserLibrary/BookTab';

import MyProfile from '@components/UserLibrary/UserSection/MyProfile';
import { useUser } from '@src/hooks/useUser';
import { libraryDataAPI } from '@src/API/libraryAPI';

function MyLibrary() {
  const user = useUser();
  const libraryData = libraryDataAPI({
    me: user?.memberId,
    you: user?.memberId,
  });
  console.log(libraryData);

  return (
    <div className="user-library-container">
      <UserHeader />
      <MyProfile />
      <UserStat libraryData={libraryData} />
      <BookTab libraryData={libraryData} />
    </div>
  );
}

export default MyLibrary;
