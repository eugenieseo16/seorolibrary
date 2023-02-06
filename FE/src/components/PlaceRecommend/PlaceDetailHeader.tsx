import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArchiveDrawerLine, RiAddLine } from 'react-icons/ri';

import './PlaceDetailHeader.styles.scss';

function PlaceDetailHeader() {
  const navigate = useNavigate();
  const onClickAddPlace = () => {
    navigate(`add-place`);
  };

  const onClickMyPlaceArchive = () => {
    navigate(`my-place-archive`);
  };

  return (
    <div className="place-header-container">
      <div>
        <h1>장소 상세보기</h1>
      </div>
      <div className="place-header-icon-container">
        <div className="place-header-icon-item">
          <RiArchiveDrawerLine onClick={onClickMyPlaceArchive} size={'2rem'} />
        </div>
        <div className="place-header-icon-item">
          <RiAddLine onClick={onClickAddPlace} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailHeader;
