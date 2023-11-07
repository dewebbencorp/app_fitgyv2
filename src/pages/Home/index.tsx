import {
  IonLabel,
  IonModal,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
} from "@ionic/react";

import { Redirect, Route, useLocation } from "react-router";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Asociado } from "../../interfaces";
import { Cupon } from "../../components/Cupon";
import { Wifi } from "../Wifi";
import { Fitbar } from "../Fitbar/Fitbar";
import "./home.css";
import home from "./img/home.png";
import fitbar from "./img/fitbar.png";
import cupon from "./img/cupon.png";
import wifi from "./img/wifi.png";
import gift from "./img/giftCard.png";
import { Profile } from "../Profile";
import { Welcome } from "../Welcome";
import { useEffect, useState } from "react";
import { FiUser, FiWifi } from "react-icons/fi";
import { UserProfile } from "../../components/Profile";
import { AiFillGift } from "react-icons/ai";
export const Home = () => {
  const [profile, setProfile] = useState(false);
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!user.Nombre_Asociado) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      {user.Nombre_Asociado &&
        !location.pathname.startsWith("/fitbar/food/") &&
        !location.pathname.startsWith("/carrito") &&
        !location.pathname.startsWith("/login") &&
        !location.pathname.startsWith("/pp") && (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home/inicio" component={Welcome} />
              <Route exact path="/home/perfil" component={Profile} />
              <Route exact path="/home/fitbar" component={Fitbar} />
              <Route exact path="/home/cupon" component={Cupon} />
              <Route exact path="/home/wifi" component={Wifi} />
              <Route exact path="/home">
                <Redirect to="/home/inicio" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar className="iontab" slot="bottom">
              <IonTabButton tab="perfil" onClick={() => setProfile(true)}>
                <IonModal isOpen={profile}>
                  <UserProfile showP={setProfile} />
                </IonModal>
                <span>
                  <FiUser />
                </span>
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>

              <IonTabButton tab="fitbar" href="/home/fitbar">
                {isPlatform("android") ? (
                  <img className="img-tab" width="80%" src={fitbar} />
                ) : (
                  <img className="img-tab" width="65%" src={fitbar} />
                )}
              </IonTabButton>
              <IonTabButton tab="inicio" href="/home/inicio">
                <img className="img-tab" width="55%" src={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              {user.permisos == 7 ? (
                <IonTabButton tab="cupon" href="/home/cupon">
                  <img className="img-tab" width="70%" src={gift} />

                  <IonLabel> </IonLabel>
                </IonTabButton>
              ) : (
                <></>
              )}

              <IonTabButton tab="wifi" href="/home/wifi">
                <span>
                  <FiWifi />
                </span>
                <IonLabel>Wifi</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
    </>
  );
};
