import React from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';

import './BookContent.styles.scss';

function BookReview() {
  const data = useMyQuery('/bookReview.json');

  return (
    <div className="book-content-container">
      {data?.data?.map((comment: any, i: number) => (
        <div key={i} className="book-content-item">
          <div className="user-detail-container">
            <img src={comment.profile_img} alt="" />
            <h2>{comment.nickname}</h2>
          </div>
          <div className="content-detail-container">
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReview;
