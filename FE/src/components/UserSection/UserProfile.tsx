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

  console.log(userData);

  return (
    <div className="user-profile-container">
      {userData?.map((data: any) => (
        <div>
          <img src={data.user_profile} alt="" />
          <span>{data.nickname}</span>
          <span>@{data.username}</span>
          <br />

          <div>
            <span>팔로잉: {data.following}</span>
            <span>팔로워: {data.follower}</span>
            <button>
              <RiChat3Line size={'2rem'} />
            </button>
            <button>팔로우</button>
          </div>
        </div>
      ))}
    </div>
  );
}
