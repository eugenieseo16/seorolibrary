import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RiArchiveLine, RiSettings4Line } from 'react-icons/ri';

import './UserHeader.styles.scss';

function UserHeader() {
const navigate = useNavigate();
const onClickProfileSettings = () => {
  navigate(`settings`);
}

const onClickMyArchive = () => {
  navigate(`archive`);
}

  return (
    <div className="user-header-container">
      <div className="user-header-item">
        <RiArchiveLine onClick={onClickMyArchive} size={'2rem'}/>
      </div>
      <div className="user-header-item">
        <RiSettings4Line 
        onClick={onClickProfileSettings} size={'2rem'}/>
      </div>
    </div>
  );
}

export default UserHeader;