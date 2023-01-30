import React, { useEffect, useState } from 'react';
// import { MdOutlineChevronRight } from 'react-icons/md';

// import Recommend from '@components/Recommend/Recommend';
import './Home.styles.scss';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import CarouselHome from '@components/Carousel/CarouselHome';
import CarouselNearBook from '@components/Carousel/CarouselNearBook';

function Home() {
  
  return (
    <div className="home-container">
      <SearchHeader/>
      <CarouselHome />
      <div>
        <CarouselNearBook/>
      </div>
    </div>
  );
}

export default Home;
