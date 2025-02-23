import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "../../../pages/Home";
import Patients from "../../../pages/Patients";
import Dispenser from "../../../pages/Dispenser";
import AddRoutine from "../../../pages/AddRoutine";
import Settings from "../../../pages/Settings";
import AddPatient from "../../../pages/AddPatient";
import { PrivateRoute } from '../PrivateRoute';
import Login from '../../../pages/Login';
import AddMedicine from "../../../pages/AddMedicine";
import Toast from "../Miscellaneus/Toast";
import { useToast } from "../../../contexts/ToastContext";

const Content: React.FC = () => {
    const { toastMessage, setToastMessage, toastType } = useToast();

    return (
        <main className="Content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
                <Route path="/dispenser" element={<PrivateRoute><Dispenser /></PrivateRoute>} />
                <Route path="/addroutine" element={<PrivateRoute><AddRoutine /></PrivateRoute>} />
                <Route path="/addmedicine" element={<PrivateRoute><AddMedicine /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                <Route path="/addPatients" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
            </Routes>      
            {
                (toastMessage.length > 0) ?
                <Toast
                    type={toastType}
                    message={toastMessage}
                    onClose={() => setToastMessage('')}/> :
                ''
            }
        </main>
    );
};

export default Content;