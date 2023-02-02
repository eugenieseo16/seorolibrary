import React from 'react';

import './Header.styles.scss';

interface HeaderProps {
  text: string;
}

function Header({ text }: HeaderProps) {
  return (
    <div className="header-container">
      <div className="header-text">
        <h1>{text}</h1>
      </div>
    </div>
  );
}

export default Header;
