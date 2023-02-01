import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselPlace.styles.scss';
import { useQuery } from 'react-query';

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
};

export default function CarouselPlace({ url }: { url: string }) {
  const getPlacesData = async () => await (await fetch(url)).json();
  const { data } = useQuery(url, getPlacesData);

  return (
    <Slider {...settings} className="my-slider-place">
      {data?.data?.map((data: any, i: number) => (
        <div key={i} className="carousel-place-container">
          <img src={data.thumUrl} alt="" />
          <div className="shadow-wrapper-place" />
          <div className="content-place">
            <h2>{data.name}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
}
