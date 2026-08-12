import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import ExpenseProvider from "./context/ExpenseContext";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExpenseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExpenseProvider>
  </StrictMode>,
);
