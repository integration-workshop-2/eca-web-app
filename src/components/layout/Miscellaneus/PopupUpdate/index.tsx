import React, { useState } from "react";
import Button from "../Buttons";
import "./index.css";

interface PopupField<T> {
    key: keyof T;
    label: string;
    type?: "text" | "select";
    options?: string[];
}

interface PopupUpdateProps<T> {
    item: T;
    title: string;
    fields: PopupField<T>[];
    onClose: () => void;
    onUpdate: (updatedItem: T) => void;
    image?: string;
}

const PopupUpdate = <T,>({ item, title, fields, onClose, onUpdate, image }: PopupUpdateProps<T>) => {
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
                    {fields.map(({ key, label, type = "text", options }) => (
                        <div key={String(key)} className="input-group">
                            <label>{label}</label>
                            {type === "select" && options ? (
                                <select
                                    value={String(updatedItem[key])}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                >
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={String(updatedItem[key])} 
                                    onChange={(e) => handleChange(key, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {image && <img src={image} alt="Imagem do popup" className="popup-image" />}
                <div className="popup-buttons">
                    <Button onClick={handleSave} className="update">Atualizar</Button>
                    <Button onClick={onClose} className="delete">Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default PopupUpdate;
