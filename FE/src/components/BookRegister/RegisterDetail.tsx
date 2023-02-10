import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';

import { RiCamera3Line, RiEdit2Line } from 'react-icons/ri';

import './RegisterDetail.styles.scss';

function RegisterDetail() {
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
        </div>
      ) : (
        <div>
          <div className="preference-button-item">
            <button onClick={() => setBarcode(!barcode)}>
              <RiEdit2Line size={'2rem'} />
              <span className="button-text">직접 입력하기</span>
            </button>
          </div>
          <BarcodeScanner />
        </div>
      )}
    </div>
  );
}

export default RegisterDetail;
