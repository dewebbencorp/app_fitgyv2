import cupon_img from "../../pages/Home/img/cupon.png";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import BACKGROUND_CUPON_VIDEO from "./video/bg_cupon.mp4";
import { generateCupon, getCuponList } from "../../axios/User";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Asociado, CuponList, ResponseUpdate } from "../../interfaces";
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
import { BG_CUPON } from "../../constants";
import { CuponL } from "./CuponList";
export const Cupon = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [history, setHistory] = useState<CuponList>();
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
  const [lv, setLv] = useState(true);
  const loadvideo = (data: any) => {
    if (data) {
      setLv(false);
    }
  };

  const loadList = async () => {
    toast.loading("Cargando");
    const data = await dispatch(getCuponList(user.Clav_Asociado));
    if (data) {
      toast.dismiss();
      toast.success("Hecho");
    }
    setIsHistory(true);

    setHistory(data);
  };

  const backButtonHandler = () => {
    setIsHistory(false);
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  return (
    <>
      <Toaster />
      <div className="main-cupon-container">
        <div className="cupon-container">
          <div className="head-cupon">
            <h1>Genera tu cupón</h1>
            <h2>CUPÓN</h2>
          </div>
          <div className="video-container">
            {lv && <div></div>}
            <video src={BG_CUPON} autoPlay loop onLoadedData={loadvideo} />
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
          {user.permisos === 7 && (
            <h5
              style={{
                backgroundColor: "orangered",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                fontSize: "0.7rem",
              }}
              onClick={() => loadList()}
            >
              Historial
            </h5>
          )}
        </form>
      </div>
      <IonModal
        trigger="open-modal"
        initialBreakpoint={0.7}
        breakpoints={[1, 0.25, 0.5, 0.75]}
        onDidDismiss={() => setIsVisible(false)}
        isOpen={isVisible}
      >
        <div
          style={{ display: "flex", justifyContent: "end", fontSize: "2rem" }}
        >
          <AiOutlineCloseCircle onClick={() => dismiss()} />
        </div>

        <ShareBarcode code={code} name={name ? name : ""} />
      </IonModal>

      <IonModal
        trigger="open-modal"
        initialBreakpoint={0.8}
        isOpen={isHistory}
        onDidDismiss={() => setIsHistory(false)}
      >
        <div
          style={{ display: "flex", justifyContent: "end", fontSize: "2rem" }}
        >
          <CuponL data={history} />
        </div>
      </IonModal>
    </>
  );
};
