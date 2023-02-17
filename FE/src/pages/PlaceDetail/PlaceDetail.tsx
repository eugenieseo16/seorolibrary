import React from 'react';

import PlaceDetailHeader from '@components/PlaceRecommend/PlaceDetailHeader';
import PlaceMap from '@components/MyPlace/PlaceMap';
import PlaceImage from '@components/MyPlace/PlaceImage';
import PlaceReview from '@components/MyPlace/PlaceReview';

import './PlaceDetail.styles.scss';

function PlaceDetail() {
  return (
    <div className="place-detail-container">
      <PlaceDetailHeader />
      <div>
        <PlaceMap />
        <PlaceImage />
      </div>
      <div className="line"></div>
      <div>
        <PlaceReview />
      </div>
    </div>
  );
}

export default PlaceDetail;
