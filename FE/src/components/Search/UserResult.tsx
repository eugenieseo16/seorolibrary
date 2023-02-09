import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyQuery } from '@src/hooks/useMyQuery';

import './UserResult.styles.scss';

function UserResult() {
  const data = useMyQuery('/userFollowing.json');
  const navigate = useNavigate();

  return (
    <div className="user-follow-container">
      {data?.map((user: any, i: number) => (
        <div
          key={i}
          className="user-follow-item"
          onClick={() => navigate('/profile/1')}
        >
          <img src={user.avatar} alt="" />
          <p>{user.nickname}</p>
        </div>
      ))}
    </div>
  );
}

export default UserResult;
