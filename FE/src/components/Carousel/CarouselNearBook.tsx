import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselNearBook.styles.scss';
import { nearBooksAPI } from '@src/API/bookAPI';
import { useUser } from '@src/hooks/useUser';

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  infinite: false,
};

export default function CarouselNearBook() {
  const user = useUser();

  const booksData = nearBooksAPI(user?.memberId);
  // console.log(booksData);
  const navigate = useNavigate();

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Slider {...settings} className="my-slider-near-book">
        {booksData?.books?.map((data: any, i: number) => (
          <div
            key={i}
            className="recommend-near-book-container"
            onClick={() =>
              navigate(`/profile/${data.memberName}/book/${data.isbn}`)
            }
          >
            <img src={data.bookImage} alt="" />
            <h2>{data.bookTitle}</h2>
          </div>
        ))}
      </Slider>
    </Suspense>
  );
}
