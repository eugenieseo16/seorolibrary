import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MdLocalCafe } from 'react-icons/md';
import { FaQuoteLeft } from 'react-icons/fa';

import './MyPlaceReview.styles.scss';

function MyPlaceReview() {
  const [placesData, setPlacesData] = useState<any>();
  const getPlacesData = async () =>
    await (await fetch('/places_myreview.json')).json();
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
        <div>
          {!data ? (
            <div>
              <h1>독서하기 좋은 장소를 추가해보세요!</h1>
            </div>
          ) : (
            <div className="bookclub-container">
              {/* 독서 모임 카드 */}

              {data?.data?.map((placeRecommend: any, id: number) => (
                <div
                  className="my-place-review-card"
                  key={id}
                  onClick={() => navigate(`/places/${id}`)}
                >
                  <div className="my-place-review-item">
                    <img src={placeRecommend.image_url} alt="" />
                    <div className="shadow-wrapper">
                      <div className="my-place-review-content">
                        <div className="my-place-review-title">
                          <h1>
                            <MdLocalCafe />
                            {placeRecommend.title}
                          </h1>
                        </div>
                        <h2>
                          <FaQuoteLeft />
                          {placeRecommend.location}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default MyPlaceReview;
