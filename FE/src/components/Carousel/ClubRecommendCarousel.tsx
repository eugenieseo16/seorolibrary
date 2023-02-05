import React, { Suspense } from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ClubRecommendCarousel.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';

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
  const data = useMyQuery('/clubRecommend.json');

  return (
    <Suspense fallback={<span>Loading... </span>}>
      <Slider {...settings} className="my-slider">
        {data?.map((el: any, i: number) => (
          <div
            key={i}
            className="carousel-container"
            onClick={() => navigate(`/book-club/${i}`)}
          >
            <img src={el.image_url} alt="" />
            <div className="shadow-wrapper" />
            <div className="content">
              <h1>{el.title}</h1>
              <h3>{el.description}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </Suspense>
  );
}
