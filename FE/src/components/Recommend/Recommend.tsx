import React, { useState } from 'react';

import ClubRecommend from '@components/ClubRecommend/ClubRecommend';
import UserRecommend from '@components/UserRecommend/UserRecommend';
import './Recommend.styles.scss';
import ToggleNav from '@components/ToggleNav/ToggleNav';

function Recommend() {
  const [selectedId, setSelectedId] = useState('0');
  const setId = ({ target }: any) => setSelectedId(target.id);

  return (
    <div className="recommend-container">
      <ToggleNav
        selectedId={selectedId}
        setId={setId}
        items={['이용자추천', '모임추천']}
      />
      {/* users 인경우는 react-slick 써서 캐러셀로 */}
      {selectedId === '0' ? <UserRecommend /> : <ClubRecommend />}
    </div>
  );
}

export default Recommend;
