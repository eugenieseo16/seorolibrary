import React from 'react';
import './BookContent.styles.scss';
import { bookReviewAPI } from '@src/API/bookAPI';
import { useNavigate } from 'react-router-dom';

interface IBookReview {
  isbn: any;
}
function BookReview({ isbn }: IBookReview) {
  const navigate = useNavigate();
  const data = bookReviewAPI(isbn);
  console.log(data?.reviews);

  return (
    <div className="book-content-container">
      {data?.reviews?.map((review: any, i: number) => (
        <div
          key={i}
          className="book-content-item"
          onClick={() => navigate(`/profile/${review.memberName}/book/isbn`)}
        >
          <div className="user-detail-container">
            <img src={review.memberProfile} alt="" />
            <h2>{review.memberName}</h2>
          </div>
          <div className="content-detail-container">
            <p>{review.reviewContent}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReview;
