import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import './PlaceReview.styles.scss';
import AddPlaceReviewModal from './AddPlaceReviewModal';

function PlaceReview() {
  const navigate = useNavigate();
  const getBookReview = async () =>
    await (await fetch('/bookReview.json')).json();
  const { data } = useQuery('book-review', getBookReview);

  const [showFullContent, setShowFullContent] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className="place-review-container">
      <div className="place-review-header-container">
        <div>
          <h2>리뷰</h2>
        </div>
        <div className="place-review-header-icon-container">
          <div className="place-review-header-icon-item">
            <AddPlaceReviewModal />
          </div>
        </div>
      </div>
      <div>
        {data?.data?.map((review: any, i: number) => (
          <div className="place-review-item" key={i}>
            <div className="place-review-user-info">
              <img
                src={review.profile_img}
                alt=""
                onClick={() => navigate(`/profile/${i}`)}
              />
              <p onClick={() => navigate(`/profile/${i}`)}>{review.nickname}</p>
            </div>
            <div className="place-review-detail">
              <a>
                {showFullContent[review.id]
                  ? review.content
                  : review.content.substring(
                      0,
                      Math.min(review.content.length, 70),
                    ) + '...'}
              </a>
              <a
                onClick={() =>
                  setShowFullContent({
                    ...showFullContent,
                    [review.id]: !showFullContent[review.id],
                  })
                }
                className="place-review-more"
              >
                {showFullContent[review.id] ? '[닫기]' : '[더보기]'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceReview;
