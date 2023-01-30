import React from 'react';

import Loading from '@pages/Loading';
import Router from './Router';
import useLoadFonts from './hooks/useLoadFonts';
import useInitUser from './hooks/useInitUser';

function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);
  useInitUser();

  return (
    <div className="App" style={{ fontFamily: 'BM-Pro' }}>
      {fontLoading ? <Loading /> : <Router />}
    </div>
  );
}

export default App;
