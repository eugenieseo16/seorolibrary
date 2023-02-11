import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginBox from '@components/Login/LoginBox';
import SignupBox from '@components/Signup/SignupBox';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './LoginToggle.styles.scss';

function LoginToggle() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('login');

  if (selectedId === 'signup') {
    navigate('/signup');
  }

  return (
    <div className="login-toggle-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '로그인', id: 'login' },
          { text: '회원가입', id: 'signup' },
        ]}
      />
      {selectedId === 'login' ? <LoginBox /> : <SignupBox />}
    </div>
  );
}

export default LoginToggle;
