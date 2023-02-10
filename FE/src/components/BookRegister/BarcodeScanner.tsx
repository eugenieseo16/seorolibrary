import { useCallback, useState } from 'react';
import Scanner from './Scanner';
import useScanner from '@src/hooks/useScanner';
import './BarcodeScanner.styles.scss';

const Main = () => {
  const [play, setPlay] = useState(true);
  const [code, setCode] = useState<string | null>(null);

  const onDetected = useCallback((code: string) => setCode(code), []);

  const { scannerRef, startScanner, stopScanner } = useScanner(onDetected);

  const onClick = () => {
    if (play) {
      stopScanner();
    } else {
      startScanner();
    }

    setPlay(!play);
  };

  const detectedText = code ? `Detected code: ${code}` : play;
  // ? 'Scanning...'
  // : 'Stopped';

  return (
    <main>
      <section className="section">
        {/* <button onClick={onClick}>Start / Stop</button> */}
        {detectedText}
        <div className="scan-area">
          {play ? (
            <div>
              <h1>카메라 켰어용</h1>
              <Scanner scannerRef={scannerRef} />
            </div>
          ) : (
            <div>
              <h1>카메라 껏어용</h1>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
