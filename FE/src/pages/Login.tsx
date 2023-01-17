import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '@src/store/slices/userSlice';

function Login() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login({ password: '123', username: '123' }));
  };
  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
