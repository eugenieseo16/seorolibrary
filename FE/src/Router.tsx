import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import BookDetail from '@pages/BookDetail/BookDetail';
import HoldBookDetail from '@pages/BookDetail/BookDetail';
import BookDetailLog from '@pages/BookDetail/BookDetailLog';

import Search from '@pages/Search/Search';

import UserLibrary from '@pages/UserLibrary/UserLibrary';
import Follow from '@pages/UserLibrary/Follow';

import ProfileLog from '@pages/ProfileLog/ProfileLog';
import BookRegister from '@pages/BookRegister/BookRegister';

import ProfileSettings from '@pages/ProfileSettings/ProfileSettings';
import ChangePassword from '@pages/ProfileSettings/ChangePassword';
import Policy from '@pages/ProfileSettings/Policy';

import MyArchive from '@pages/MyArchive/MyArchive';
import CreateReport from '@pages/MyArchive/CreateReport';

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
import ClubPlan from '@pages/ClubPlan/ClubPlan';
import ChatsList from '@pages/Chats/ChatsList';
import Chat from '@pages/Chats/Chat';
import PlanGenerate from '@pages/PlanGenerate/PlanGenerate';
import MyProfile from '@components/UserLibrary/UserSection/MyProfile';
import MyLibrary from '@pages/UserLibrary/MyLibrary';

function Router() {
  return (
    <Routes>
      <Route path="" element={<WithNavLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/book/:isbn" element={<BookDetail />} />

        <Route path="/profile/book/:isbn" element={<HoldBookDetail />} />
        <Route path="/book/:isbn/log" element={<BookDetailLog />} />

        <Route path="/profile" element={<MyLibrary />} />
        <Route path="/profile/:username" element={<UserLibrary />} />

        {/* /profile/userId/follow- 로 변경 필요 */}
        <Route path="/profile/follow" element={<Follow />} />

        <Route path="/profile/log" element={<ProfileLog />} />

        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/profile/settings/password" element={<ChangePassword />} />
        <Route path="/profile/settings/policy" element={<Policy />} />

        <Route path="/profile/archive" element={<MyArchive />} />
        <Route path="/profile/createReport" element={<CreateReport />} />

        <Route path="/book-club" element={<BookClub />} />
        <Route path="/book-club/generate" element={<BookClubGenerate />} />

        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceDetail />} />
        <Route path="/places/my-place-archive" element={<MyPlaceArchive />} />
        <Route path="/places/add-place" element={<AddPlace />} />

        <Route path="/near" element={<Near />} />
        {/* <Route path="/near/bookdetail/:id" element={<BookDetail />} /> */}

        <Route path="*" element={'404'} />
      </Route>
      <Route path="" element={<WithOutNavLayout />}>
        <Route path="/chat-list" element={<ChatsList />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/book-club/:id/generate-post" element={<PostGenerate />} />
        <Route path="/profile/register" element={<BookRegister />} />
        <Route path="/book-club/:id/plan/generate" element={<PlanGenerate />} />
        <Route
          path="/profile/:memberName/book/:isbn"
          element={<HoldBookDetail />}
        />
      </Route>

      <Route path="" element={<BookClubNavLayout />}>
        <Route path="/book-club/:id/books" element={<ClubBooks />} />
        <Route path="/book-club/:id/plan" element={<ClubPlan />} />
        <Route path="/book-club/:id" element={<ClubDetailNavigator />} />
      </Route>
    </Routes>
  );
}

export default Router;
