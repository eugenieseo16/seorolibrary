import React, { useState } from 'react';
import MyPlaceHeader from '../../components/MyPlace/MyPlaceHeader';
import MyPlaceReview from '@components/MyPlace/MyPlaceReview';
import MyPlaceAdd from '@components/MyPlace/MyPlaceAdd';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './MyPlace.styles.scss';

function MyPlace() {
  const [selectedId, setSelectedId] = useState('review');

  return (
    <div className="my-place-container">
      <MyPlaceHeader />
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '내가 쓴 리뷰', id: 'review' },
          { text: '내가 등록한 장소', id: 'place' },
        ]}
      />
      {/* users 인경우는 react-slick 써서 캐러셀로 */}
      {selectedId === 'review' ? <MyPlaceReview /> : <MyPlaceAdd />}
    </div>
  );
}

export default MyPlace;
