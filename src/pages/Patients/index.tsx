import React, { useEffect, useState } from "react";
import Table from "../../components/layout/Table";
import "./index.css";
import Button from "../../components/layout/Miscellaneus/Buttons";
import PopupUpdate from "../../components/layout/Miscellaneus/PopupUpdate";
import PopupDelete from "../../components/layout/Miscellaneus/PopupDelete";
import userService from "../../services/userService";

interface User {
    id: string;
    name: string;
    email: string;
}

const Patients: React.FC = () => {
    const columns = [
        { header: "Nome", accessor: "name" }
    ];

    const [data, setData] = useState<User[]>([]);
    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await userService.all();
                setData(users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, []);
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
            await userService.updatePatientName(userId, newName);

        } catch (error) {
            console.error('Erro ao atualizar o nome:', error);
        } finally {
            alert("Dados do paciente atualizados com sucesso!");
            setIsUpdating(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        setIsUpdating(true);  
        try {
            await userService.deletePatient(userId);  
        } catch (error) {
            console.error('Erro ao deletar o usuário:', error);  
        } finally {
            alert("O paciente foi excluído!")
            setIsUpdating(false);  
        }
    };
    
    return (
        <div className="Home">
            <Button onClick={() => setIsUpdating(true)} className="add">
                Adicionar Paciente
            </Button>

            {isUpdating && selectedUser && (
                <PopupUpdate
                    item={selectedUser} 
                    title="Atualizar Paciente"
                    fields={[{ key: "name", label: "Nome do Paciente" }]} 
                    onClose={() => setIsUpdating(false)}
                    onUpdate={(updatedUser) => {
                        console.log("Atualizar paciente:", updatedUser);
                        //handleUpdateName(updatedUser);
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