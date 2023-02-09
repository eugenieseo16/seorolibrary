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

function BookInfo() {
  const getBookInfo = async () => await (await fetch('/bookInfo.json')).json();
  const { data } = useQuery('book-info', getBookInfo);

  const location = useLocation();
  const isUser = location.pathname.includes('profile');

  return (
    <div className="book-info-container">
      {isUser ? (
        <div>
          <div className="book-cover">
            <img src={data?.image_url} alt="" />
          </div>
          <div className="exchange-available">
            <ExchangeAvailable />
          </div>
        </div>
      ) : (
        <div>
          <div className="book-cover">
            <img src={data?.image_url} alt="" />
          </div>
        </div>
      )}

      <div className="book-primary-info">
        <h1>{data?.title}</h1>
        <p>
          {data?.author} 지음 · {data?.publisher} · {data?.date} 출간
        </p>
      </div>

      <h1>책 소개</h1>
      <div className="book-description">
        <p>{data?.description}</p>
      </div>
      <div></div>
    </div>
  );
}
export default BookInfo;
