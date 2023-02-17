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

import background from '@src/assets/background.png';
import { useMobile } from './hooks/useMobile';
function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);

  useInitUser();
  const isMobile = useMobile();
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
    <>
      {fontLoading ? (
        <Loading />
      ) : (
        <div
          className="App"
          style={{
            ...(!isMobile && {
              background: '#fff',
              overflow: 'hidden',
              zIndex: 9,
            }),
          }}
        >
          {user ? <Router /> : <AuthForm />}
        </div>
      )}
      {!isMobile && (
        <>
          <img
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 'calc(85vw - 400px)',
              height: '100vh',
              // zIndex: -1,
              objectFit: 'contain',
            }}
            src={background}
            alt=""
          />
        </>
      )}
    </>
  );
}

export default App;
