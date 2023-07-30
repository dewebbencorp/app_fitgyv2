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

const HomeRes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar className="iontab" slot="bottom">
        <IonTabButton tab="inicio" href="/inicio">
          <img className="imgHome" src={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil" href="/perfil">
          <img width="30%" src={perfil} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="fitbar" href="/fitbar">
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

        <IonTabButton tab="wifi" href="/wifi">
          <img width="45%" src={wifi} />
          <IonLabel>Wifi</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default HomeRes;
