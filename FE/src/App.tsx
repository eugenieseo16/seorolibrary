import React from 'react';

import Router from './Router';
import useLoadFonts from './hooks/useLoadFonts';

function App() {
  const fontLoading = useLoadFonts('BM-Pro');
  return (
    <div className="App" style={{ fontFamily: 'BM-Pro' }}>
      {fontLoading ? 'Loading...' : <Router />}
    </div>
  );
}

export default App;
