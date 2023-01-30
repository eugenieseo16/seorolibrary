import React from 'react';
import { Outlet } from 'react-router-dom';

import BottomNav from '@components/BottomNav';
import './withNavLayout.styles.scss';

function WithNavLayout() {
  return (
    <div className="container">
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default WithNavLayout;
