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

import logo from "./images/fitbar.png";
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
    toast.loading("Generando ...", {
      position: "top-right",
      style: { marginTop: "1.5rem" },
    });
    const d: ResponseUpdate = await dispatch(
      generateCupon(user.Clav_Asociado, data.nombre + " " + data.apellido)
    );
    if (!d.status) {
      toast.dismiss();
      toast.error("Error al generar ", {
        position: "top-right",
        style: { marginTop: "1.5rem" },
      });
      setIsButtonDisabled(false);
      return;
    }
    setCode(d.response);
    reset();
    toast.dismiss();
    toast.success("Generado", {
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
    <main className="flex justify-center items-center h-[80vh] ">
      <Toaster />

      <section className=" flex justify-center items-center bg-gradient-to-r from-[#ff7d04] to-[#e64e08]   h-[70%] w-[75%] rounded-[1rem] relative">
        <div className=" bg-[var(--ion-background-color)] absolute bottom-28 left-[-1rem] p-5 rounded-[2rem]"></div>
        <div className=" bg-[var(--ion-background-color)] absolute bottom-28 right-[-1rem] p-5 rounded-[2rem]"></div>

        <img
          src={logo}
          className="absolute w-32 top-[-3rem] bg-gradient-to-r  from-[#e64e08] to-[#ff7d04] p-3  rounded-full "
        />

        <section className="flex flex-col justify-start items-center  border-[2px] border-black p-1 h-[55%] w-[100%] gap-5">
          <div
            className="
shadow-custom-1 bg-[#ffdfd1] text-[1rem] tracking-widest text-[orangered] poppins  p-2 rounded-[0.5rem]"
          >
            Nuevo Cupón
          </div>

          <section className="flex  items-center justify-center w-[100%]">
            <h1 className="w-[30%]">Nombre</h1>
            <input type="text" className=" ml-2 border-white w-[50%] " />
          </section>
          <section className="flex  items-center justify-center w-[100%]">
            <h1 className="w-[30%]">Apellido</h1>
            <input type="text" className="ml-2 border-white w-[50%]" />
          </section>
          <section className="flex  items-center justify-center w-[100%]">
            <h1 className="w-[30%]">Monto</h1>
            <input type="text" className=" ml-2 border-white w-[50%]" />
          </section>
        </section>
      </section>

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
    </main>
  );
};
