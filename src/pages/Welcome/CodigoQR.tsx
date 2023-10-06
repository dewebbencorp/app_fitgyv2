import { IonButton, IonModal } from "@ionic/react";
import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
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
  const [qrd, setQr] = useState(false);
  const getData = async (id: string) => {
    if (id === "" || id === undefined) {
      return;
    }
    try {
      let send = {
        codigo: id,
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
          if (data.message) {
            console.log(data.message);

            setMaquina(null);
            setShowModal(false);
            alert(data.message);
          } else {
            setMaquina(data);
          }
        })
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
    } catch (error) {
      console.error("Error en el escaneo:", error);
    }
  };

  const closeModal = () => {
    setMaquina(null);
    setQr(false);
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
    setQr(true);
  };

  return (
    <div className="btn_codigoQR">
      <IonButton fill="outline" onClick={() => openModal()}>
        <img src={qr} alt="QR Code" />
        <span> Código QR </span>
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
                      backgroundColor: "black",
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "10vh",
                }}
              >
                {qrd && (
                  <QrScanner
                    containerStyle={{
                      width: "100%",
                      borderRadius: "1rem",
                    }}
                    scanDelay={4000}
                    onDecode={(result) => getData(result)}
                    onError={(error) => console.log(error?.message)}
                  />
                )}

                <h5
                  style={{
                    marginTop: "0",
                    padding: "2rem",
                  }}
                >
                  Debes escanear el codigo QR de la maquina
                </h5>

                <div
                  style={{
                    textAlign: "center",
                    width: "40%",
                    border: "solid orangered 1px",
                    padding: "0.1rem",
                    borderRadius: "0.3rem",
                    fontSize: "0.6em",
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
