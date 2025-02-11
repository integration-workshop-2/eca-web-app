import React, { useState, useEffect } from "react";
import Button from "../../components/layout/Miscellaneus/Buttons";
import Table from "../../components/layout/Table";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MedicineService from "../../services/medicineService";
import PopupUpdate from "../../components/layout/Miscellaneus/PopupUpdate";
import PopupDelete from "../../components/layout/Miscellaneus/PopupDelete";
import routineService from "../../services/routineService";
import medicineService from "../../services/medicineService";
interface Medicine {
    id: string;
    name: string;
    cylinder_number: number;
}

interface Routine {
    id: number;
    patientName: string;
    routine: string[];
}

const Dispenser: React.FC = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/addroutine");
    };

    const columnsMedicine = [
        { header: "Remédio", accessor: "name" },
        { header: "Cilindro", accessor: "cylinder_number" }
    ];

    const columnsRoutine = [
        { header: "Paciente", accessor: "patientName" },
        { header: "Descrição da rotina", accessor: "routine" }
    ];

    const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
    const [dataRoutine, setDataRoutine] = useState<Routine[]>([]);
    useEffect(() => {
        fetchMedicine();
        fetchDataRoutine();
    }, []);

    const fetchMedicine = async () => {
        try {
            const medicineData = await MedicineService.all();

            setDataMedicine(medicineData);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    }

    const fetchDataRoutine = async () => {
        try {
            const routineData: Routine[] = await routineService.all();
            setDataRoutine(routineData);
        } catch (error) {
            console.error("Error fetching routines:", error);
        }
    }

    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

    const handleUpdateMedicine = async (medicine: Medicine) => {
        setIsUpdating(true);
        try {
            await medicineService.updateMedicine(medicine.id, medicine.name, medicine.cylinder_number);
        } catch (error) {
            console.error('Erro ao atualizar o nome:', error);
        } finally {
            setIsUpdating(false);
            fetchMedicine();
            alert("Dados do paciente atualizados com sucesso!");
        }
    };


    const handleDeleteMedicine = async (medicine: Medicine) => {
        setIsDeleting(true);
        try {
            await medicineService.deleteMedicine(medicine.id);
        } catch (error) {
            console.error('Erro ao deletar o usuário:', error);
        } finally {
            setIsDeleting(false);
            fetchMedicine();
            alert("O medicamento foi excluído!")
        }
    };

    const handleUpdatePatient = (row: Record<string, any>) => {
        const user = row as Routine;
        //setSelectedRoutine(user);
        //setIsUpdating(true);
    };

    const handleDeletePatient = (row: Record<string, any>) => {
        const user = row as Routine;
        // setSelectedRoutine(user);
        //setIsDeleting(true);

    };

    return (
        <>
            <Button onClick={() => handleNavigate()} className="add">
                Adicionar Remédio
            </Button>
            <Button onClick={() => handleNavigate()} className="add">
                Adicionar Rotina
            </Button>



            <div className="table-container">
                <Table
                    columns={columnsMedicine}
                    data={dataMedicine}
                    onUpdate={(row) => {
                        const medicine = row as Medicine;
                        setSelectedMedicine(medicine);
                        setIsUpdating(true);
                    }}

                    onDelete={() => {
                        if(selectedMedicine)
                        handleDeleteMedicine(selectedMedicine)
                    }}
                />
            </div>

            <div className="table-container">
                <Table
                    columns={columnsRoutine}
                    data={dataRoutine}
                    onUpdate={handleUpdatePatient}
                    onDelete={handleDeletePatient}
                />
            </div>
            {isUpdating && selectedMedicine && (
                <PopupUpdate
                    item={selectedMedicine as Medicine}
                    title="Editar medicamento"
                    image="logo192.png"
                    fields={[
                        { key: "name", label: "Nome", type: "text" },
                        { key: "cylinder_number", label: "Cilindro", type: "select", options: ["1", "2", "3"] }
                    ]}
                    onClose={() => setIsUpdating(false)}
                    onUpdate={(updatedItem) => {
                        if (selectedMedicine)
                            handleUpdateMedicine({
                                id: selectedMedicine.id,
                                name: updatedItem.name,
                                cylinder_number: updatedItem.cylinder_number,
                            });
                    }}

                />
            )}


        </>
    );
};

export default Dispenser;