// pages/notes.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Notes = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Hello, {username}!</h1>
      <p style={styles.description}>Here are the notes for your requested topic.</p>

      {/* Box for practice problem options */}
      <div style={styles.optionsBox}>
        <h2 style={styles.optionsTitle}>Practice Problem Options</h2>

        {/* Number of Questions */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Number of Questions:
            <input
              type="number"
              min="1"
              max="10"
              style={styles.input}
            />
          </label>
        </div>

        {/* Difficulty Selection */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Difficulty:
            <select style={styles.select}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        {/* Start Button */}
        <button 
          style={styles.startButton} 
          onClick={() => alert('Starting practice problems...')}
        >
          Start
        </button>
      </div>
    </div>
  );
};

// Styles object
const styles = {
  pageContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '40px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '32px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  },
  optionsBox: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  optionsTitle: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    color: '#555',
  },
  input: {
    marginLeft: '10px',
    padding: '5px',
    width: '80px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  startButton: {
    padding: '12px 25px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

// Hover effect for button
styles.startButton[':hover'] = {
  backgroundColor: '#45a049',
};

export default Notes;
