import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import backgroundImage from '../resources/pictures/class.jpg';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};
  const [showPage, setShowPage] = useState(true);
  const [numQuestions, setNumQuestions] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');
  const [userPrompt, setUserPrompt] = useState(''); // New state for prompt input
  const [fadeOut, setFadeOut] = useState(false);

  // Trigger fade-out before navigation
  const handleStart = async () => {
    try {
      // Fade out
      setShowPage(false);

      // Delay navigation to allow fade-out animation to complete
      setTimeout(async () => {
        const response = await fetch('http://127.0.0.1:8000/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numQuestion: numQuestions, difficulty, userPrompt }), // Include userPrompt in request
        });

        console.log('#ofQuestions:', numQuestions, 'Diff:', difficulty);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Navigate to the Questions page and pass the number of questions, difficulty, and user prompt
        navigate('/questions', { state: { numQuestions, difficulty, userPrompt } });
      }, 1000); // Match this to the duration of the fade-out animation
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    const data = { prompt: userPrompt };

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

      // Trigger fade-out before navigation
      setFadeOut(true);
      setTimeout(() => navigate(`/notes`, { state: { username } }), 1000);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div 
      style={{ 
        ...styles.pageContainer, 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
      }} 
      className={showPage ? 'fade-in' : 'fade-out'}
    >
      <div style={styles.overlay}></div> {/* New overlay for background blur */}
      <div style={styles.paperContainer}>
        <h1 style={styles.title}>Summary</h1>
        <p style={styles.description}>
            Here you will be presented the summary of your quiz
            
            The AI would give the following if applicable:
            - results
            - areas of improvement
            - suggestions on extra learning
            - related materials
        </p>

        {/* Box for practice problem options */}
        <div style={styles.optionsBox}>
          <h2 style={styles.optionsTitle}>Practice Again?</h2>

          {/* Number of Questions */}
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

          {/* Difficulty Selection */}
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

          {/* Start Button */}
          <button 
            style={styles.startButton} 
            onClick={handleStart}
          >
            Start
          </button>
          
          {/* Prompt Input */}
          <div style={styles.inputGroup}>
          <h2 style={styles.optionsTitle}>Different Question/Subject?</h2>
            <label style={styles.label}>
              Enter a Prompt (optional):
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                style={styles.input}
                placeholder="e.g., Math concepts, history facts..."
              />
            </label>
          </div>

            {/* Start Button */}
            <button 
            style={styles.startButton} 
            onClick={handleLogin}
          >
            Submit
          </button>


        </div>
      </div>
    </div>
  );
};

// Styles object
const styles = {
  pageContainer: {
    position: 'relative', // To position overlay and paperContainer within
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dark overlay with slight transparency
    backdropFilter: 'blur(10px)', // Blur effect applied here
    zIndex: 1,
  },
  paperContainer: {
    position: 'relative',
    maxWidth: '600px',
    width: '100%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slight transparency for paper effect
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Soft shadow to mimic paper floating
    textAlign: 'center',
    zIndex: 2, // Place above overlay
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
    width: '80%',
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
    marginBottom: '20px'
  },
};

// Hover effect for button
styles.startButton[':hover'] = {
  backgroundColor: '#45a049',
};

export default Summary;
