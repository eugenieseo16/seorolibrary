import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselNearBook.styles.scss';

const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  export default function CarouselNearBook() {
    const [booksData, setBooksData] = useState<any>();
    const getBooksData = async () => {
    const url = '/books.json';
    const { data } = await (await fetch(url)).json();
    setBooksData(data);
  };

  useEffect(() => {
    getBooksData();
  }, []);

    return (
      <Slider {...settings} className="my-slider-near-book">
        {booksData?.map((data: any, i: number) => (
          <div className="recommend-near-book-container">
            <img src={data.image_url} alt="" />
            <a>{data.title}</a>
          </div>
      ))}
    </Slider>
  );
}
        
  
      
