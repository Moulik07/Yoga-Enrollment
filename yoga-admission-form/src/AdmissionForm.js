import React, { useState } from 'react';
import './FormStyles.css'; // Adjust the path if your CSS file is in a different directory

function AdmissionForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        batch: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset messages
        setSuccessMessage('');
        setErrorMessage('');
        setError('');

        // Check age validity
        if (!formData.name || formData.age < 18 || formData.age > 65 || !formData.batch) {
            setError('Please ensure all fields are correctly filled and age is between 18 and 65.');
            return;
        }

        try {
    const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
        setSuccessMessage(result.message);
    } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.');
    }
} catch (error) {
    setErrorMessage('An error occurred. Please try again.');
}
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    className="form-input"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                />
                <select
                    className="form-select"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                >
                    <option value="">Select Batch</option>
                    <option value="6-7AM">6-7AM</option>
                    <option value="7-8AM">7-8AM</option>
                    <option value="8-9AM">8-9AM</option>
                    <option value="5-6PM">5-6PM</option>
                </select>
                <button className="form-submit-btn" type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p className="fee-notice">Note: The monthly fee is 500/- Rs INR. Fee status: Pending</p>
    </div>
);
}

export default AdmissionForm;
