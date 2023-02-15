import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyQuery } from '@src/hooks/useMyQuery';
import './BookReader.styles.scss';
import { bookReaderAPI } from '@src/API/bookAPI';

interface IBookReader {
  isbn: any;
}

function BookReader({ isbn }: IBookReader) {
  const navigate = useNavigate();
  const data = bookReaderAPI(isbn);

  return (
    <div className="book-reader-container">
      {data?.map((user: any, i: number) => (
        <div
          key={i}
          className="book-reader-item"
          onClick={() => navigate(`/profile/${user.memberName}`)}
        >
          <img src={user.memberProfile} alt="" />
          <p>{user.memberName}</p>
        </div>
      ))}
    </div>
  );
}

export default BookReader;
