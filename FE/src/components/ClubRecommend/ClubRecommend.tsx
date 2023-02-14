import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';
import './ClubRecommend.styles.scss';
import { useUser } from '@src/hooks/useUser';
import { useClubMainAPI } from '@src/API/clubAPI';

function ClubRecommend() {
  const user = useUser();
  const data = useClubMainAPI(user?.memberName);

  return (
    <div className="club-recommend-container">
      {data?.recommendGroups.map(group => (
        <div key={group.groupId}>
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
