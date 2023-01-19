import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Signup from '@pages/Signup';
import { useSelector } from 'react-redux';

function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
