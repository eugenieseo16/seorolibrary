import React, { useEffect, useState } from 'react';
import LoginToggle from '@components/AuthForm/AuthFormToggle';

import './Login.styles.scss';
import { useNavigate } from 'react-router-dom';
function AuthForm() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, []);
  return (
    <div className="login-container" style={{ zIndex: 2 }}>
      <div className="login-toggle-container">
        <LoginToggle />
      </div>
    </div>
  );
}

export default AuthForm;
