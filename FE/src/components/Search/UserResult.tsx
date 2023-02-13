import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyQuery } from '@src/hooks/useMyQuery';

import './UserResult.styles.scss';
import { searchAPI } from '@src/API/BookAPI';

interface IUserResultProps {
  input: string;
}

function UserResult({ input }: IUserResultProps) {
  const data = searchAPI(input)[1];
  const navigate = useNavigate();

  return (
    <div className="user-follow-container">
      {data?.map((user: any, i: number) => (
        <div
          key={i}
          className="user-follow-item"
          onClick={() => navigate(`/profile/${user.memberName}`)}
        >
          <img src={user.memberProfile} alt="" />
          <p>{user.memberName}</p>
        </div>
      ))}
    </div>
  );
}

export default UserResult;
