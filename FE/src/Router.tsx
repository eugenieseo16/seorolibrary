import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import Login from '@pages/Login';

function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
    </Routes>
  );
}

export default Router;
