import React, { useState } from 'react';
import Barcode from '@components/BookRegister/Barcode';
import Manual from '@components/BookRegister/Manual';

import { RiCamera3Line, RiEdit2Line } from 'react-icons/ri';

import './RegisterPreferenceButton.styles.scss';

function RegisterPreferenceButton() {
  const [barcode, setBarcode] = useState(true);

  return (
    <div className="preference-button-container">
      {barcode ? (
        <div>
          <div className="preference-button-item">
            <button onClick={() => setBarcode(!barcode)}>
              <RiCamera3Line size={'2rem'} />
              <span className="button-text">바코드로 인식하기</span>
            </button>
          </div>
          <Manual />
        </div>
      ) : (
        <div>
          <div className="preference-button-item">
            <button onClick={() => setBarcode(!barcode)}>
              <RiEdit2Line size={'2rem'} />
              <span className="button-text">직접 입력하기</span>
            </button>
          </div>
          <Barcode />
        </div>
      )}
    </div>
  );
}

export default RegisterPreferenceButton;
