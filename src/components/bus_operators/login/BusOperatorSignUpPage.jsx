import React, { useState } from 'react';
import './BusOperatorSignUpPage.css'; // Import CSS file for styling

const BusOperatorSignupPage = () => {
    const [signupData, setSignupData] = useState({
        companyName: '',
        contactPersonName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        yearsOfService: ''
    });

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Signing up with data:", signupData);
        // Implement signup logic here
    };

    return (
        <div className="bus-operator-signup-container">
            <h2>Bus Operator Signup</h2>
            <form onSubmit={handleSignupSubmit} className="signup-form">
                <div className="signup-form-group">
                    <label htmlFor="companyName">Company Name:</label>
                    <input type="text" id="companyName" name="companyName" value={signupData.companyName} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="contactPersonName">Contact Person Name:</label>
                    <input type="text" id="contactPersonName" name="contactPersonName" value={signupData.contactPersonName} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={signupData.email} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={signupData.password} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={signupData.contactNumber} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={signupData.address} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" value={signupData.city} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state" value={signupData.state} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country" value={signupData.country} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <div className="signup-form-group">
                    <label htmlFor="yearsOfService">Years of Service:</label>
                    <input type="text" id="yearsOfService" name="yearsOfService" value={signupData.yearsOfService} onChange={handleSignupChange} required className='custom-input' />
                </div>
                <button type="submit" className="signup-btn">Signup</button>
            </form>
        </div>
    );
};

export default BusOperatorSignupPage;
