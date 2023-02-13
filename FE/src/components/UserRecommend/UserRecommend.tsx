import React from 'react';
import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

import './UserRecommend.styles.scss';
import { Navigate, useNavigate } from 'react-router-dom';

function UserRecommend() {
  const getRecommendData = async () =>
    await (await fetch('/userRecommend.json')).json();
  const { data } = useQuery('user-recommend', getRecommendData);
  const navigate = useNavigate();

  return (
    <div className="user-recommend-container">
      {data?.data?.map((recommend: any, i: number) => (
        <div
          className="user-item"
          key={recommend.username}
          onClick={() =>
            navigate(`/profile/${recommend.username}`, { state: true })
          }
        >
          <img src={recommend.image_url} alt="" />
          <h2>{recommend.nickname}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserRecommend;
