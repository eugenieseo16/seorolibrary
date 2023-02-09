import React, { useState } from 'react';
import LoginToggle from '@components/Login/LoginToggle';

function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="login-toggle-container">
        <LoginToggle />
      </div>
    </div>
  );
}

export default Login;
