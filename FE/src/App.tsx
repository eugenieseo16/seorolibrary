import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';

import Loading from '@pages/Loading';
import Router from './Router';
import useLoadFonts from './hooks/useLoadFonts';
import useInitUser from './hooks/useInitUser';
import './utils/fireBase';
import { useSelector } from 'react-redux';
import AuthForm from '@pages/AuthForm';

function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);
  useInitUser();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dohkkln9r',
    },
  });
  const user = useSelector((state: any) => state.user);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className="App" style={{ fontFamily: 'NEXON', background: '$beige' }}>
      {fontLoading ? <Loading /> : user ? <Router /> : <AuthForm />}
    </div>
  );
}

export default App;
