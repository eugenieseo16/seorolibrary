import React, { useState } from 'react';
import Barcode from '@components/BookRegister/Barcode';
import Manual from '@components/BookRegister/Manual';

function RegisterPreferenceButton() {
  const [barcode, setBarcode] = useState(true);

  return (
    <div>
      {barcode ? (
        <div>
          <button onClick={() => setBarcode(!barcode)}>
            바코드로 인식하기
          </button>
          <Manual />
        </div>
      ) : (
        <div>
          <button onClick={() => setBarcode(!barcode)}>직접 입력하기</button>
          <Barcode />
        </div>
      )}
    </div>
  );
}

export default RegisterPreferenceButton;
