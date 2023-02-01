import React from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ClubRecommendCarousel.styles.scss';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function ClubRecommendCarousel() {
  const navigate = useNavigate();
  const getRecommendData = async () =>
    await (await fetch('/clubRecommend.json')).json();

  const { data } = useQuery('club-recommend', getRecommendData);

  return (
    <Slider {...settings} className="my-slider">
      {data?.data?.map((data: any, i: number) => (
        <div
          key={i}
          className="carousel-container"
          onClick={() => navigate(`./${i}`)}
        >
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
