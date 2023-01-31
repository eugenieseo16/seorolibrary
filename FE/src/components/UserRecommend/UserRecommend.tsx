import React from 'react';
import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

import './UserRecommend.styles.scss';

function UserRecommend() {
  const getRecommendData = async () =>
    await (await fetch('/userRecommend.json')).json();
  const { data } = useQuery('user-recommend', getRecommendData);

  return (
    <div className="user-recommend-container">
      {data?.data?.map((recommend: any, i: number) => (
        <div className="user-item" key={i}>
          <img src={recommend.image_url} alt="" />
          <h2>{recommend.nickname}</h2>
        </div>
      ))}

      {Array.from(Array(30).keys()).map((_: any, i: number) => (
        <div className="user-item" key={i}>
          <img src={faker.image.avatar()} alt="" />
          <h2>{faker.name.fullName()}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserRecommend;
