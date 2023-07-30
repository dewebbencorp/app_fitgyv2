import { Route } from "react-router-dom";
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
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn/SigIn";
import Inicio from "./pages/Inicio";
import OperacionTarjetas from "./pages/component_inicio/OperacionTarjetas";
import InformacionCliente from "./pages/InformacionCliente";
import Fitbar from "./pages/Fitbar/Fitbar";
import { ListFood } from "./components/FoodList";
import { FoodDetail } from "./components/FoodDetail";
import { Cart } from "./components/Cart";
import Cupon from "./pages/Cupon";
import Wifi from "./pages/Wifi";
import EditarDatos from "./pages/component_datos/EditarDatos";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" component={Home} />
        <Route path="/inicio" component={Inicio} />
        <Route path="/tarjetas" component={OperacionTarjetas} />
        <Route path="/perfil" component={InformacionCliente} />
        <Route path="/perfil/editar-datos" component={EditarDatos} />
        <Route path="/fitbar" component={Fitbar} />
        <Route path="/fitbar/food/:id" component={ListFood} />
        <Route path="/fitbar/food/detail/:id" component={FoodDetail} />
        <Route path="/carrito" component={Cart} />
        <Route path="/cupon" component={Cupon} />
        <Route path="/wifi" component={Wifi} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
