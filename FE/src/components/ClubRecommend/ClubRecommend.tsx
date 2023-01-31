import React from 'react';
import { useQuery } from 'react-query';

import './ClubRecommend.styles.scss';

function ClubRecommend() {
  const getRecommendData = async () =>
    await (await fetch('/clubRecommend.json')).json();
  const { data } = useQuery('club-recommend', getRecommendData);

  return (
    <div className="club-recommend-container">
      {data?.data?.map((recommend: any, i: number) => (
        <div key={i}>
          <img src={recommend.image_url} alt="" />
          <div className="shadow-wrapper" />
          <h2>{recommend.title}</h2>
          <h6>{recommend.description}</h6>
        </div>
      ))}
    </div>
  );
}

export default ClubRecommend;
