import React from 'react';
import { useQuery } from 'react-query';
import { RiEdit2Line } from 'react-icons/ri';

import './PlaceReview.styles.scss';

function PlaceReview() {
  
  const getBookReview = async () =>
    await (await fetch('/bookReview.json')).json();
  const { data } = useQuery('book-review', getBookReview);

  return (
    <div className="place-review-container">
      <div className="place-review-header">
        <h2>리뷰</h2>
        {/* 클릭하면 리뷰작상 모달? 뭐든 .. */}
        <RiEdit2Line size={'2rem'} />
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