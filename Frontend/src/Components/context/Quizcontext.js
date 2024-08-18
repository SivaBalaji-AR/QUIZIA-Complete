import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [quizName, setQuizName] = useState('');
  const [quizId, setQuizId] = useState(null);
  const [mark, setMark] = useState(0);
  const [wrongtopic, setWrongTopic] = useState([]); // Initialize as an array

  return (
    <QuizContext.Provider value={{ username, setUsername, quizTopic, setQuizTopic, quizName, setQuizName, mark, setMark, wrongtopic, setWrongTopic, quizId, setQuizId }}>
      {children}
    </QuizContext.Provider>
  );
};
