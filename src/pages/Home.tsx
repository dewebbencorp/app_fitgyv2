import { IonReactRouter } from "@ionic/react-router";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonToolbar,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import Inicio from "./Inicio";
import InformacionCliente from "./InformacionCliente";

import Fitbar from "./Fitbar/Fitbar";
import Cupon from "./Cupon";
import Wifi from "./Wifi";
import "./css/Home.css";
import home from "./img/home.png";
import perfil from "./img/perfil.png";
import fitbar from "./img/fitbar.png";
import cupon from "./img/cupon.png";
import wifi from "./img/wifi.png";



import EditarDatos from "./component_datos/EditarDatos";
import OperacionTarjetas from "./component_inicio/OperacionTarjetas";
import { ListFood } from "../components/FoodList";
import { FoodDetail } from "../components/FoodDetail";
import { Cart } from "../components/Cart";
import { SignIn } from "./SignIn/SigIn";

const Home = () => {
 

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact={true} path="/login">
          <SignIn />
        </Route>
      </IonRouterOutlet>

      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/inicio" />
          <Route path="/home/inicio" render={() => <Inicio />} exact={true} />
          <Route
            path="/home/inicio/tarjetas"
            render={() => <OperacionTarjetas />}
            exact={true}
          />
          <Route
            path="/home/perfil"
            render={() => <InformacionCliente />}
            exact={true}
          />
          <Route path="/home/fitbar" render={() => <Fitbar />} exact={true} />
          <Route
            path="/home/fitbar/food/:id"
            render={() => <ListFood />}
            exact={true}
          />
          <Route
            path="/home/fitbar/food/detail/:id"
            render={() => <FoodDetail />}
            exact={true}
          />
          <Route path="/home/carrito" render={() => <Cart />} exact={true} />
          <Route path="/home/cupon" render={() => <Cupon />} exact={true} />
          <Route path="/home/wifi" render={() => <Wifi />} exact={true} />
          
          <Route
            path="/home/perfil/editar-datos"
            render={() => <EditarDatos />}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar className="iontab" slot="bottom">
          <IonTabButton tab="inicio" href="/home/inicio">
            <img className="imgHome" src={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="perfil" href="/home/perfil">
            <img width="30%" src={perfil} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="fitbar" href="/home/fitbar">
            <img width="70%" src={fitbar} />
          </IonTabButton>

          {/*titular == false ? (
            <IonTabButton tab="cupon" disabled={true} href="/home/cupon">
              <img width="25%" src={cupon} />

              <IonLabel>Cupón</IonLabel>
            </IonTabButton>
          ) : (
            <IonTabButton tab="cupon" href="/home/cupon">
              <img width="25%" src={cupon} />

              <IonLabel>Cupón </IonLabel>
            </IonTabButton>
          ) */}

          <IonTabButton tab="wifi" href="/home/wifi">
            <img width="45%" src={wifi} />
            <IonLabel>Wifi</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;
