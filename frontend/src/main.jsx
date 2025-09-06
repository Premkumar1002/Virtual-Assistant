import React from "react";               // 👈 Required for JSX
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import App from "./App.jsx";             // 👈 You missed this import
import "./index.css";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <UserContext>
        <App />
      </UserContext>
    </BrowserRouter>
 
);
