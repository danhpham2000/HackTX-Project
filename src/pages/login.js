// pages/login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleLogin = async () => {
    // Prepare the data to send
    const data = { prompt: username };
  
    try {
      // Make the POST request to your backend
      const response = await fetch('http://0.0.0.0:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Get the result (assuming the backend returns a JSON object)
      const result = await response.json();
      console.log('Result:', result);
  
      // Pass username to the next page if needed
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
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Login;
