import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Questions = ({ numQuestions = 10 }) => {
  const [subject, setSubject] = useState("");
  const [subjectSubmitted, setSubjectSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState({ message: "", isCorrect: false }); // Updated feedback state
  const [score, setScore] = useState(0); // New state for score

  const navigate = useNavigate();

  // Fetch questions from backend once the subject is submitted
  useEffect(() => {
    if (subjectSubmitted) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.post("http://localhost:3002/quiz", {
            numOfQuestions: numQuestions,
            subject: subject,
          });
          setQuestions(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching quiz questions:", error);
        }
      };

      fetchQuestions();
    }
  }, [subjectSubmitted, numQuestions, subject]);

  const handleAnswerSelection = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setFeedback({ message: "", isCorrect: false }); // Reset feedback on new selection
  };
  const handleSubmit = () => {
    // Define answer letters for the four options
    const answerLetters = ["A", "B", "C", "D"];

    // Map the selectedAnswer index to its corresponding letter
    const selectedAnswerLetter = answerLetters[selectedAnswer];

    // Check if the selected letter matches the correctAnswer
    const isCorrect =
      selectedAnswerLetter === questions[currentQuestionIndex].correctAnswer;

    // Update feedback with message and correctness
    setFeedback({
      message: isCorrect ? "Correct!" : "Incorrect. Try the next one!",
      isCorrect: isCorrect,
    });
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Increment score if correct
    }

    setSelectedAnswer(null); // Reset selected answer
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      navigate("/summary");
    } else {
      setCurrentQuestionIndex(nextIndex);
      setFeedback({ message: "", isCorrect: false }); // Clear feedback when moving to the next question
    }
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    setSubjectSubmitted(true);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!subjectSubmitted ? (
        <form onSubmit={handleSubjectSubmit} style={{ width: "100%" }}>
          <h2>Select Quiz Subject</h2>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject (e.g., Python)"
            style={{ padding: "10px", width: "80%", marginRight: "10px" }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Start Quiz
          </button>
        </form>
      ) : (
        <div style={{ width: "70%" }}>
          <h1>Quiz on {subject}</h1>
          <p>
            This quiz contains multiple-choice questions. Select the correct
            answer for each question.
          </p>

          {questions.length > 0 ? (
            <div style={{ marginBottom: "20px" }}>
              <h3>{questions[currentQuestionIndex].question}</h3>
              {questions[currentQuestionIndex].options.map(
                (option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelection(optionIndex)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      margin: "5px 0",
                      backgroundColor:
                        selectedAnswer === optionIndex ? "#d3d3d3" : "#f0f0f0",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {option}
                  </button>
                )
              )}

              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                disabled={selectedAnswer === null}
              >
                Submit
              </button>

              <button
                onClick={handleNext}
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>

              {/* Display feedback message with dynamic color based on correctness */}
              {feedback.message && (
                <p style={{ color: feedback.isCorrect ? "green" : "red" }}>
                  {feedback.message}
                </p>
              )}
            </div>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
