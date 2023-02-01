import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import './UserProfile.styles.scss';

export default function UserProfile() {
  const [userData, setUserData] = useState<any>();

  const getUserData = async () => {
    const { data } = await (await fetch('/user.json')).json();
    setUserData(data);
  };

  const navigate = useNavigate();
  const onClickProfileSettings = () => {
    navigate(`/profile/settings`);
  };
  const onClickBookRegister = () => {
    navigate(`/profile/register`);
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
                {/* 나의 미니도서관이면 */}
                <button onClick={onClickProfileSettings}>프로필 설정</button>
                <button onClick={onClickBookRegister}>도서 등록</button>

                {/* 타유저의 미니도서관이면 */}
                {/* <button>1:1채팅</button>
                <button>팔로우</button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
