import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MdLocalCafe } from 'react-icons/md';
import { FaQuoteLeft } from 'react-icons/fa';

import './MyPlaceReview.styles.scss';

function MyPlaceReview() {
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
      className="reveiw-place-container"
      dataLength={8}
      next={fetchData}
      hasMore={true}
      loader=""
    >
      <div>
        {data?.data?.map((placeRecommend: any, id: number) => (
          <div
            key={id}
            className="my-review-container"
            onClick={() => navigate(`/places/${id}`)}
          >
            <h2>
              <MdLocalCafe />
              &nbsp;
              {placeRecommend.title}
            </h2>
            <img src={placeRecommend.image_url} alt="" />
            <div className="my-review-box">
              <h6>
                <FaQuoteLeft />
                &nbsp;
                {placeRecommend.title}&nbsp;
                {placeRecommend.title}&nbsp;
                {placeRecommend.title}
              </h6>
            </div>
            <div className="my-place-review-line" />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default MyPlaceReview;
