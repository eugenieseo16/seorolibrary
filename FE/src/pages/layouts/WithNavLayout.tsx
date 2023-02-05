import React from 'react';
import { Outlet } from 'react-router-dom';

import BottomNav from '@components/BottomNav/BottomNav';
import './withNavLayout.styles.scss';

function WithNavLayout() {
  return (
    <>
      <div className="with-nav-layout-container">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}

export default WithNavLayout;
