import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="login-box-container">
        jjjjdkdkdkldfslkfdslkjdsflkjsalkjsadlkjdsalkj\\
        {/* <form>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form> */}
      </div>
    </div>
  );
}

export default Login;
