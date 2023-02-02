import React from 'react';
import { useLocation } from "react-router-dom";

import Header from '@components/Header/Header';
import LogTab from '@components/ProfileLog/LogTab';

function ProfileLog () {
  const {state} = useLocation();
console.log(state);
  return (
    <div>
      <Header text="프로필 로그"/>
      <LogTab tab={state}/>
    </div>
  )
}

export default ProfileLog;