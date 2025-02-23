import React, { useEffect, useState } from "react";
import FilterableDropdown from "../../components/layout/Miscellaneus/FilterableDropdown";
import Table from "../../components/layout/Table";
import Button from "../../components/layout/Miscellaneus/Buttons";
import patientService from "../../services/patientService";
import "./index.css";
import medicineService from "../../services/medicineService";
import { useToast } from "../../contexts/ToastContext";
import routineService from "../../services/routineService";
import { useNavigate } from "react-router-dom";

interface Medicine {
    medicine_id: string;
    medicine_name: string;
    week_day: string;
    day_time: string;
    medicine_quantity: number;
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
    const { setToastMessage, setToastType } = useToast();
    const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [medications, setMedications] = useState<Medications[]>([]);
    const [selectedMedicine, setSelectedMedicine] = useState<Medications | null>(null);
    const [selectedPatients, setSelectedPatients] = useState<Patient | null>(null);
    const navigate = useNavigate();
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

        if (!selectedPatients) {
            setToastType("warning");
            setToastMessage("Selecione um paciente antes de cadastrar a rotina!");
            return;
        }

        if (!selectedWeekdayValue || !selectedTime || !selectedMedicine || !quantity) {
            setToastType('warning');
            setToastMessage("Preencha todos os campos!");
            return;
        }

        if (!selectedMedicine) {
            setToastType('warning');
            setToastMessage("Selecione um medicamento antes de continuar!");
            return;
        }

        const isAlreadyAdded = dataMedicine.some((med) => med.medicine_name === selectedMedicine.name);

        if (isAlreadyAdded) {
            const confirmAdd = window.confirm(
                `O medicamento "${selectedMedicine.name}" já foi adicionado. Deseja adicioná-lo novamente?`
            );

            if (!confirmAdd) return;
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

        const weekDaysMapEnglish: Record<string, string> = {
            "Domingo": "Sunday",
            "Segunda-Feira": "Monday",
            "Terça-Feira": "Tuesday",
            "Quarta-Feira": "Wednesday",
            "Quinta-Feira": "Thursday",
            "Sexta-Feira": "Friday",
            "Sábado": "Saturday",
        };

        const newMedicine: Medicine = {
            medicine_id: String(medications.find(m => m.name === selectedMedicine.name)?.id || ""),
            week_day: weekDaysMap[selectedWeekdayValue] || "",
            day_time: selectedTime,
            medicine_name: selectedMedicine.name,
            medicine_quantity: quantity
        };

        setDataMedicine((prevData) => [...prevData, newMedicine]);

        event.currentTarget.reset();
        setSelectedMedicine(null);
    };

    const saveRoutine = async () => {
        if (!selectedPatients) {
            setToastType("warning");
            setToastMessage("Selecione um paciente antes de salvar a rotina!");
            return;
        }

        if (dataMedicine.length === 0) {
            setToastType("warning");
            setToastMessage("Adicione pelo menos um medicamento antes de salvar a rotina!");
            return;
        }

        const weekDaysMapEnglish: Record<string, string> = {
            "Domingo": "Sunday",
            "Segunda-Feira": "Monday",
            "Terça-Feira": "Tuesday",
            "Quarta-Feira": "Wednesday",
            "Quinta-Feira": "Thursday",
            "Sexta-Feira": "Friday",
            "Sábado": "Saturday",
        };

        const requestBody = {
            patient_id: selectedPatients.id,
            routine_items_list: dataMedicine.map((med) => ({
                medicine_id: medications.find((m) => m.name === med.medicine_name)?.id,
                medicine_quantity: med.medicine_quantity,
                week_day: weekDaysMapEnglish[med.week_day] || "Unknown",
                day_time: med.day_time,
            })),
        };

        try {
            const result = await routineService.createRoutine(requestBody);
            setToastType('success');
            setToastMessage("Rotina cadastrada com sucesso!");
            navigate('/dispenser');

        } catch (error) {
            setToastType('error');
            setToastMessage("Ocorreu um erro ao cadastrar a rotina!");

        }
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
                    <Button type="submit" className="add">Adicionar item</Button>
                </div>
            </form>

            <div className="table-container">
                <Table
                    columns={[
                        { header: "Dia da semana", accessor: "week_day" },
                        { header: "Horário", accessor: "day_time" },
                        { header: "Remédio", accessor: "medicine_name" },
                        { header: "Quantidade", accessor: "medicine_quantity" }
                    ]}
                    data={dataMedicine}
                    onDelete={(row) => setDataMedicine(dataMedicine.filter((item) => item.medicine_id !== row.medicine_id))}
                />
            </div>
            <Button type="button" className="add" onClick={saveRoutine}>Salvar Rotina</Button>
        </>
    );
};

export default AddRoutine;