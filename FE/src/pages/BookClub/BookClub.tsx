import React, { useEffect, useState } from 'react';

import Recommend from '@components/Recommend/Recommend';
import './BookClub.styles.scss';

function BookClub() {
  return (
    <div className="book-club-container">
      <div>헤더</div>
      <div>캐러셀</div>
      <button className="book-club-button">독서모임 만들기</button>
      <Recommend />
    </div>
  );
}

export default BookClub;
