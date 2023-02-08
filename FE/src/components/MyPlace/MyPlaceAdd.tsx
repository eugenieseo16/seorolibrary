import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';
import './MyPlaceAdd.styles.scss';

function MyPlaceAdd() {
  const data = useMyQuery('/clubRecommend.json');

  return (
    <div className="club-recommend-container">
      {data?.map((recommend: any, i: number) => (
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

export default MyPlaceAdd;
