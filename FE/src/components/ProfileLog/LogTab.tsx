import React, { useState } from 'react';

import ToggleNav from '@components/ToggleNav/ToggleNav';

import UserBookClub from '@components/ProfileLog/UserBookClub';
import UserBookComment from '@components/ProfileLog/UserBookComment';
import UserBookReview from '@components/ProfileLog/UserBookReview';

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
          { text: '모임', id: 'club' },
          { text: '리뷰', id: 'review' },
          { text: '한줄평', id: 'comment' },
        ]}
      />

      {selectedId === 'club' ? (
        <UserBookClub />
      ) : // https://dcdf1cac-0867-4f6b-baa5-0ac675f4d6e1.mock.pstmn.io/user-bookclub
      selectedId === 'review' ? (
        <UserBookReview />
      ) : (
        <UserBookComment />
      )}
    </div>
  );
}
export default LogTab;
