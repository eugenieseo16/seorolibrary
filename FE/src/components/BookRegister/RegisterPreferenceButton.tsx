import React, { useState } from 'react';
import Barcode from '@components/BookRegister/Barcode';
import Manual from '@components/BookRegister/Manual';

import { RiCamera3Line, RiEdit2Line } from 'react-icons/ri';

import './RegisterPreferenceButton.styles.scss';

function RegisterPreferenceButton() {
  const [barcode, setBarcode] = useState(true);

  return (
    <div className="book-register-container">
      {barcode ? (
        <div>
          <button onClick={() => setBarcode(!barcode)}>
            <RiCamera3Line size={'2rem'} />
            <span className="button-text">바코드로 인식하기</span>
          </button>
          <Manual />
        </div>
      ) : (
        <div>
          <button onClick={() => setBarcode(!barcode)}>
            <RiEdit2Line size={'2rem'} />
            <span className="button-text">직접 입력하기</span>
          </button>
          <Barcode />
        </div>
      )}
    </div>
  );
}

export default RegisterPreferenceButton;
