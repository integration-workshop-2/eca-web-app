import React from "react";
import "./index.css";

interface ButtonProps {
    children: React.ReactNode; 
    onClick?: () => void; 
    type?: "button" | "submit";
    className?: string; 
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className = "", disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;