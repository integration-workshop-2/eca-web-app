import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Miscellaneus/Buttons";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
import Dropdown from "../../components/layout/Miscellaneus/Dropdown";
import "./index.css";
import medicineService from "../../services/medicineService";
import { useToast } from "../../contexts/ToastContext";

export default function AddMedicine() {
    const {setToastMessage, setToastType} = useToast();

    const [name, setName] = useState("");
    const [cylinders, setCylinders] = useState<{ id: number; label: string }[]>([]);
    const [selectedCylinder, setSelectedCylinder] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableCylinders = async () => {
            try {
                const response = await medicineService.listAvailableCylinders();
                console.log(response);
                const availableCylinders = response.available_cylinders;

                setCylinders(availableCylinders.map((cyl: number) => ({ id: cyl, label: `Cilindro ${cyl}` })));
            } catch (error) {
                console.error("Erro ao listar cilindros disponíveis:", error);
            }
        };

        fetchAvailableCylinders();
    }, []);

    const handleCreateMedicine = async () => {
        if (!name || selectedCylinder === null) {
            setToastType('warning');
            setToastMessage("Por favor, preencha todos os campos.");
            return;
        }
        if (selectedCylinder === 0) {
            setToastType('warning');
            setToastMessage("Por favor, selecione um cilindro.");
            return;
        }

        try {
            await medicineService.createMedicine(name, selectedCylinder);
            
            setToastType('success');
            setToastMessage("Dados criados com sucesso!");
            navigate("/dispenser");
        } catch (error) {
            console.error("Erro ao criar medicamento:", error);
        }
    };

    return (
        <div className="table-container">
            <div className="addMedicineForm">
                <div className="inputs">
                    <div className="input-group">
                        <label>Nome</label>
                        <TextBox
                            value={name}
                            placeholder="Nome do remédio"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Cilindro</label>
                        <select
                            value={selectedCylinder}
                            onChange={(e) => setSelectedCylinder(Number(e.target.value))}
                        >
                            <option value={0}>Selecione o cilindro</option>
                            {cylinders.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                { (selectedCylinder == 0 && cylinders.length == 3) && (
                    <img src={`cylinders/vago.png`} height="200px" />
                ) }
                { (selectedCylinder == 0 && cylinders.length == 0) && (
                    <img src={`cylinders/vazio.png`} height="200px" />
                ) }
                { (selectedCylinder > 0 ) && (
                    <img src={`cylinders/cylinder-${selectedCylinder}.png`} height="200px" />
                ) }

                <div className="button-group">
                    <Button onClick={handleCreateMedicine} className="update">
                        Adicionar Remédio
                    </Button>

                    <Button onClick={() => navigate("/dispenser")} className="delete">
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}
