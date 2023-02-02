import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArchiveLine, RiAddLine } from 'react-icons/ri';

import './PlaceHeader.styles.scss';

function PlaceHeader() {
//   const navigate = useNavigate();
//   const onClickAddPlace = () => {
//     navigate(`addPlace`);
//   };

//   const onClickMyPlace= () => {
//     navigate(`myPlace`);
//   };

  return (
    <div className="place-header-container">
      <div>
        <h1>장소추천</h1>
      </div>
      <div className="place-header-icon-container">
        <div className="place-header-icon-item">
          {/* onClick={onClickMyPlace} */}
          <RiArchiveLine size={'2rem'} />
        </div>
        <div className="place-header-icon-item">
          {/* onClick={onClickMyPlace} */}
          <RiAddLine size={'2rem'} />
        </div>
      </div>
    </div>
  );
}

export default PlaceHeader;
