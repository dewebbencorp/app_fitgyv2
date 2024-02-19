import React, { useState, useEffect } from "react";
import { IonContent, IonToast, isPlatform } from "@ionic/react";
import CodigoQR from "./CodigoQR";
import Tarjeta from "./Tarjeta";
import Whats from "./Whats";
import logo from "./img/logo.png";
import "./css/welcome.css";
import { News } from "../../components/News";
import WELCOME_VIDEO from "./video/home_video.mp4";
import { BG_HOME } from "../../constants";

export const Welcome = () => {
  const [showNoInternetToast, setShowNoInternetToast] = useState(false);

  useEffect(() => {
    // Verificar la conexión a Internet aquí
    const isOnline = navigator.onLine;

    // Mostrar el mensaje si no hay conexión a Internet
    setShowNoInternetToast(!isOnline);
  }, []);
  const [lv, setLv] = useState(true);
  const loadvideo = (data: any) => {
    if (data) {
      setLv(false);
    }
  };

  return (
    <>
      <IonContent>
        <div className="content">
          <div className="head-info-container">
            <div className="welcome-logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="welcome-video">
              {lv && isPlatform("android") && <div></div>}

              {isPlatform("android") ? (
                <video src={BG_HOME} autoPlay loop onLoadedData={loadvideo}>
                  conectate a internet
                </video>
              ) : (
                <video
                  src={BG_HOME}
                  onLoadedData={loadvideo}
                  controls
                  style={{ background: "black", borderRadius: "1rem" }}
                >
                  ¡Conectate a internet!
                </video>
              )}
            </div>
          </div>

          <News />

          <section className="flex shimmer child:w-[50%] child:h-[100%] items-center bg-gradient-to-r from-[#ff7d04] to-[#ec540d]  rounded-[8px]  border-[1px] border-[#ff7d04] h-[7rem] mt-5 mb-[10vh]">
            <div className="flex  justify-center  items-center rewards-left">
              <img
                className="w-11 h-11 "
                src="https://fitbar.mx/img/BEBIDA.3fb51341.png"
              />
            </div>
            <div className="flex justify-start items-center child:text-white ">
              <p className="poppins italic bold text-[1rem]">Promociones</p>
            </div>
          </section>
        </div>

        <Whats />
      </IonContent>

      <IonToast
        isOpen={showNoInternetToast}
        message="No hay conexión a Internet. Por favor, verifica tu conexión e intenta de nuevo."
        duration={5000}
        onDidDismiss={() => setShowNoInternetToast(false)}
      />
    </>
  );
};
 