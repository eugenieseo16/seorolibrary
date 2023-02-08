import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';
import './BookReader.styles.scss';

function BookReader() {
  const data = useMyQuery('/userFollower.json');

  
  return (
    <div className="book-reader-container">
    {data?.map((user: any, i: number) => (
      <div key={i} className="book-reader-item">
        <img src={user.avatar} alt="" />
        <p>{user.nickname}</p>
      </div>
    ))}
  </div>
  );
}

export default BookReader;
