import React, { useState } from 'react';
import './UserLibrary.styles.scss';

import ReadBooks from '@components/UserLibrary/ReadBooks';
import HoldBooks from '@components/UserLibrary/HoldBooks';

function LibraryBar() {
  const [clickedButton, setClickedButton] = useState('');
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };
  return (
    <div>
      <div onClick={buttonHandler} className="book-tab" name="보유도서">
        보유도서
      </div>
      <div onClick={buttonHandler} className="book-tab" name="읽은도서">
        읽은도서
      </div>

      <h1>{clickedButton !== '읽은도서' ? <HoldBooks /> : <ReadBooks />}</h1>
    </div>
  );
}

export default LibraryBar;
