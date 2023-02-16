import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

import { FaQuoteLeft } from 'react-icons/fa';
import './UserBookComment.styles.scss';
import { apiBaseUrl } from '@src/API/apiUrls';
import { useParams } from 'react-router-dom';

function UserBookComment() {
  const data = useMyQuery(
    'https://dcdf1cac-0867-4f6b-baa5-0ac675f4d6e1.mock.pstmn.io/user-bookComment',
  );

  const { userId } = useParams();
  const comments = useMyQuery(`${apiBaseUrl}/librarys/${userId}/comments`);

  return (
    <div>
      <div>
        {!data ? (
          <div>
            <h1>도서 등록을 해보세요!</h1>
          </div>
        ) : (
          <div className="book-comment-container">
            {/* 한줄평 카드 */}

            {comments?.map((bookComment: any, i: number) => (
              <div className="book-comment-card" key={bookComment.ownBookId}>
                <div className="book-comment-item">
                  <div className="book-comment-image">
                    <img src={bookComment.bookImage} alt="" />
                  </div>
                  <div className="book-comment-text">
                    <h1>{bookComment.bookTitle}</h1>
                    <div className="book-comment">
                      <FaQuoteLeft size={'1.5rem'} />
                      <h2>{bookComment.ownComment}</h2>
                    </div>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookComment;
