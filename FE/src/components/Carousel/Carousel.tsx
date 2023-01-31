import React from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.styles.scss';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

export default function Carousel() {
  const getRecommendData = async () =>
    await (await fetch('/clubRecommend.json')).json();

  const { data } = useQuery('club-recommend', getRecommendData);

  return (
    <Slider {...settings} className="my-slider">
      {data?.data?.map((data: any, i: number) => (
        <div className="carousel-container">
          <img src={data.image_url} alt="" />
          <div className="shadow-wrapper" />
          <div className="content">
            <h1>{data.title}</h1>
            <h3>{data.description}</h3>
          </div>
        </div>
      ))}
    </Slider>
  );
}
