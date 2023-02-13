import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import ExchangeAvailable from '@components/NearBooks/ExchangeAvailable';

import {
  RiChatQuoteLine,
  RiFileList3Line,
  RiBookOpenLine,
} from 'react-icons/ri';
import './BookInfo.styles.scss';
import { bookDetailAPI } from '@src/API/bookAPI';

function BookInfo() {
  const location = useLocation();
  const isUser = location.pathname.includes('profile');

  const isbn = location.pathname.replace('/book/', '');
  const data = bookDetailAPI(isbn);

  return (
    <div className="book-info-container">
      {isUser ? (
        <div>
          <div className="book-cover">
            <img src={data?.bookImage} alt="" />
          </div>
          <div className="exchange-available">
            <ExchangeAvailable />
          </div>
        </div>
      ) : (
        <div>
          <div className="book-cover">
            <img src={data?.bookImage} alt="" />
          </div>
        </div>
      )}

      <div className="book-primary-info">
        <h1>{data?.bookTitle}</h1>
        <p>
          {data?.bookAuthor} 지음 · {data?.bookPublisher} · {data?.bookPubDate}{' '}
          출간
        </p>
      </div>

      <h1>책 소개</h1>
      <div className="book-description">
        <p>{data?.bookDescrib}</p>
      </div>
      <div></div>
    </div>
  );
}
export default BookInfo;
