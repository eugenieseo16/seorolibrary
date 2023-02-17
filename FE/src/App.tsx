import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import mobile from '@src/assets/images/mobile.png';

import { useMobile } from './hooks/useMobile';
import { url } from 'inspector';
function App() {
  const fontLoading = useLoadFonts(['BM-Pro', 'NEXON']);
  const navigate = useNavigate();
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
    if (
      user?.memberEmail == 'incognito@gmail.com' &&
      pathname.split('/').length > 2
    ) {
      navigate('/incognito', { replace: true });
    }
  }, [pathname]);

  return (
    <>
      {fontLoading ? (
        <Loading />
      ) : (
        <div style={{ position: 'relative' }}>
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
          {!isMobile && (
            <>
              <img
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: 'calc(80vw - 400px)',
                  height: '100vh',
                  // zIndex: -1,
                  objectFit: 'contain',
                }}
                src={background}
                alt=""
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
