import React, { useState } from "react";

interface DropdownProps<T> {
    options: T[];
    onSelect: (item: T) => void;
    placeholder?: string;
    displayField?: keyof T;
}

const Dropdown = <T,>({ options, onSelect, placeholder = "Selecione...", displayField }: DropdownProps<T>) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    return (
        <div className="dropdown">
            <div
                className="dropdown-header"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                {selectedItem
                    ? displayField
                        ? String(selectedItem[displayField])
                        : String(selectedItem)
                    : placeholder}
            </div>
            {isDropdownOpen && (
                <ul className="dropdown-list">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelectedItem(option);
                                onSelect(option);
                                setIsDropdownOpen(false);
                            }}
                        >
                            {displayField ? String(option[displayField]) : String(option)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
