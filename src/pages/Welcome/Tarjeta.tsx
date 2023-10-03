import { IonButton, IonModal } from "@ionic/react";
import { useEffect, useState } from "react";
import tarjeta from "./../../components/CardList/images/card_img.png";
import "./css/tarjeta.css";
import { useSelector } from "react-redux";
import { Asociado } from "../../interfaces";
import { WelcomeCards } from "../../components/CardList/WelcomeCards";

const Tarjeta = () => {
  const [showModal, setModal] = useState(false)
  const user: Asociado = useSelector((state: Asociado) => state.user);

  const [titular, setTitular] = useState<number>();

  useEffect(() => {
    if (user != null) {
      setTitular(user.permisos);
    }
  }, [user, setTitular]);
  return (
    <div className="btn_tarjeta">
      {titular !== 7 ? (
        <IonButton disabled={true} fill="outline">
          <img src={tarjeta} />
          <span > Tarjeta </span>
        </IonButton>
      ) : (
        <IonButton
          fill="outline"
          onClick={() => {
            setModal(true)
          }}
        >
          <img src={tarjeta} />
          <span> Tarjeta </span>
        </IonButton>
      )}

      <IonModal isOpen={showModal}>
        <WelcomeCards setModal={setModal}/>
      </IonModal>
    </div>
  );
};

export default Tarjeta;
