import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import Loading from '@pages/Loading';
import BookDetail from '@pages/BookDetail/BookDetail';
import HoldBookDetail from '@pages/BookDetail/BookDetail';
import BookDetailLog from '@pages/BookDetail/BookDetailLog';

import MyLibrary from '@pages/UserLibrary/UserLibrary';
import UserLibrary from '@pages/UserLibrary/UserLibrary';
import Follow from '@pages/UserLibrary/Follow';

import ProfileLog from '@pages/ProfileLog/ProfileLog';
import ProfileSettings from '@pages/ProfileSettings/ProfileSettings';
import BookRegister from '@pages/BookRegister/BookRegister';

import MyArchive from '@pages/MyArchive/MyArchive';
import CreateReport from '@pages/MyArchive/CreateReport';

import Login from '@pages/Login';
import WithNavLayout from '@pages/layouts/WithNavLayout';

import BookClub from '@pages/BookClub/BookClub';
import BookClubDetail from '@pages/BookClubDetail/BookClubDetail';
import BookClubGenerate from '@pages/BookClubGenerate/BookClubGenerate';

import Places from '@pages/Places/Places';
import PlaceDetail from '@pages/PlaceDetail/PlaceDetail';
import AddPlace from '@pages/PlaceDetail/AddPlace';
import MyPlaceArchive from '@pages/Places/MyPlaceArchive';

import Near from '@pages/Near/Near';
import ClubDetailNavigator from '@pages/BookClubDetail/Navigator';
import WithOutNavLayout from '@pages/layouts/WithOutNavLayout';
import PostGenerate from '@pages/PostGenerate/PostGenerate';
import ClubBooks from '@pages/ClubBooks/ClubBooks';
import BookClubNavLayout from '@pages/layouts/BookClubNavLayout';

function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="" element={<WithNavLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/profile/:userId/book/:id" element={<HoldBookDetail />} />
        <Route path="/book/:id/log" element={<BookDetailLog />} />

        <Route path="/profile" element={<MyLibrary />} />
        <Route path="/profile/:userId" element={<UserLibrary />} />

        {/* /profile/userId/follow- 로 변경 필요 */}
        <Route path="/profile/follow" element={<Follow />} />

        <Route path="/profile/log" element={<ProfileLog />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/profile/register" element={<BookRegister />} />

        <Route path="/profile/archive" element={<MyArchive />} />
        <Route path="/profile/createReport" element={<CreateReport />} />

        <Route path="/book-club" element={<BookClub />} />
        <Route path="/book-club/generate" element={<BookClubGenerate />} />

        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceDetail />} />
        <Route path="/places/my-place-archive" element={<MyPlaceArchive />} />
        <Route path="/places/add-place" element={<AddPlace />} />

        <Route path="/near" element={<Near />} />
        <Route path="/near/bookdetail/:id" element={<BookDetail />} />

        <Route path="*" element={'404'} />
      </Route>
      <Route path="" element={<WithOutNavLayout />}>
        <Route path="/book-club/:id/generate-post" element={<PostGenerate />} />
      </Route>

      <Route path="" element={<BookClubNavLayout />}>
        <Route path="/book-club/:id/books" element={<ClubBooks />} />
        <Route path="/book-club/:id/plan" element={<ClubBooks />} />
        <Route path="/book-club/:id" element={<ClubDetailNavigator />} />
      </Route>
    </Routes>
  );
}

export default Router;
