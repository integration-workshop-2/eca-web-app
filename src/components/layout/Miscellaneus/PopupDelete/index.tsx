import React, { useState } from "react";
import Button from "../Buttons"
import "./index.css"; 

interface PopupDeleteProps {
    userId: number; 
    userName: string; 
    onClose: () => void;
    onDelete: () => void; 
    
}

const PopupDelete: React.FC<PopupDeleteProps> = ({ userId, userName, onClose, onDelete}) => {

    const handleSave = () => {
        onDelete();
        onClose(); 
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Deletar usuário</h2>
                <p>Deseja deletar o(a) paciente: {userName}</p>
                <div className="popup-buttons">
                    <Button onClick={handleSave} className="update">Sim</Button>
                    <Button onClick={onClose} className="delete">Não</Button>
                </div>
            </div>
        </div>
    );
};

export default PopupDelete;