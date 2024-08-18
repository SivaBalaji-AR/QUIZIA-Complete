import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/Quizcontext';
import { Link, useLocation } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const { mark, quizTopic, quizName, username } = useContext(QuizContext);
  const location = useLocation();
  const { quizId } = location.state || {};
  const [wrongTopics, setWrongTopics] = useState([]);

  useEffect(() => {
    const resDet = {
      participant: username,
      mark: mark,
      qname: quizName,
      qtopic: quizTopic,
      quizId: quizId
    };

    // Post the result details
    axios.post('http://localhost:8080/result/insertResult', resDet)
      .then(response => {
        // Handle response if needed
      })
      .catch(error => {
        alert('Result error:', error);
      });

    // Get the quiz data to calculate wrong topics
    axios.get('http://localhost:8080/quiz/getQuiz')
      .then(response => {
        const filteredQuiz = response.data.filter(quiz => quiz.quiz_id === quizId);
        const topicCounts = {};

        filteredQuiz.forEach(quiz => {
          if (quiz.focus_topic) {
            topicCounts[quiz.focus_topic] = (topicCounts[quiz.focus_topic] || 0) + 1;
          }
        });

        const topicsArray = Object.keys(topicCounts).map(topic => ({
          topic,
          totalQuestions: topicCounts[topic],
          totalWrong: 0 // Assuming you will calculate this based on user answers
        }));

        setWrongTopics(topicsArray);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [username, mark, quizName, quizTopic, quizId]);

  return (
    <div className="result-container">
      <h2 className="result-header">Result Page</h2>
      <div className="result-info">
        <ul>
          <li>Quiz Topic: {quizTopic}</li>
          <li>Quiz Name: {quizName}</li>
          <li>You Scored: {mark}</li>
        </ul>
      </div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Quiz Topic</th>
            <th>Total Questions</th>
            <th>No of Correct</th>
            <th>No of Wrong</th>
          </tr>
        </thead>
        <tbody>
          {wrongTopics.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.topic}</td>
              <td>{quiz.totalQuestions}</td>
              <td>{quiz.totalQuestions - quiz.totalWrong}</td>
              <td>{quiz.totalWrong}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </div>
  );
}

export default ResultPage;
