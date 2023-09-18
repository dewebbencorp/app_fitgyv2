import { IonContent } from "@ionic/react";
import CodigoQR from "./CodigoQR";
import Tarjeta from "./Tarjeta";
import Whats from "./Whats";
import logo from "./img/logo.png";
import "./css/welcome.css";
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
