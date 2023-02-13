import React from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { FaQuoteRight } from 'react-icons/fa';

import './BookComment.styles.scss';
import { bookCommentAPI } from '@src/API/bookAPI';

interface IBookReview {
  isbn: string;
}

function BookReview({ isbn }: IBookReview) {
  const data = useMyQuery('/bookComment.json');

  const test = bookCommentAPI(isbn);
  console.log(test);

  return (
    <div className="book-comment-container">
      {data?.data?.map((comment: any, i: number) => (
        <div key={i} className="book-comment-item">
          <div className="user-detail-container">
            <div className="user-detail-item">
              <img src={comment.profile_img} alt="" />
              <h2>{comment.nickname}</h2>
            </div>
            <div>
              <FaQuoteRight size={'1rem'} />
            </div>
          </div>
          <div className="comment-detail-container">
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookReview;
