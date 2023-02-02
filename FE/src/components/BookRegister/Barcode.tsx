import React, { useState } from 'react';

import Webcam from 'react-webcam';

function Barcode() {
  const [data, setData] = React.useState('바코드를 인식해주세요.');

  const videoConstraints = {
    facingMode: { exact: 'environment' },
  };
  const WebcamComponent = () => (
    <Webcam height={200} videoConstraints={videoConstraints} />
  );

  return (
    <div>
      <h1>바코드 등록</h1>
      <WebcamComponent />
      <div>
        <input type="text" placeholder="책제목" />
      </div>

      <div>
        <input type="text" placeholder="작가" />
      </div>

      <div>
        <textarea
          cols="50"
          rows="5"
          placeholder="한줄평을 간단히 적어주세요."
        ></textarea>
      </div>

      <div>
        <button type="submit">등록하기</button>
      </div>
    </div>
  );
}

export default Barcode;
