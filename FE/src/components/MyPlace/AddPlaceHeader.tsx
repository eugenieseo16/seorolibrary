import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArchiveDrawerLine } from 'react-icons/ri';

import './AddPlaceHeader.styles.scss';

function AddPlaceHeader() {
  const navigate = useNavigate();
  const onClickMyPlaceArchive = () => {
    navigate(`/places/my-place-archive`);
  };

  return (
    <div className="my-place-header-container">
      <div>
        <h1>장소 추가</h1>
      </div>
      <div className="my-place-header-icon-container">
        <div className="my-place-header-icon-item">
          <RiArchiveDrawerLine onClick={onClickMyPlaceArchive} size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default AddPlaceHeader;
