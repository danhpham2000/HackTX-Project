// pages/notes.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Notes = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Notes for: {username}</h1>
      <p>Here are the notes for your requested topic.</p>

      {/* Box for practice problem options */}
      <div style={{
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px', 
        marginTop: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>Practice Problem Options</h2>

        {/* Number of Questions */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Number of Questions:
            <input 
              type="number" 
              min="1" 
              max="10" 
              style={{
                marginLeft: '10px', 
                padding: '5px', 
                width: '60px', 
                borderRadius: '4px', 
                border: '1px solid #ccc'
              }}
            />
          </label>
        </div>

        {/* Difficulty Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Difficulty:
            <select 
              style={{
                marginLeft: '10px', 
                padding: '5px', 
                borderRadius: '4px', 
                border: '1px solid #ccc'
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        {/* Start Button */}
        <button 
          style={{
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            fontSize: '16px', 
            cursor: 'pointer'
          }}
          onClick={() => alert('Starting practice problems...')}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Notes;
