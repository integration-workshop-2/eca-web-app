import React, { useEffect } from "react";
import "./index.css";

interface ToastProps {
    title?: string;
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title = 'ECA', message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [onClose]);
    
    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-header">
                <span>{title}</span>
                <button onClick={onClose} className="close-btn">&times;</button>
            </div>
            <div className="toast-body">
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Toast;
