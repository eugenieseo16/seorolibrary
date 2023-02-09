import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArchiveDrawerLine, RiAddLine } from 'react-icons/ri';
import { MdLocalCafe } from 'react-icons/md';
import './PlaceDetailHeader.styles.scss';

function PlaceDetailHeader() {
  const navigate = useNavigate();
  const onClickAddPlace = () => {
    navigate(`/places/add-place`);
  };

  const onClickMyPlaceArchive = () => {
    navigate(`/places/my-place-archive`);
  };
  const title = '가게 이름';

  return (
    <div className="place-header-container">
      <div>
        <h1>
          <MdLocalCafe />
          &nbsp;
          {title}
        </h1>
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
