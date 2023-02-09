import React from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';

import './UserResult.styles.scss';

function UserResult() {
  const data = useMyQuery('/userFollowing.json');

  return (
    <div className="user-follow-container">
      {data?.map((user: any, i: number) => (
        <div key={i} className="user-follow-item">
          <img src={user.avatar} alt="" />
          <p>{user.nickname}</p>
        </div>
      ))}
    </div>
  );
}

export default UserResult;
