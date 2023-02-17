import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './UserProfile.styles.scss';

import { FaRegChartBar } from 'react-icons/fa';
import { RiChat3Line } from 'react-icons/ri';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { apiBaseUrl } from '@src/API/apiUrls';
import { useUser } from '@src/hooks/useUser';
import { IUser } from '@src/types/types';
import { libraryDataAPI } from '@src/API/libraryAPI';
import { BiMap } from 'react-icons/bi';

interface UserProfileProps {
  isMe: boolean;
}
interface IUserProfileData {
  user_profile: string;
  username: string;
  nickname: string;
  following: number;
  follower: number;
}

function useUserLibrary() {
  const user = useUser();
}

export default function UserProfile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const user = useUser();

  const userData: IUser = useMyQuery(`${apiBaseUrl}/members/${username}`);

  return (
    <div className="user-profile-container">
      {userData && user ? (
        <Item userData={userData} user={user} username={username} />
      ) : (
        'Loading...'
      )}
    </div>
  );
}

function Item({ userData, username, user }: any) {
  const navigate = useNavigate();
  const libraryData = libraryDataAPI({
    me: +user?.memberId,
    you: +userData?.memberId,
  });

  return (
    <div className="user-profile">
      <div className="profile-img">
        <img src={userData?.memberProfile} alt="" />
      </div>

      <div className="profile">
        <div>
          <div
            style={{ flexDirection: 'column', alignItems: 'start' }}
            className="profile-user"
          >
            <h2>{userData?.memberName}</h2>
            <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BiMap />
              {userData.memberDongCode}
            </span>
          </div>

          {/* <div className="profile-follow">
                <span
                  className="following"
                  onClick={() => navigate(`/profile/follow`)}
                >
                  팔로잉: {userData?.following}
                </span>
                <span
                  className="follower"
                  onClick={() => navigate(`/profile/follow`)}
                >
                  ⠀팔로워: {userData?.follower}
                </span>
              </div> */}
        </div>

        <div>
          <div className="profile-button">
            <button>팔로우</button>
            <button className="icon-button">
              <RiChat3Line
                onClick={() => navigate(`/chat/${username}`)}
                size={'1rem'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
