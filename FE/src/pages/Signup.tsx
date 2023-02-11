import React, { useState } from 'react';
import SignupToggle from '@components/Signup/SignupToggle';

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-toggle-container">
        <SignupToggle />
      </div>
    </div>
  );
}

export default Signup;
