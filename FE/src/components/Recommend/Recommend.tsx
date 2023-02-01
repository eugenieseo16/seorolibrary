import React, { useState } from 'react';

import ClubRecommend from '@components/ClubRecommend/ClubRecommend';
import UserRecommend from '@components/UserRecommend/UserRecommend';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './Recommend.styles.scss';

function Recommend() {
  const [selectedId, setSelectedId] = useState('user');

  return (
    <div className="recommend-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '이용자추천', id: 'user' },
          { text: '모임추천', id: 'club' },
        ]}
      />
      {/* users 인경우는 react-slick 써서 캐러셀로 */}
      {selectedId === 'user' ? <UserRecommend /> : <ClubRecommend />}
    </div>
  );
}

export default Recommend;
