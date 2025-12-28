import React from 'react';
import Home from './Home.jsx';
import StressCheck from './StressCheck.jsx';
import About from './About.jsx';
import AIAssistant from './AIAssistant.jsx';
import DietExercisePlanner from './DietExercisePlanner.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AssessmentProvider } from './AssessmentContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/stress' element={
            <ProtectedRoute>
              <StressCheck />
            </ProtectedRoute>
          } />
          <Route path='/ai-assistant' element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          } />
          <Route path='/diet-exercise' element={
            <ProtectedRoute>
              <DietExercisePlanner />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AssessmentProvider>
  );
}


export default App;
