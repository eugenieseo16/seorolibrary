import React from 'react';
import { useLocation } from "react-router-dom";

import Header from '@components/Header/Header';
import LogTab from '@components/ProfileLog/LogTab';

function ProfileLog () {
  const {state} = useLocation();

  return (
    <div>
      <Header text="프로필 로그(임시 헤더)"/>
      <LogTab tab={state}/>
    </div>
  )
}

export default ProfileLog;