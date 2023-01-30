import React, { useEffect, useState } from 'react';
// import { MdOutlineChevronRight } from 'react-icons/md';

// import Recommend from '@components/Recommend/Recommend';
import './Home.styles.scss';
import CarouselHome from '@components/Carousel/CarouselHome';
import SearchHeader from '@components/SearchHeader/SearchHeader';

function Home() {
  
  return (
    <div className="home-container">
      <SearchHeader/>
      <CarouselHome />
    </div>
  );
}

export default Home;
