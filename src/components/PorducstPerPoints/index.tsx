import { useEffect, useState } from "react";
import "./pp.css";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { producsPerPoints } from "../../axios/Food";
import { IonButtons, IonContent, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { Loading2 } from "../LoadScreen";
import { Asociado, ProductosPorPuntos } from "../../interfaces";
import { PchHistory } from "./History";
import logo from "./../../pages/Welcome/img/logo.png";

export const PP = ({ setpp }: any) => {
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const [dta, setDta] = useState<ProductosPorPuntos[]>();
  const [isVisible, setIsVisible] = useState(false);

  const backButtonHandler = () => {
    setpp(false);
  };

  useEffect(() => {
    getPp();
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  const getPp = async () => {
    try {
      const data = await dispatch(producsPerPoints(user.puntos));
      setDta(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <IonContent>
        {isVisible ? (
          <>
            <div
              className="isActive"
              style={{ marginTop: "4vh" }}
              onClick={() => setIsVisible(false)}
            >
              <img src={logo} />
              <div>
                {" "}
                <HiChevronLeft />
              </div>
            </div>
            <PchHistory user={user} />
          </>
        ) : (
          <>
            <IonToolbar>
              <IonButtons slot="start">
                <HiChevronLeft
                  onClick={() => backButtonHandler()}
                  style={{ fontSize: "3.2rem", marginBottom: "0rem" }}
                />
              </IonButtons>
            </IonToolbar>

            <div className="pp-main-container">
              <div className="pp-title">
                <h1>{user.puntos} PTS</h1>
                <h3>¿Ya tienes planes para tus puntos?</h3>

                {!isVisible && (
                  <h3
                    style={{
                      marginTop: "2vh",
                      color: "orangered",
                      borderBottom: "2px solid orangered",
                      display: "inline-block",
                      padding: "0 0 0 0", 
                    }}
                    onClick={() => setIsVisible(true)}
                  >
                    VER HISTORIAL
                  </h3>
                )}
              </div>

              {!isVisible && (
                <>
                  {!dta && (
                    <>
                      {" "}
                      Cargando... <Loading2 />
                    </>
                  )}

                  {dta?.map((products) => (
                    <>
                      <div className=" pp-card" key={products.clave}>
                        <div className="pts-container">
                          <div className="pts">
                            <h5 className="pts-font">
                              {Math.floor(products.costo)} pts
                            </h5>
                          </div>
                        </div>
                        <h3 className="pp-card-font">{products.detalle}</h3>

                        {Math.floor(products.costo) > user.puntos ? (
                          <h4 className="pp-card-font">Ya casi es tuyo </h4>
                        ) : (
                          <h4 className="pp-card-font">Puedes tenerlo</h4>
                        )}
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </IonContent>
    </>
  );
};
