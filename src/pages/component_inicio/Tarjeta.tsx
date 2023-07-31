import { IonButton, IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import tarjeta from "./img/tarjeta.png";
import "./css/tarjeta.css";
import { useSelector } from "react-redux";
import { Asociado } from "../../interfaces";

const Tarjeta = () => {
  const history = useHistory();
  const user: Asociado = useSelector((state: Asociado) => state.user);

  const [titular, setTitular] = useState<number>();

  useEffect(() => {
    if (user != null) {
      setTitular(user.titular);
    }
  }, [user, setTitular]);
  return (
    <div className="btn_tarjeta">
      {titular !== 1 ? (
        <IonButton disabled={true} fill="outline">
          <img src={tarjeta} />
          <span> Tarjeta </span>
        </IonButton>
      ) : (
        <IonButton
          fill="outline"
          onClick={() => {
            history.push("/home/inicio/tarjetas");
          }}
        >
          <img src={tarjeta} />
          <span> Tarjeta </span>
        </IonButton>
      )}
    </div>
  );
};

export default Tarjeta;
