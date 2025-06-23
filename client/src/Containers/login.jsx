import React, { useEffect, useState } from 'react';
import style from './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/action';
import axios from 'axios';
import Loading from '../Components/loading';

function Login() {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state) => state.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(action.login(userDetails));
        await localStorage.setItem('user', JSON.stringify(userDetails));
        await localStorage.setItem('token', token);
        setIsLoading(true)
    }

    useEffect(() => {
        if (token) {
            window.location.href = '/dashboard';
            setIsLoading(false)
        }
    }, [token])

    return (
        <><div className="login-bg">
            <svg style={{ position: 'absolute', top: 40, left: 60, opacity: 0.15 }} width="120" height="120">
                <circle cx="60" cy="60" r="60" fill="#fff" />
            </svg>
            <svg style={{ position: 'absolute', bottom: 80, right: 100, opacity: 0.10 }} width="160" height="80">
                <rect width="160" height="80" rx="40" fill="#fff" />
            </svg>
            <div className="glass-card">
                <div className="login-title">
                    <span style={{ fontSize: 18, fontWeight: 400, opacity: 0.8 }}>Your logo</span><br />
                    Login
                </div>
                <form style={{ width: '100%' }}>
                    <label htmlFor="email" className="login-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="login-input"
                        required
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        required
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                    <button type="submit" className="login-btn" onClick={handleSubmit}>Sign in</button>
                </form>
                <div style={{ color: '#e0e0e0', margin: '10px 0 8px 0', fontSize: 14 }}>or continue with</div>
                <div className="social-row">

                    <button
                        className="social-btn"
                        onClick={() => {
                            // Redirect to Google OAuth
                           window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8900/auth/google/callback&response_type=code&client_id=488303895295-9gh6qpab1s1o9601a5r63l0houg77t8r.apps.googleusercontent.com`;
                        }}
                    >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" width={22} />
                    </button>                   
                </div>
                <div className="login-footer">
                    Don't have an account?
                    <a href="/register">Register for free</a>
                </div>
            </div>
        </div><Loading isLoading={isLoading} /></>
    );
}

export default Login;