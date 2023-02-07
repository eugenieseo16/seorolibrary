import React from 'react';

import Header from '@components/Header/Header';
import SearchHeader from '@components/SearchHeader/SearchHeader';
// import BookRegisterHeader from '@components/BookRegister/BookRegisterHeader';
import RegisterPrefernceButton from '@components/BookRegister/RegisterPreferenceButton';

import './BookRegister.styles.scss';

function BookRegister() {
  return (
    <div className="book-register-container">
      <Header text="도서 등록" />
      <RegisterPrefernceButton />
    </div>
  );
}

export default BookRegister;
