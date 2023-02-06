import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArchiveDrawerLine, RiAddLine } from 'react-icons/ri';

import './PlaceHeader.styles.scss';

function PlaceHeader() {
  const navigate = useNavigate();
  const onClickAddPlace = () => {
    navigate(`addplace`);
  };

  const onClickMyPlace = () => {
    navigate(`myplace`);
  };

  return (
    <div className="place-header-container">
      <div>
        <h1>장소추천</h1>
      </div>
      <div className="place-header-icon-container">
        <div className="place-header-icon-item">
          <RiArchiveDrawerLine onClick={onClickMyPlace} size={'2rem'} />
        </div>
        <div className="place-header-icon-item">
          <RiAddLine onClick={onClickAddPlace} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default PlaceHeader;
