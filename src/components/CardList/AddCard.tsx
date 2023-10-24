import { IonProgressBar } from "@ionic/react";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Asociado, ResponseUpdate, validCard } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { postCardsList, setNewCard } from "../../axios/Card";

export const AddCard = ({ setModal }: any) => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const backButtonHandler = () => {
    setModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = handleSubmit(async (data) => {
    const card: validCard = {
      claveSocio: user.Clav_Asociado,
      numTarjeta: data.ncard,
      vencimiento: data.date,
    };

    const res: ResponseUpdate = await dispatch(setNewCard(card));

    console.log(res);
    
    if (res.status === 0) {
      toast.error(res.response);
      return;
    }

    toast.success(res.response);
    reset();
    await dispatch(postCardsList(user.Clav_Asociado))
    return;
  });

  useEffect(() => {
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);
  return (
    <>
      <Toaster />

      <div>
        <div className="input-card-container">
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "0rem",
            }}
          >
            <AiOutlineCloseCircle
              className="btn-close-update"
              onClick={backButtonHandler}
            />
          </div>

          <form onSubmit={onSubmit}>
            <h2>Nueva tarjeta</h2>

            <IonProgressBar
              color="var(--ion-tab-bar-background)"
              className="custom-pg-2"
            />

            <h5>Número de tarjeta de crédito</h5>
            <input
              className="n-card-input"
              placeholder="123 . . . ."
              type="tel"
              minLength={16}
              maxLength={16}
              {...register("ncard", {
                maxLength: {
                  value: 16,
                  message: "Cantidad de caracteres exedido",
                },
                minLength: {
                  value: 16,
                  message: "Deben ser almenos 16 dígitos",
                },
                required: {
                  value: true,
                  message: "*El numero de tarjeta es requerido",
                },
              })}
            />

            {errors.ncard && <span>{errors.ncard.message as string}</span>}
            <h5>Fecha de vencimiento</h5>
            <input
              className="date-deadline-input"
              placeholder="mmyy"
              type="tel"
              maxLength={4}
              {...register("date", {
                minLength: {
                  value: 4,
                  message:
                    "Fecha invalida, ingresa el mes y el año, ejemplo : 0123",
                },
                required: {
                  value: true,
                  message: "*La fecha es requerida",
                },
              })}
            />
            {errors.date && <span>{errors.date.message as string}</span>}

            <div className="btn-close-container btn-send-up btn-save">
              <button type="submit" className="btn-up-dta">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
