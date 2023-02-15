import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  placePhotoList: [];
  placeName: string;
  placeId: any;
}

function CarouselPlace({
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

  const navigate = useNavigate();

  console.log(items);

  return (
    <Slider {...settings} className={`my-slider-place ${className}`}>
      {items?.map((data, i: number) => (
        <div
          key={i}
          className="carousel-place-container"
          onClick={() => navigate(`/place/${data.placeId}`)}
        >
          <img src={data.placePhotoList[0]} alt="" />
          <div className="shadow-wrapper-place" />
          <div className="content-place">
            <h2>{data.placeName}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselPlace;
