import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import Loading from '@pages/Loading';
import BookDetail from '@pages/BookDetail/BookDetail';

import MyLibrary from '@pages/UserLibrary/UserLibrary';
import UserLibrary from '@pages/UserLibrary/UserLibrary';
import ProfileLog from '@pages/ProfileLog/ProfileLog';
import ProfileStat from '@pages/ProfileStat/ProfileStat';
import ProfileSettings from '@pages/ProfileSettings/ProfileSettings';
import BookRegister from '@pages/BookRegister/BookRegister';

import MyArchive from '@pages/MyArchive/MyArchive';
import CreateReport from '@pages/MyArchive/CreateReport';

import Login from '@pages/Login';
import WithNavLayout from '@pages/withNavLayout/WithNavLayout';

import BookClub from '@pages/BookClub/BookClub';
import BookClubDetail from '@pages/BookClubDetail/BookClubDetail';
import BookClubGenerate from '@pages/BookClubGenerate/BookClubGenerate';

import Places from '@pages/Places/Places';
import PlaceDetail from '@pages/PlaceRecommend/PlaceDetail';
import AddPlace from '@pages/PlaceRecommend/AddPlace';
import MyPlace from '@pages/PlaceRecommend/MyPlace';

import Near from '@pages/Near/Near';

function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="" element={<WithNavLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />

        <Route path="/profile" element={<MyLibrary />} />
        <Route path="/profile/:userId" element={<UserLibrary />} />
        <Route path="/profile/log" element={<ProfileLog />} />
        <Route path="profile/statistics" element={<ProfileStat />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/profile/register" element={<BookRegister />} />
        
        <Route path="/profile/archive" element={<MyArchive />} />
        <Route path="/profile/createReport" element={<CreateReport />} />

        <Route path="/book-club" element={<BookClub />} />
        <Route path="/book-club/generate" element={<BookClubGenerate />} />
        <Route path="/book-club/:id" element={<BookClubDetail />} />

        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceDetail />} />
        <Route path="/places/myplace" element={<MyPlace />} />
        <Route path="/places/addplace" element={<AddPlace />} />

        <Route path="/near" element={<Near />} />
        <Route path="/near/bookdetail/:id" element={<BookDetail />} />

        <Route path="*" element={'404'} />
      </Route>
    </Routes>
  );
}

export default Router;
