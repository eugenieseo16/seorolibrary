import React from 'react';
import { useNavigate } from 'react-router-dom';

import './UserProfile.styles.scss';

import { RiChat3Line } from 'react-icons/ri';
import { useUser } from '@src/hooks/useUser';

export default function MyProfile() {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="user-profile-container">
      {user ? (
        <div className="user-profile">
          <div className="profile-img">
            <img src={user?.memberProfile} alt="" />
          </div>

          <div className="profile">
            <div>
              <div className="profile-user">
                <h2>{user?.memberName}</h2>
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
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
}
