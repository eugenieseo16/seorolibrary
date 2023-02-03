import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselHome.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CarouselHome() {
  const navigate = useNavigate();
  const clubRecommend = useMyQuery('/clubRecommend.json');
  return clubRecommend ? (
    <Slider {...settings} className="my-slider-home">
      {recommendData?.map((data: any, i: number) => (
        <div
          key={i}
          className="carousel-home-container"
          onClick={() => navigate(`/book-club/${i}`)}
        >
          <img src={data.image_url} alt="" />
          <div className="shadow-wrapper-home" />
          <div className="content-home">
            <h1>{data.title}</h1>
            <h3>{data.description}</h3>
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    <span>Loading...</span>
  );
}
