import React, { useEffect, useRef } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useParams } from 'react-router-dom';
import { placeDetailAPI } from '@src/API/placeAPI';

declare global {
  interface Window {
    kakao: any;
  }
}

function PlaceMap() {

  const param = useParams();
  const placeId = param?.id;
  const data = placeDetailAPI(placeId);

  console.log(data?.placeLatitude);

  const latitude = 33.450701;
  const longitude = 126.570667;
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '15rem' }} />
    </div>
  );
}

export default PlaceMap;
