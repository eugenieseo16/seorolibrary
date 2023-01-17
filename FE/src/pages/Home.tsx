import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '@src/store/slices/userSlice';

function Home() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
