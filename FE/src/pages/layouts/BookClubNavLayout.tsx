import ClubBottomNav from '@components/BottomNav/ClubBottomNav';
import React from 'react';
import { Outlet } from 'react-router-dom';

function BookClubNavLayout() {
  return (
    <>
      <div className="with-nav-layout-container">
        <Outlet />
      </div>
      <ClubBottomNav />
    </>
  );
}

export default BookClubNavLayout;
