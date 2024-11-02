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
      console.log('Login successful:');
      navigate(`/notes`, { state: { username } });
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div style={styles.pageContainer}>
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
    backgroundColor: '#f0f4f8',
  },
  loginContainer: {
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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

// Add hover effect to button
styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};

export default Login;
