import ClubRecommend from '@components/ClubRecommend/ClubRecommend';
import UserRecommend from '@components/UserRecommend/UserRecommend';
import React, { useEffect, useState } from 'react';
import './Recommend.styles.scss';

function Recommend() {
  const [category, setCategory] = useState<'user' | 'club'>('user');

  useEffect(() => {}, [category]);

  return (
    <div className="recommend-container">
      <div
        className="recommend-nav"
        onClick={({ target }: any) => setCategory(target.id)}
      >
        <div id="user" className={category === 'user' ? 'selected' : ''}>
          이용자추천
        </div>
        <div id="club" className={category === 'club' ? 'selected' : ''}>
          모임 추천
        </div>
      </div>
      {/* users 인경우는 react-slick 써서 캐러셀로 */}
      <div className={category === 'user' ? 'users' : 'clubs'}>
        {category === 'user' ? <UserRecommend /> : <ClubRecommend />}
      </div>
    </div>
  );
}

export default Recommend;
