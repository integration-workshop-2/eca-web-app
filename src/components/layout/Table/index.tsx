import React, { useState } from "react";
import "./index.css";
import Button from "../Miscellaneus/Buttons";

interface Column {
    header: string;
    accessor: string;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    onUpdate?: (row: Record<string, any>) => void;
    onDelete?: (row: Record<string, any>) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onUpdate, onDelete }) => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const handleFilterChange = (accessor: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [accessor]: value,
        }));
    };

    const filteredData = data.filter((row) =>
        columns.every((column) => {
            const filterValue = filters[column.accessor]?.toLowerCase();
            if (!filterValue) return true; 
            return String(row[column.accessor]).toLowerCase().includes(filterValue);
        })
    );

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                    <th className="buttonoptions">Ações</th>
                </tr>
                {/* Linha de filtro */}
                <tr>
                    {columns.map((column, index) => (
                        <td key={index}>
                            <input
                                type="text"
                                placeholder={`Filtrar ${column.header}`}
                                value={filters[column.accessor] || ""}
                                onChange={(e) =>
                                    handleFilterChange(column.accessor, e.target.value)
                                }
                            />
                        </td>
                    ))}
                    <td className="buttonoptions"></td> 
                </tr>
            </thead>
            <tbody>
                {filteredData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column.accessor]}</td>
                        ))}
                        <td className="buttonoptions">
                        {onUpdate && (
                            <Button onClick={() => onUpdate(row)} className="update">
                                Atualizar
                            </Button>
                        )}
                         {onDelete && (
                            <Button onClick={() => onDelete(row)} className="delete">
                                Deletar
                            </Button>
                         )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;