import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/layout/Table";
import "./index.css";
import Button from "../../components/layout/Miscellaneus/Buttons";
import PopupUpdate from "../../components/layout/Miscellaneus/PopupUpdate";
import PopupDelete from "../../components/layout/Miscellaneus/PopupDelete";
import patientService from "../../services/patientService";
import { useToast } from "../../contexts/ToastContext";

interface User {
    id: string;
    name: string;
    email: string;
}

const Patients: React.FC = () => {
    const {setToastMessage, setToastType} = useToast();
    const navigate = useNavigate();

    const columns = [
        { header: "Nome", accessor: "name" }
    ];

    const [data, setData] = useState<User[]>([]);
    useEffect(() => {
        fetchPatients();
    }, []);


    const fetchPatients = async () => {
        try {
            const users = await patientService.all();
            setData(users);
        } catch (error) {
            console.log(error);
        }
    }
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUpdate = (row: Record<string, any>) => {
        const user = row as User;
        setSelectedUser(user);
        setIsUpdating(true);
    };

    const handleDelete = (row: Record<string, any>) => {
        const user = row as User;
        setSelectedUser(user);
        setIsDeleting(true);
    };

    const handleUpdateName = async (userId: string, newName: string) => {
        setIsUpdating(true);
        try {
            await patientService.updatePatientName(userId, newName);

        } catch (error) {
            console.error('Erro ao atualizar o nome:', error);
        } finally {
            setIsUpdating(false);
            fetchPatients();
            setToastType('success');
            setToastMessage("Dados do paciente atualizados com sucesso!");
        }
    };

    const handleDeleteUser = async (userId: string) => {
        setIsDeleting(true);
        try {
            await patientService.deletePatient(userId);
        } catch (error) {
            console.error('Erro ao deletar o usuário:', error);
        } finally {
            setIsDeleting(false);
            fetchPatients();
            setToastType('success');
            setToastMessage("O paciente foi excluído!")
        }
    };

    return (
        <div className="Home">
            <Button onClick={() => navigate("/addPatients")} className="add">
                Adicionar Paciente
            </Button>

            {isUpdating && selectedUser && (
                <PopupUpdate
                    item={selectedUser}
                    title="Atualizar Paciente"
                    fields={[{ key: "name", label: "Nome do Paciente" }]}
                    onClose={() => setIsUpdating(false)}
                    onUpdate={(updatedUser) => {
                        handleUpdateName(selectedUser.id, updatedUser.name);
                    }}
                />
            )}
            {isDeleting && selectedUser && (
                <PopupDelete
                    userId={selectedUser.id}
                    userName={selectedUser.name}
                    onClose={() => setIsDeleting(false)}
                    onDelete={() => handleDeleteUser(selectedUser.id)}
                />
            )}
            <div className="table-container">
                <Table
                    columns={columns}
                    data={data}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default Patients;