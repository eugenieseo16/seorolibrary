import React from 'react';
import { Link } from 'react-router-dom';

import './BottomNav.styles.scss';

function BottomNav() {
  return (
    <div>
      <div>
        <Link to={'/'}>
          <span>홈</span>
        </Link>
      </div>
      <div>
        <Link to={'/meeting'}>
          <span>독서모임</span>
        </Link>
      </div>
      <div>
        <Link to={'/near'}>
          <span>근처도서</span>
        </Link>
      </div>
      <div>
        <Link to={'/recommend'}>
          <span>장소추천</span>
        </Link>
      </div>
      <div>
        <Link to={'/profile'}>
          <span>나의도서관</span>
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
