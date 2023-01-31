import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import './PlaceRecommend.styles.scss';
import { MdLocalCafe } from 'react-icons/md';

const PlaceRecommend = () => {
  const [placesData, setPlacesData] = useState<any>();
  const getPlacesData = async () =>
    await (await fetch('/places.json')).json();
  const { data } = useQuery('place-recommend', getPlacesData);
  
  const fetchData = () => {
    setTimeout(() => {
      setPlacesData(placesData.concat(Array.from({ length: 8})))
    }, 1500)
  }
  
  return (
    <InfiniteScroll 
      className="place-recommend-container"
      dataLength={15}
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div>
        {data?.data?.map((placeRecommend: any, i: number) => (
          <div key={i} className="place-container">
            <img src={placeRecommend.thumUrl} alt="" />
            <h2><MdLocalCafe/>{placeRecommend.name}</h2>
            <h6>{placeRecommend.address}</h6>
            <hr/>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PlaceRecommend;
