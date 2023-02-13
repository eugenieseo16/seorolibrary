import React, { useState } from 'react';

import { RiSearchLine } from 'react-icons/ri';

import './Search.styles.scss';

import ToggleNav from '@components/ToggleNav/ToggleNav';
import BookResult from '@components/Search/BookResult';
import UserResult from '@components/Search/UserResult';
import CarouselBestSellerBook from '@components/Carousel/CarouselBestSellerBook';

function SearchResultTab() {
  const [selectedId, setSelectedId] = useState('book');
  const [query, setQuery] = useState<string>('');
  const [isSubmited, setIsSubmited] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query) {
      setIsSubmited(true);
    }
    console.log('Input value:', query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <input
            id="searchInput"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="무엇을 검색할까요?"
          />
          <button type="submit">
            <RiSearchLine size={'1.5rem'} />
          </button>
        </div>
      </form>
      {isSubmited ? (
        <div>
          {/* 검색어가 있으면 */}
          <ToggleNav
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            items={[
              { text: '도서', id: 'book' },
              { text: '사용자', id: 'user' },
            ]}
          />
          {selectedId === 'book' ? <BookResult /> : <UserResult />}
        </div>
      ) : (
        <div>
          {/* 검색어가 없으면 */}
          <div className="before-search-container">
            <div className="before-search-item">
              <span>도서 제목</span>,⠀<span>작가</span>⠀또는⠀
              <span>사용자</span>
              <p>를 검색해보세요.</p>
            </div>
            <div className="best-seller-item">
              <h1>베스트 셀러</h1>
              <CarouselBestSellerBook />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchResultTab;
