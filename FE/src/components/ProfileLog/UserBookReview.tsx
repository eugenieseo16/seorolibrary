import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

import './UserBookReview.styles.scss';

function UserBookReview() {
  const data = useMyQuery(
    'https://dcdf1cac-0867-4f6b-baa5-0ac675f4d6e1.mock.pstmn.io/user-bookReview',
  );
  return (
    <div>
      {!data ? (
        <div>
          <h1>도서 리뷰를 남겨보세요!</h1>
        </div>
      ) : (
        <div className="book-review-container">
          {/* 도서 리뷰 카드 */}

          {data?.map((bookReview: any, i: number) => (
            <div className="book-review-card" key={i}>
              <div className="book-review-item">
                <div className="book-review-image">
                  <img src={bookReview.image_url} alt="" />
                </div>
                <div className="book-review-text">
                  <h1>{bookReview.review_title}</h1>
                  <h2>{bookReview.book_title}</h2>
                  <h3>{bookReview.review_content}</h3>
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
