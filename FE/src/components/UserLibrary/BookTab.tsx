import React, { useState } from 'react';

import ToggleNav from '@components/ToggleNav/ToggleNav';
import RentBooks from '@components/UserLibrary/RentBooks';
import HoldBooks from '@components/UserLibrary/HoldBooks';
import ReadBooks from '@components/UserLibrary/ReadBooks';

function BookTab() {
  const [selectedId, setSelectedId] = useState('read');

  return (
    <div className="book-tab-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '읽은도서', id: 'read' },
          { text: '보유도서', id: 'hold' },
          { text: '빌린도서', id: 'rent' },
        ]}
      />

      {selectedId === 'rent' ? (
        <RentBooks />
      ) : selectedId === 'hold' ? (
        <HoldBooks />
      ) : (
        <ReadBooks />
      )}
    </div>
  );
}

export default BookTab;
