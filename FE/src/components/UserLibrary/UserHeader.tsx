import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RiArchiveLine, RiSettings4Line } from 'react-icons/ri';

import './UserHeader.styles.scss';

function UserHeader() {
  const navigate = useNavigate();
  const onClickProfileSettings = () => {
    navigate(`settings`);
  };

  const onClickMyArchive = () => {
    navigate(`archive`);
  };

  return (
    <div className="user-header-container">
      <div className="user-header-text">
        <h1>나의 도서관</h1>
      </div>
      {/* 타사용자 프로필일 경우 아카이브 아이콘 제외해서 보여주기 추가 예정 */}
      <div className="header-icon-container">
        <div className="header-icon-item">
          <RiArchiveLine onClick={onClickMyArchive} size={'2rem'} />
        </div>

        <div className="header-icon-item">
          <RiSettings4Line onClick={onClickProfileSettings} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
