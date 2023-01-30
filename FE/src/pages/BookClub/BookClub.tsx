import React, { useEffect, useState } from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';

import Recommend from '@components/Recommend/Recommend';
import './BookClub.styles.scss';

function BookClub() {
  return (
    <div className="book-club-container">
      <div>헤더</div>
      <div>캐러셀</div>
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
