import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BookDetailHeader from '@components/BookInfo/BookDetailHeader';
import BookInfo from '@components/BookInfo/BookInfo';
import HoldBookInfo from '@components/BookInfo/HoldBookInfo';
import BookStat from '@components/BookInfo/BookStat';
import BookReview from '@components/BookInfo/BookReview';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import HoldBook from '@components/BookInfo/Carousel/HoldBook';

import HoldUser from '@components/BookInfo/Carousel/HoldUser';

import { FaQuoteLeft } from 'react-icons/fa';

import './BookDetail.styles.scss';
import { holdBookDetailAPI } from '@src/API/bookAPI';

function BookDetail() {
  const param = useParams();
  const isUser = 'memberName' in param;
  const isbn = param.isbn;
  const data = holdBookDetailAPI(param?.isbn, param?.memberName);

  const navigate = useNavigate();
  const text = `${param?.memberName}님의 도서관 바로가기`;
  return (
    <>
      {isUser ? (
        // {/* 사용자 도서 상세- 사용자의 보유도서 캐러셀*/}
        <>
          <div className="book-detail-container">
            <div>
              <BookDetailHeader />
              <div className="hold-user-detail-container">
                <FaQuoteLeft />
                <h1>{data?.ownComment}</h1>
              </div>
              <HoldBookInfo isbn={isbn} />
              <BookStat isbn={isbn} />
              {/* 사용자가 보유중인 다른 도서들 */}
              <HoldBook isbn={isbn} />
              <BookReview isbn={isbn} />
              <div style={{ padding: '0px' }}></div>
            </div>
          </div>
          <FixedBottomButton
            text={text}
            onClick={() => navigate(`/profile/${param?.memberName}`)}
          />
        </>
      ) : (
        // {/* 표준 도서상세- 근처 도서 보유 사용자 캐러셀 */}
        <div className="book-detail-container">
          <div>
            <BookDetailHeader />
            <BookInfo isbn={isbn} />
            <BookStat isbn={isbn} />
            {/* 이 책을 소유 중인 다른 유저들 */}
            <HoldUser isbn={isbn} />
            <BookReview isbn={isbn} />
          </div>
        </div>
      )}
    </>
  );
}

export default BookDetail;
