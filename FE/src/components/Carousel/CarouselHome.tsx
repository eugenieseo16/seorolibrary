import React, { useEffect, useState } from 'react';
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
  const clubRecommend = useMyQuery('/clubRecommend.json');
  return clubRecommend ? (
    <Slider {...settings} className="my-slider-home">
      {clubRecommend?.data?.map((data: any, i: number) => (
        <div key={i} className="carousel-home-container">
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
