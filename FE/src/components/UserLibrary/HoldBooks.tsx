import { useUser } from '@src/hooks/useUser';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import './BookShelf.styles.scss';

function HoldBooks({ libraryData }: any) {
  // const user = useUser();
  // const param = useParams();
  const navigate = useNavigate();

  return (
    <div className="book-shelf-container">
      {libraryData?.myOwnBooks?.map((book: any, i: number) => (
        <div
          className="book-item"
          key={i}
          onClick={() =>
            navigate(
              `/profile/${libraryData.memberInfo.memberName}/book/${book.isbn}`,
            )
          }
        >
          <img src={book.bookImage} alt="" />
          <h2>{book.bookTitle}</h2>
        </div>
      ))}
    </div>
  );
}

export default HoldBooks;
