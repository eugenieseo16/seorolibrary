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
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const param = useParams();
  const placeId = param?.id;
  const data = placeDetailAPI(placeId);

  console.log(data?.placeLatitude);

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }

    const mapOptions = {
      center: new window.kakao.maps.LatLng(38.450701, 106.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch('역삼동', function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });

        // const infowindow = new window.kakao.maps.InfoWindow({
        //   content:
        //     '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
        // });
        // infowindow.open(map, marker);

        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: '100%', height: '15rem' }}
      />
    </div>
  );
}

export default PlaceMap;
