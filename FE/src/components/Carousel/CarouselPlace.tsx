import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselPlace.styles.scss';

export interface ICarouselPlaceProps {
  items: Item[];
  slidesToShow?: number;
  infinite?: boolean;
  className?: string;
  [key: string]: any;
}
interface Item {
  image_url: string;
  title: string;
  description?: string;
  header?: string;
}

function CarouselHomePlace({
  items,
  slidesToShow = 4,
  infinite = true,
  className,
}: ICarouselPlaceProps) {
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    infinite,
  };
  console.log(items);
  return (
    <Slider {...settings} className={`my-slider-place ${className}`}>
      {items?.map((data, i: number) => (
        <div key={i} className="carousel-place-container">
          <img src={data.image_url} alt="" />
          <div className="shadow-wrapper-place" />
          <div className="content-place">
            {data.header && <p>{data.header}</p>}
            <h2>{data.title}</h2>
            {data.description && <p>{data.description}</p>}
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselHomePlace;
