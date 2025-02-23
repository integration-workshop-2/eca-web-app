import React, { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextType {
    toastMessage: string;
    setToastMessage: (message: string) => void;
    toastType: ToastType | undefined;
    setToastType: (type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<ToastType>('info');

    return (
        <ToastContext.Provider value={{ toastMessage, setToastMessage, toastType, setToastType }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
