import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import './NearBooks.styles.scss';
import { MdLocalCafe } from 'react-icons/md';

const Nearbooks = () => {
  const [booksData, setBooksData] = useState<any>();
  const getBooksData = async () => await (await fetch('/books.json')).json();
  const { data } = useQuery('near-books', getBooksData);

  const fetchData = () => {
    setTimeout(() => {
      setBooksData(booksData.concat(Array.from({ length: 6 })));
    }, 1500);
  };

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
          <div key={i} className="book-container">
            <img src={nearBooks.image_url} alt="" />
            <div className="book-info-container">
              <h2>
                {nearBooks.title}
              </h2>
              <h6>
                {nearBooks.title}
              </h6>
            </div>
            <div />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Nearbooks;
