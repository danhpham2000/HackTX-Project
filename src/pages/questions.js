// pages/questions.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = ({ numQuestions = 2 }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [attempts, setAttempts] = useState(Array(numQuestions).fill(0));
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  // Generate questions dynamically with randomized correct answers
  const generateQuestions = (num) => {
    return Array.from({ length: num }, (_, index) => ({
      question: `Question ${index + 1}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: Math.floor(Math.random() * 4), // Random correct answer index (0-3)
      explanation: `Explanation for Question ${index + 1}`,
      hint: `Hint for Question ${index + 1}`
    }));
  };

  const [questions, setQuestions] = useState(generateQuestions(numQuestions));

  const handleAnswerSelection = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correct;
    const newAttempts = [...attempts];
    newAttempts[currentQuestionIndex] += 1;
    setAttempts(newAttempts);

    if (isCorrect) {
      setFeedback(`Congrats! Correct answer. ${questions[currentQuestionIndex].explanation}`);
    } else {
      setFeedback(
        newAttempts[currentQuestionIndex] > 1
          ? `Incorrect. ${questions[currentQuestionIndex].explanation}`
          : "Incorrect. Try again!"
      );
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= numQuestions) {
      // If all questions have been answered, navigate to the summary
      navigate('/summary', { state: { feedback, attempts } }); // Pass any necessary state
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setFeedback("");
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Quiz Content Section */}
      <div style={{ width: '70%' }}>
        <h1>Quiz</h1>
        <p>This quiz contains multiple-choice questions. Select the correct answer for each question.</p>

        <div style={{ marginBottom: '20px' }}>
          <h3>{questions[currentQuestionIndex].question}</h3>
          {questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => handleAnswerSelection(optionIndex)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                backgroundColor: selectedAnswer === optionIndex ? '#d3d3d3' : '#f0f0f0',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              {option}
            </button>
          ))}

          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              marginTop: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            disabled={selectedAnswer === null}
          >
            Submit
          </button>

          {feedback && (
            <button
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                marginTop: '10px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Notes Section */}
      <div style={{ width: '30%', padding: '0 20px' }}>
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#ffebcd', borderRadius: '5px' }}>
          <h2>Explanation</h2>
          <p>{feedback || "Select an answer to get feedback."}</p>
        </div>
        <div style={{ padding: '15px', backgroundColor: '#e0ffff', borderRadius: '5px' }}>
          <h2>Hint</h2>
          <p>{questions[currentQuestionIndex].hint}</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
