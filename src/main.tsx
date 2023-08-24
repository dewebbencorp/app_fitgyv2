import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeSQLite } from "./database/config";
import { Provider } from "react-redux";
import { store } from './store'
import { Survey } from "./components/Survey";
import { Initpwd, ResetPass } from "./components/Password";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Inicializar SQLite
    await initializeSQLite();

    // Renderear la aplicación
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <Provider store={store}>
        
        <Survey />
        <App />
      </Provider>
    );
  } catch (e) {
    console.log(e);
  }
});
