import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Miscellaneus/Buttons";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
import patientService from "../../services/patientService";

export default function AddPatient() {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleCreatePatient = async (name: string) => {

        try {
            await patientService.createPatient(name);

        } catch (error) {
            console.error('Erro ao atualizar o nome:', error);
        } finally {
            alert("Dados criados com sucesso!");
            navigate('/patients')
        }
    };


    return (
        <>
            <TextBox
                value={text}
                placeholder="Nome do paciente"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />

            <Button onClick={() => handleCreatePatient(text)} className="update">
                Adicionar Paciente
            </Button>

            <Button onClick={() => navigate('/patients')} className="delete">
                Cancelar
            </Button>

        </>
    );
}