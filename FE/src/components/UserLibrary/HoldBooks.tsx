import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import './BookShelf.styles.scss';

function HoldBooks({ libraryData }: any) {
  const getHoldBooksData = async () =>
    await (await fetch('/holdBooks.json')).json();
  const { data } = useQuery('hold-books', getHoldBooksData);

  const navigate = useNavigate();

  return (
    <div className="book-shelf-container">
      {libraryData?.myOwnBooks?.map((book: any, i: number) => (
        <div
          className="book-item"
          key={i}
          onClick={() => navigate(`book/${book.isbn}`)}
        >
          <img src={book.bookImage} alt="" />
          <h2>{book.bookTitle}</h2>
        </div>
      ))}
    </div>
  );
}

export default HoldBooks;
