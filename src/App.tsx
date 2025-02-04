import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Content from "./components/layout/Content";
import Menu from "./components/layout/Menu";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Menu />
                <Content />
            </BrowserRouter>
        </div>
    );
}