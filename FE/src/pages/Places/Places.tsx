import React, { useEffect, useState } from 'react';

import './Places.styles.scss';
import PlaceHeader from '@components/PlaceRecommend/PlaceHeader';
import PlaceRecommend from '@components/PlaceRecommend/PlaceRecommend';

function Places() {
  return (
    <div className="places-container">
      <PlaceHeader />
      <PlaceRecommend />
    </div>
  );
}

export default Places;
