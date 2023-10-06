import { IonButton, IonModal } from "@ionic/react";
import { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import "./css/codigoQR.css";
import qr from "./img/qr.png";
import { useHistory } from "react-router";
import { isPlatform } from "@ionic/react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import { useForm } from "react-hook-form";

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
  const [isIos, setIsIos] = useState(false);
  const [selector, setSelector] = useState(false);
  const [qrd, setQr] = useState(false);

  useEffect(() => {
    if (isPlatform("ios")) {
      setIsIos(true);
    }
    if (isPlatform("android")) {
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id_maquina: 0,
    },
  });

  const getData = async (id: any) => {
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

  const onSubmit = handleSubmit(async (data) => {
    getData(data.id_maquina);
  });

  return (
    <div className="btn_codigoQR">
      {isIos ? (
        <IonButton fill="outline" onClick={() => openModal()}>
          <img src={qr} alt="QR Code" />
          <span> Código QR </span>
        </IonButton>
      ) : (
        <IonButton fill="outline" onClick={() => openModal()}>
          <img src={qr} alt="QR Code" />
          <span> Código QR </span>
        </IonButton>
      )}
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
                  gap: "2rem",
                  marginTop: "10vh",
                }}
              >
                {qrd && isPlatform("android") && (
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

                {}

                {isPlatform("android") ? (
                  <h5
                    style={{
                      marginTop: "0",
                      padding: "2rem",
                    }}
                  >
                    Debes escanear el codigo QR de la maquina
                  </h5>
                ) : (
                  <>
                    <form
                      onSubmit={onSubmit}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "2rem",
                        marginTop: "20vh",
                      }}
                    >
                      <h5
                        style={{
                          marginTop: "0",
                          padding: "0rem",
                        }}
                      >
                        Ingesa el numero de la maquina
                      </h5>
                      <input
                        style={{
                          width: "7rem",
                          height: "3rem",
                        }}
                        type="number"
                        maxLength={2}
                        {...register("id_maquina", {
                          required: {
                            value: true,
                            message: "Campo es requerido",
                          },
                        })}
                      />

                      <button
                        style={{
                          textAlign: "center",
                          width: "40%",
                          border: "solid orangered 1px",
                          padding: "0.1rem",
                          borderRadius: "0.3rem",
                          fontSize: "0.6em",
                          backgroundColor: "transparent",
                        }}
                      >
                        Enviar
                      </button>
                    </form>
                  </>
                )}

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
