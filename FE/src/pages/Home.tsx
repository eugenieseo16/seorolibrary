import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

import './Home.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import CarouselHome from '@components/Carousel/CarouselHome';
import CarouselNearBook from '@components/Carousel/CarouselNearBook';
import CarouselBestSellerBook from '@components/Carousel/CarouselBestSellerBook';
import CarouselHomePlace from '@components/Carousel/CarouselHomePlace';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useUser } from '@src/hooks/useUser';
import { placeRecomendAPI } from '@src/API/placeAPI';

function Home() {
  const user = useUser();

  const placeData = placeRecomendAPI(user?.memberId);

  const greeting = user?.memberName + '님 안녕하세요';
  return (
    <div className="home-container">
      <SearchHeader text={greeting} />
      <CarouselHome />
      <div>
        <h1 className="home-text">근처 빌릴 수 있는 도서</h1>
        <CarouselNearBook />
      </div>
      <div>
        <h1 className="home-text">베스트 셀러</h1>
        <CarouselBestSellerBook />
      </div>
      <div>
        <h1 className="home-text">장소 추천</h1>
        <div style={{ width: '120%' }}>
          {placeData && <CarouselHomePlace items={placeData} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
