import React from 'react';

import RegisterPrefernceButton from '@components/BookRegister/RegisterPreferenceButton';
// import BarcodeScanner from '@components/BookRegister/BarcodeScanner';
function BookRegister() {
  return (
    <div>
      <div>Book Register</div>

      <RegisterPrefernceButton />

      <div>{/* <button>스캐너로 등록</button> */}</div>
      <div>{/* <button>직접 입력해서 등록</button> */}</div>
    </div>
  );
}

export default BookRegister;
