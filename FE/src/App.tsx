import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';

import Loading from '@pages/Loading';
import Router from './Router';
import useLoadFonts from './hooks/useLoadFonts';
import useInitUser from './hooks/useInitUser';
import './utils/fireBase';
import './styles/App.scss';
import { useSelector } from 'react-redux';
import AuthForm from '@pages/AuthForm';

function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);
  const [isMobile, setIsMobile] = useState(false);
  useInitUser();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dohkkln9r',
    },
  });
  const user = useSelector((state: any) => state.user);

  const { pathname } = useLocation();
  const handleResize = () => {
    if (window.innerWidth > 425) {
      setIsMobile(false);
    }
    if (window.innerWidth <= 425) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  return (
    <div className="App">
      {fontLoading ? <Loading /> : user ? <Router /> : <AuthForm />}
      {!isMobile && (
        <>
          <img
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: -1,
            }}
            // src="/bg.jpg"
            alt=""
          />
        </>
      )}
    </div>
  );
}

export default App;
