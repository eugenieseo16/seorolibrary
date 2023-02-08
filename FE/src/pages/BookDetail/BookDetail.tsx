import React from 'react';

import BookDetailHeader from '@components/BookInfo/BookDetailHeader';
import BookInfo from '@components/BookInfo/BookInfo';
import BookStat from '@components/BookInfo/BookStat';
import BookReview from '@components/BookInfo/BookReview';

import HoldBook from '@components/BookInfo/Carousel/HoldBook'
import HoldUser from '@components/BookInfo/Carousel/HoldUser'

import './BookDetail.styles.scss';

function BookDetail() {
  return (
    <div className="book-detail-container">
      <BookDetailHeader />
      {/* <SearchHeader text="도서 정보" /> */}
      <BookInfo />
      <BookStat />
      
      {/* 사용자 도서 상세- 사용자의 보유도서 캐러셀*/}
      <HoldBook/>
      

      {/* 표준 도서상세- 근처 도서 보유 사용자 캐러셀 */}
      <HoldUser/>
      
      <BookReview />
    </div>
  );
}

export default BookDetail;
