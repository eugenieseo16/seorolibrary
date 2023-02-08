import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';

import './MyPlaceHeader.styles.scss';

function MyPlaceHeader() {
  const navigate = useNavigate();
  const onClickAddPlace = () => {
    navigate(`/places/add-place`);
  };

  return (
    <div className="my-place-header-container">
      <div>
        <h1>나의 장소</h1>
      </div>
      <div className="my-place-header-icon-container">
        <div className="my-place-header-icon-item">
          <RiAddLine onClick={onClickAddPlace} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default MyPlaceHeader;
