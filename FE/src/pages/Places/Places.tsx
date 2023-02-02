import React, { useEffect, useState } from 'react';

import './Places.styles.scss';
import PlaceHeader from '@pages/PlaceRecommend/PlaceHeader';
import PlaceRecommend from '@pages/PlaceRecommend/PlaceRecommend';

function Places() {
  return (
    <div className="places-container">
      <PlaceHeader />
      <PlaceRecommend />
    </div>
  );
}

export default Places;
