import React from 'react';
import { Outlet } from 'react-router-dom';

import BottomNav from '@components/BottomNav';

function WithNavLayout() {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default WithNavLayout;
