import { Asociado } from "../../interfaces";
import "./css/Puntos.css";
import estrella from "./img/puntos.png";
import { useSelector } from "react-redux";

const Puntos = () => {
  const user: Asociado = useSelector((state: Asociado) => state.user);
  return (
    <div className="misPuntos">
      <div className="itemPuntos1 itemPuntos">
        <h4 className="kenyan">
          <i> CLIENTE PREMIUM </i>
        </h4>
      </div>

      <div className="itemPuntos2 itemPuntos">
        <img src={estrella} />
      </div>
      <div className="itemPuntos3 itemPuntos">
        <p className="poppins"> PUNTOS DISPONIBLES </p>
      </div>
      <div className="itemPuntos4 itemPuntos">
        <p className="kenyan">
          <i>{user.puntos}</i>
        </p>
      </div>
    </div>
  );
};

export default Puntos;
