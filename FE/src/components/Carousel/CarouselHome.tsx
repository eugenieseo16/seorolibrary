import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselHome.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useUser } from '@src/hooks/useUser';
import { useClubMainAPI } from '@src/API/clubAPI';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CarouselHome() {
  const navigate = useNavigate();

  const user = useUser();
  const clubRecommend = useClubMainAPI(user?.memberName);

  return clubRecommend ? (
    <Slider {...settings} className="my-slider-home">
      {clubRecommend?.recommendGroups?.map((data: any, i: number) => (
        <div
          key={i}
          className="carousel-home-container"
          onClick={() => navigate(`/book-club/${data.groupId}`)}
        >
          <img src={data.groupProfile} alt="" />
          <div className="shadow-wrapper-home" />
          <div className="content-home">
            <h1>{data.groupName}</h1>
            <h3>{data.groupDescrib}</h3>
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    <span>Loading...</span>
  );
}
