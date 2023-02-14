import React from 'react';

import './ClubRecommend.styles.scss';
import { useUser } from '@src/hooks/useUser';
import { useClubMainAPI } from '@src/API/clubAPI';
import { useNavigate } from 'react-router-dom';

function ClubRecommend() {
  const navigate = useNavigate();
  const user = useUser();
  const data = useClubMainAPI(user?.memberName);

  return (
    <div className="club-recommend-container">
      {data?.recommendGroups.map(group => (
        <div
          onClick={() => navigate(`/book-club/${group.groupId}`)}
          key={group.groupId}
        >
          <img src={group.groupProfile} alt="" />
          <div className="shadow-wrapper" />
          <h2>{group.groupName}</h2>
          <h6>{group.groupDescrib}</h6>
        </div>
      ))}
    </div>
  );
}

export default ClubRecommend;
