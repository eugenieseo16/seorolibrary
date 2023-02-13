import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyQuery } from '@src/hooks/useMyQuery';

import './BookResult.styles.scss';
import { searchAPI } from '@src/API/bookAPI';

interface IBookResultProps {
  input: string;
}

function BookResult({ input }: IBookResultProps) {
  const data = searchAPI(input)[0];
  const navigate = useNavigate();

  console.log(data);

  return (
    <div className="book-result-container">
      {data?.map((book: any, i: number) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookResult;
