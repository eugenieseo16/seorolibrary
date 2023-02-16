import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './BookResult.styles.scss';
import { searchAPI } from '@src/API/bookAPI';

interface IBookResultProps {
  input: string;
}

function BookResult({ input }: IBookResultProps) {
  const navigate = useNavigate();
  const data = searchAPI(input);

  return (
    <div className="book-result-container">
      {data?.books?.map((book: any, i: number) => (
        <div
          key={i}
          className="book-result-item"
          onClick={() => navigate(`/book/${book.isbn}`)}
        >
          <img src={book.bookImage} alt="" />

          <div className="book-detail-container">
            <div className="book-detail-item">
              <h1>{book.bookTitle}</h1>
              <h2>{book.bookAuthor}</h2>
            </div>

            <p>{book.bookDescrib}</p>
            <p>{book.isbn}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookResult;
