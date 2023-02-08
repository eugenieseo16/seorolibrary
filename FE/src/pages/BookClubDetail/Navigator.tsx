import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BookClubMain from '@pages/BookClubMain/BookClubMain';
import BookClubDetail from './BookClubDetail';

function ClubDetailNavigator() {
  const user = useSelector((state: any) => state.user);
  const { id } = useParams();

  return <div>{user._id === id ? <BookClubMain /> : <BookClubDetail />}</div>;
}

export default ClubDetailNavigator;
