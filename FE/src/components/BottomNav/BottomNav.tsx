import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdOutlineHome } from 'react-icons/md';
import {
  RiBook3Line,
  RiBook3Fill,
  RiUser3Line,
  RiUser3Fill,
} from 'react-icons/ri';
import { HiUsers, HiOutlineUsers, HiOutlineMap, HiMap } from 'react-icons/hi';

import './BottomNav.styles.scss';
import usePathname from '@src/hooks/usePathname';

const PATH_NAMES = [
  {
    href: '',
    title: '홈',
    icon: { default: <MdOutlineHome />, selected: <MdHome /> },
  },
  {
    href: 'meeting',
    title: '독서모임',
    icon: { default: <HiOutlineUsers />, selected: <HiUsers /> },
  },
  {
    href: 'near',
    title: '근처도서',
    icon: { default: <RiBook3Line />, selected: <RiBook3Fill /> },
  },
  {
    href: 'recommend',
    title: '장소추천',
    icon: { default: <HiOutlineMap />, selected: <HiMap /> },
  },
  {
    href: 'profile',
    title: '나의도서관',
    icon: { default: <RiUser3Line />, selected: <RiUser3Fill /> },
  },
];

function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="bottom-nav-container">
      {PATH_NAMES.map(({ href, title, icon }, i) => {
        const selected = href === pathname[1];
        return (
          <Link to={href} key={i} className={selected ? 'selected' : ''}>
            <div className="icon-container">
              <span className="icon">
                {selected ? icon.selected : icon.default}
              </span>
              <span>{title}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default BottomNav;
