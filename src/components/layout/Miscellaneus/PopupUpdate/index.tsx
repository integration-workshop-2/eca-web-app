import React, { useState } from "react";
import Button from "../Buttons"
import "./index.css";

interface PopupUpdateProps<T> {
    item: T;
    title: string;
    fields: { key: keyof T; label: string }[];
    onClose: () => void;
    onUpdate: (updatedItem: T) => void;
}

const PopupUpdate = <T,>({ item, title, fields, onClose, onUpdate }: PopupUpdateProps<T>) => {
    const [updatedItem, setUpdatedItem] = useState<T>(item);

    const handleChange = (key: keyof T, value: string) => {
        setUpdatedItem((prevItem) => ({
            ...prevItem,
            [key]: value,
        }));
    };

    const handleSave = () => {
        onUpdate(updatedItem);
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{title}</h2>
                <div className="popup-fields">
                    {fields.map(({ key, label }) => (
                        <div key={key.toString()} className="input-group">
                            <label>{label}</label>
                            <input
                                type="text"
                                value={String(updatedItem[key])}
                                onChange={(e) => handleChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div className="popup-buttons">
                    <Button onClick={handleSave} className="update">Atualizar Paciente</Button>
                    <Button onClick={onClose} className="delete">Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default PopupUpdate;