import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import './PlaceRecommend.styles.scss';
import { MdLocalCafe } from 'react-icons/md';

const PlaceRecommend = () => {
  const [placesData, setPlacesData] = useState<any>();
  const getPlacesData = async () => await (await fetch('/places.json')).json();
  const { data } = useQuery('place-recommend', getPlacesData);

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
      loader={<h4>Loading...</h4>}
    >
      <div>
        {data?.data?.map((placeRecommend: any, id: number) => (
          <div key={id} className="place-container">
            <img src={placeRecommend.image_url} alt="" />
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
            <div />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PlaceRecommend;
