import React, { useState } from "react";
import Header from "./Header.jsx";
import { useAssessment } from "./AssessmentContext.jsx";
import "./stress.css";

const StressCheck = () => {
    const { saveAssessment } = useAssessment();
    const [formData, setFormData] = useState({
        sleepHours: '',
        studyHours: '',
        grades: '',
        exerciseHours: '',
        socialHours: '',
        screenTime: '',
        mealsPerDay: '',
        stressLevel: '',
        anxietyLevel: '',
        concentration: '',
        mood: '',
        energy: ''
    });
    const [result, setResult] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateStressScore = (data) => {
        let score = 0;

        // Sleep hours  7-9 hours
        const sleep = parseFloat(data.sleepHours) || 0;
        if (sleep < 6) score += 15;
        else if (sleep >= 6 && sleep <= 9) score += 0;
        else score += 5;

        // Study hours  4-6 hours
        const study = parseFloat(data.studyHours) || 0;
        if (study > 8) score += 10;
        else if (study >= 4 && study <= 6) score += 0;
        else score += 5;

        // Grades in percentage 
        const grades = parseFloat(data.grades) || 0;
        if (grades < 60) score += 15;
        else if (grades >= 60 && grades <= 85) score += 5;
        else score += 0;

        // Exercise hours  1-2 hours
        const exercise = parseFloat(data.exerciseHours) || 0;
        if (exercise < 0.5) score += 10;
        else if (exercise >= 0.5 && exercise <= 2) score += 0;
        else score += 2;

        // Social hours 2-4 hours
        const social = parseFloat(data.socialHours) || 0;
        if (social < 1) score += 8;
        else if (social >= 1 && social <= 4) score += 0;
        else score += 3;

        // Screen time <3 hours
        const screen = parseFloat(data.screenTime) || 0;
        if (screen > 4) score += 12;
        else if (screen >= 2 && screen <= 4) score += 5;
        else score += 0;

        // Meals per day  3times 
        const meals = parseInt(data.mealsPerDay) || 0;
        if (meals < 2) score += 8;
        else if (meals === 3) score += 0;
        else score += 2;

        // MCQ 
        const mcqScore = {
            stressLevel: { 'Very Low': 0, 'Low': 5, 'Moderate': 10, 'High': 15, 'Very High': 20 },
            anxietyLevel: { 'Never': 0, 'Rarely': 3, 'Sometimes': 7, 'Often': 12, 'Always': 15 },
            concentration: { 'Excellent': 0, 'Good': 3, 'Average': 7, 'Poor': 12, 'Very Poor': 15 },
            mood: { 'Very Happy': 0, 'Happy': 2, 'Neutral': 5, 'Sad': 10, 'Very Sad': 15 },
            energy: { 'Very High': 0, 'High': 2, 'Moderate': 5, 'Low': 10, 'Very Low': 15 }
        };

        score += mcqScore.stressLevel[data.stressLevel] || 0;
        score += mcqScore.anxietyLevel[data.anxietyLevel] || 0;
        score += mcqScore.concentration[data.concentration] || 0;
        score += mcqScore.mood[data.mood] || 0;
        score += mcqScore.energy[data.energy] || 0;

        return Math.min(score, 100); // Cap at 100
    };

    const getStressLevel = (score) => {
        if (score <= 20) return { level: "Low Stress", description: "You're doing great! Keep up the healthy habits.", color: "#4CAF50", emoji: "😊" };
        if (score <= 40) return { level: "Mild Stress", description: "Some stress detected. Consider making small lifestyle changes.", color: "#8BC34A", emoji: "😐" };
        if (score <= 60) return { level: "Moderate Stress", description: "Moderate stress levels. Time to focus on self-care.", color: "#FF9800", emoji: "😟" };
        if (score <= 80) return { level: "High Stress", description: "High stress levels. Professional help recommended.", color: "#FF5722", emoji: "😰" };
        return { level: "Severe Stress", description: "Critical stress levels. Seek immediate professional help.", color: "#F44336", emoji: "😱" };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        const requiredFields = Object.keys(formData);
        const emptyFields = requiredFields.filter(field => !formData[field]);

        if (emptyFields.length > 0) {
            alert(`Please fill in all fields: ${emptyFields.join(', ')}`);
            return;
        }

        const score = calculateStressScore(formData);
        const stressResult = getStressLevel(score);
        const assessmentResult = { score, ...stressResult };
        setResult(assessmentResult);
        setShowForm(false);

        // Save assessment data to context (and localStorage)
        saveAssessment({
            formData,
            result: assessmentResult
        });
    };

    const resetForm = () => {
        setFormData({
            sleepHours: '',
            studyHours: '',
            grades: '',
            exerciseHours: '',
            socialHours: '',
            screenTime: '',
            mealsPerDay: '',
            stressLevel: '',
            anxietyLevel: '',
            concentration: '',
            mood: '',
            energy: ''
        });
        setResult(null);
        setShowForm(true);
    };

    return (
        <div className="stress-check-container">
            <Header />
            <div className="main">
                <div className="stress-header">
                    <h1> Personal Stress Assessment</h1>
                    <p className="note">
                        <strong>Complete Assessment:</strong> Fill in your daily habits and answer the questions below for a personalized stress analysis
                    </p>
                </div>

                {showForm ? (
                    <form onSubmit={handleSubmit} className="stress-form">

                        <div className="section-card">
                            <h2> Daily Habits</h2>
                            <div className="input-grid">
                                <div className="input-group">
                                    <label htmlFor="sleepHours"> Sleep Hours per Night</label>
                                    <input
                                        type="number"
                                        id="sleepHours"
                                        name="sleepHours"
                                        value={formData.sleepHours}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 7.5"
                                        min="0"
                                        max="24"
                                        step="0.5"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="studyHours"> Study Hours per Day</label>
                                    <input
                                        type="number"
                                        id="studyHours"
                                        name="studyHours"
                                        value={formData.studyHours}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 5"
                                        min="0"
                                        max="24"
                                        step="0.5"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="grades"> Latest Grades/Marks (%)</label>
                                    <input
                                        type="number"
                                        id="grades"
                                        name="grades"
                                        value={formData.grades}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 85"
                                        min="0"
                                        max="100"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="exerciseHours"> Exercise Hours per Week</label>
                                    <input
                                        type="number"
                                        id="exerciseHours"
                                        name="exerciseHours"
                                        value={formData.exerciseHours}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3"
                                        min="0"
                                        max="168"
                                        step="0.5"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="socialHours"> Social Time Hours per Day</label>
                                    <input
                                        type="number"
                                        id="socialHours"
                                        name="socialHours"
                                        value={formData.socialHours}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2"
                                        min="0"
                                        max="24"
                                        step="0.5"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="screenTime"> Screen Time Hours per Day</label>
                                    <input
                                        type="number"
                                        id="screenTime"
                                        name="screenTime"
                                        value={formData.screenTime}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4"
                                        min="0"
                                        max="24"
                                        step="0.5"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="mealsPerDay">Meals per Day</label>
                                    <input
                                        type="number"
                                        id="mealsPerDay"
                                        name="mealsPerDay"
                                        value={formData.mealsPerDay}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3"
                                        min="1"
                                        max="10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* MCQ Section */}
                        <div className="section-card">
                            <h2> Mental Health Check</h2>
                            <div className="mcq-grid">
                                <div className="mcq-group">
                                    <label>How would you rate your current stress level?</label>
                                    <select name="stressLevel" value={formData.stressLevel} onChange={handleInputChange} required>
                                        <option value="">Select...</option>
                                        <option value="Very Low">Very Low</option>
                                        <option value="Low">Low</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="High">High</option>
                                        <option value="Very High">Very High</option>
                                    </select>
                                </div>

                                <div className="mcq-group">
                                    <label>How often do you feel anxious?</label>
                                    <select name="anxietyLevel" value={formData.anxietyLevel} onChange={handleInputChange} required>
                                        <option value="">Select...</option>
                                        <option value="Never">Never</option>
                                        <option value="Rarely">Rarely</option>
                                        <option value="Sometimes">Sometimes</option>
                                        <option value="Often">Often</option>
                                        <option value="Always">Always</option>
                                    </select>
                                </div>

                                <div className="mcq-group">
                                    <label>How is your concentration level?</label>
                                    <select name="concentration" value={formData.concentration} onChange={handleInputChange} required>
                                        <option value="">Select...</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Average">Average</option>
                                        <option value="Poor">Poor</option>
                                        <option value="Very Poor">Very Poor</option>
                                    </select>
                                </div>

                                <div className="mcq-group">
                                    <label>How would you describe your mood?</label>
                                    <select name="mood" value={formData.mood} onChange={handleInputChange} required>
                                        <option value="">Select...</option>
                                        <option value="Very Happy">Very Happy</option>
                                        <option value="Happy">Happy</option>
                                        <option value="Neutral">Neutral</option>
                                        <option value="Sad">Sad</option>
                                        <option value="Very Sad">Very Sad</option>
                                    </select>
                                </div>

                                <div className="mcq-group">
                                    <label>How is your energy level?</label>
                                    <select name="energy" value={formData.energy} onChange={handleInputChange} required>
                                        <option value="">Select...</option>
                                        <option value="Very High">Very High</option>
                                        <option value="High">High</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Low">Low</option>
                                        <option value="Very Low">Very Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn"> Analyze My Stress Level</button>
                    </form>
                ) : (
                    <div className="result-container">
                        <div className="result-card" style={{ borderColor: result.color }}>
                            <div className="result-emoji">{result.emoji}</div>
                            <h2>Your Stress Assessment</h2>
                            <div className="score-display">
                                <div className="score-number" style={{ color: result.color }}>
                                    {result.score}/100
                                </div>
                                <div className="stress-level" style={{ color: result.color }}>
                                    {result.level}
                                </div>
                            </div>
                            <p className="result-description">{result.description}</p>

                            <div className="insights">
                                <h3> Key Insights:</h3>
                                <div className="insights-grid">
                                    {parseFloat(formData.sleepHours) < 6 && (
                                        <div className="insight-item"> Low sleep hours detected</div>
                                    )}
                                    {parseFloat(formData.studyHours) > 8 && (
                                        <div className="insight-item"> Excessive study hours</div>
                                    )}
                                    {parseFloat(formData.grades) < 60 && (
                                        <div className="insight-item"> Low academic performance</div>
                                    )}
                                    {parseFloat(formData.exerciseHours) < 0.5 && (
                                        <div className="insight-item"> Insufficient exercise</div>
                                    )}
                                    {parseFloat(formData.screenTime) > 4 && (
                                        <div className="insight-item"> High screen time</div>
                                    )}
                                    {parseInt(formData.mealsPerDay) < 3 && (
                                        <div className="insight-item"> Irregular eating habits</div>
                                    )}
                                </div>
                            </div>

                            <div className="recommendations">
                                <h3> Recommendations:</h3>
                                <ul>
                                    {result.score <= 20 && (
                                        <>
                                            <li> Excellent! Maintain your healthy lifestyle</li>
                                            <li> Continue balanced study routines</li>
                                            <li> Keep up the good sleep habits</li>
                                        </>
                                    )}
                                    {result.score > 20 && result.score <= 40 && (
                                        <>
                                            <li> Aim for 7-9 hours of sleep nightly</li>
                                            <li> Add 30 minutes of exercise daily</li>
                                            <li> Reduce screen time before bed</li>
                                        </>
                                    )}
                                    {result.score > 40 && result.score <= 60 && (
                                        <>
                                            <li> Practice mindfulness or meditation</li>
                                            <li> Maintain regular meal times</li>
                                            <li> Spend more time with friends/family</li>
                                            <li> Consider talking to a counselor</li>
                                        </>
                                    )}
                                    {result.score > 60 && (
                                        <>
                                            <li> Seek professional help immediately</li>
                                            <li> Consult a mental health professional</li>
                                            <li> Contact support hotlines</li>
                                            <li> Consider medical evaluation</li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <button onClick={resetForm} className="retake-btn"> Take Assessment Again</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StressCheck;