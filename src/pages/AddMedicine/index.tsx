import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layout/Miscellaneus/Buttons";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
// import { Label } from "recharts";
import "./index.css";

export default function AddMedicine() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleCreateMedicine = async (name: string) => {

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
                        <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                        </select>
                    </div>
                </div>

                <img src="logo512.png" height={250} width={250}/>

                <div className="button-group">
                    <Button onClick={() => handleCreateMedicine(name)} className="update">
                        Adicionar Remédio
                    </Button>

                    <Button onClick={() => navigate('/dispenser')} className="delete">
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}