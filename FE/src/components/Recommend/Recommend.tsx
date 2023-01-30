import React, { useEffect, useState } from 'react';
import './Recommend.styles.scss';

function Recommend() {
  const [category, setCategory] = useState<'user' | 'club'>('user');
  const [recommendData, setRecommendData] = useState<any>();

  const getRecommendData = async () => {
    const url =
      category === 'user' ? '/userRecommend.json' : '/clubRecommend.json';
    const { data } = await (await fetch(url)).json();
    setRecommendData(data);
  };

  useEffect(() => {
    getRecommendData();
  }, [category]);

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
        {category === 'user'
          ? recommendData?.map((recommend: any, i: number) => (
              <div key={i}>
                <img src={recommend.image_url} alt="" />
                <h2>{recommend.nickname}</h2>
              </div>
            ))
          : recommendData?.map((recommend: any, i: number) => (
              <div key={i}>
                <img src={recommend.image_url} alt="" />
                <div className="shadow-wrapper" />
                <h2>{recommend.title}</h2>
                <h3>{recommend.description}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Recommend;
