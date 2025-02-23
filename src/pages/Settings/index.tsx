import React, { ChangeEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextBox from "../../components/layout/Miscellaneus/TextBox";
import Button from "../../components/layout/Miscellaneus/Buttons";
import './index.css';
import loginService from "../../services/loginService";
import { useToast } from "../../contexts/ToastContext";

const Settings: React.FC = () => {
  const {setToastMessage, setToastType} = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoff = () => {
    logout(); 
    navigate("/login"); 
  };

  const [newPassword, setNewPassword] = useState('');
  const handlePasswordUpdate = () => {
    if(newPassword.length == 0){
      setToastType('warning');
      setToastMessage('Digite sua nova senha!');
      return;
    }

    try {
      loginService.updatePassword(newPassword);
      
      setToastType('success');
      setToastMessage("Senha atualizada com sucesso");
      navigate("/");
    } catch (error) {
      setToastType('error');
      setToastMessage("Ocorreu um erro ao atualizar a senha!");
    }
        
  };

  return (
    <div className="table-container settings-form">
      <div className="input-group">
          <label>Nova senha</label>
          <TextBox
              value={newPassword}
              placeholder="Nova senha"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              />
      </div>

      <div className="button-group">
          <Button onClick={handlePasswordUpdate} className="update">
              Atualizar
          </Button>
      </div>
    </div>
  );
};

export default Settings;
