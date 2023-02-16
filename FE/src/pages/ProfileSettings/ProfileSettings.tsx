import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/Header/Header';
import EditProfile from '@components/ProfileSettings/EditProfile';
import SettingItem from '@components/ProfileSettings/SettingItem';
import { useDispatch } from 'react-redux';
import { logout } from '@src/store/slices/userSlice';

function ProfileSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div style={{ padding: '0 10px' }}>
      <Header text="프로필 설정" />
      <EditProfile />
      <div onClick={() => navigate('policy')}>
        <SettingItem text="이용약관" />
      </div>
      <div onClick={() => dispatch(logout())}>
        <SettingItem text="로그아웃" />
      </div>
    </div>
  );
}

export default ProfileSettings;
