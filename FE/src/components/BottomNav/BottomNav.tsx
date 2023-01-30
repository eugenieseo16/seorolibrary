import React from 'react';

import './BottomNav.styles.scss';
import { MdOutlineHome, MdHome } from 'react-icons/md';

function BottomNav() {
  return (
    <div>
      <div>
        <MdOutlineHome />
      </div>
      <div>
        <span>독서모임</span>
      </div>
      <div>
        <span>근처도서</span>
      </div>
      <div>
        <span>장소추천</span>
      </div>
      <div>
        <span>나의도서관</span>
      </div>
    </div>
  );
}

export default BottomNav;
