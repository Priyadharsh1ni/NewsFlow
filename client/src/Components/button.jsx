import React from 'react';

const Button = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`app-button ${className}`}
        {...props}
        style={{
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            textAlign: 'center',
            right:'50%',
            boxShadow: '0 4px 12px rgba(30,105,222,0.2)',
            transition: 'background 0.3s ease',
            zIndex: 1000,
            background: "#0a3577"
        }}
    >
        {children}
    </button>
);

export default Button;