import cupon_img from "../../pages/Home/img/cupon.png";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import { BACKGROUND_CUPON_VIDEO } from "../../constants";
import { generateCupon } from "../../axios/User";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Asociado, ResponseUpdate } from "../../interfaces";
import "./cupon.css";
import { ShareBarcode } from "./ShareBarcode";
import {
  IonButton,
  IonButtons,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
export const Cupon = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState<string>();
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const user: Asociado = useSelector((state: Asociado) => state.user);
  const modal = useRef<HTMLIonModalElement>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      beneficiario: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsButtonDisabled(true);
    toast.loading("Generando cupon ...");
    const d: ResponseUpdate = await dispatch(
      generateCupon(user.Clav_Asociado, data.beneficiario)
    );
    if (!d.status) {
      toast.dismiss();
      toast.error("Error al generar el cupon");
      setIsButtonDisabled(false);
      return;
    }
    setCode(d.response);
    reset();
    toast.dismiss();
    toast.success("Cupon generado para: " + data.beneficiario);
    setName(data.beneficiario);
    setIsVisible(true);
    setIsButtonDisabled(false);
  });

  function dismiss() {
    modal.current?.dismiss;
    setIsVisible(false);
  }

  return (
    <>
      <Toaster />
      <div className="main-cupon-container">
        <div className="cupon-container">
          <div className="head-cupon">
            <h1>The Fit Bar</h1>
            <h2>MENÚ</h2>
          </div>
          <div className="video-container">
            <video src={BACKGROUND_CUPON_VIDEO} autoPlay loop />
          </div>
        </div>
        <form onSubmit={onSubmit} className="btn-generate-container">
          {errors.beneficiario ? (
            <span>{errors.beneficiario.message}</span>
          ) : (
            <span className="span-m">Ingresa el nombre del beneficiario</span>
          )}
          <input
            type="text"
            {...register("beneficiario", {
              required: {
                value: true,
                message: "! El nombre es requerido ¡",
              },
              minLength: {
                value: 3,
                message: "! El nombre debe ser mayor a 3 caracteres ¡",
              },
            })}
          />

          <button
            type="submit"
            className="btn-generate"
            disabled={isButtonDisabled}
          >
            <div className="btn-cupon-info">
              <img src={cupon_img} /> <p> Generar</p>
            </div>
          </button>
        </form>
      </div>
      <IonModal
        trigger="open-modal"
        initialBreakpoint={0.7}
        breakpoints={[1, 0.25, 0.5, 0.75]}
        isOpen={isVisible}
      >
        <div
          style={{ display: "flex", justifyContent: "end", fontSize: "2rem" }}
        >
          <AiOutlineCloseCircle onClick={() => dismiss()} />
        </div>

        <ShareBarcode code={code} name={name ? name : ""} />
      </IonModal>
    </>
  );
};
