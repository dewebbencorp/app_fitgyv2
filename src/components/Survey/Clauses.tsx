import { useDispatch, useSelector } from "react-redux";
import { Asociado, ResponseUpdate } from "../../interfaces";
import { useState } from "react"; // Importa el hook useState
import { App } from "@capacitor/app";
import { updateContract } from "../../axios/Card";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import { updateUserFields } from "../../store/slices/userSlice";
const sty = { style: { marginTop: "2rem" } };
export const Clauses = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [mostrarContenidoCompleto, setMostrarContenidoCompleto] =
    useState(false);

  const handleVerMasClick = () => {
    setMostrarContenidoCompleto(true);
  };

  const exit = () => {
    App.exitApp();
  };
  const updateC = async () => {
    setIsButtonDisabled(true);
    toast.loading("Validando infomación...", sty);
    const contract: ResponseUpdate = await dispatch(
      updateContract(user.Clav_Asociado, user.CorreoE)
    );
    if (contract) {
      toast.dismiss();
      toast.success(`${contract.response}`, sty);
      dispatch(updateUserFields({ terminos: 1 }));
    }
  };

  return (
    <>
      <Toaster />
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
                  <p>¡Lorem impus!</p>

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
            <div
              style={{
                display: "flex",
                gap: "2rem",
                fontSize: "0.7em",
                marginTop: "1rem",
              }}
            >
              <button
                className="action"
                style={{ background: "transparent" }}
                onClick={updateC}
                disabled={isButtonDisabled}
              >
                Aceptar{" "}
              </button>
              <button
                className="action"
                style={{ background: "transparent" }}
                onClick={exit}
                disabled={isButtonDisabled}
              >
                Salir{" "}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
