import { IonContent } from "@ionic/react";
import Noticias from "../component_inicio/Noticias";
import CodigoQR from "../component_inicio/CodigoQR";
import Tarjeta from "../component_inicio/Tarjeta";
import Whats from "../component_inicio/Whats";
import logo from "./images/logo.png";
import "./welcome.css";
import { News } from "../../components/News";

export const Welcome = () => {
  return (
    <>
      <IonContent>

        <div className="head-info-container">
          <div className="welcome-logo">
            <img src={logo} />
          </div>
          <div className="welcome-video">
            <iframe
              src="https://www.youtube.com/embed/couK2hOTrno"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>

        <News />

        <CodigoQR />
        <Tarjeta />
        <Whats />
      </IonContent>
    </>
  );
};
