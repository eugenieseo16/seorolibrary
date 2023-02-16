import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

import './UserBookReview.styles.scss';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '@src/API/apiUrls';

function UserBookReview() {
  const data = useMyQuery(
    'https://dcdf1cac-0867-4f6b-baa5-0ac675f4d6e1.mock.pstmn.io/user-bookReview',
  );
  const { userId } = useParams();
  const reviews = useMyQuery(`${apiBaseUrl}/librarys/${userId}/reviews`);
  console.log(reviews);
  return (
    <div>
      {!data ? (
        <div>
          <h1>도서 리뷰를 남겨보세요!</h1>
        </div>
      ) : (
        <div className="book-review-container">
          {/* 도서 리뷰 카드 */}

          {reviews?.map((bookReview: any, i: number) => (
            <div className="book-review-card" key={i}>
              <div className="book-review-item">
                <div className="book-review-image">
                  <img src={bookReview.bookImage} alt="" />
                </div>
                <div className="book-review-text">
                  <h2>{bookReview.bookTitle}</h2>
                  <h3>{bookReview.reviewContent}</h3>
                </div>
              </div>
              <div className="line"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookReview;
