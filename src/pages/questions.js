// pages/questions.js
import React, { useState } from 'react';

const Questions = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [attempts, setAttempts] = useState(Array(10).fill(0));
  const [feedback, setFeedback] = useState(Array(10).fill(null));

  const questions = [
      { question: "Question 1", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 2", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1, explanation: "" },
      { question: "Question 3", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 4", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 5", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 6", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1, explanation: "" },
      { question: "Question 7", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 8", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 9", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
      { question: "Question 10", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "" },
  ];

  const handleAnswer = (index, optionIndex) => {
    const newAttempts = [...attempts];
    newAttempts[index] += 1;
    setAttempts(newAttempts);

    if (optionIndex === questions[index].correct) {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = `Congrats! Correct answer. ${questions[index].explanation}`;
        return newFeedback;
      });
    } else {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = newAttempts[index] > 1
          ? `Incorrect. ${questions[index].explanation}`
          : "Incorrect. Try again!";
        return newFeedback;
      });
    }

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <div style={{ display: 'flex', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Quiz Content Section */}
      <div style={{ width: '70%' }}>
        <h1>Quiz Title</h1>
        <p>This quiz contains multiple-choice questions. Select the correct answer for each question.</p>

        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{q.question}</h3>
            {q.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => handleAnswer(index, optionIndex)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  margin: '5px 0',
                  backgroundColor: selectedAnswers[index] === optionIndex ? '#d3d3d3' : '#f0f0f0',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div style={{ width: '30%', padding: '0 20px' }}>
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#ffebcd', borderRadius: '5px' }}>
          <h2>Explanation</h2>
          {feedback.map((text, index) => (
            <p key={index}>{text || "Select an answer to get feedback."}</p>
          ))}
        </div>
        <div style={{ padding: '15px', backgroundColor: '#e0ffff', borderRadius: '5px' }}>
          <h2>Hint</h2>
          <p>Use this space for hints on each question.</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;