import React from 'react';

import Header from '@components/Header/Header';
import SearchHeader from '@components/SearchHeader/SearchHeader';
// import BookRegisterHeader from '@components/BookRegister/BookRegisterHeader';
import RegisterPrefernceButton from '@components/BookRegister/RegisterPreferenceButton';

// import BarcodeScanner from '@components/BookRegister/BarcodeScanner';
function BookRegister() {
  return (
    <div>
      <Header text="도서 등록" />
      {/* <BookRegisterHeader /> */}
      <RegisterPrefernceButton />
    </div>
  );
}

export default BookRegister;
