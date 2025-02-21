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
    const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [medications, setMedications] = useState<Medications[]>([]);
    const [selectedMedicine, setSelectedMedicine] = useState<Medications | null>(null);
    const [selectedPatients, setSelectedPatients] = useState<Patient | null>(null);

    useEffect(() => {
        fetchPatients();
        fetchMedicine();
    }, []);

    const fetchPatients = async () => {
        try {
            const patients = await patientService.all();
            setPatients(patients);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMedicine = async () => {
        try {
            const response = await medicineService.all();
            if (Array.isArray(response)) {
                const uniqueMedications = new Map();
                response.forEach((med) => {
                    if (!uniqueMedications.has(med.name)) {
                        uniqueMedications.set(med.name, { id: med.id, name: med.name });
                    }
                });
                setMedications(Array.from(uniqueMedications.values()));
            } else {
                console.error("Formato inesperado de dados:", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddMedicine = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const selectedWeekdayValue = formData.get("weekdays") as string;
        const selectedTime = formData.get("time") as string;
        const quantity = Number(formData.get("quantity"));

        if (!selectedWeekdayValue || !selectedTime || !selectedMedicine || !quantity) {
            alert("Preencha todos os campos!");
            return;
        }
        const isAlreadyAdded = dataMedicine.some(
            (med) => med.medicine === selectedMedicine.name
        );
    
        if (isAlreadyAdded) {
            const confirmAdd = window.confirm(
                `O medicamento "${selectedMedicine.name}" já foi adicionado. Deseja adicioná-lo novamente?`
            );
    
            if (!confirmAdd) {
                return; 
            }
        }

        const weekDaysMap: Record<string, string> = {
            "1": "Domingo",
            "2": "Segunda-Feira",
            "3": "Terça-Feira",
            "4": "Quarta-Feira",
            "5": "Quinta-Feira",
            "6": "Sexta-Feira",
            "7": "Sábado",
        };

        const newMedicine: Medicine = {
            id: Date.now(),
            weekdays: weekDaysMap[selectedWeekdayValue] || "Desconhecido",
            timeable: selectedTime,
            medicine: selectedMedicine.name,
            quantity: quantity
        };

        setDataMedicine((prevData) => [...prevData, newMedicine]);

        event.currentTarget.reset();

        setSelectedMedicine(null);
    };

    return (
        <>
            <form onSubmit={handleAddMedicine} className="table-container add-routine-form">
                <div className="input-group">
                    <label>Paciente</label>
                    <FilterableDropdown
                        options={patients}
                        onSelect={(p: Patient) => setSelectedPatients(p)}
                        placeholder="Pesquisar pacientes..."
                        displayField="name"
                        disabled={!!selectedPatients} 
                    />
                </div>

                <div className="input-group">
                    <label>Dia da semana</label>
                    <select name="weekdays">
                        <option value="1">Domingo</option>
                        <option value="2">Segunda-Feira</option>
                        <option value="3">Terça-Feira</option>
                        <option value="4">Quarta-Feira</option>
                        <option value="5">Quinta-Feira</option>
                        <option value="6">Sexta-Feira</option>
                        <option value="7">Sábado</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Horário</label>
                    <input type="time" name="time" />
                </div>

                <div className="input-group">
                    <label>Medicamento</label>
                    <FilterableDropdown
                        options={medications}
                        onSelect={(med: Medications) => setSelectedMedicine(med)}
                        placeholder="Pesquisar medicamentos..."
                        displayField="name"
                    />
                </div>

                <div className="input-group">
                    <label>Quantidade</label>
                    <input type="number" name="quantity" />
                </div>

                <div className="button-group">
                    <Button type="submit" className="add">Adicionar</Button>
                    <Button type="button" className="delete" onClick={() => setDataMedicine([])}>Limpar</Button>
                </div>
            </form>

            <div className="table-container">
                <Table
                    columns={[
                        { header: "Dia da semana", accessor: "weekdays" },
                        { header: "Horário", accessor: "timeable" },
                        { header: "Remédio", accessor: "medicine" },
                        { header: "Quantidade", accessor: "quantity" }
                    ]}
                    data={dataMedicine}
                    onDelete={(row) => setDataMedicine(dataMedicine.filter((item) => item.id !== row.id))}
                />
            </div>
            <Button type="submit" className="add">Adicionar</Button>
        </>
    );
};

export default AddRoutine;
