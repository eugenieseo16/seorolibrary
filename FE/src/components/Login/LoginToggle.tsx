import React, { useState } from 'react';

import LoginBox from '@components/Login/LoginBox';
import SignupBox from '@components/Signup/SignupBox';
import ToggleNav from '@components/ToggleNav/ToggleNav';
import './LoginToggle.styles.scss';

function LoginToggle() {
  const [selectedId, setSelectedId] = useState('login');

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
      {/* users 인경우는 react-slick 써서 캐러셀로 */}
      {selectedId === 'login' ? <LoginBox /> : <SignupBox />}
    </div>
  );
}

export default LoginToggle;
