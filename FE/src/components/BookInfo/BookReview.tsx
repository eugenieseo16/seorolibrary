import React from 'react';
import { useQuery } from 'react-query';

import './BookReview.styles.scss';

function BookReview() {
  const getBookReview = async () =>
    await (await fetch('/bookReview.json')).json();
  const { data } = useQuery('book-review', getBookReview);

  return (
    <div className="book-review-container">
      <h1>리뷰</h1>
      <div>
        {data?.data?.map((review: any, i: number) => (
          <div className="review-item" key={i}>
            <div className="review-user-info">
              <img src={review.profile_img} alt="" />
              <p>{review.nickname}</p>
            </div>

            <div className="review-detail">
              <a>{review.content}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookReview;
