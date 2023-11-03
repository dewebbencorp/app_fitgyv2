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
      {user.terminos == 0 && user.permisos === 7 && user.Clav_Asociado ? (
        <div className="card-container-survey">
          <div className="clause-card">
            <h5>Bienvenido a The Fit Gym App</h5>

            {mostrarContenidoCompleto ? (
              <>
                <p className="abstract">
                  Esta actualización en el contrato permite que puedas generar
                  certificados de regalo que podrás utilizar para realizar
                  compras con tu tarjeta registrada. Estos cupones son de un
                  solo uso y podrás seleccionar a qué usuarios se los deseas
                  enviar. ¡Aprovecha esta nueva funcionalidad!.
                </p>

                <div className="clause-text">
                  <span>Tarjeta de regalo</span>

                  <p>
                    El socio tiene la libertad desde su aplicación THE FITGYM de
                    Generar un Certificado de Regalo y podrá regalar a otra
                    persona para el uso y beneficio de este, teniendo de su
                    conocimiento que estará absorbiendo el valor del Certificado
                    que se consuma dentro de las instalaciones del Gimnasio.
                  </p>
                  <p>
                    {" "}
                    Se define como una cuenta de pago abierto, lo que significa
                    que su saldo se cargará a la tarjeta de crédito o débito en
                    una única exhibición. No se establece un límite de saldo en
                    el Certificado de Regalo, permitiendo al beneficiario
                    utilizar lo que considere adquirir productos o servicios
                    dentro del gimnasio.
                  </p>
                  <p>
                    {" "}
                    Los cupones generados son propiedad exclusiva de
                    beneficiario al que se le está expidiendo, no son
                    transferibles a terceros. Cualquier intento de transferir o
                    revender un cupón resultará en la anulación del mismo y la
                    revocación de los beneficios.
                  </p>
                  <p>
                    Los cupones generados tendrán una vigencia de 15 días a
                    partir de la fecha de generación. Pasada esta fecha, el
                    cupón quedará automáticamente cancelado y no podrá ser
                    utilizado y por lo tanto tendría que generar un nuevo
                    certificado de regalo desde su aplicación el Socio.
                  </p>
                  <p>
                    {" "}
                    Los beneficiarios deben presentar al momento de hacer uso
                    del Certificado de Regalo el código de barras y una
                    identificación oficial que compruebe que los datos del
                    Certificado sea la persona beneficiada para hacer uso.
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
