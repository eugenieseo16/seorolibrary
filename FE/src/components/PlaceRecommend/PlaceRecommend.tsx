import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MdLocalCafe } from 'react-icons/md';

import './PlaceRecommend.styles.scss';

const PlaceRecommend = () => {
  const [placesData, setPlacesData] = useState<any>();
  const getPlacesData = async () => await (await fetch('/places.json')).json();
  const { data } = useQuery('place-recommend', getPlacesData);

  const navigate = useNavigate();

  const fetchData = () => {
    setTimeout(() => {
      setPlacesData(placesData.concat(Array.from({ length: 6 })));
    }, 1500);
  };

  return (
    <InfiniteScroll
      className="place-recommend-container"
      dataLength={8}
      next={fetchData}
      hasMore={true}
      loader=""
    >
      <div>
        {data?.data?.map((placeRecommend: any, id: number) => (
          <div
            key={id}
            className="place-container"
            onClick={() => navigate(`/places/${id}`)}
          >
            <h2>
              <MdLocalCafe />
              &nbsp;
              {placeRecommend.title}
            </h2>
            <h6>
              {placeRecommend.title}&nbsp;
              {placeRecommend.title}&nbsp;
              {placeRecommend.title}
            </h6>
            <img src={placeRecommend.image_url} alt="" />
            <div className="line" />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PlaceRecommend;
