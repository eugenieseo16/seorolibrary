import { useUser } from '@src/hooks/useUser';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import './BookShelf.styles.scss';

function ReadBooks({ libraryData }: any) {
  const navigate = useNavigate();

  return (
    <div className="book-shelf-container">
      {libraryData?.myReadBooks?.map((book: any, i: number) => (
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

export default ReadBooks;
