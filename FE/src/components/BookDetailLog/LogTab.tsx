import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ToggleNav from '@components/ToggleNav/ToggleNav';
import BookReader from '@components/BookDetailLog/BookReader';
import BookComment from '@components/BookDetailLog/BookComment';
import BookReview from '@components/BookDetailLog/BookReview';

function LogTab() {
  const { state } = useLocation();
  const param = useParams();
  console.log(param?.isbn);
  const isbn = param?.isbn;
  const [selectedId, setSelectedId] = useState(state['selectedTab']);

  return (
    <div className="log-tab-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '읽은 유저 수', id: 'reader' },
          { text: '한줄평', id: 'comment' },
          { text: '리뷰', id: 'review' },
        ]}
      />

      {selectedId === 'reader' ? (
        <BookReader isbn={isbn} />
      ) : selectedId === 'comment' ? (
        <BookComment isbn={isbn} />
      ) : (
        <BookReview isbn={isbn} />
      )}
    </div>
  );
}
export default LogTab;
