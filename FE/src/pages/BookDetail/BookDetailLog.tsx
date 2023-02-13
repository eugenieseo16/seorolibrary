import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@components/Header/Header';
import LogTab from '@components/BookDetailLog/LogTab';

function BookDetailLog() {
  const { state } = useLocation();

  return (
    <div style={{ padding: '0px 10px' }}>
      <Header text="{책 제목}" />
      <LogTab tab={state} />
    </div>
  );
}
export default BookDetailLog;
