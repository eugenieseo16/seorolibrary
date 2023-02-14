import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselNearBook.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { nearBooksAPI } from '@src/API/bookAPI';
import { useUser } from '@src/hooks/useUser';

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
};

export default function CarouselNearBook() {
  const user = useUser();

  // body => params로 바뀌면 reverse comment 처리
  // 아래 데이터 세부 값도 변경 필요. 예) image_url -> bookImage
  // const booksData = nearBooksAPI(user?.memberId);
  const booksData = useMyQuery('/books.json');

  const navigate = useNavigate();

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Slider {...settings} className="my-slider-near-book">
        {booksData?.map((data: any, i: number) => (
          <div
            key={i}
            className="recommend-near-book-container"
            onClick={() => navigate(`/book/${data.isbn}`)}
          >
            <div>
              <img src={data.image_url} alt="" />
              <h2>{data.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </Suspense>
  );
}
