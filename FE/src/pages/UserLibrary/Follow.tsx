import React, { useState } from 'react';

import UserHeader from '@components/UserLibrary/UserHeader';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import Follower from '@components/UserLibrary/Follow/Follower';
import Following from '@components/UserLibrary/Follow/Following';

function Follow() {
  const [selectedId, setSelectedId] = useState('follower');

  return (
    <div className="book-tab-container">
      <UserHeader />
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '팔로워', id: 'follower' },
          { text: '팔로잉', id: 'following' },
        ]}
      />

      {selectedId === 'follower' ? <Follower /> : <Following />}
    </div>
  );
}

export default Follow;
