import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { Survey, Clauses } from "./components/Survey";
import { Initpwd } from "./components/Password";

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
