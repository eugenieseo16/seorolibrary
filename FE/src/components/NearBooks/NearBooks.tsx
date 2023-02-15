import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';
import { Col, Row } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import './NearBooks.styles.scss';
import ExchangeAvailable from './ExchangeAvailable';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { IBook, IUser } from '@src/types/types';
import { nearBooksAPI } from '@src/API/bookAPI';
import { useUser } from '@src/hooks/useUser';

interface INearBook extends IBook {
  is_available: boolean;
  user: IUser;
}

function Nearbooks() {
  const user = useUser();
  const books = nearBooksAPI(user?.memberId);

  const navigate = useNavigate();
  return (
    <InfiniteScroll
      className="near-books-container"
      dataLength={8}
      next={() => {}}
      hasMore={true}
      loader=""
    >
      <Suspense fallback={'Loading...'}>
        {books?.books?.map((book: any, i: number) => (
          <Row
            key={i}
            className="book-container"
            onClick={() =>
              navigate(`/profile/${book.memberId}/book/${book.isbn}`)
            }
          >
            <Col span={8}>
              {/* 책 사진 */}
              <img src={book.bookImage} alt="" />
            </Col>
            {/* 책 설명 */}
            <Col span={15} className="book-description-container">
              <div>
                {/* 책 제목 */}
                <h2>{book.bookTitle}</h2>
                {/* 책 저자 */}
                <h6>{book.bookAuthor}</h6>
                {/* 책 설명 */}
                <h6>{book.bookDescrib}</h6>
                <br />
              </div>
              <div>
                {/* 이용자 & 거리*/}
                <h2>
                  {book.memberId}
                  {/* {book.user.location} */}
                </h2>
                <ExchangeAvailable is_available={book.isOwn} />
              </div>
            </Col>
          </Row>
        ))}
        <div className="near-book-line"></div>
      </Suspense>
    </InfiniteScroll>
  );
}

export default Nearbooks;
