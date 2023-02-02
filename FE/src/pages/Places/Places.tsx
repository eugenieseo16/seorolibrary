import React from 'react';

import './Places.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import PlaceRecommend from '@components/InfiniteScroll/PlaceRecommend';

function Places() {
  return (
    <div className="places-container">
      <SearchHeader text="장소 추천" />
      <PlaceRecommend />
    </div>
  );
}

export default Places;
