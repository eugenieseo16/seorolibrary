import React from 'react';
import PlaceDetailHeader from '@components/PlaceRecommend/PlaceDetailHeader';
import PlaceMap from '@components/MyPlace/PlaceMap';

import './PlaceDetail.styles.scss';

function PlaceDetail() {
  return <div className="place-detail-container">
    <PlaceDetailHeader/>
    <PlaceMap/>
  </div>;
}

export default PlaceDetail;
