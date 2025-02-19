import React, { ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
import Button from "../../components/layout/Miscellaneus/Buttons";
import './index.css';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoff = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div className="table-container settings-form">
      <div className="input-group">
          <label>Nova senha</label>
          <TextBox
              value={""}
              placeholder="Nova senha"
              onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
              />
      </div>

      <div className="button-group">
          <Button onClick={() => alert()} className="update">
              Atualizar
          </Button>
      </div>

      {/* <button onClick={handleLogoff}>Sair</button> */}
    </div>
  );
};

export default Settings;
