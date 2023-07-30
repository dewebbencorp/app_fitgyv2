import {
  IonContent,
  IonList,
  IonItem,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import "./ListaBarcode.css";
import { Asociado } from "../../interfaces";
const ListaBarcode = () => {
  const user: Asociado = useSelector((state: Asociado) => state.user);

  const [codigos, setCodigos] = useState<
    { codigo: string; beneficiado: string; fecha: string }[]
  >([]);

  const getCodigos = async () => {
    let send = {
      claveSocio: user?.Clav_Asociado,
    };
    let url =
      "https://187.188.16.29:4431/webservice-app2/controllers/listarTarjetaRegalo.php";
    await fetch(url, {
      method: "POST", // or 'PUT'
      // data can be `string` or {object}!
      body: JSON.stringify(send),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCodigos(data);
        console.log(codigos);
        // Manejar la respuesta del servidor
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };
  useEffect(() => {
    getCodigos();
  }, []);

  return (
    <IonContent className="list-container">
      <div className="cabecera">
        <h2 className="poppins tituloBarras">Códigos de barras generados</h2>
        <IonGrid className="tabla">
          <IonRow>
            <IonCol>Código</IonCol>
            <IonCol>Fecha</IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <div className="lista-codigos">
        <IonList>
          {codigos.map((item, index) => (
            <IonItem key={index} className="itemCode">
              <IonGrid>
                <IonRow>
                  <IonCol>{item.codigo}</IonCol>
                  <IonCol>{item.fecha}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>{item.beneficiado}</IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
        </IonList>
      </div>
    </IonContent>
  );
};

export default ListaBarcode;
