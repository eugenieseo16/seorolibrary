import React, { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

// import Webcam from 'react-webcam';

import './Barcode.styles.scss';

function Barcode() {
  const [data, setData] = React.useState('바코드를 인식해주세요.');
  const [stopStream, setStopStream] = useState(false)  
  const videoConstraints = {
    // facingMode: 'environment',
    // aspectRatio: 1,
    // frameRate: 60,
    // focusDistance: 0,
    // resizeMode: 'crop-and-scale',
    zoom: 0.1,
    // focusMode: 'manual',
    // deviceId: devicesId && devicesId.deviceId,
  };
  return (
    <div className="book-register-item">
      <h1>바코드 등록</h1>
      { data === '바코드를 인식해주세요.' ? (
        <div>
          <BarcodeScannerComponent
            width={500}
            height={500}
            
            videoConstraints={videoConstraints}
            
            onUpdate={(err, result) => {
              if (result) setData(result.getText());
              else setData("바코드를 인식해주세요.");
            }}
          />
        </div>
      ) : (
        <div>
          {data}
          <button onClick={() => setData('바코드를 인식해주세요.')}>다시찍기</button>
        </div>
      )
      }

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
