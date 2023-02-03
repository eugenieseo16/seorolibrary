import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselHome.styles.scss';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CarouselHome() {
  const [recommendData, setRecommendData] = useState<any>();
  const getRecommendData = async () => {
    const { data } = await (await fetch('/clubRecommend.json')).json();
    setRecommendData(data);
  };

  useEffect(() => {
    getRecommendData();
  }, []);

  const navigate = useNavigate();

  return (
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
  );
}
