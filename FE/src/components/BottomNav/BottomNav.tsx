import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './BottomNav.styles.scss';

const PATH_NAMES = [
  { href: '', title: '홈' },
  { href: 'meeting', title: '독서모임' },
  { href: 'near', title: '근처도서' },
  { href: 'recommend', title: '장소추천' },
  { href: 'profile', title: '나의도서관' },
];

function BottomNav() {
  const { pathname } = useLocation();

  return (
    <div>
      {PATH_NAMES.map(({ href, title }, i) => {
        return (
          <Link to={href} key={i}>
            <span className={pathname.split('/')[1] === href ? 'selected' : ''}>
              {title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default BottomNav;
