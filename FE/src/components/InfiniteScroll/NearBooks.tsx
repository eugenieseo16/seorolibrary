import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';
import { Col, Row } from 'antd';

import './NearBooks.styles.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

// import { MdLocalCafe } from 'react-icons/md';

const Nearbooks = () => {
  const [booksData, setBooksData] = useState<any>();
  const getBooksData = async () => await (await fetch('/books.json')).json();
  const { data } = useQuery('near-books', getBooksData);

  const fetchData = () => {
    setTimeout(() => {
      setBooksData(booksData.concat(Array.from({ length: 6 })));
    }, 1500);
  };

  const author = faker.name.firstName();
  const distance = Math.floor(Math.random() * 1000 + 100) + 'm';

  return (
    <InfiniteScroll
      className="near-books-container"
      dataLength={8}
      next={fetchData}
      hasMore={true}
      loader=""
    >
      <div>
        {data?.data?.map((nearBooks: any, i: number) => (
          <Row key={i} className="book-container">
            <Col span={8}>
              {/* 책 사진 */}
              <img src={nearBooks.image_url} alt="" />
            </Col>
            {/* 책 설명 */}
            <Col span={15} className="book-description-container">
              <div>
                {/* 책 제목 */}
                <h2>{nearBooks.title}</h2>
                {/* 책 저자 */}
                <h6>{author}</h6>
                {/* 책 설명 */}
                <h6>
                  {nearBooks.title}
                  {nearBooks.title}
                  {nearBooks.title}
                </h6>
                <br />
              </div>
              <div>
                {/* 이용자 & 거리*/}
                <h2>
                  {author}
                  &nbsp;
                  {distance}
                </h2>
                <h6>바꿔읽기 가능 여부 표시</h6>
              </div>
            </Col>
          </Row>
        ))}
        <div className="near-book-line"></div>
      </div>
    </InfiniteScroll>
  );
};

export default Nearbooks;
