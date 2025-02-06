import React, { useState } from "react";
import FilterableDropdown from "../../components/layout/Miscellaneus/FilterableDropdown";
import "./index.css";
import Table from "../../components/layout/Table";

interface Medicine {
    id: number;
    weekdays: string;
    timeable: string;
    medicine: string;
    quantity: number;
}

const AddRoutine: React.FC = () => {


    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const columnsMedicine = [
        { header: "Dia da semana", accessor: "weekdays" },
        { header: "Horário", accessor: "timetable" },
        { header: "Remédio", accessor: "medicine" },
        { header: "Quantidade", accessor: "quantity" }
    ];


    const [dataMedicine, setDataMedicine] = useState<Medicine[]>([
        { id: 1, weekdays: "Paracetamol", timeable: "1", medicine: "Paracetamol", quantity: 10 }
    ]);


    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

    const handleUpdateMedicine = (row: Record<string, any>) => {
        const user = row as Medicine;
        setSelectedMedicine(user);
        setIsUpdating(true);
    };

    const handleDeleteMedicine = (row: Record<string, any>) => {
        const user = row as Medicine;
        setSelectedMedicine(user);
        setIsDeleting(true);

    };

    const medications = [
        { id: 1, name: "Paracetamol" },
        { id: 2, name: "Ibuprofeno" },
        { id: 3, name: "Amoxicilina" },
        { id: 4, name: "Dipirona" },
        { id: 5, name: "Ranitidina" },
    ];

    const handleSelect = (item: { id: number; name: string }) => {
        console.log("Item selecionado:", item);
    };

    return (
        <>
            <div className="table-container">
                <p>Pacientes</p>
                <FilterableDropdown
                    options={medications}
                    onSelect={handleSelect}
                    placeholder="Pesquisar pacientes..."
                    displayField="name" 
                />
                <p>Dias da semana</p>
                <FilterableDropdown
                    options={medications}
                    onSelect={handleSelect}
                    placeholder="Pesquisar dias da semana..."
                    displayField="name" 
                />
                <p>Medicamentos</p>
                <FilterableDropdown
                    options={medications}
                    onSelect={handleSelect}
                    placeholder="Pesquisar medicamentos..."
                    displayField="name" 
                />
            </div>
            <div className="table-container">

            </div>

            <div className="table-container">
                <Table
                    columns={columnsMedicine}
                    data={dataMedicine}
                    onUpdate={handleUpdateMedicine}
                    onDelete={handleDeleteMedicine}
                />
            </div>
        </>
    );
};

export default AddRoutine;
