import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '@pages/Loading';
import Router from './Router';
import useLoadFonts from './hooks/useLoadFonts';
import useInitUser from './hooks/useInitUser';

function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);
  useInitUser();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className="App" style={{ fontFamily: 'NEXON' }}>
      {fontLoading ? <Loading /> : <Router />}
    </div>
  );
}

export default App;
