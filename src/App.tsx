import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Content from "./components/layout/Content";
import Menu from "./components/layout/Menu";
import { ToastProvider } from "./contexts/ToastContext";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ToastProvider>
                    <Menu />
                    <Content />
                </ToastProvider>
            </BrowserRouter>
        </div>
    );
}