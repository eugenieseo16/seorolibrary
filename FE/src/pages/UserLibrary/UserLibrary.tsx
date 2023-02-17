import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './UserLibrary.styles.scss';
import Header from '@components/Header/Header';
import UserProfile from '@components/UserLibrary/UserSection/UserProfile';
import UserStat from '@components/UserLibrary/UserStat';
import BookTab from '@components/UserLibrary/BookTab';
import { getUserProfileAPI } from '@src/API/authAPI';
import { useUser } from '@src/hooks/useUser';
import { libraryDataAPI } from '@src/API/libraryAPI';
import axios from 'axios';
import { libraryAPIUrls } from '@src/API/apiUrls';

function UserLibrary() {
  const { username } = useParams();
  const userProfile = getUserProfileAPI(username);
  const [libraryData, setLibraryData] = useState<any>();
  const user = useUser();
  useEffect(() => {
    (async function () {
      if (!userProfile || !user) return;
      const { data } = await axios.get(
        `${libraryAPIUrls.libraryData}/${userProfile?.memberId}?memberId=${user?.memberId}`,
      );
      setLibraryData(data);
    })();
  }, [user, userProfile]);

  // const libraryData = libraryDataAPI({
  //   me: user?.memberId,
  //   you: userProfile?.memberId,
  // });
  // console.log(libraryData);

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
