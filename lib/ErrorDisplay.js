import React from 'react';

// Styles for the error messages can be added here if needed
const errorStyles = {
    color: 'red',
    fontWeight: 'bold'
};

const ErrorDisplay = ({ errors = [] }) => {
    return (
        <div>
            {errors.map((message, index) => (
                <p key={index} style={errorStyles}>{message}</p>
            ))}
        </div>
    );
};

export default ErrorDisplay;
