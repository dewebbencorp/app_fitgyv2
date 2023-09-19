import { IonButton, IonModal } from "@ionic/react";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { useEffect, useState, useRef } from "react";
import "./css/codigoQR.css";
import qr from "./img/qr.png";
import { useHistory } from "react-router";

interface Maquina {
  id_maquina: number;
  nombre_maquina: string;
  descripcion_maquina: string;
  video_url: string;
  status: boolean;
}

const CodigoQR = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [maquina, setMaquina] = useState<Maquina | null>(null);
  const history = useHistory();
  const scanCancelled = useRef(false); // Variable de referencia para rastrear si se ha cancelado el escaneo

  const openScanner = async () => {
    try {
      const data = await BarcodeScanner.scan();
      if (!scanCancelled.current) {
        console.log(`Barcode data: ${data.text}`);
        setShowModal(true);
        let send = {
          codigo: data.text,
        };

        let url =
          "https://187.188.16.29:4431/webservice-app2/controllers/detalleMaquina.php";
        fetch(url, {
          method: "POST",
          body: JSON.stringify(send),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMaquina(data);
          })
          .catch((error) => console.error("Error:", error))
          .then((response) => console.log("Success:", response));
      }
    } catch (error) {
      console.error("Error en el escaneo:", error);
    }
  };
  const closeModal = () => {
    setMaquina(null);
    setShowModal(false);
  };
  const test = () => {
    setShowModal(true);
    let send = {
      codigo: 1,
    };
    let url =
      "https://187.188.16.29:4431/webservice-app2/controllers/detalleMaquina.php";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(send),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        setMaquina(data);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  return (
    <div className="btn_codigoQR">
      <IonButton fill="outline" onClick={openScanner}>
        <img src={qr} alt="QR Code" />
        <span className="poppins"> Código QR </span>
      </IonButton>
      <IonModal isOpen={showModal}>
        <h2>
          {maquina && (
            <>
              <div className="qr-container">
                <div className="qr-c">
                  <h1 className="kenyan">EJERCICIOS</h1>
                  <h3> {maquina.nombre_maquina}</h3>
                  <p>{maquina.descripcion_maquina}</p>
                  <video src={maquina.video_url} autoPlay loop />

                  <div
                    style={{
                      textAlign: "center",
                      width: "40%",
                      border: "solid orangered 1px",
                      padding: "0.1rem",
                      borderRadius: "0.3rem",
                      fontSize: "0.6em",
                      marginTop: "3vh",
                    }}
                    onClick={() => closeModal()}
                  >
                    Cerrar
                  </div>
                </div>
              </div>
            </>
          )}

          {!maquina && (
            <div className="qr-container">
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "30vh",
                }}
              >
                <h5>Debes escanear el codigo QR de la maquina</h5>
                <div
                  style={{
                    textAlign: "center",
                    width: "40%",
                    border: "solid orangered 1px",
                    padding: "0.1rem",
                    borderRadius: "0.3rem",
                    fontSize: "0.6em",
                    marginTop: "3vh",
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </div>
              </div>
            </div>
          )}
        </h2>
      </IonModal>
    </div>
  );
};

export default CodigoQR;
