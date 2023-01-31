import React, { useEffect, useState } from 'react';
import './UserLibrary.styles.scss';

function BookTab() {
  const [category, setCategory] = useState<'hold' | 'read'>('hold');
  const [booksData, setBooksData] = useState<any>();

  const getBooksData = async () => {
    const url = category === 'hold' ? '/holdBooks.json' : '/readBooks.json';
    const { data } = await (await fetch(url)).json();
    setBooksData(data);
  };

  useEffect(() => {
    getBooksData();
  }, [category]);

  return (
    <div className="library-container">
      {/* 보유도서 | 읽은도서 */}
      <div
        className="library-nav"
        onClick={({ target }: any) => setCategory(target.id)}
      >
        <div id="hold" className={category === 'hold' ? 'selected' : ''}>
          보유도서
        </div>

        <div id="read" className={category === 'read' ? 'selected' : ''}>
          읽은도서
        </div>
      </div>

      {/* 도서 목록 */}
      <div className={category === 'hold' ? 'hold' : 'read'}>
        {category === 'hold'
          ? booksData?.map((book: any, i: number) => (
              <div className="book" key={i}>
                <img src={book.image_url} alt="" />
                <a>{book.title}</a>
                {/* <h2>{book.is_available}</h2> */}
              </div>
            ))
          : booksData?.map((book: any, i: number) => (
              <div className="book" key={i}>
                <img src={book.image_url} alt="" />
                <a>{book.title}</a>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BookTab;
