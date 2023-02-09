import React, { useState } from 'react';
import { useQuery } from 'react-query';

import './PlaceReview.styles.scss';
import AddPlaceReviewModal from './AddPlaceReviewModal';

function PlaceReview() {
  const getBookReview = async () =>
    await (await fetch('/bookReview.json')).json();
  const { data } = useQuery('book-review', getBookReview);

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
              <img src={review.profile_img} alt="" />
              <p>{review.nickname}</p>
            </div>
            <div className="place-review-detail">
              <a>{review.content}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceReview;
