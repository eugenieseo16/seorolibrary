import { useState, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

function useLoadFonts(fontName: string) {
  const [loading, setLoading] = useState(true);
  const loadFonts = async () => {
    await new FontFaceObserver(fontName).load();
    setLoading(false);
  };
  useEffect(() => {
    loadFonts();
  }, []);
  return loading;
}
export default useLoadFonts;
