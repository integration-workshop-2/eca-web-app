import React, { useState } from "react";
import "./index.css";
import Button from "../Miscellaneus/Buttons";

interface Column {
    header: string;
    accessor: string;
}

interface TableHomeProps {
    columns: Column[];
    data: Record<string, any>[];
}

const TableHome: React.FC<TableHomeProps> = ({ columns, data }) => {
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
                </tr>
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
                </tr>
            </thead>
            <tbody>
                {filteredData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableHome;