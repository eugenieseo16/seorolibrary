import React, { useState } from 'react';

import ToggleNav from '@components/ToggleNav/ToggleNav';

function SearchResultTab() {
  const [selectedId, setSelectedId] = useState('book');

  return (
    <div className="log-tab-container">
      <form action="">
        <input type="text" />
        <button type="submit">검색</button>
      </form>
      {/* 검색어가 있으면 */}
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '도서', id: 'book' },
          { text: '사용자', id: 'user' },
        ]}
      />
      {selectedId === 'book' ? <h1>book</h1> : <h1>user</h1>}
      {/* 검색어가 없으면 */}
      <div></div>
    </div>
  );
}
export default SearchResultTab;
