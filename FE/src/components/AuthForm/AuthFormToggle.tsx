import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginBox from '@components/AuthForm/LoginBox';
import SignupBox from '@components/AuthForm/SignupBox';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './AuthFormToggle.styles.scss';

function AuthFormToggle() {
  const [selectedId, setSelectedId] = useState('login');

  return (
    <div className="auth-form-toggle-container">
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

export default AuthFormToggle;
