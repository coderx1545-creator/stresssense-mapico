import React, { useState, useEffect } from 'react';
import Header from './Header';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const nav = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
        <div className="container" >
            <h1 className="typing-h1">
                Welcome to <br /> Stress Sense
            </h1>
            <div className="Heading">Stress check store data</div>
            <div className="para">"Your well-being matters. This app helps you <b>monitor stress</b>, build resilience, and take control of your day.<br></br> With guided exercises and real-time insights, you'll find the strength to thrive, not just survive."</div>
            <button className="button" onClick={() => nav('/about')}>More Info On App</button>
            {isAuthenticated ? (
                <button className="button" onClick={() => nav('/stress')}>Check Stress Level</button>
            ) : (
                <button className="button" onClick={() => nav('/login')}>Login to Access Assessment</button>
            )}
            <footer>
                &copy; 2026 Stress Check Application. All rights reserved to Mapico.in.
            </footer>
        </div>
    );
};


export default Home;
