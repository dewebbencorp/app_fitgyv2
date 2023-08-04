import { IonButton } from "@ionic/react";
import "./css/cerrarSesion.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
const CerrarSesion = () => {
  const history = useHistory();
 
const dispatch = useDispatch();
  const cerrarSesion = () => {
    dispatch(removeUser())
    history.replace('/');
  };

  return (
    <div className="btn_cerrarSesion">
      <IonButton onClick={cerrarSesion}>Cerrar sesión</IonButton>
    </div>
  );
};
export default CerrarSesion;

