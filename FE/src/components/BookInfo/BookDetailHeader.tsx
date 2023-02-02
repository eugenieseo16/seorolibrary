import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RiAddLine } from 'react-icons/ri';

import './BookDetailHeader.styles.scss';

function BookDetailHeader() {
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
        <h1>도서 정보</h1>
      </div>
      <div className="header-icon-container">
        <div className="header-icon-item">
          <RiAddLine onClick={onClickMyArchive} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default BookDetailHeader;
