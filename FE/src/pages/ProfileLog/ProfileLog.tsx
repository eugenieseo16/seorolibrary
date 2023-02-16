import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Header from '@components/Header/Header';
import LogTab from '@components/ProfileLog/LogTab';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { apiBaseUrl } from '@src/API/apiUrls';

function ProfileLog() {
  const { state } = useLocation();
  const { userId } = useParams();
  const user = useMyQuery(`${apiBaseUrl}/members/search?memberId=${userId}`);

  return (
    <div style={{ padding: '0px 10px' }}>
      <Header text={`${user?.memberName}님의 기록`} />
      <LogTab tab={state} />
    </div>
  );
}

export default ProfileLog;
