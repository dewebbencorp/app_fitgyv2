import { IonButton } from "@ionic/react";
import "./css/cerrarSesion.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { App } from "@capacitor/app";
const CerrarSesion = () => {
  const history = useHistory();
 
const dispatch = useDispatch();
  const cerrarSesion = () => {
    dispatch(removeUser())
    history.replace('/');
    App.exitApp();
  };

  return (
    <div className="btn_cerrarSesion">
      <IonButton onClick={cerrarSesion}>Cerrar sesión</IonButton>
    </div>
  );
};
export default CerrarSesion;

