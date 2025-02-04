import React from "react";
import "./index.css";

interface ButtonProps {
    children: React.ReactNode; 
    onClick?: () => void; 
    type?: "button" | "submit";
    className?: string; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;