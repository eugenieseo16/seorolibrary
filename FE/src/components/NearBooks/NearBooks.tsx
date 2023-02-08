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

interface INearBook extends IBook {
  is_available: boolean;
  user: IUser;
}

function Nearbooks() {
  const books: INearBook[] = useMyQuery('/books.json');

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
        {books?.map((book, i: number) => (
          <Row key={i} className="book-container">
            <Col span={8}>
              {/* 책 사진 */}
              <img
                src={book.image_url}
                alt=""
                onClick={() => navigate(`/near/bookdetail/${i}`)}
              />
            </Col>
            {/* 책 설명 */}
            <Col span={15} className="book-description-container">
              <div onClick={() => navigate(`/near/bookdetail/${i}`)}>
                {/* 책 제목 */}
                <h2>{book.title}</h2>
                {/* 책 저자 */}
                <h6>{book.author}</h6>
                {/* 책 설명 */}
                <h6>{book.description}</h6>
                <br />
              </div>
              <div>
                {/* 이용자 & 거리*/}
                <h2>
                  {book.user?.nickname}
                  {book.user.location}
                </h2>
                <ExchangeAvailable />
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
