import { useSelector } from "react-redux";
import { Asociado } from "../../interfaces";
import { useState } from "react"; // Importa el hook useState
import { App } from "@capacitor/app";

export const Clauses = () => {
  const user: Asociado = useSelector((state: Asociado) => state.user);

  const [mostrarContenidoCompleto, setMostrarContenidoCompleto] =
    useState(false);

  const handleVerMasClick = () => {
    setMostrarContenidoCompleto(true);
  };

  const salir = () => {
    App.exitApp();
  };

  return (
    <>
      {user.terminos == 0 && user.Clav_Asociado ? (
        <div className="card-container-survey">
          <div className="clause-card">
            <h5>Bienvenido a The Fit Gym App</h5>

            {mostrarContenidoCompleto ? (
              <>
                <p>
                  Esta actualización en el contrato permite que puedas generar
                  cupones especiales que podrás utilizar para realizar compras
                  con tu tarjeta registrada. Estos cupones son de un solo uso y
                  podrás seleccionar a qué usuarios se los deseas enviar.
                  ¡Aprovecha esta nueva funcionalidad!.
                </p>

                <div className="clause-text">
                  <p>Clausula</p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit, nobis optio illum numquam sit hic atque in voluptas
                    odio, debitis rerum voluptate enim eveniet ducimus repellat,
                    earum eius corrupti esse praesentium laudantium. At
                    excepturi eaque commodi incidunt, architecto aspernatur iure
                    suscipit laudantium doloremque laboriosam. Deserunt nihil
                    illum, nemo iste necessitatibus explicabo placeat expedita
                    amet commodi doloribus ex quae unde, dolores veritatis!
                    Aliquid nam consectetur omnis officiis culpa esse excepturi
                    veritatis!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus, voluptas dolorum hic veritatis vitae adipisci
                    quasi minus quas nostrum? Itaque expedita accusantium
                    corrupti mollitia molestiae.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p>
                  Para continuar, debes aceptar nuestra nueva cláusula en el
                  contrato.
                </p>
                <p>
                  Esta actualización en el contrato permite que puedas generar
                  cupones especiales que podrás utilizar para realizar compras
                  con tu tarjeta registrada...{" "}
                  <span onClick={handleVerMasClick} className="ver-mas">
                    Ver Más
                  </span>
                </p>
              </>
            )}
            <div style={{ display:'flex',gap:'2rem',fontSize: "0.7em", marginTop: "1rem" }}>
              <div className="action">Aceptar </div>
              <div className="action"  onClick={salir}>Salir </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
