import React, { Suspense, useEffect, useState } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import './HoldBook.styles.scss';

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
};

interface IHoldBookProps {
  isbn: string;
}

function HoldBook({ isbn }: IHoldBookProps) {
  const booksData = useMyQuery('/books.json');
  const navigate = useNavigate();

  return (
    <div className="hold-book-container">
      <h1>짱구의 또 다른 보유 도서</h1>
      <Suspense fallback={<span>Loading...</span>}>
        <Slider {...settings} className="user-slider-hold-book">
          {booksData?.map((data: any, i: number) => (
            <div
              key={i}
              className="hold-book-container"
              onClick={() => navigate(`/book/${i}`)}
            >
              <div>
                <img src={data.image_url} alt="" />
                <h2>{data.title}</h2>
              </div>
            </div>
          ))}
        </Slider>
      </Suspense>
    </div>
  );
}

export default HoldBook;
