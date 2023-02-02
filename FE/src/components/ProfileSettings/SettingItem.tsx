import React from 'react';

import './SettingItem.styles.scss';

interface ItemProps {
  text: string;
}

function SettingItem({ text }: ItemProps) {
  return (
    <div className="setting-item-container">
      <h1>{text}</h1>
    </div>
  );
}

export default SettingItem;
