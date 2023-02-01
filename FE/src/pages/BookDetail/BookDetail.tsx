import React from 'react';

import SearchHeader from '@components/SearchHeader/SearchHeader';
import BookInfo from '@components/BookInfo/BookInfo';
import BookReview from '@components/BookInfo/BookReview';

import './BookDetail.styles.scss';

function BookDetail() {
  return (
    <div className="book-detail-container">
      <SearchHeader text="도서 정보" />
      <BookInfo />
      <h1>(재사용 가능한 읽은 유저수, 한줄평, 리뷰칸들로 바꾸는중입니다)</h1>
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
