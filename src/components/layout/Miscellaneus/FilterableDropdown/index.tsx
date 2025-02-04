import React, { useState } from "react";

interface FilterableDropdownProps<T> {
  options: T[]; // Lista de opções (pode ser qualquer tipo)
  onSelect: (item: T) => void; // Callback para selecionar um item
  placeholder?: string; // Placeholder personalizado (opcional)
  displayField?: keyof T; // Nome da propriedade para exibir (caso seja um objeto)
}

const FilterableDropdown = <T,>({
  options,
  onSelect,
  placeholder = "Digite algo...",
  displayField,
}: FilterableDropdownProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Texto digitado pelo usuário
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Estado do dropdown

  // Filtra as opções com base no texto digitado
  const filteredOptions = options.filter((option) => {
    const text = displayField
      ? String(option[displayField]).toLowerCase()
      : String(option).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="filterable-dropdown">
      {/* Campo de texto */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
      />

      {/* Dropdown */}
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(option); // Retorna o item selecionado
                  setSearchTerm(
                    displayField
                      ? String(option[displayField])
                      : String(option)
                  ); // Atualiza o campo de texto com o valor selecionado
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
