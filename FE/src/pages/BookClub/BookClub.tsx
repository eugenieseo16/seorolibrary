import React from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';

import Recommend from '@components/Recommend/Recommend';
import './bookClub.styles.scss';
import ClubRecommendCarousel from '@components/Carousel/ClubRecommendCarousel';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import { useNavigate } from 'react-router-dom';

function BookClub() {
  const navigate = useNavigate();

  return (
    <div className="book-club-container">
      <SearchHeader text="독서모임 추천" />
      <ClubRecommendCarousel />
      <button
        onClick={() => navigate('/book-club/generate')}
        className="book-club-button"
      >
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
