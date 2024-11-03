// pages/notes.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import backgroundImage from '../resources/pictures/class.jpg';
import ReactMarkdown from 'react-markdown';

const Notes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, result } = location.state || {};
  const [showPage, setShowPage] = useState(true);
  const [numQuestions, setNumQuestions] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');

<<<<<<< HEAD
=======

  // Trigger fade-out before navigation
>>>>>>> 4603b8a (Add questions)
  const handleStart = async () => {
    console.log(location.state)
    try {
      setShowPage(false);

      setTimeout(async () => {
        const response = await fetch('http://127.0.0.1:8000/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numQuestion: numQuestions, difficulty: difficulty, topic: username }),
        });
        console.log('#ofQuestions:', numQuestions, 'Diff:', difficulty);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)

        navigate('/questions', { state: { numQuestions, difficulty, questions: data.questions } });
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div 
      style={{ 
        ...styles.pageContainer, 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center' 
      }} 
      className={showPage ? 'fade-in' : 'fade-out'}
    >
      <div style={styles.overlay}></div>
      <div style={styles.paperContainer}>
        <h1 style={styles.title}>Hello, {username}!</h1>
        <p style={styles.description}>
          Here are the notes for your requested topic.
        </p>
        
        {/* Render Markdown content, left-aligned */}
        <ReactMarkdown style={styles.markdownContent}>
          {result.Response}
        </ReactMarkdown>

        <div style={styles.optionsBox}>
          <h2 style={styles.optionsTitle}>Practice Problem Options</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Number of Questions:
              <input
                type="number"
                min="1"
                max="10"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                style={styles.input}
              />
            </label>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Difficulty:
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={styles.select}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>

          <button 
            style={styles.startButton} 
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    zIndex: 1,
  },
  paperContainer: {
    position: 'relative',
    maxWidth: '600px',
    maxHeight: '80vh', // Set max height for scrollable content
    width: '100%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'left', // Set textAlign to left here
    zIndex: 2,
    overflowY: 'auto', // Enable vertical scrolling
  },
  title: {
    fontSize: '32px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  markdownContent: {
    textAlign: 'left', // Ensure left alignment
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
    lineHeight: '1.6', // Optional: improve readability
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

export default Notes;
