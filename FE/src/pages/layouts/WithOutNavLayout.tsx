import React from 'react';
import { Outlet } from 'react-router-dom';

import './withNavLayout.styles.scss';

function WithOutNavLayout() {
  return (
    <>
      <div className="with-nav-layout-container">
        <Outlet />
      </div>
    </>
  );
}

export default WithOutNavLayout;
