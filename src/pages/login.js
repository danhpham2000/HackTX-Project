// pages/login.js
import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle the form state
    setUsername('');
    setPassword('');
    setEmail('');
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Logging in with Username: ${username}, Password: ${password}`);
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log(`Signing up with Username: ${username}, Email: ${email}, Password: ${password}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p onClick={handleToggle} style={{ color: 'blue', cursor: 'pointer' }}>
        {isLogin ? 'New here? Sign up' : 'Already have an account? Log in'}
      </p>
    </div>
  );
};

export default Login;
