import React, { useState } from 'react';
import MyPlaceReview from '@components/MyPlace/MyPlaceReview';
import MyPlaceAdd from '@components/MyPlace/MyPlaceAdd';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './MyPlaceArchiveDetail.styles.scss';

function MyPlace() {
  const [selectedId, setSelectedId] = useState('review');
  console.log(selectedId);
  return (
    <div className="my-place-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '내가 쓴 리뷰', id: 'review' },
          { text: '내가 등록한 장소', id: 'place' },
        ]}
      />
      {selectedId === 'review' ? <MyPlaceReview /> : <MyPlaceAdd />}
    </div>
  );
}

export default MyPlace;
