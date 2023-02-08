import React, { useState } from 'react';

import ToggleNav from '@components/ToggleNav/ToggleNav';
import BookReader from '@components/BookDetailLog/BookReader';
import BookComment from '@components/BookDetailLog/BookComment';
import BookReview from '@components/BookDetailLog/BookReview';



interface LogTabProps {
  tab: string;
}

function LogTab({ tab }: LogTabProps) {
  const [selectedId, setSelectedId] = useState(tab);

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
        <BookReader/>
      ) :
      selectedId === 'comment' ? (
        <BookComment/>
      ) : (
        <BookReview/>
      )}
    </div>
  );
}
export default LogTab;
