import foto from "./img/user.png";
import icono from "./img/i_pencil.png";
import "./css/Informacion.css";

import { useSelector } from "react-redux/es/hooks/useSelector";

import { useHistory } from "react-router-dom";
import { Asociado } from "../../interfaces";
const Informacion = () => {
  const urlFoto =
    "https://187.188.16.29:4431/webservice-app2/assets/avatars-users/";
  const history = useHistory();

  const user: Asociado = useSelector((state: Asociado) => state.user);

  return (
    <div className=".infoUsuario">
      <div className="barraNaranja"></div>
      <div className="  barraBlanca">
        <div className="container">
          <div className="itemInfo1 itemInfo">
            <img src={urlFoto + user.imgAvatar} />
          </div>

          <div className="itemInfo2 itemInfo">
            <h4>{`${user.Nombre_Asociado} ${user.Apellidos}`}</h4>
            <p className="poppins">+ Información Básica </p>
          </div>

          <div className="itemInfo3 itemInfo">
            <img
              src={icono}
              onClick={() => history.push("/home/perfil/editar-datos")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Informacion;
