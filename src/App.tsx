import { Redirect, Route, Router } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { setupIonicReact } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Theme variables */
import "./theme/main.css";
/* Components */
import { SignIn } from "./pages/SignIn/SigIn";
import { Home } from "./pages/Home";
import { ListFood } from "./components/FoodList";
import { FoodDetail } from "./components/FoodDetail";
import { Cart } from "./components/Cart";
import { PP } from "./components/PorducstPerPoints";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={SignIn} />
        <Route path="/home" component={Home} />
        <Route path="/fitbar/food/:id" component={ListFood} />
        <Route path="/fitbar/food/detail/:id" component={FoodDetail} />
        <Route path="/carrito" component={Cart} />
        <Route path="/pp" component={PP} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
