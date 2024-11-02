// pages/login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleLogin = async () => {
    // Prepare the data to send
    const data = { username };

    try {
      /*const response = await fetch('http://your-backend-api-url/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();*/
      console.log('Login successful:');

      // Navigate to the Notes page with the username as a parameter
      navigate(`/notes`, { state: { username } });
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>MindLearning</h1>
      <h2>What would you like to practice?</h2>
      <input
        type="text"
        placeholder="How do I do derivatives / How do I ..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <button onClick={handleLogin} style={{ padding: '10px', width: '100%' }}>
        Submit
      </button>
    </div>
  );
};

export default Login;
