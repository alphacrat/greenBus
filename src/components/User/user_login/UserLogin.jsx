import React, { useState } from 'react';
import './userLoginStyle.css'; // Import CSS file for styling

const UserLoginPage = ({ redirect }) => { // Accept redirect function as a prop

    const [loginData, setLoginData] = useState({
        contactNumber: '',
        password: ''
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with contact number:", loginData.contactNumber);
        console.log("Password:", loginData.password);
        // Implement login logic here
    };

    const handleSignupClick = () => {
        window.location.href = '/signup'; // Call the redirect function with the desired route
    };

    const handleResetPasswordClick = () => {
        window.location.href = '/resetpassword'; // Redirect to the reset password page
    };

    return (
        <div className="user-login-container">
            <h2 className="login-heading">User Login</h2>
            <form onSubmit={handleLoginSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={loginData.contactNumber} onChange={handleLoginChange} className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={loginData.password} onChange={handleLoginChange} className="form-input" required />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>

            <div className="password-reset-container">
                <button onClick={handleResetPasswordClick} className="password-reset-btn">Reset Password</button>
            </div>

            <div className="signup-container">
                <p className="signup-text">Don't have an account?</p>
                <button onClick={handleSignupClick} className="signup-btn">Signup</button>
            </div>
        </div>
    );
};

export default UserLoginPage;
