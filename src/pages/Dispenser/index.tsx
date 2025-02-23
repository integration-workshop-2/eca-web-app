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
import { useToast } from "../../contexts/ToastContext";
interface Medicine {
    id: string;
    name: string;
    cylinder_number: number;
}

interface Routine {
    routine_id: string;
    patient_id: string;
    patient_name: string;
    routine_descriptions: string[];
}

const Dispenser: React.FC = () => {
    const navigate = useNavigate();
    const { setToastMessage, setToastType } = useToast();

    const [isUpdatingMedicine, setisUpdatingMedicine] = useState<boolean>(false);
    const [isDeletingMedicine, setisDeletingMedicine] = useState<boolean>(false);
    const [cylindersImage, setCylindersImage] = useState<string | undefined>();

    const [isUpdatingRoutine, setisUpdatingRoutine] = useState<boolean>(false);
    const [isDeletingRoutine, setisDeletingRoutine] = useState<boolean>(false);

    const handleNavigateToAddRoutine = () => {
        navigate("/addroutine");
    };

    const handleNavigateToAddMedicine = () => {
        navigate("/addmedicine");
    };
    const columnsMedicine = [
        { header: "Remédio", accessor: "name" },
        { header: "Cilindro", accessor: "cylinder_number" }
    ];

    const renderRoutineDescriptions = (value: string[]) => (
        <div className="break-lines">
            {value.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );

    const columnsRoutine = [
        { header: "Paciente", accessor: "patient_name" },
        { 
            header: "Descrição da rotina", 
            accessor: "routine_descriptions", 
            cellRenderer: renderRoutineDescriptions 
        }
    ];

    const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
    const [dataRoutine, setDataRoutine] = useState<Routine[]>([]);
    const [availableCylinders, setAvailableCylinders] = useState<string[]>([]);
    useEffect(() => {
        fetchMedicine();
        fetchDataRoutine();
        fetchAvailableCylinders();
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

    const fetchAvailableCylinders = async () => {
        try {
            const response = await medicineService.listAvailableCylinders();
            const availableCylinders = response.available_cylinders;
            setAvailableCylinders(availableCylinders.map((cyl: number) => cyl.toString()));
        } catch (error) {
            console.error("Erro ao listar cilindros disponíveis:", error);
        }
    };

    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

    const handleUpdateMedicine = async (medicine: Medicine) => {
        try {
            await medicineService.updateMedicine(medicine.id, medicine.name, medicine.cylinder_number);
        } catch (error) {
            console.error('Erro ao atualizar o medicamento:', error);
        } finally {
            setisUpdatingMedicine(false);
            fetchMedicine();
            setToastType('success');
            setToastMessage("Dados do medicamento atualizados com sucesso!");
        }
    };

    const handleDeleteMedicine = async (medicine: Medicine) => {
        try {
            await medicineService.deleteMedicine(medicine.id);
        } catch (error) {
            console.error('Erro ao deletar o medicamento:', error);
        } finally {
            setisDeletingMedicine(false);
            fetchMedicine();
            setToastType('success');
            setToastMessage("O medicamento foi excluído!");
        }
    };

    const handleUpdateRoutine = (row: Record<string, any>) => {
        const routine = row as Routine;
        //setSelectedRoutine(user);
        //setIsUpdating(true);
    };

    const handleDeleteRoutine = async (r: Routine) => {
        try {
            await routineService.deleteRoutine(r.routine_id);
        } catch (error) {
            console.error('Erro ao deletar rotina:', error);
        } finally {
            setisDeletingRoutine(false);
            fetchDataRoutine();
            setToastType('success');
            setToastMessage("A rotina foi excluída!");
        }
    };

    const handleChangeImage = (m: Medicine) => {
        if(m.cylinder_number == 0 && availableCylinders.length == 3)
            setCylindersImage('cylinders/vago.png');
        if (m.cylinder_number == 0 && availableCylinders.length == 0)
            setCylindersImage('cylinders/vazio.png');
        if (m.cylinder_number > 0 )
            setCylindersImage(`cylinders/cylinder-${m.cylinder_number}.png`);
        else
            setCylindersImage('');
    };

    return (
        <div id="dispenser-screen">
            <Button onClick={() => handleNavigateToAddMedicine()} className="add">
                Adicionar Remédio
            </Button>
            <Button onClick={() => handleNavigateToAddRoutine()} className="add">
                Adicionar Rotina
            </Button>

            <div className="table-container">
                <span className="title">Medicamentos</span>
                <Table
                    columns={columnsMedicine}
                    data={dataMedicine}
                    onUpdate={(row) => {
                        const medicine = row as Medicine;
                        setSelectedMedicine(medicine);
                        fetchAvailableCylinders();
                        setisUpdatingMedicine(true);
                        handleChangeImage(medicine);
                    }}
                    onDelete={(row) => {
                        const med = row as Medicine;
                        setSelectedMedicine(med);
                        setisDeletingMedicine(true);
                    }}
                />
            </div>

            <div className="table-container">
                <span className="title">Rotinas</span>
                <Table
                    columns={columnsRoutine}
                    data={dataRoutine}
                    onUpdate={(row) => {
                        const routine = row as Routine;
                        setSelectedRoutine(routine);
                        setisUpdatingRoutine(true);
                    }}
                    onDelete={(row) => {
                        const routine = row as Routine;
                        setSelectedRoutine(routine);
                        setisDeletingRoutine(true);
                    }}
                />
            </div>

            {isUpdatingMedicine && selectedMedicine && (
                <PopupUpdate
                    item={selectedMedicine as Medicine}
                    title="Editar medicamento"
                    image={cylindersImage}
                    changeImage={handleChangeImage}
                    fields={[
                        { key: "name", label: "Nome", type: "text" },
                        { key: "cylinder_number", label: "Cilindro", type: "select", options: availableCylinders }
                    ]}
                    onClose={() => {
                        setisUpdatingMedicine(false);
                        setCylindersImage('');
                    }}
                    onUpdate={(updatedItem) => {
                        if (selectedMedicine) {
                            if (updatedItem.cylinder_number === 0) {
                                setToastType('warning');
                                setToastMessage("Selecione um cilindro válido!");
                                return;
                            }

                            handleUpdateMedicine({
                                id: selectedMedicine.id,
                                name: updatedItem.name,
                                cylinder_number: updatedItem.cylinder_number,
                            });
                        }
                    }}

                />
            )}

            {isDeletingMedicine && selectedMedicine && (
                <PopupDelete
                    userId={selectedMedicine.id}
                    userName={selectedMedicine.name}
                    onClose={() => setisDeletingMedicine(false)}
                    onDelete={() => handleDeleteMedicine(selectedMedicine)}
                />
            )}
{/*             
            {isUpdatingRoutine && selectedRoutine && (
                <PopupUpdate
                    item={selectedMedicine as Medicine}
                    title="Editar medicamento"
                    image={cylindersImage}
                    changeImage={handleChangeImage}
                    fields={[
                        { key: "name", label: "Nome", type: "text" },
                        { key: "cylinder_number", label: "Cilindro", type: "select", options: availableCylinders }
                    ]}
                    onClose={() => {
                        setisUpdatingMedicine(false);
                        setCylindersImage('');
                    }}
                    onUpdate={(updatedItem) => {
                        if (selectedMedicine) {
                            if (updatedItem.cylinder_number === 0) {
                                setToastType('warning');
                                setToastMessage("Selecione um cilindro válido!");
                                return;
                            }

                            handleUpdateMedicine({
                                id: selectedMedicine.id,
                                name: updatedItem.name,
                                cylinder_number: updatedItem.cylinder_number,
                            });
                        }
                    }}

                />
            )} */}

            {isDeletingRoutine && selectedRoutine && (
                <PopupDelete
                    userId={selectedRoutine.routine_id}
                    userName={`rotina de ${selectedRoutine.patient_name}`}
                    onClose={() => setisDeletingRoutine(false)}
                    onDelete={() => handleDeleteRoutine(selectedRoutine)}
                />
            )}

        </div>
    );
};

export default Dispenser;