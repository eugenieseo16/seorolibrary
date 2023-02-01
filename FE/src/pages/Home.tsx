import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import './Home.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import CarouselHome from '@components/Carousel/CarouselHome';
import CarouselNearBook from '@components/Carousel/CarouselNearBook';
import CarouselPlace from '@components/Carousel/CarouselPlace';

function Home() {
  const getPlacesData = async () => await (await fetch('/books.json')).json();
  const { data: placeData } = useQuery('/books.json', getPlacesData);

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
        <div style={{ width: '120%' }}>
          <CarouselPlace items={placeData?.data} />
        </div>
      </div>
    </div>
  );
}

export default Home;
