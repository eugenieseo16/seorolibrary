import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ArchiveHeader.styles.scss'
import { RiAddLine } from 'react-icons/ri';

function ArchiveHeader() {
  const navigate = useNavigate();
  const onClickMyArchive = () => {
    navigate(`/profile/createReport`);
  };

  return (
    <div className="header-container">
      <div className="header-text">
        <h1>독서 기록</h1>
      </div>
      <div className="header-icon-container">
        <div className="header-icon-item">
          <RiAddLine onClick={onClickMyArchive} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}
export default ArchiveHeader;
