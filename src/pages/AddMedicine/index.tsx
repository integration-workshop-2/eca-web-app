import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Miscellaneus/Buttons";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
import Dropdown from "../../components/layout/Miscellaneus/Dropdown";
import "./index.css";
import medicineService from "../../services/medicineService";

export default function AddMedicine() {
    const [name, setName] = useState("");
    const [cylinders, setCylinders] = useState<{ id: number; label: string }[]>([]);
    const [selectedCylinder, setSelectedCylinder] = useState<number | null>(null);
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
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            await medicineService.createMedicine(name, selectedCylinder);
            alert("Dados criados com sucesso!");
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
                        <Dropdown
                            options={cylinders}
                            onSelect={(item) => setSelectedCylinder(item.id)}
                            placeholder="Selecione um cilindro"
                            displayField="label"
                        />
                    </div>
                </div>

                <img src="logo512.png" height={250} width={250} />

                <div className="button-group">
                    <Button onClick={handleCreateMedicine} className="create">
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
