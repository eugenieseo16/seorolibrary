import React from 'react';

import SearchHeader from '@components/SearchHeader/SearchHeader';
import BookInfo from '@components/BookInfo/BookInfo';
import BookReview from '@components/BookInfo/BookReview';

function BookDetail() {
  return (
    <div>
      <SearchHeader text="도서 정보" />
      <BookInfo />
      <BookReview />
    </div>
  );
}

export default BookDetail;
