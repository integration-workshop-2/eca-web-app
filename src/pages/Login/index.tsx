import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isAuthenticated = await login (password);
    if (isAuthenticated) {
      navigate("/");
    } else {
      alert("Senha incorreta!");
    }
  };
  return (
    <div className="table-container login-form">
      <span>Login</span>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button type="submit" className="button update">Entrar</button>
      </form>
    </div>
  );
}
