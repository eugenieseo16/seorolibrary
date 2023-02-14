import React, { useEffect, useState } from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';

import Recommend from '@components/Recommend/Recommend';
import './bookClub.styles.scss';
import ClubRecommendCarousel from '@components/Carousel/ClubRecommendCarousel';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import { useNavigate } from 'react-router-dom';
import { useClubMainAPI } from '@src/API/clubAPI';
import { useUser } from '@src/hooks/useUser';

function BookClub() {
  const [haveClubs, setHaveClubs] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const clubData = useClubMainAPI(user?.memberName);

  useEffect(() => {
    if (clubData?.myGroups) setHaveClubs(true);
  }, [clubData]);

  return (
    <div className="book-club-container">
      <SearchHeader text={haveClubs ? '나의 독서모임' : '독서모임 추천'} />
      <ClubRecommendCarousel listView={haveClubs ? true : false} />
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
