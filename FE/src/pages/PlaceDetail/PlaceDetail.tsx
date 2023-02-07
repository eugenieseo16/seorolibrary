import React from 'react';
import PlaceDetailHeader from '@components/PlaceRecommend/PlaceDetailHeader';
import PlaceMap from '@components/MyPlace/PlaceMap';
import PlaceImage from '@components/MyPlace/PlaceImage';

import './PlaceDetail.styles.scss';

function PlaceDetail() {
  return (
    <div className="place-detail-container">
      <PlaceDetailHeader />
      <div>
        <PlaceMap />
        <PlaceImage />
      </div>
    </div>
  );
}

export default PlaceDetail;
