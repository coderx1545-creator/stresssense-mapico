import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "./login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simple mock thing. 
        if (credentials.username === 'user' && credentials.password === 'password') {
            // Store authentication state
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify({
                username: credentials.username,
                loginTime: new Date().toISOString()
            }));

            navigate('/stress');
        } else {
            setError('Invalid username or password. Try: user / password');
        }

        setIsLoading(false);
    };

    const handleDemoLogin = () => {
        setCredentials({ username: 'user', password: 'password' });
    };

    return (
        <div className="login-container">
            <Header />
            <div className="main">
                <div className="login-card">
                    <div className="login-header">
                        <h1>Welcome to StressSense</h1>
                        <p>Please sign in to access your personalized stress assessment</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                placeholder="Enter your username"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <button
                            type="button"
                            className="demo-btn"
                            onClick={handleDemoLogin}
                            disabled={isLoading}
                        >
                            Use Demo Account
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Demo Credentials: user / password</p>
                        <p>This is a demonstration app for stress assessment purposes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;