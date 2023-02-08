import ClubBottomNav from '@components/BottomNav/ClubBottomNav';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import { useMyQuery } from '@src/hooks/useMyQuery';
import React from 'react';
import './ClubBooks.styles.scss';

interface IBook {
  id: string;
  image_url: string;
  title: string;
}
function ClubBooks() {
  const books: IBook[] = useMyQuery('/books.json');
  return (
    <>
      <SearchHeader search={false} text="미라클 모닝 독서" />
      <div className="club-books-container">
        {books?.map(book => (
          <div key={book.id} className="book">
            <div>
              <h3>{book.title}</h3>
            </div>
            <img src={book.image_url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}

export default ClubBooks;
