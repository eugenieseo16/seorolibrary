import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import BookDetail from '@pages/BookDetail/BookDetail';

import MyLibrary from '@pages/UserLibrary/UserLibrary';
import UserLibrary from '@pages/UserLibrary/UserLibrary';
import MyArchive from '@pages/MyArchive/MyArchive';
import ProfileLog from '@pages/ProfileLog/ProfileLog';
import ProfileStat from '@pages/ProfileStat/ProfileStat';
import ProfileSettings from '@pages/ProfileSettings/ProfileSettings';
import BookRegister from '@pages/BookRegister/BookRegister';

import Login from '@pages/Login';
import WithNavLayout from '@pages/withNavLayout/WithNavLayout';
import BookClub from '@pages/BookClub/BookClub';
import Places from '@pages/Places/Places';
import BookClubDetail from '@pages/BookClubDetail/BookClubDetail';

import BookClubGenerate from '@pages/BookClubGenerate/BookClubGenerate';

import Near from '@pages/Near/Near';


function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="" element={<WithNavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bookdetail" element={<BookDetail />} />
        {/* <Route path="/book/:bookId" element={<BookDetail/>} /> */}

        <Route path="/profile" element={<MyLibrary />} />
        <Route path="/profile/:userId" element={<UserLibrary />} />
        <Route path="/profile/archive" element={<MyArchive/>} />
        <Route path="/profile/log" element={<ProfileLog />} />
        <Route path="profile/statistics" element={<ProfileStat/>} />
        

        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/profile/register" element={<BookRegister />} />

        <Route path="/book-club" element={<BookClub />} />

        <Route path="/book-club/generate" element={<BookClubGenerate />} />

        <Route path="/places" element={<Places />} />
        <Route path="/near" element={<Near />} />

        <Route path="/book-club/:id" element={<BookClubDetail />} />

        <Route path="/places" element={<Places />} />
        <Route path="*" element={'404'} />
      </Route>
    </Routes>
  );
}

export default Router;
