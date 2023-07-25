
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeSQLite } from "./database/config";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Inicializar SQLite
    await initializeSQLite();

    // Renderear la aplicación
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    console.log(e);
  }
});
