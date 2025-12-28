import React, { useState } from 'react';
import gym from './assets/gym.jpg';
import diest from './assets/diest.jpg';
import './diet-exercise.css';
import Header from './Header';

const DietExercisePlanner = () => {
    const [dietPlan, setDietPlan] = useState('');
    const [exercisePlan, setExercisePlan] = useState('');
    const [userInput, setUserInput] = useState('');

    const generateDietPlan = () => {
        // Placeholder for AI diet plan generation
        setDietPlan(`Based on your input: "${userInput}", here's a sample diet plan:
- Breakfast: Oatmeal with fruits
- Lunch: Grilled chicken salad   
- Dinner: Fish with vegetables
- Snacks: Nuts and yogurt`);
    };

    const generateExercisePlan = () => {

        setExercisePlan(`Based on your input: "${userInput}", here's a sample exercise plan:
- Monday: Cardio - 30 min run
- Tuesday: Strength training - Upper body
- Wednesday: Yoga - 45 min session
- Thursday: HIIT - 20 min workout
- Friday: Rest or light walk
- Weekend: Sports or outdoor activities`);
    };

    return (
        <div className="diet-exercise-container">
            <Header />
            <h1><br></br>AI Diet & Exercise Planner</h1>
            <div className="input-section">
                <label htmlFor="user-input">Describe your goals, preferences, or current fitness level:</label>
                <textarea
                    className='user'
                    id="user-input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., I want to lose weight, vegetarian diet, beginner level..."
                    rows="4"

                />
            </div>
            <div className="buttons-section">
                <button onClick={generateDietPlan} className="generate-btn">Generate Diet Plan</button>
                <button onClick={generateExercisePlan} className="generate-btn">Generate Exercise Plan</button>
            </div>
            <div className="plans-section">
                {dietPlan && (
                    <div className="plan-card">
                        <h2>Diet Plan</h2>
                        <div className='prev'>   <pre>{dietPlan}</pre>
                            <img src={diest} alt="Grilled Chicken Salad" /></div>
                    </div>
                )}
                {exercisePlan && (
                    <div className="plan-card">
                        <h2>Exercise Plan</h2>
                        <div className='prev'>  <pre>{exercisePlan}</pre>
                            <img src={gym} alt="Person Running" /></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DietExercisePlanner;