import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginBox from '@components/Login/LoginBox';
import SignupBox from '@components/Signup/SignupBox';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './SignupToggle.styles.scss';

function SignupToggle() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('signup');

  return (
    <div className="signup-toggle-container">
      <ToggleNav
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={[
          { text: '로그인', id: 'login' },
          { text: '회원가입', id: 'signup' },
        ]}
      />
      {selectedId === 'signup' ? <SignupBox /> : navigate(`/login`)}
    </div>
  );
}

export default SignupToggle;
