import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';
import { MdLocalCafe } from 'react-icons/md';

import './PlaceImage.styles.scss';

function PlaceImage() {
  const image_url =
    'https://ldb-phinf.pstatic.net/20221129_186/1669714890383a4Ysc_JPEG/KakaoTalk_20221116_150311430.jpg';
  const title = '가게 이름';
  const description =
    '가게 설명 프엔으로 해도 된다고 하겠지만 유니티 개발 희망자가 있을지 모르겠네 근데프엔으로 날고 기어봤자 유니티 못이김';
  return (
    <div className="place-desciption-container">
      <div className="place-detail-image-container">
        <img src={image_url} alt="" />
      </div>
      <div className="place-detail-content-container">
        <h2>
          <MdLocalCafe />
          &nbsp;
          {title}
        </h2>
        <h6>{description}</h6>
      </div>
    </div>
  );
}

export default PlaceImage;
