import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.webp";
import "./header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
        };

        checkAuth();
        // Listen for storage changes 
        window.addEventListener('storage', checkAuth);

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="header">
            <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
                <div className="header-container">
                    <div className="logo">
                        <NavLink to="/" className="logo-link">
                            <img src={logo} alt="Mapico Logo" className="logo-image" />
                            <span className="logo-text">StressSense</span>
                        </NavLink>
                    </div>

                    <div className="nav-links">
                        <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                        {isAuthenticated ? (
                            <>
                                {location.pathname !== '/stress' && <NavLink to="/stress" className="nav-link" onClick={() => setIsMenuOpen(false)}>Stress Check</NavLink>}
                                {location.pathname !== '/ai-assistant' && <NavLink to="/ai-assistant" className="nav-link" onClick={() => setIsMenuOpen(false)}>AI Assistant</NavLink>}
                                {location.pathname !== '/diet-exercise' && <NavLink to="/diet-exercise" className="nav-link" onClick={() => setIsMenuOpen(false)}>Diet & Exercise</NavLink>}
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <NavLink to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                        )}
                    </div>

                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                        ☰
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
