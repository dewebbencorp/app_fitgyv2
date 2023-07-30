import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import { AuthProvider } from "./UserProvider";
import { SignIn } from "./pages/SignIn/SigIn";
import { setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */

/* Theme variables */
import "./theme/main.css";
import Inicio from "./pages/Inicio";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" component={Inicio} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
