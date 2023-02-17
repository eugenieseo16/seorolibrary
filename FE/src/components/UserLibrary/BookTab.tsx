import React, { useState } from 'react';

import ToggleNav from '@components/ToggleNav/ToggleNav';
import HoldBooks from '@components/UserLibrary/HoldBooks';
import ReadBooks from '@components/UserLibrary/ReadBooks';

function BookTab({ libraryData }: any) {
  const [selectedId, setSelectedId] = useState('read');

  return (
    <div className="book-tab-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '읽은도서', id: 'read' },
          { text: '보유도서', id: 'hold' },
        ]}
      />

      {selectedId === 'hold' ? (
        <HoldBooks libraryData={libraryData} />
      ) : (
        <ReadBooks libraryData={libraryData} />
      )}
    </div>
  );
}

export default BookTab;
