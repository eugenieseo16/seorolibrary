import React, { useState } from 'react';
import LoginToggle from '@components/AuthForm/AuthFormToggle';

function AuthForm() {
  return (
    <div className="login-container">
      <div className="login-toggle-container">
        <LoginToggle />
      </div>
    </div>
  );
}

export default AuthForm;