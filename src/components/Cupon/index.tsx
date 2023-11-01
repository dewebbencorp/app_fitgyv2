import cupon_img from "../../pages/Home/img/cupon.png";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import BACKGROUND_CUPON_VIDEO from "./video/bg_cupon.gif";
import { generateCupon, getCuponList } from "../../axios/User";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Asociado, CuponList, ResponseUpdate } from "../../interfaces";
import "./cupon.css";
import { ShareBarcode } from "./ShareBarcode";
import { IonModal } from "@ionic/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
      nombre: "",
      apellido: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsButtonDisabled(true);
    toast.loading("Generando cupon ...", {
      position: "top-right",
      style: { marginTop: "1.5rem" },
    });
    const d: ResponseUpdate = await dispatch(
      generateCupon(user.Clav_Asociado, data.nombre + " " + data.apellido)
    );
    if (!d.status) {
      toast.dismiss();
      toast.error("Error al generar el cupon", {
        position: "top-right",
        style: { marginTop: "1.5rem" },
      });
      setIsButtonDisabled(false);
      return;
    }
    setCode(d.response);
    reset();
    toast.dismiss();
    toast.success("Cupon generado para: " + data.nombre, {
      position: "top-right",
      style: { marginTop: "1.5rem" },
    });
    setName(data.nombre + " " + data.apellido);
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
    toast.loading("Cargando", {
      position: "top-right",
      style: { marginTop: "1.5rem" },
    });
    const data: any = await dispatch(getCuponList(user.Clav_Asociado));
    if (data.message) {
      toast.dismiss();
      toast.error("Error de red", {
        position: "top-right",
        style: { marginTop: "1.5rem" },
      });
      return;
    }

    toast.dismiss();
    toast.success("Éxito", {
      position: "top-right",
      style: { marginTop: "1.5rem" },
    });
    setIsHistory(true);

    const unusedCode = data.filter(
      (item: { utilizado: boolean }) => item.utilizado === false
    );

    const res = unusedCode.sort((a, b) => {
      const fechaA = new Date(a.vencimiento);
      const fechaB = new Date(b.vencimiento);
      return fechaB - fechaA;
    });

    setHistory(res.slice(0, 5));
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
            <h1>Genera tú</h1>
            <h2>CERTIFICADO DE REGALO</h2>
          </div>
          <div className="video-container">
            <img className="imgd" src={BACKGROUND_CUPON_VIDEO} />
          </div>
        </div>
        <form onSubmit={onSubmit} className="btn-generate-container">
          {errors.nombre ? (
            <span>{errors.nombre.message}</span>
          ) : errors.apellido ? (
            <span>{errors.apellido.message}</span>
          ) : (
            <span className="span-m">Ingresa el nombre del beneficiario</span>
          )}
          <div style={{ display: "flex", width: "70%", gap: "1rem" }}>
            <input
              placeholder="Nombre"
              type="text"
              {...register("nombre", {
                required: {
                  value: true,
                  message: "¡El nombre es requerido! ",
                },
                minLength: {
                  value: 5,
                  message: "¡El nombre debe ser mayor a 5 caracteres!",
                },
              })}
            />
            <input
              placeholder="Apellido"
              type="text"
              {...register("apellido", {
                required: {
                  value: true,
                  message: "¡El pellido es requerido! ",
                },
                minLength: {
                  value: 5,
                  message: "¡El pellido debe ser mayor a 5 caracteres!",
                },
              })}
            />
          </div>

          <button
            type="submit"
            className="btn-history"
            disabled={isButtonDisabled}
          >
            <h2>Generar</h2>
          </button>
          {user.permisos === 7 && (
            <div className="btn-history" onClick={() => loadList()}>
              <h2>Historial</h2>{" "}
            </div>
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

        <ShareBarcode code={code} name={name ? name : ""} view={true} />
      </IonModal>

      <IonModal
        id="cuponl"
        trigger="open-modal"
        initialBreakpoint={0.8}
        isOpen={isHistory}
        onDidDismiss={() => setIsHistory(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "2rem",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              position: "absolute",
              zIndex: "30",
              top: "0",
              right: "0",
              color: "white",
              fontSize: "1em",
            }}
          >
            <AiOutlineCloseCircle onClick={() => setIsHistory(false)} />
          </div>
          <CuponL data={history} />
        </div>
      </IonModal>
    </>
  );
};
