import React, { useState, useEffect } from "react";
import Button from "../../components/layout/Miscellaneus/Buttons";
import Table from "../../components/layout/Table";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MedicineService from "../../services/medicineService";
import PopupUpdate from "../../components/layout/Miscellaneus/PopupUpdate";

interface Medicine {
    id: string;
    name: string;
    cylinder_number: number;
}

interface FormattedMedicine {
    id: string;
    medicine: string;
    cylinder: string;
}

interface Routine {
    id: number;
    patientName: string;
    routine: string[];
}

const Dispenser: React.FC = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/addroutine");
    };

    const columnsMedicine = [
        { header: "Remédio", accessor: "medicine" },
        { header: "Cilindro", accessor: "cylinder" }
    ];

    const columnsRoutine = [
        { header: "Paciente", accessor: "patientName" },
        { header: "Descrição da rotina", accessor: "routine" }
    ];

    const [dataMedicine, setDataMedicine] = useState<FormattedMedicine[]>([]);
    useEffect(() => {
        async function fetchMedicine() {
            try {
                const medicineData: Medicine[] = await MedicineService.all();
                const formattedMedicine: FormattedMedicine[] = medicineData.map((item) => ({
                    id: item.id,
                    medicine: item.name, 
                    cylinder: item.cylinder_number.toString(),
                }));
                setDataMedicine(formattedMedicine);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMedicine();
    }, []);
    


    const [dataRoutine, setDataRoutine] = useState<Routine[]>([
        { id: 1, patientName: "Lucas Marques", routine: ["Seg 13:00 Paracetamol 1 comp.", "Ter 15:00 Codeína 2 comps."] },
        { id: 2, patientName: "João Henrique Soares", routine: ["Qua 13:00 Paracetamol 1 comp.", "Qui 15:00 Codeína 2 comps."] },
    ]);

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [selectedMedicine, setSelectedMedicine] = useState<FormattedMedicine | null>(null);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

    const handleUpdateMedicine = (row: Record<string, any>) => {
        const medicine = row as FormattedMedicine;
        setSelectedMedicine(medicine);
        setIsUpdating(true);
    };
    
    const handleDeleteMedicine = (row: Record<string, any>) => {
        const medicine = row as FormattedMedicine;
        setSelectedMedicine(medicine);
        setIsDeleting(true);

    };

    const handleUpdatePatient = (row: Record<string, any>) => {
        const user = row as Routine;
        setSelectedRoutine(user);
        setIsUpdating(true);
    };

    const handleDeletePatient = (row: Record<string, any>) => {
        const user = row as Routine;
        setSelectedRoutine(user);
        setIsDeleting(true);

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
                    onUpdate={handleUpdateMedicine}
                    onDelete={handleDeleteMedicine}
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

        </>
    );
};

export default Dispenser;