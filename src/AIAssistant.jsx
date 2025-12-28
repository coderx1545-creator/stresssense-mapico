import React, { useState, useEffect, useRef } from 'react';
import { useAssessment } from './AssessmentContext';
import Header from './Header';
import './ai.css';

const AIAssistant = () => {
    const { assessmentData, assessmentHistory } = useAssessment();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    {/*const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);*/}

    // Initialize with welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: 1,
                type: 'ai',
                content: 'Hello! I\'m your AI stress management assistant. I can help you with stress-related questions, provide coping strategies, and analyze your stress assessment results. How can I assist you today?'
            }]);
        }
    }, []);

    const getStressLevelText = (score) => {
        if (score <= 20) return 'Low Stress';
        if (score <= 40) return 'Moderate Stress';
        if (score <= 60) return 'High Stress';
        return 'Very High Stress';
    };

    const getAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Basic keyword-based responses
        if (message.includes('stress') && message.includes('level')) {
            if (assessmentData) {
                return `Based on your latest assessment, your stress level is ${getStressLevelText(assessmentData.totalScore)} with a score of ${assessmentData.totalScore}/100. ${assessmentData.totalScore > 50 ? 'I recommend trying some relaxation techniques or speaking with a professional if this persists.' : 'That\'s a good stress level! Keep up the healthy habits.'}`;
            } else {
                return 'You haven\'t taken a stress assessment yet. Would you like me to guide you through one?';
            }
        }

        if (message.includes('relax') || message.includes('calm')) {
            return 'Here are some quick relaxation techniques:\n\n1. Deep breathing: Inhale for 4 counts, hold for 4, exhale for 4\n2. Progressive muscle relaxation: Tense and release muscle groups\n3. Mindfulness: Focus on the present moment\n4. Take a short walk in nature\n5. Listen to calming music\n\nWhich one would you like to learn more about?';
        }

        if (message.includes('sleep') || message.includes('insomnia')) {
            return 'Good sleep is crucial for stress management. Try these tips:\n\n• Maintain a consistent sleep schedule\n• Create a relaxing bedtime routine\n• Avoid screens 1 hour before bed\n• Keep your bedroom cool and dark\n• Limit caffeine after 2 PM\n\nIf sleep issues persist, consider consulting a healthcare professional.';
        }

        if (message.includes('exercise') || message.includes('workout')) {
            return 'Regular exercise is excellent for reducing stress! Here are some suggestions:\n\n• Walking or jogging (30 minutes daily)\n• Yoga or tai chi for mindfulness\n• Strength training 2-3 times per week\n• Dancing to your favorite music\n• Team sports for social connection\n\nStart small and build up gradually. Even 10 minutes can make a difference!';
        }

        if (message.includes('meditation') || message.includes('mindfulness')) {
            return 'Meditation can be very effective for stress reduction. Here\'s a simple 5-minute practice:\n\n1. Sit comfortably with eyes closed\n2. Focus on your breath\n3. When your mind wanders, gently return to your breath\n4. Start with 5 minutes daily\n5. Use apps like Headspace or Calm for guidance\n\nConsistency is key - try it daily for the best results.';
        }

        if (message.includes('help') || message.includes('support')) {
            return 'I\'m here to help! I can provide:\n\n• Stress management techniques\n• Analysis of your assessment results\n• Coping strategies for difficult situations\n• Information about relaxation methods\n• Tips for better sleep and exercise\n\nWhat specific area would you like support with?';
        }

        // Default response
        return 'I understand you\'re dealing with stress. While I can provide general stress management advice, for personalized guidance, please consider speaking with a mental health professional. Would you like me to share some general coping strategies?';
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                type: 'ai',
                content: getAIResponse(inputMessage)
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleTipClick = (tip) => {
        setInputMessage(tip);
        // Auto-send after a brief delay
        setTimeout(() => {
            handleSendMessage();
        }, 100);
    };

    const tipButtons = [
        'How can I reduce my stress?',
        'What are some relaxation techniques?',
        'Help with better sleep',
        'Exercise recommendations',
        'Meditation guidance'
    ];

    return (
        <div className="ai-assistant-container">
            < Header />
            <div className="main">
                <div className="ai-header">
                    <h1>AI Stress Assistant</h1>
                    <div className="ai-description">
                        <p>Get personalized stress management advice, coping strategies, and insights from your assessments.</p>
                    </div>
                </div>

                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map(message => (
                            <div key={message.id} className={`message ${message.type}`}>
                                <div className="message-content">
                                    <strong>{message.type === 'ai' ? 'AI Assistant:' : 'You:'}</strong>
                                    <span>{message.content}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message ai">
                                <div className="message-content">
                                    <strong>AI Assistant:</strong>
                                    <span>Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me about stress management..."
                            disabled={isTyping}
                        />
                        <button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
                            Send
                        </button>
                    </div>
                </div>

                {assessmentData && (
                    <div className="assessment-summary">
                        <h3>Your Latest Assessment</h3>
                        <div className="assessment-card">
                            <div className="assessment-score">
                                <div className="score-number">{assessmentData.totalScore}</div>
                                <div className="stress-level">{getStressLevelText(assessmentData.totalScore)}</div>
                            </div>
                            <div className="assessment-description">
                                {assessmentData.totalScore <= 20 && "You're doing well! Keep maintaining healthy habits."}
                                {assessmentData.totalScore > 20 && assessmentData.totalScore <= 40 && "Moderate stress levels. Consider incorporating more relaxation techniques."}
                                {assessmentData.totalScore > 40 && assessmentData.totalScore <= 60 && "High stress detected. Focus on self-care and stress reduction strategies."}
                                {assessmentData.totalScore > 60 && "Very high stress levels. Please consider professional support and immediate stress management techniques."}
                            </div>
                            <div className="assessment-date">
                                Assessed on {new Date(assessmentData.timestamp).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                )}

                {assessmentHistory.length > 1 && (
                    <div className="assessment-history">
                        <h3>Assessment History</h3>
                        <div className="history-list">
                            {assessmentHistory.slice(1, 6).map((assessment) => (
                                <div key={assessment.id} className="history-item">
                                    <div className="history-date">
                                        {new Date(assessment.timestamp).toLocaleDateString()}
                                    </div>
                                    <div className="history-score">
                                        Score: {assessment.totalScore} - {getStressLevelText(assessment.totalScore)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="ai-tips">
                    <h3>Quick Tips</h3>
                    <div className="tips-grid">
                        {tipButtons.map((tip, index) => (
                            <button
                                key={index}
                                className="tip-button"
                                onClick={() => handleTipClick(tip)}
                                disabled={isTyping}
                            >
                                {tip}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;