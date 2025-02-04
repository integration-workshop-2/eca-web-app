import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "../../../pages/Home";
import Patients from "../../../pages/Patients";
import Dispenser from "../../../pages/Dispenser";
import AddRoutine from "../../../pages/AddRoutine";
import Settings from "../../../pages/Settings";

const Content: React.FC = () => {
    return (
        <main className="Content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/dispenser" element={<Dispenser />} />
                <Route path="/addroutine" element={<AddRoutine />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </main>
    );
};

export default Content;