// pages/questions.js
import React, { useState } from 'react';
import './Questions.css'; // Assuming you create an external CSS file for styles

const Questions = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [attempts, setAttempts] = useState(Array(10).fill(0));
  const [feedback, setFeedback] = useState(Array(10).fill(null));

  const questions = [
      { question: "Question 1", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 1" },
      { question: "Question 2", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1, explanation: "Explanation for Question 2" },
      { question: "Question 3", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 3" },
      { question: "Question 4", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 4" },
      { question: "Question 5", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 5" },
      { question: "Question 6", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1, explanation: "Explanation for Question 6" },
      { question: "Question 7", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 7" },
      { question: "Question 8", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 8" },
      { question: "Question 9", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 9" },
      { question: "Question 10", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "Explanation for Question 10" },
  ];

  const handleAnswer = (index, optionIndex) => {
    const newAttempts = [...attempts];
    newAttempts[index] += 1;
    setAttempts(newAttempts);

    const newFeedback = [...feedback];
    if (optionIndex === questions[index].correct) {
      newFeedback[index] = `🎉 Congrats! Correct answer. ${questions[index].explanation}`;
    } else {
      newFeedback[index] = newAttempts[index] > 1
        ? `❌ Incorrect. ${questions[index].explanation}`
        : "❌ Incorrect. Try again!";
    }
    setFeedback(newFeedback);

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <h1 className="quiz-title">Quiz Title</h1>
        <p className="quiz-description">This quiz contains multiple-choice questions. Select the correct answer for each question.</p>

        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <h3 className="question-text">{q.question}</h3>
            {q.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => handleAnswer(index, optionIndex)}
                className={`option-button ${selectedAnswers[index] === optionIndex ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="notes-section">
        <div className="feedback-box">
          <h2>Feedback</h2>
          {feedback.map((text, index) => (
            <p key={index} className={`feedback-text ${text?.startsWith('🎉') ? 'correct' : 'incorrect'}`}>
              {text || "Select an answer to get feedback."}
            </p>
          ))}
        </div>
        <div className="hint-box">
          <h2>Hint</h2>
          <p>Use this space for hints on each question.</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
