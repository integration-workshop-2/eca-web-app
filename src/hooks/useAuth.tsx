import { useState } from "react";
import loginService from "../services/loginService";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Verifica no localStorage se a senha está armazenada
    const storedPassword = localStorage.getItem("authPassword");
    return storedPassword !== null;
  });

  const login = async (password: string) => {

    const result = await loginService.login(password);

    if (result?.success) {
      localStorage.setItem("authPassword", password); 
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authPassword");
    setIsAuthenticated(false); 
  };

  return { isAuthenticated, login, logout };
}
