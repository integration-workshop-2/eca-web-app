import React, { useState, ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Miscellaneus/Buttons";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
import patientService from "../../services/patientService";
import './index.css';
import { useToast } from "../../contexts/ToastContext";

export default function AddPatient() {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { setToastMessage, setToastType } = useToast();

    const handleCreatePatient = useCallback(async (name: string) => {
        setLoading(true);
        try {
            await patientService.createPatient(name);
            setToastType('success');
            setToastMessage("Dados criados com sucesso!");
            navigate('/patients');
        } catch (error) {
            console.error('Erro ao adicionar paciente:', error);
        } finally {
            setLoading(false);
        }
    }, [navigate, setToastMessage]);

    const captureImage = async () => {
        try {
            const users = await patientService.captureImage();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="table-container add-patient-form">
            <div className="input-group">
                <label>Nome</label>
                <TextBox
                    value={text}
                    placeholder="Nome do paciente"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                />
            </div>
            <div>
                <img id="stream" src="http://10.42.0.2:81/stream" alt="Video Stream" />
            </div>
            <div>

                <Button onClick={() => captureImage()} className="update">
                    Salvar foto
                </Button>
            </div>

            <div className="button-group">



                <Button
                    onClick={() => handleCreatePatient(text)}
                    className="update"
                    disabled={loading}
                >
                    {loading ? "Carregando..." : "Adicionar Paciente"}
                </Button>

                <Button onClick={() => navigate('/patients')} className="delete">
                    Cancelar
                </Button>
            </div>
        </div>
    );
}