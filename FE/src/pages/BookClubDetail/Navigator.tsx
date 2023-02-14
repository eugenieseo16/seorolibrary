import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BookClubMain from '@pages/BookClubMain/BookClubMain';
import BookClubDetail from './BookClubDetail';
import { useUser } from '@src/hooks/useUser';
import { clubMembersAPI } from '@src/API/clubAPI';

function ClubDetailNavigator() {
  const { id } = useParams();
  const user = useUser();
  const data = clubMembersAPI(id ? +id : undefined);
  const [attended, setAttended] = useState(false);
  useEffect(() => {
    setAttended(
      Boolean(
        data?.groupMembers?.filter(
          (member: any) => member.userId == user?.memberId,
        ).length,
      ),
    );
  }, [data, user]);

  return <div>{attended ? <BookClubMain /> : <BookClubDetail />} </div>;
}

export default ClubDetailNavigator;
