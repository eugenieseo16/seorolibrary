import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import logo from '@src/assets/logo/seoro_vertical.png';
import './Loading.styles.scss'


function Loading() {
  const navigate = useNavigate();
  setTimeout(() => {navigate(`/home`)}, 2000);

  return (
    <>
    <div className="loading-container">
      <Outlet/>

      <div className="loading-item">

      <img src={logo} alt="" />
      </div>
      {/* <h1>도서관 입장 중 . . .</h1> */}
    </div>
    </>
  );
}

export default Loading;
