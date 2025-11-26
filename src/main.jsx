import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Import your main components
import App from "./App.jsx"; // Not used currently

// Mount the ImageGenerator component to the root div
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
