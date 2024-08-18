import React, { useContext, useEffect, useState } from 'react';
import './Quizdisplay.css';
import { QuizContext } from '../context/Quizcontext';
import { useNavigate } from 'react-router-dom';
import '../Home/Button.css';
import axios from 'axios';
import QICON from '../../Files/QICON.jpg';
import { FaBars, FaJava, FaPython, FaReact, FaCode, FaLeaf, FaUserCircle, FaTrophy, FaRobot } from 'react-icons/fa';

const Quizdisplay = () => {
    const { setQuizTopic, username } = useContext(QuizContext);
    const [quizzes, setQuizzes] = useState([]);
    const { quizTopic, setQuizName, setQuizId } = useContext(QuizContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const updateQuizTopic = (topic) => 
    {
        if(topic === 'profile') 
        {
            navigate('/profile');
        } 
        else if(topic === "result") 
        {
            navigate('/result');
        } 
        else if(topic === "leader") 
        {
            navigate('/leaderboard');
        } 
        else if(topic === 'AI')
        {
            navigate('/AI');
        } 
        else 
        {
            setQuizTopic(topic);
            navigate('/QuizPage');
        }
    };

    const toggleSidebar = () => 
    {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const updateQuizName = (title, Id) => 
    {
        setQuizName(title);
        setQuizId(Id);
        navigate('/Quiz');
    };

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/getQuiz')
            .then(response => setQuizzes(response.data.filter(quiz => quiz.quizTopic === quizTopic)))
            .catch(error => console.error('Error:', error));
    }, [quizTopic]);

    return (
        <div className="quiz-display-container">
            <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <h2>QUIZ</h2>
                </div>
                <ul className="sidebar-menu">
                <div className='side-top'>
                    <li>
                        <button onClick={() => updateQuizTopic('Java')} className="sidebar-link">
                            <FaJava className="sidebar-icon" />
                            <span className="sidebar-text">Java</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => updateQuizTopic('Python')} className="sidebar-link">
                            <FaPython className="sidebar-icon" />
                            <span className="sidebar-text">Python</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => updateQuizTopic('React')} className="sidebar-link">
                            <FaReact className="sidebar-icon" />
                            <span className="sidebar-text">React</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => updateQuizTopic('CPP')} className="sidebar-link">
                            <FaCode className="sidebar-icon" />
                            <span className="sidebar-text">CPP</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => updateQuizTopic('Spring')} className="sidebar-link">
                            <FaLeaf className="sidebar-icon" />
                            <span className="sidebar-text">Spring</span>
                        </button>
                    </li>
                    </div>
                    <div className='side-bottom'>
                    <li>
                        <button onClick={() => updateQuizTopic('profile')} className="sidebar-link">
                            <FaUserCircle className="sidebar-icon" />
                            <span className="sidebar-text">Profile</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => updateQuizTopic('leader')} className="sidebar-link">
                            <FaTrophy className="sidebar-icon" />
                            <span className="sidebar-text">Leaderboard</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => updateQuizTopic('AI')} className="sidebar-link">
                            <FaRobot className="sidebar-icon" />
                            <span className="sidebar-text">AI</span>
                        </button>
                    </li>
                    </div>
                </ul>
            </div>
            <h1 className="quiz-page-title">{quizTopic}</h1>
            <div className="quiz-grid">
                <div className="quiz-grid-container">
                    {quizzes.map((quiz, index) => (
                        <div className="quiz-card" key={index}>
                            <img src={QICON} alt="Quiz Icon" className="quiz-card-image" />
                            <div className="quiz-card-content">
                                <h3 className="quiz-card-title">{quiz.quizTopic}</h3>
                                <h3 className="quiz-card-description">{quiz.quizName}</h3>
                                <div className="quiz-card-footer">
                                    <button onClick={() => updateQuizName(quiz.quizName, quiz.quizId)} className="quiz-card-button">Start Quiz</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quizdisplay;
