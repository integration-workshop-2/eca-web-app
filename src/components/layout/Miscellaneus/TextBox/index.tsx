import React from "react";
import './index.css';
interface TextBoxProps {
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ value, placeholder, onChange }) => {
    function teste() {

    }
    return (
        <>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    );
}

export default TextBox;