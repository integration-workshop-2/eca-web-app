import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const isLogout = () => {
        localStorage.removeItem("authPassword");
        navigate('/'); 
    };

    return (
        <aside className={`Menu ${isOpen ? "open" : ""}`}>

            <nav>
                <ul>
                    <li>
                        <Link
                            to="/"
                            aria-label="Home"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="material-icons">home</span>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/patients"
                            aria-label="Pacientes"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="material-icons">groups</span>
                            Pacientes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dispenser"
                            aria-label="Dispenser"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="material-icons">medication</span>
                            Dispenser
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            aria-label="Configurações"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="material-icons">settings</span>
                            Configurações
                        </Link>
                    </li>
                    {localStorage.getItem("authPassword") && (
                        <li className="logout-btn">
                            <Link
                                to="" 
                                aria-label="Sair"
                                onClick={isLogout}
                            >
                                <span className="material-icons">exit_to_app</span>
                                Sair
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span className="material-icons">menu</span>
            </button>
        </aside>
    );
}