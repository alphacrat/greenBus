import React, { useState } from 'react';
import './BusOperatorLoginPage.css';

const BusOperatorLoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        token: '',
        busOperatorName: '',
        busName: ''
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
        console.log("Logging in with email:", loginData.email, "and token:", loginData.token);
        const { busOperatorName } = loginData;
        setTimeout(() => {
            window.location.href = `/operator/dashboard/${busOperatorName}`;
        }, 2000);
    };

    const handleJoinButton = (e) => {
        window.location.href = '/operator/signup';
    };

    return (
        <div>
            <div className="bus-operator-login-container">
                <h2>Bus Operator Login</h2>
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={loginData.email} onChange={handleLoginChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="token">Token:</label>
                        <input type="text" id="token" name="token" value={loginData.token} onChange={handleLoginChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="busOperatorName">Bus Operator Name:</label>
                        <input type="text" id="busOperatorName" name="busOperatorName" value={loginData.busOperatorName} onChange={handleLoginChange} required />
                    </div>
                    <button type="submit" className="login-btn" onClick={handleLoginSubmit}>Login</button>
                </form>
            </div>
            <div className="partner-section">
                <p>Yet to be a partner with us?</p>
                <button className="join-btn" onClick={handleJoinButton}>Join</button>
            </div>
        </div>
    );
};

export default BusOperatorLoginPage;
