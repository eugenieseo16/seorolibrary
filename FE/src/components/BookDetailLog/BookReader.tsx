import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyQuery } from '@src/hooks/useMyQuery';
import './BookReader.styles.scss';

interface IBookReader {
  isbn: string;
}

function BookReader({ isbn }: IBookReader) {
  const data = useMyQuery('/userFollower.json');
  const navigate = useNavigate();

  return (
    <div className="book-reader-container">
      {data?.map((user: any, i: number) => (
        <div
          key={i}
          className="book-reader-item"
          onClick={() => navigate(`/profile/1`)}
        >
          <img src={user.avatar} alt="" />
          <p>{user.nickname}</p>
        </div>
      ))}
    </div>
  );
}

export default BookReader;
