import React, { useEffect, useState } from 'react';

import Recommend from '@components/Recommend/Recommend';
import './BookClub.styles.scss';

function BookClub() {
  return (
    <div>
      <div>헤더</div>
      <div>캐러셀</div>
      <div>독서모임 만들기</div>
      <Recommend />
    </div>
  );
}

export default BookClub;
