import React from 'react';
import { useQuery } from 'react-query';

function UserRecommend() {
  const getRecommendData = async () =>
    await (await fetch('/userRecommend.json')).json();
  const { data } = useQuery('user-recommend', getRecommendData);
  return (
    <div className="users">
      {data?.data?.map((recommend: any, i: number) => (
        <div key={i}>
          <img src={recommend.image_url} alt="" />
          <h2>{recommend.nickname}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserRecommend;
