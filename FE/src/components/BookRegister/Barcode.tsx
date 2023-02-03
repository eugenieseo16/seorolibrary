import React, { useState } from 'react';
import Webcam from 'react-webcam';

import './Barcode.styles.scss';

function Barcode() {
  const [data, setData] = React.useState('바코드를 인식해주세요.');

  const videoConstraints = {
    facingMode: { exact: 'environment' },
  };

  const WebcamComponent = () => (
    <Webcam
      height={200}
      // videoConstraints={videoConstraints}
    />
  );

  return (
    <div className="book-register-item">
      <h1>바코드 등록</h1>
      <WebcamComponent />
      <div className="book-register-item">
        <input type="text" placeholder="책제목" />
      </div>

      <div className="book-register-item">
        <input type="text" placeholder="작가" />
      </div>

      <div className="book-register-item">
        <textarea placeholder="한줄평을 간단히 적어주세요."></textarea>
      </div>

      <div className="submit-button">
        <button id="submit-button" type="submit">
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Barcode;
