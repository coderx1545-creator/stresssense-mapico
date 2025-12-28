import React, { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext();

export const useAssessment = () => {
    const context = useContext(AssessmentContext);
    if (!context) {
        throw new Error('useAssessment must be used within an AssessmentProvider');
    }
    return context;
};

export const AssessmentProvider = ({ children }) => {
    const [assessmentData, setAssessmentData] = useState(null);
    const [assessmentHistory, setAssessmentHistory] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('stressSense_assessmentData');
        const savedHistory = localStorage.getItem('stressSense_assessmentHistory');

        if (savedData) {
            setAssessmentData(JSON.parse(savedData));
        }

        if (savedHistory) {
            setAssessmentHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (assessmentData) {
            localStorage.setItem('stressSense_assessmentData', JSON.stringify(assessmentData));
        }
    }, [assessmentData]);

    useEffect(() => {
        if (assessmentHistory.length > 0) {
            localStorage.setItem('stressSense_assessmentHistory', JSON.stringify(assessmentHistory));
        }
    }, [assessmentHistory]);

    const saveAssessment = (data) => {
        const timestamp = new Date().toISOString();
        const newAssessment = {
            ...data,
            timestamp,
            id: Date.now()
        };

        setAssessmentData(newAssessment);
        setAssessmentHistory(prev => [newAssessment, ...prev.slice(0, 9)]); // Keep last 10 assessments
    };

    const clearAssessment = () => {
        setAssessmentData(null);
        localStorage.removeItem('stressSense_assessmentData');
    };

    const clearHistory = () => {
        setAssessmentHistory([]);
        localStorage.removeItem('stressSense_assessmentHistory');
    };

    const value = {
        assessmentData,
        assessmentHistory,
        saveAssessment,
        clearAssessment,
        clearHistory
    };

    return (
        <AssessmentContext.Provider value={value}>
            {children}
        </AssessmentContext.Provider>
    );
};