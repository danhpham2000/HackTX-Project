// pages/login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../resources/pictures/cherry.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = { prompt: username };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Result:', result);
      navigate(`/notes`, { state: { username } });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.background} />
      <div style={styles.loginContainer}>
        <h1 style={styles.title}>MindLearning</h1>
        <h2 style={styles.subtitle}>What would you like to practice?</h2>
        <input
          type="text"
          placeholder="How do I do derivatives / How do I ..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
};

// Styles object
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative', // Position for the inner container
  },
  background: {
    Flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(${backgroundImage})', // Change to your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)', // Apply blur effect to the background only
    zIndex: 0, // Ensure it's behind the login container
  },
  loginContainer: {
    position: 'relative', // Position it above the blurred background
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1, // Ensure this is on top of the blurred background
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#666',
  },
  input: {
    display: 'block',
    padding: '12px',
    width: '93%',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;
