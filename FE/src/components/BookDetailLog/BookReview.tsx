import React from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';

import './BookContent.styles.scss';
import { bookReviewAPI } from '@src/API/bookAPI';

interface IBookReview {
  isbn: any;
}
function BookReview({ isbn }: IBookReview) {
  const data = useMyQuery('/bookReview.json');

  const test = bookReviewAPI(isbn);
  console.log(test);

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
