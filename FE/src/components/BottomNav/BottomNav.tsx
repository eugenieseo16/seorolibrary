import React from 'react';
import { Link } from 'react-router-dom';

import './BottomNav.styles.scss';
import usePathname from '@src/hooks/usePathname';
import { navPathDataList } from '@src/utils/navPathDataList';

function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="bottom-nav-container">
      {navPathDataList.map(({ href, title, icon }, i) => {
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
