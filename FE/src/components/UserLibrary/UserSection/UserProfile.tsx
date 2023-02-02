import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './UserProfile.styles.scss';

import { FaRegChartBar } from 'react-icons/fa';
import { RiChat3Line } from 'react-icons/ri';

interface UserProfileProps {
  is_me: boolean;
}

export default function UserProfile( { is_me } : UserProfileProps) {
  const [userData, setUserData] = useState<any>();

  const getUserData = async () => {
    const { data } = await (await fetch('/user.json')).json();
    setUserData(data);
  };



  const navigate = useNavigate();
  const onClickUserStatistics = () => {
    navigate(`/profile/statistics`);
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
            <div>

            <div className="profile-user">
              <h2>{data.nickname}</h2>
              <span>@{data.username}</span>
            </div>

            <div className="profile-follow">
                <span>팔로잉: {data.following} 팔로워: {data.follower}</span>
            </div>
            </div>

              <div>
                { is_me ? (
                      <div className="profile-button">
                        <button>팔로우</button>
                        <button className="icon-button">
                          <RiChat3Line
                            // onClick={}
                            size={'1rem'}/>
                        </button>
                      </div>
                  
                    ) : (
                      <div className="profile-button">
                        <button onClick={onClickBookRegister}>도서 등록</button>
                        <button className="icon-button">
                         <FaRegChartBar
                        onClick={onClickUserStatistics}
                        size={'1rem'}/>
                      </button>
                     </div>
                    )
                }
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}
