import React, { useEffect, useState } from 'react';
import { FunctionDeclarationSchemaType } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './QuizAI.css';

const QuizAI = () => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [error, setError] = useState('');
    const [btnName, setBtnName] = useState("Submit");
    const [answerStatus, setAnswerStatus] = useState(null); // New state for tracking answer correctness
    const [notification, setNotification] = useState(''); // New state for notifications

    const fetchData = async () => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyDNi-s5NMD8PGJ7JwENBiqv_JFGGGGxdlE"); // Use environment variable
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: FunctionDeclarationSchemaType.OBJECT,
                        properties: {
                            question: { type: FunctionDeclarationSchemaType.STRING },
                            option1: { type: FunctionDeclarationSchemaType.STRING },
                            option2: { type: FunctionDeclarationSchemaType.STRING },
                            option3: { type: FunctionDeclarationSchemaType.STRING },
                            option4: { type: FunctionDeclarationSchemaType.STRING },
                            correctOption: { type: FunctionDeclarationSchemaType.INTEGER }
                        }
                    }
                }
            });

            const prompt = "Give a question on Java with four options and an integer correct option";
            const result = await model.generateContent(prompt);

            const responseText = await result.response.text(); 
            const parsedResponse = JSON.parse(responseText);
            setQuestionData(parsedResponse);
            setCorrectAnswer(parsedResponse.correctOption);
        } 
        catch (error) 
        {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const handleDivClick = (id) => 
    {
        if (btnName === "Submit") {
            setSelectedOption(id);
        }
    };

    const handleResult = () => 
    {
        if (btnName === "Submit") 
        {
            if (selectedOption === correctAnswer) 
            {
                setAnswerStatus('correct');
                setNotification('Hooray! You are correct!');
            } 
            else 
            {
                setAnswerStatus('wrong');
                setNotification('Let\'s try again.');
            }

            setBtnName("Next");
        } 
        else if (btnName === "Next") 
        {
            setQuestionData(null);
            setSelectedOption(null);
            setCorrectAnswer(null);
            setAnswerStatus(null); 
            setNotification(''); // Clear notification
            setBtnName("Submit");
            fetchData(); 
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!questionData) {
        return <p>Loading...</p>;
    }

    const getDivStyle = (id) => 
    {
        if (btnName === "Submit") 
        {
            return {
                backgroundColor: selectedOption === id ? '#360bab' : '#f0f1f0',
                color: selectedOption === id ? '#fff' : '#000',
            };
        } 
        else if (answerStatus) 
        {
            if (id === correctAnswer) 
            {
                return {
                    backgroundColor: '#28a745', // Green for correct answer
                    color: '#fff',
                };
            } 
            else if (id === selectedOption && answerStatus === 'wrong') 
            {
                return {
                    backgroundColor: '#dc3545', // Red for wrong selected answer
                    color: '#fff',
                };
            } 
            else 
            {
                return {
                    backgroundColor: '#f0f1f0',
                    color: '#000',
                };
            }
        }
        return {}; 
    };

    return (
        <div className='AI_total'>
            {notification && (
                <div className='notification'>
                    {notification}
                </div>
            )}
            <div className='AI_BigDiv'>
                <div className='AI_BigDiv01'>
                    <div className='AI_BigDiv0101'>{questionData.question}</div>
                </div>

                <div className='AI_BigDiv02'>
                    <div 
                        className='AI_BigDiv0201' 
                        style={getDivStyle(1)} 
                        onClick={() => handleDivClick(1)}
                    >
                        {questionData.option1}
                    </div>
                    
                    <div 
                        className='AI_BigDiv0201' 
                        style={getDivStyle(2)} 
                        onClick={() => handleDivClick(2)}
                    >
                        {questionData.option2}
                    </div>
                    
                    <div 
                        className='AI_BigDiv0201' 
                        style={getDivStyle(3)} 
                        onClick={() => handleDivClick(3)}
                    >
                        {questionData.option3}
                    </div>
                    
                    <div 
                        className='AI_BigDiv0201' 
                        style={getDivStyle(4)} 
                        onClick={() => handleDivClick(4)}
                    >
                        {questionData.option4}
                    </div>
                </div>
                <button className='button-27' onClick={handleResult}>{btnName}</button>
            </div>
        </div>
    );
};

export default QuizAI;
