import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.styles.scss';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [recommendData, setRecommendData] = useState<any>();
  const getRecommendData = async () => {
    const { data } = await (await fetch('/clubRecommend.json')).json();
    setRecommendData(data);
  };

  useEffect(() => {
    getRecommendData();
  }, []);

  return (
    <Slider {...settings} className="my-slider">
      {recommendData?.map((data: any, i: number) => (
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
