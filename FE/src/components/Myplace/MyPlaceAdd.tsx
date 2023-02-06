import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyQuery } from '@src/hooks/useMyQuery';
import './MyPlaceAdd.styles.scss';

function MyPlaceAdd() {
  const navigate = useNavigate();
  const data = useMyQuery('/places.json');

  return (
    <div className="my-place-add-container">
      {data?.data?.map((place: any, i: number) => (
        <div
          key={i}
          onClick={() => navigate(`/places/${i}`)}
          className="my-place-add-content-container"
        >
          <img src={place.image_url} alt="" />
          <div className="shadow-wrapper" />
          <div className="content">
            <h2>{place.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPlaceAdd;
