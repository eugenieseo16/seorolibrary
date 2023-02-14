import React from 'react';
import { useNavigate } from 'react-router-dom';

import './UserRecommend.styles.scss';
import { useClubMainAPI } from '@src/API/clubAPI';
import { useUser } from '@src/hooks/useUser';

function UserRecommend() {
  const user = useUser();
  const clubData = useClubMainAPI(user?.memberName);
  const navigate = useNavigate();

  return (
    <div className="user-recommend-container">
      {clubData?.recommendMembers?.map(member => (
        <div
          className="user-item"
          key={member.memberId}
          onClick={() =>
            navigate(`/profile/${member.memberId}`, { state: true })
          }
        >
          <img src={member.memberProfile} alt="" />
          <h2>{member.memberName}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserRecommend;
