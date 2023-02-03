import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './UserProfile.styles.scss';

import { FaRegChartBar } from 'react-icons/fa';
import { RiChat3Line } from 'react-icons/ri';
import { useMyQuery } from '@src/hooks/useMyQuery';

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
  const query = useMyQuery('/user.json');
  const [userData, setUserData] = useState<IUserProfileData | null>(null);
  const navigate = useNavigate();
  const onClickUserStatistics = () => {
    navigate(`/profile/statistics`);
  };
  const onClickBookRegister = () => {
    navigate(`/profile/register`);
  };

  useEffect(() => {
    if (!query) return;
    setUserData(query.data);
  }, [query]);

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
                <span>
                  팔로잉: {userData?.following} 팔로워: {userData?.follower}
                </span>
              </div>
            </div>

            <div>
              {is_me ? (
                <div className="profile-button">
                  <button>팔로우</button>
                  <button className="icon-button">
                    <RiChat3Line
                      // onClick={}
                      size={'1rem'}
                    />
                  </button>
                </div>
              ) : (
                <div className="profile-button">
                  <button onClick={onClickBookRegister}>도서 등록</button>
                  <button className="icon-button">
                    <FaRegChartBar
                      onClick={onClickUserStatistics}
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
