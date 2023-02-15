import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bookTitleAPI } from '@src/API/bookAPI';
import Header from '@components/Header/Header';
import LogTab from '@components/BookDetailLog/LogTab';

function BookDetailLog() {
  const { state } = useLocation();
  const param = useParams();
  // console.log(param?.isbn);

  const isbn = param?.isbn;
  const bookTitle = bookTitleAPI(isbn, 1);

  return (
    <div style={{ padding: '0px 10px' }}>
      <Header text={bookTitle} />
      <LogTab tab={state} />
    </div>
  );
}
export default BookDetailLog;
