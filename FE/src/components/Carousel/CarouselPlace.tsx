import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselPlace.styles.scss';
import { useQuery } from 'react-query';

export interface ICarouselPlaceProps {
  items: Item[];
  slidesToShow?: number;
  infinite?: boolean;
  [key: string]: any;
}
interface Item {
  image_url: string;
  title: string;
  description?: string;
}

function CarouselPlace({
  items,
  slidesToShow = 4,
  infinite = true,
  ...rest
}: ICarouselPlaceProps) {
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    infinite,
  };
  return (
    <Slider {...settings} {...rest} className="my-slider-place">
      {items?.map((data, i: number) => (
        <div key={i} className="carousel-place-container">
          <img src={data.image_url} alt="" />
          <div className="shadow-wrapper-place" />
          <div className="content-place">
            <h2>{data.title}</h2>
            {data.description && <p>{data.description}</p>}
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselPlace;
