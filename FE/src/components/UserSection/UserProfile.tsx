import React, { useEffect, useState } from 'react';
import './UserProfile.styles.scss';

import { RiChat3Line } from 'react-icons/ri';

export default function UserProfile() {
  const [userData, setUserData] = useState<any>();

  const getUserData = async () => {
    const { data } = await (await fetch('/user.json')).json();
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="user-profile-container">
      {userData?.map((data: any) => (
        <div className="user-profile">
          <div className="profile-img">
            <img src={data.user_profile} alt="" />
          </div>

          <div className="profile">
            <div className="profile-user">
              <span>{data.nickname}</span>
              <span>@{data.username}</span>
            </div>

            <div className="profile-follow">
              <div>
                <span>팔로잉: {data.following}</span>
                <span>팔로워: {data.follower}</span>
              </div>

              <div>
                <button>프로필 설정</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
