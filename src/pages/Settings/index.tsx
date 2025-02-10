import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoff = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <button onClick={handleLogoff}>Sair</button>
  );
};

export default Settings;
