import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeSQLite } from "./database/config";
import { Provider } from "react-redux";
import { store } from "./store";
import { Survey, Clauses } from "./components/Survey";
import { Initpwd } from "./components/Password";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Inicializar SQLite
    await initializeSQLite();

    // Renderear la aplicación
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <Provider store={store}>
        <Initpwd />
        <Survey />
        <Clauses />
        <App />
      </Provider>
    );
  } catch (e) {
    console.log(e);
  }
});
