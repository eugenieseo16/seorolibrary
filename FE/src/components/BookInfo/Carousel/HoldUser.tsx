import React, { Suspense, useEffect, useState } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useUser } from '@src/hooks/useUser';
import './HoldUser.styles.scss';
import { bookDetailAPI } from '@src/API/bookAPI';

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
  infinite: false,
};

interface IHoldUserProps {
  isbn: any;
}

function HoldUser({ isbn }: IHoldUserProps) {
  const navigate = useNavigate();

  const user = useUser();
  const data = bookDetailAPI(isbn, user?.memberId);
  const userData = data?.ownMembers;

  console.log(userData);

  return (
    <div className="hold-user-container">
      <h1>이 책을 보유 중인 사용자</h1>
      {userData ? (
        <div>
          <Suspense fallback={<span>Loading...</span>}>
            <Slider {...settings} className="user-slider-hold-user">
              {userData?.map((data: any, i: number) => (
                <div
                  key={i}
                  className="hold-user-container"
                  onClick={() => navigate(`/profile/${data.memberName}`)}
                >
                  <div className="hold-user-item">
                    <img src={data.memberProfile} alt="" />
                    <h2>{data.memberName}</h2>
                  </div>
                </div>
              ))}
            </Slider>
          </Suspense>
        </div>
      ) : (
        <div className="no-hold-user">
          <h3>근처에 이 책을 보유중인 사용자가 없습니다.</h3>
        </div>
      )}
    </div>
  );
}

export default HoldUser;
