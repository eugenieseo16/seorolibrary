import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@components/Header/Header';
import LogTab from '@components/ProfileLog/LogTab';

function ProfileLog() {
  const { state } = useLocation();

  return (
    <div style={{ padding: '0px 10px' }}>
      <Header text="{사용자 닉네임}" />
      <LogTab tab={state} />
    </div>
  );
}

export default ProfileLog;
