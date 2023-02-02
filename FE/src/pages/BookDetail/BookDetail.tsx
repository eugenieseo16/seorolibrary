import React from 'react';

import BookDetailHeader from '@components/BookInfo/BookDetailHeader';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import BookInfo from '@components/BookInfo/BookInfo';
import BookStat from '@components/BookInfo/BookStat';
import BookReview from '@components/BookInfo/BookReview';

import './BookDetail.styles.scss';

function BookDetail() {
  return (
    <div className="book-detail-container">
      <BookDetailHeader />
      <SearchHeader text="도서 정보" />
      <BookInfo />
      <BookStat />
      {/* 사용자의 보유도서 상세를 클릭한 경우 */}
      <div>보유도서</div>
      <p>carousel</p>
      {/* 표준 도서상세 */}
      <div>보유사용자</div>
      <p>carousel</p>
      <BookReview />
    </div>
  );
}

export default BookDetail;
