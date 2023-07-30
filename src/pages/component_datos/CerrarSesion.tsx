import { IonButton } from "@ionic/react";
import "./css/cerrarSesion.css";
import { useHistory } from "react-router";
import { Asociado } from "../../interfaces";
import { useSelector } from "react-redux";
const CerrarSesion = () => {
  const history = useHistory();
  const user: Asociado = useSelector((state: Asociado) => state.user);

  const cerrarSesion = () => {
    /* TODO*/
  };

  return (
    <div className="btn_cerrarSesion">
      <IonButton onClick={cerrarSesion}>Cerrar sesión</IonButton>
    </div>
  );
};
export default CerrarSesion;
