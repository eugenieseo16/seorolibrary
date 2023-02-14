import React, { Suspense, useEffect, useState } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import './HoldUser.styles.scss';

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
};

interface IHoldUserProps {
  isbn: string;
}

function HoldUser({ isbn }: IHoldUserProps) {
  const userData = useMyQuery('/userFollower.json');
  const navigate = useNavigate();

  return (
    <div className="hold-user-container">
      <h1>이 책을 보유 중인 사용자</h1>
      <Suspense fallback={<span>Loading...</span>}>
        <Slider {...settings} className="user-slider-hold-user">
          {userData?.map((data: any, i: number) => (
            <div
              key={i}
              className="hold-user-container"
              onClick={() => navigate(`/profile/${i}`)}
            >
              <div className="hold-user-item">
                <img src={data.avatar} alt="" />
                <h2>{data.nickname}</h2>
              </div>
            </div>
          ))}
        </Slider>
      </Suspense>
    </div>
  );
}

export default HoldUser;
