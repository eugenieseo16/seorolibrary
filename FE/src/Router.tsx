import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import BookDetail from '@pages/BookDetail/BookDetail';

import MyLibrary from '@pages/UserLibrary/MyLibrary';
import UserLibrary from '@pages/UserLibrary/UserLibrary';
import UserBookDetail from '@pages/BookDetail/UserBookDetail';
import ProfileSettings from '@pages/UserLibrary/ProfileSettings/ProfileSettings';
import BookRegister from '@pages/UserLibrary/BookRegister/BookRegister'

import Login from '@pages/Login';
import WithNavLayout from '@pages/withNavLayout/WithNavLayout';
import BookClub from '@pages/BookClub/BookClub';
import Places from '@pages/Places/Places';
import BookClubDetail from '@pages/BookClubDetail/BookClubDetail';


function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="" element={<WithNavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bookdetail" element={<BookDetail/>} />
        {/* <Route path="/book/:bookId" element={<BookDetail/>} /> */}

        <Route path="/profile" element={<MyLibrary />} />
        <Route path="/profile/:userId" element={<UserLibrary />} />
        <Route path="/profile-bookdetail" element={<UserBookDetail/>} />
        {/* <Route path="/profile/:userId/:bookId" element={<UserBookDetail/>} /> */}
        <Route path="/profile/settings" element={<ProfileSettings/>} />
        <Route path="/profile/register" element={<BookRegister/>} />

        <Route path="/book-club" element={<BookClub />} />
        <Route path="/places" element={<Places />} />
        <Route path="/book-club/:id" element={<BookClubDetail />} />
        <Route path="*" element={'404'} />
      </Route>
    </Routes>
  );
}

export default Router;
