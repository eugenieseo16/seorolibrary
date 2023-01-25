import React, { useLayoutEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';

import Router from './Router';

function App() {
  const [loading, setLoading] = useState(true);
  const loadFonts = async () => {
    await new FontFaceObserver('BM-Pro').load();
    setLoading(false);
  };
  useLayoutEffect(() => {
    loadFonts();
  }, []);
  return (
    <div className="App" style={{ fontFamily: 'BM-Pro' }}>
      {loading ? 'Loading...' : <Router />}
    </div>
  );
}

export default App;
