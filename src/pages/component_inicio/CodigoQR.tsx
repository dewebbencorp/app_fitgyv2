import { IonButton, IonModal } from "@ionic/react";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { useState } from "react";
import "./css/codigoQR.css";
import qr from "./img/qr.png";

interface Maquina {
  Clav_art: string;
  NombreMaquina: string;
  ImgA: string;
  Detalle: string;
}

const CodigoQR = () => {
  const [numMaquina, setNumMaquina] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [maquina, setMaquina] = useState<Maquina | null>(null);
  let BASE_FORLDER =
    "https://187.188.16.29:4431/webservice-app/ejercicios-img/";
  const estiloimg: { borderRadius: string } = {
    borderRadius: "5px",
  };
  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
    setNumMaquina(data.text);
    setShowModal(true);

    let send =({
            "codigo":data.text
        });

    let url =
      "https://187.188.16.29:4431/webservice-app2/controllers/detalleMaquina.php";
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(send), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        setMaquina(data[0]);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  const test = () => {
    setShowModal(true);
    let send = {
      codigo: 1,
    };
    let url =
      "https://187.188.16.29:4431/webservice-app2/controllers/detalleMaquina.php";
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(send), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        setMaquina(data[0]);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  return (
    <div className="btn_codigoQR">
      <IonButton fill="outline" onClick={openScanner}>
        <img src={qr} />
        <span className="poppins"> Código QR </span>
      </IonButton>
      <IonModal isOpen={showModal}>
        <p>{maquina && JSON.stringify(maquina, null, 2)}</p>

        <h2>
          {maquina && (
            <>
              {maquina.ImgA.includes(".mp4") ? (
                <video src={BASE_FORLDER + maquina.ImgA} autoPlay />
              ) : (
                <img src={BASE_FORLDER + maquina.ImgA} />
              )}
            </>
          )}
        </h2>

        <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
      </IonModal>
    </div>
  );
};
export default CodigoQR;
