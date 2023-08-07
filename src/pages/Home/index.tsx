import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Redirect, Route, useLocation } from "react-router";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Asociado } from "../../interfaces";
import { Cupon } from "../../components/Cupon";
import { Wifi } from "../Wifi";
import { Fitbar } from "../Fitbar/Fitbar";
import "./home.css";
import { Cart } from "../../components/Cart";
import { ListFood } from "../../components/FoodList";
import { FoodDetail } from "../../components/FoodDetail";
import home from "./img/home.png";
import perfil from "./img/perfil.png";
import fitbar from "./img/fitbar.png";
import cupon from "./img/cupon.png";
import wifi from "./img/wifi.png";
import EditarDatos from "../component_datos/EditarDatos";
import OperacionTarjetas from "../component_inicio/OperacionTarjetas";
import { Profile } from "../Profile";
import { Welcome } from "../Welcome";
export const Home = () => {
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const location = useLocation();

  console.log(location.pathname);



  return (
    <>

      {!location.pathname.startsWith("/fitbar/food/") && !location.pathname.startsWith("/carrito") && (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home/inicio" component={Welcome} />
            <Route
              exact
              path="/home/inicio/tarjetas"
              component={OperacionTarjetas}
            />
            <Route exact path="/home/perfil" component={Profile} />
            <Route
              exact
              path="/home/perfil/editar-datos"
              component={EditarDatos}
            />
            <Route exact path="/home/fitbar" component={Fitbar} />

            <Route exact path="/home/cupon" component={Cupon} />
            <Route exact path="/home/wifi" component={Wifi} />
            <Route exact path="/home">
              <Redirect to="/home/inicio" />
            </Route>
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
              <IonLabel>Fitbar</IonLabel>
            </IonTabButton>

            {user.titular == 0 ? (
              <IonTabButton tab="cupon" disabled={true} href="/home/cupon">
                <img width="25%" src={cupon} />
                <IonLabel>Cupón</IonLabel>
              </IonTabButton>
            ) : (
              <IonTabButton tab="cupon" href="/home/cupon">
                <img width="25%" src={cupon} />

                <IonLabel>Cupón </IonLabel>
              </IonTabButton>
            )}

            <IonTabButton tab="wifi" href="/home/wifi">
              <img width="45%" src={wifi} />
              <IonLabel>Wifi</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>

      )}

    </>
  );
};
