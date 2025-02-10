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
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/patients"
                            aria-label="Pacientes"
                            onClick={() => setIsOpen(false)}
                        >
                            Pacientes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dispenser"
                            aria-label="Dispenser"
                            onClick={() => setIsOpen(false)}
                        >
                            Dispenser
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            aria-label="Configurações"
                            onClick={() => setIsOpen(false)}
                        >
                            Configurações
                        </Link>
                    </li>
                </ul>
            </nav>

            {localStorage.getItem("authPassword") && (
                <li>
                    <Link
                        to="" 
                        aria-label="Sair"
                        onClick={isLogout} 
                    >
                        Sair
                    </Link>
                </li>
            )}

            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span className="material-icons">menu</span>
            </button>
        </aside>
    );
}