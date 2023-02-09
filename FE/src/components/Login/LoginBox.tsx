import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro_vertical.png';

import './LoginBox.styles.scss';

function LoginBox() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <div className="login-box">
      <img src={logo} alt="" />
    </div>
  );
}

export default LoginBox;
