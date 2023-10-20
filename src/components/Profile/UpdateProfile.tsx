import { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { IonContent } from "@ionic/react";
import { Toaster, toast } from "react-hot-toast";
import {
  Asociado,
  ResponseUpdate,
  UpdateProfile as upprofile,
} from "../../interfaces";
import { CardsList } from "../CardList";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../axios/User";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { updateUserFields } from "../../store/slices/userSlice";
import { ChangePassword } from "./ChangePassword";
import "./profile.css";

interface UpdateProfileProps {
  setModal: (value: boolean) => void;
  user: Asociado;
}

export const UpdateProfile = ({ setModal, user }: UpdateProfileProps) => {
  const [showFieldPw, setFieldPw] = useState(false);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: user.CorreoE,
      phone: user.Telefono,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const request: upprofile = {
      claveSocio: user.Clav_Asociado,
      correo: data.email,
      telefono: data.phone,
    };

    console.log(request);

    try {
      toast.loading("Enviando datos", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          width: "70%",
          marginTop: "1.5rem",
        },
        position: "top-center",
      });

      const res: ResponseUpdate = await dispatch(updateProfile(request));

      if (res.status) {
        toast.dismiss();
        toast.success(`${res.response}`, {
          position: "top-center",
          style: { marginTop: "1.5rem" },
        });
        reset({ email: "", phone: "" });

        dispatch(
          updateUserFields({ CorreoE: data.email, Telefono: data.phone })
        );
      } else {
        toast.dismiss();
        toast.error(`Error : ${res.response}`, {
          position: "top-left",
          style: { marginTop: "1.5rem" },
        });
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(`${error.message}`, { style: { marginTop: "1.5rem" } });
    }
  });

  const backButtonHandler = () => {
    setModal(false); // Cerrar el modal
  };

  useEffect(() => {
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  return (
    <>
      <IonContent>
        <Toaster />
        <div className="title-up">Detalles de mi cuenta</div>

        <div className="input-up-container">
          <form onSubmit={onSubmit}>
            <div className="input-container">
              <h3>Nombre</h3>
              <input
                className="n-card-input"
                type="text"
                value={user.Nombre_Asociado}
                disabled
              />
              <h3>Apellidos</h3>
              <input
                className="n-card-input"
                type="text"
                value={user.Apellidos}
                disabled
              />
              <h3>Correo</h3>
              <input
                className="n-card-input"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "*Correo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correo no válido",
                  },
                })}
              />

              {errors.email && <span>{errors.email.message}</span>}
              <h3>Teléfono</h3>
              <input
                className="n-card-input"
                type="tel"
                minLength={10}
                maxLength={10}
                {...register("phone", {
                  minLength: {
                    value: 10,
                    message: "Ingresa un teléfono valido ",
                  },
                  required: {
                    value: true,
                    message: "*Teléfono es requerido",
                  },
                })}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
            </div>
            <div className="list-options-container">
              <button type="submit">Actualizar datos</button>
            </div>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              paddingLeft: "2rem",
            }}
          >
            <div
              className="change-pass-container"
              onClick={() => setFieldPw(true)}
            >
              <TfiReload
                style={{
                  fontSize: "1.3em",
                  color: "orangered",
                  fontWeight: "bold",
                }}
              />

              <h5>Cambiar contraseña</h5>
            </div>
            {showFieldPw ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundColor:'rgba(10, 6, 6, 0.801)'
                  }}
                >
                  <ChangePassword setPw={setFieldPw} />
                </div>
              </>
            ) : (
              <>{user.permisos === 7 && <CardsList />}</>
            )}
          </div>
        </div>
      </IonContent>
    </>
  );
};
