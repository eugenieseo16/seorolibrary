import React from 'react';

import './MyPlaceArchive.styles.scss';
import MyPlaceHeader from '@components/MyPlace/MyPlaceHeader';
import MyPlaceArchiveDetail from '@pages/PlaceDetail/MyPlaceArchiveDetail';
import { useNavigate } from 'react-router-dom';

function MyPlaceArchive() {
  const navigate = useNavigate();

  return (
    <div className="my-place-container">
      <MyPlaceHeader />
      <MyPlaceArchiveDetail />
    </div>
  );
}

export default MyPlaceArchive;
