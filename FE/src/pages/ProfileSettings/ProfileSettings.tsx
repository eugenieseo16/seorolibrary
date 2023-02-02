import React from 'react';

import Header from '@components/Header/Header';
import SettingItem from '@components/ProfileSettings/SettingItem';

function ProfileSettings () {
  return (
    <div>
      <Header text="프로필 설정"/>
      <SettingItem text="프로필 변경"/>
      <SettingItem text="비밀번호 변경"/>
      <SettingItem text="공지사항"/>
      <SettingItem text="이용약관"/>
      <SettingItem text="로그아웃"/>
    </div>
  )
}

export default ProfileSettings;