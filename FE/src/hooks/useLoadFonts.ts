import { useState, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

function useLoadFonts(fontNames: string[]) {
  const [loading, setLoading] = useState(true);
  const loadFonts = async () => {
    const promises = fontNames.map(fontName =>
      new FontFaceObserver(fontName).load(),
    );

    await Promise.all(promises);
    setLoading(false);
  };
  useEffect(() => {
    loadFonts();
  }, []);
  return loading;
}
export default useLoadFonts;
