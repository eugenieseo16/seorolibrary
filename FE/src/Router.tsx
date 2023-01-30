import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '@pages/Home';
import Login from '@pages/Login';
import WithNavLayout from '@pages/withNavLayout/WithNavLayout';

function Router() {
  const user = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route path="" element={<WithNavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={'404'} />
      </Route>
    </Routes>
  );
}

export default Router;
