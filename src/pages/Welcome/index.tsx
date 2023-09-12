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
        <div className="content">
          <div className="head-info-container">
            <div className="welcome-logo">
              <img src={logo} />
            </div>
            <div className="welcome-video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/couK2hOTrno?si=MmOC3i1kA3GvTljD&amp;controls=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>

          <News />
        </div>

        <CodigoQR />
        <Tarjeta />
        <Whats />
      </IonContent>
    </>
  );
};
