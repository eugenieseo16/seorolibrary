import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import BookClubMain from '@pages/BookClubMain/BookClubMain';
import BookClubDetail from './BookClubDetail';
import { useUser } from '@src/hooks/useUser';
import { clubMembersAPI } from '@src/API/clubAPI';

function ClubDetailNavigator() {
  const { id } = useParams();
  const user = useUser();
  const data = clubMembersAPI(id);
  const [attended, setAttended] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setAttended(
      Boolean(
        data?.groupMembers?.filter(
          (member: any) => member.userId == user?.memberId,
        ).length,
      ),
    );
  }, [data, user]);
  useEffect(() => {
    if (!attended) {
      navigate(`/book-club/${id}/enroll`, { replace: true });
    }
  }, [attended]);

  return <div>{attended ? <BookClubMain /> : <BookClubDetail />} </div>;
}

export default ClubDetailNavigator;
