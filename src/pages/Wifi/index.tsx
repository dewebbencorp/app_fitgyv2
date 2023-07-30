import { IonContent } from "@ionic/react";
import wifiPrincipal from "../Home/img/wifi_principal.png";
import { useState } from "react";
import "./wifi.css";
export const Wifi = () => {
  const [nombreRed, setNombreRed] = useState("");
  const [password, setPassword] = useState("");

  let url =
    "https://187.188.16.29:4431/webservice-app2/controllers/getWifi.php";
  fetch(url, {
    method: "GET", // or 'PUT'
    // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // Manejar la respuesta del servidor
      setNombreRed(data.nombreRed);
      setPassword(data.password);
    })
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));

  return (
    <IonContent>
      <h4 id="titulo1" className="poppins">
        Mantente en línea mientras
      </h4>
      <h3 className="kenyan" id="titulo2">
        <i> ENTRENAS</i>
      </h3>
      <img id="imgWifi" src={wifiPrincipal} />
      <div id="datosWifi">
        <div id="nombreRed">
          <h6 className="poppins">Nombre de la red:</h6>
          <span> {nombreRed} </span>
        </div>

        <div id="password2">
          <h6 className="poppins">Contraseña:</h6>
          <span> {password} </span>
        </div>
      </div>
    </IonContent>
  );
};
