import React from 'react';

import './SettingItem.styles.scss';

interface ItemProps {
  text: string;
  navigateTo?: string;
}

function SettingItem({ text, navigateTo }: ItemProps) {
  return (
    <div className="setting-item-container">
      <h1>{text}</h1>
    </div>
  );
}

export default SettingItem;
