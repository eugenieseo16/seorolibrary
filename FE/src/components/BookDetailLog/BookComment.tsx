import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';

import './BookComment.styles.scss';
import { bookCommentAPI } from '@src/API/bookAPI';
import { useNavigate } from 'react-router-dom';

interface IBookReview {
  isbn: any;
}

function BookReview({ isbn }: IBookReview) {
  const navigate = useNavigate();
  const data = bookCommentAPI(isbn);

  return (
    <div className="book-comment-container">
      {data?.comments?.map((comment: any, i: number) => (
        <div
          key={i}
          className="book-comment-item"
          onClick={() =>
            navigate(`/profile/${comment.memberName}/book/${isbn}`)
          }
        >
          <p>{data.memberId}</p>
          <div className="user-detail-container">
            <div className="user-detail-item">
              <img src={comment.memberProfile} alt="" />
              <h2>{comment.memberName}</h2>
            </div>
            <div>
              <FaQuoteRight size={'1rem'} />
            </div>
          </div>
          <div className="comment-detail-container">
            <p>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReview;
