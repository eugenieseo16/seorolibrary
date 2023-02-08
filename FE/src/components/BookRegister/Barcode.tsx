import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import BarcodeScannerComponent from "react-qr-barcode-scanner";

// import Webcam from 'react-webcam';

import './Barcode.styles.scss';

function Barcode() {
  const [data, setData] = React.useState('바코드를 인식해주세요.');
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

  const { handleSubmit, register, setValue, getValues } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  return (
    <div className="book-register-container">
      {data === '바코드를 인식해주세요.' ? (
        <div>
          {/* <BarcodeScannerComponent
            width={500}
            height={500}
            
            videoConstraints={videoConstraints}
            
            onUpdate={(err, result) => {
              if (result) setData(result.getText());
              else setData("바코드를 인식해주세요.");
            }}
          /> */}
        </div>
      ) : (
        <div>
          {data}
          <button onClick={() => setData('바코드를 인식해주세요.')}>
            다시찍기
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onValid)}>
        <div className="book-register-item">
          <input
            type="text"
            onChange={getChangeHandlerWithEvent('title')}
            placeholder="책제목"
          />
        </div>

        <div className="book-register-item">
          <input
            type="text"
            onChange={getChangeHandlerWithEvent('author')}
            placeholder="작가"
          />
        </div>

        <div className="book-register-item">
          <textarea
            onChange={getChangeHandlerWithEvent('comment')}
            placeholder="한줄평을 간단히 적어주세요."
          ></textarea>
        </div>
      </form>

      <div className="submit-button">
        <button
          onClick={handleSubmit(onValid)}
          id="submit-button"
          type="submit"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Barcode;
