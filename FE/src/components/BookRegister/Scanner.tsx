import { RefObject } from 'react';
import './Scanner.styles.scss';

type ScannerProps = {
  scannerRef: RefObject<HTMLDivElement>;
};

const Scanner = ({ scannerRef }: ScannerProps) => {
  return <div ref={scannerRef} className="barcode-scanner"></div>;
};

export default Scanner;
