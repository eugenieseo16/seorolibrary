import React, { useEffect, useState } from 'react';
// import { MdOutlineChevronRight } from 'react-icons/md';

// import Recommend from '@components/Recommend/Recommend';
import './Home.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import CarouselHome from '@components/Carousel/CarouselHome';
import CarouselNearBook from '@components/Carousel/CarouselNearBook';
import CarouselPlace from '@components/Carousel/CarouselPlace';

function Home() {
  return (
    <div className="home-container">
      <SearchHeader text="훈목님 안녕하세요." />
      <CarouselHome />
      <div>
        <h1 className="home-text">근처 빌릴 수 있는 도서</h1>
        <CarouselNearBook />
      </div>
      <div>
        <h1 className="home-text">베스트 셀러</h1>
        <CarouselNearBook />
      </div>
      <div>
        <h1 className="home-text">장소 추천</h1>
        <CarouselPlace />
      </div>
    </div>
  );
}

export default Home;
