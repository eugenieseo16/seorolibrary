import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import './BookShelf.styles.scss';

function ReadBooks() {
  const getReadBooksData = async () =>
    await (await fetch('/readBooks.json')).json();
  const { data } = useQuery('read-books', getReadBooksData);

  const navigate = useNavigate();

  return (
    <div className="book-shelf-container">
      {data?.data?.map((book: any, i: number) => (
        <div className="book-item" key={i} onClick={() => navigate(`book/${i}`)}>
        <img src={book.image_url} alt="" />
          <h2>{book.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default ReadBooks;
