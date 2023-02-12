import React, { useState } from 'react';

import Header from '@components/Header/Header';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import Follower from '@components/UserLibrary/Follow/Follower';
import Following from '@components/UserLibrary/Follow/Following';

import './Follow.styles.scss';

function Follow() {
  const [selectedId, setSelectedId] = useState('follower');

  return (
    <div className="book-tab-container">
      {selectedId === 'following' ? (
        <Header text="팔로잉" />
      ) : (
        <Header text="팔로워" />
      )}
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
