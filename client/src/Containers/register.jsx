import React, { useState } from 'react';
import { action } from '../redux/action';
import { useDispatch } from 'react-redux';

function Register() {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const handleRegister = (e) => {
         e.preventDefault();
        dispatch(action.register(userDetails));
        setUserDetails({ email: '', password: '' });
        // window.location.href = '/login'; // Redirect to login page after registration
    }
    return (
        <div className="login-bg">
            <svg style={{ position: 'absolute', top: 40, left: 60, opacity: 0.15 }} width="120" height="120">
                <circle cx="60" cy="60" r="60" fill="#fff" />
            </svg>
            <svg style={{ position: 'absolute', bottom: 80, right: 100, opacity: 0.10 }} width="160" height="80">
                <rect width="160" height="80" rx="40" fill="#fff" />
            </svg>
            <div className="glass-card">
                <div className="login-title">
                    <span style={{ fontSize: 18, fontWeight: 400, opacity: 0.8 }}>Your logo</span><br />
                    Register
                </div>
                <form style={{ width: '100%' }} >
                    <label htmlFor="email" className="login-label">Email</label>
                    <input
                        id="email"
                        name="email"
                        className="login-input"
                        placeholder="username@gmail.com"
                        required
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    />
                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        required
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />
                    <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="login-input"
                        placeholder="Confirm Password"
                        required
                        value={userDetails.confirmPassword || ''}
                        onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
                    />
                    <button type="submit" className="login-btn" onClick={(e) =>  handleRegister(e)}>Register</button>
                </form>
                <div className="login-footer">
                    Already have an account?
                    <a href="/">Sign in</a>
                </div>
            </div>
        </div>
    );
}

export default Register;