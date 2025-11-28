import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global tokens + global defaults
import "./styles/global.css";

// Page/component styles can load afterwards
import "./styles/SignUp.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
