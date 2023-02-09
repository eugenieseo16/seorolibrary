import React from 'react';
import { useLocation } from "react-router-dom";

import Header from '@components/Header/Header';
import LogTab from '@components/BookDetailLog/LogTab';

function BookDetailLog () {
  const {state} = useLocation();

  return (
    <div>
      <Header text="북 데이터 로그(임시 헤더)"/>
      <LogTab tab={state}/>
    </div>
  );
}
export default BookDetailLog;