import React from 'react';

import Loading from '@pages/Loading';
import Router from './Router';
import useLoadFonts from './hooks/useLoadFonts';

function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);
  return (
    <div className="App" style={{ fontFamily: 'BM-Pro' }}>
      {fontLoading ? <Loading /> : <Router />}
    </div>
  );
}

export default App;
