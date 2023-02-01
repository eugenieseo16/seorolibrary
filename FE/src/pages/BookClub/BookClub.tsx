import React from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';

import Recommend from '@components/Recommend/Recommend';
import './BookClub.styles.scss';
import ClubRecommendCarousel from '@components/Carousel/ClubRecommendCarousel';
import SearchHeader from '@components/SearchHeader/SearchHeader';

function BookClub() {
  return (
    <div className="book-club-container">
      <SearchHeader text="독서모임 추천" />
      <ClubRecommendCarousel />
      <button className="book-club-button">
        <div className="content">
          <span>독서모임 만들기</span>
          <MdOutlineChevronRight size={'3rem'} />
        </div>
        <div className="shadow-wrapper" />
      </button>
      <Recommend />
    </div>
  );
}

export default BookClub;
