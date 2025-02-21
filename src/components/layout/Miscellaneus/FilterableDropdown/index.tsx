import React, { useState } from "react";
interface FilterableDropdownProps<T> {
  options: T[];
  onSelect: (item: T) => void;
  placeholder?: string;
  displayField?: keyof T;
  disabled?: boolean;  // Permite desabilitar o dropdown
}

const FilterableDropdown = <T,>({
  options,
  onSelect,
  placeholder = "Digite algo...",
  displayField,
  disabled = false,  // Padrão: dropdown habilitado
}: FilterableDropdownProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const filteredOptions = options.filter((option) => {
    const text = displayField
      ? String(option[displayField]).toLowerCase()
      : String(option).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`filterable-dropdown ${disabled ? "disabled" : ""}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onFocus={() => !disabled && setIsDropdownOpen(true)}
        onBlur={() => !disabled && setTimeout(() => setIsDropdownOpen(false), 200)}
        disabled={disabled} // 🔹 Bloqueia a digitação se estiver desativado
      />

      {isDropdownOpen && !disabled && (
        <ul className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(option);
                  setSearchTerm(displayField ? String(option[displayField]) : String(option));
                  setIsDropdownOpen(false);
                }}
              >
                {displayField ? String(option[displayField]) : String(option)}
              </li>
            ))
          ) : (
            <li className="no-results">Nenhum resultado encontrado</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterableDropdown;
