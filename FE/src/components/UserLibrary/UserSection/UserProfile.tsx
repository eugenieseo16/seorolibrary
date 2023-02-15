import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './UserProfile.styles.scss';

import { FaRegChartBar } from 'react-icons/fa';
import { RiChat3Line } from 'react-icons/ri';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { apiBaseUrl } from '@src/API/apiUrls';
import { useUser } from '@src/hooks/useUser';

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

export default function UserProfile({ isMe }: UserProfileProps) {
  const navigate = useNavigate();
  const { username } = useParams();
  console.log(isMe);

  const targetUser = isMe
    ? useUser()
    : useMyQuery(`${apiBaseUrl}/members/${username}`);

  console.log('TARGET', targetUser);

  const userData: IUserProfileData | undefined = useMyQuery('/user.json');

  return (
    <div className="user-profile-container">
      {userData ? (
        <div className="user-profile">
          <div className="profile-img">
            <img src={userData?.user_profile} alt="" />
          </div>

          <div className="profile">
            <div>
              <div className="profile-user">
                <h2>{userData?.nickname}</h2>
                <span>@{userData?.username}</span>
              </div>

              <div className="profile-follow">
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
              </div>
            </div>

            <div>
              {isMe ? (
                <div className="profile-button">
                  <button onClick={() => navigate(`/profile/register`)}>
                    도서 등록
                  </button>
                  <button className="icon-button">
                    <RiChat3Line
                      onClick={() => navigate('/chat-list')}
                      size={'1rem'}
                    />
                  </button>
                </div>
              ) : (
                <div className="profile-button">
                  <button>팔로우</button>
                  <button className="icon-button">
                    <RiChat3Line
                      onClick={() => navigate(`/chat/${username}`)}
                      size={'1rem'}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
}
