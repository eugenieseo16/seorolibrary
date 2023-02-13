import React from 'react';
import { useLocation } from 'react-router-dom';

import BookDetailHeader from '@components/BookInfo/BookDetailHeader';
import BookInfo from '@components/BookInfo/BookInfo';
import BookStat from '@components/BookInfo/BookStat';
import BookReview from '@components/BookInfo/BookReview';

import HoldBook from '@components/BookInfo/Carousel/HoldBook';
import HoldUser from '@components/BookInfo/Carousel/HoldUser';

import { FaQuoteLeft } from 'react-icons/fa';

import './BookDetail.styles.scss';

function BookDetail() {
  const location = useLocation();
  const isUser = location.pathname.includes('profile');

  const { state } = useLocation();
  const isbn = state['isbn'];

  return (
    <div className="book-detail-container">
      {isUser ? (
        // {/* 사용자 도서 상세- 사용자의 보유도서 캐러셀*/}
        <div>
          <BookDetailHeader />
          <div className="hold-user-detail-container">
            <FaQuoteLeft />
            <h1>미래에 다가올 시대를 준비할 수 있는 책</h1>
          </div>
          <BookInfo isbn={isbn} />
          <BookStat isbn={isbn} />
          <HoldBook isbn={isbn} />
          <BookReview isbn={isbn} />
        </div>
      ) : (
        // {/* 표준 도서상세- 근처 도서 보유 사용자 캐러셀 */}
        <div>
          <BookDetailHeader />
          <BookInfo isbn={isbn} />
          <BookStat isbn={isbn} />
          <HoldUser isbn={isbn} />
          <BookReview isbn={isbn} />
        </div>
      )}
    </div>
  );
}

export default BookDetail;
