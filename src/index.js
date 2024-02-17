import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Modal from 'react-modal';
import { AuthContexProvider } from "./common/context/authContext";

Modal.setAppElement('#root')

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContexProvider>
            <App />
        </AuthContexProvider>
    </React.StrictMode>
)