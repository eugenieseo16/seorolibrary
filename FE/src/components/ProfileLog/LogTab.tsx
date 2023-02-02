import React, { useState } from 'react';

import ToggleNav from '@components/ToggleNav/ToggleNav';

interface LogTabProps {
  tab: string;
}

function LogTab({ tab }: LogTabProps) {
  const [selectedId, setSelectedId] = useState(tab);

  return(
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
        <h1>모임</h1>
      ) : selectedId === 'review' ? (
        <h1>리뷰</h1>
      ) : (
        <h1>한줄평</h1>
      )}
    </div>
  );
}
export default LogTab;