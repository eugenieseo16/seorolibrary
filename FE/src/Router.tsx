import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import UserLibrary from '@pages/UserLibrary';
import Login from '@pages/Login';
import WithNavLayout from '@pages/withNavLayout/WithNavLayout';
import BookClub from '@pages/BookClub/BookClub';
import BookClubDetail from '@pages/BookClubDetail/BookClubDetail';

function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="" element={<WithNavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserLibrary />} />
        <Route path="/book-club" element={<BookClub />} />
        <Route path="/book-club/:id" element={<BookClubDetail />} />
        <Route path="*" element={'404'} />
      </Route>
    </Routes>
  );
}

export default Router;
