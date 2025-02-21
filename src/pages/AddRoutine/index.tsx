import React, { useEffect, useState } from "react";
import FilterableDropdown from "../../components/layout/Miscellaneus/FilterableDropdown";
import Table from "../../components/layout/Table";
import Button from "../../components/layout/Miscellaneus/Buttons";
import patientService from "../../services/patientService";
import "./index.css";
import medicineService from "../../services/medicineService";

interface Medicine {
    id: number;
    weekdays: string;
    timeable: string;
    medicine: string;
    quantity: number;
}
interface Medications {
    id: number;
    name: string;
}
interface Patient {
    id: string;
    name: string;
}

const AddRoutine: React.FC = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [listRoutine, setListRoutine] = useState([]);

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


    const handleSelect = (item: { id: number; name: string }) => {
        console.log("Item selecionado:", item);
    };
    
    useEffect(() => {
        fetchPatients();
        fetchMedicine();
    }, []);

    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient>();
    const [medications, setMedications] = useState<{ id: number; name: string; }[]>([]);

    const fetchPatients = async () => {
        try {
            const patients = await patientService.all();
            setPatients(patients);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMedicine = async () => {
        try {
            const response = await medicineService.all();
            if (Array.isArray(response)) {
                const uniqueMedications = new Map();
                response.forEach((med) => {
                    if(!uniqueMedications.has(med.name)){
                        uniqueMedications.set(med.name, {id: med.id, name: med.name})
                    }
                });
                setMedications(Array.from(uniqueMedications.values()));
            } else {
                console.error("Formato inesperado de dados:", response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="table-container add-routine-form">
                <div className="input-group">
                    <label>Paciente</label>
                    <FilterableDropdown
                        options={patients}
                        onSelect={ (p: Patient) => { setSelectedPatient(p) } }
                        placeholder="Pesquisar pacientes..."
                        displayField="name" 
                    />
                </div>

                <div className="input-group">
                    <label>Dia da semana</label>
                    <select>
                        <option value={1}>Domingo</option>
                        <option value={2}>Segunda-Feira</option>
                        <option value={3}>Terça-Feira</option>
                        <option value={4}>Quarta-Feira</option>
                        <option value={5}>Quinta-Feira</option>
                        <option value={6}>Sexta-Feira</option>
                        <option value={7}>Sábado</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Horário</label>
                    <input type="time"/>
                </div>

                <div className="input-group">
                    <label>Medicamento</label>
                    <FilterableDropdown
                        options={medications || []}
                        onSelect={handleSelect}
                        placeholder="Pesquisar medicamentos..."
                        displayField="name" 
                    />
                </div>

                <div className="input-group">
                    <label>Quantidade</label>
                    <input type="number"/>
                </div>

                <div className="button-group">
                    <Button className="add">Adicionar</Button>
                    <Button className="delete">Limpar</Button>
                </div>
            </div>

            <div className="table-container">
                <Table
                    columns={columnsMedicine}
                    data={dataMedicine}
                    onDelete={handleDeleteMedicine}
                />
                
            </div>
            <Button className="add">Adicionar</Button>
          
        </>
    );
};

export default AddRoutine;
