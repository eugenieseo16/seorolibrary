import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { bookTitleAPI } from '@src/API/bookAPI';
import Header from '@components/Header/Header';
import LogTab from '@components/BookDetailLog/LogTab';
import { useUser } from '@src/hooks/useUser';

function BookDetailLog() {
  const { state } = useLocation();
  const param = useParams();
  const user = useUser();

  const isbn = param?.isbn;
  const memberId = user?.memberId;

  const bookTitle = bookTitleAPI(isbn, memberId);

  return (
    <div style={{ padding: '0px 10px' }}>
      <Header text={bookTitle} />
      <LogTab tab={state} />
    </div>
  );
}
export default BookDetailLog;
