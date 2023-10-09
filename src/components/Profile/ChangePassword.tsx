import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  Asociado,
  RequesChangePassword,
  ResponseUpdate,
} from "../../interfaces";
import "./profile.css";
import { changePassword } from "../../axios/User";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFields } from "../../store/slices/userSlice";
export const ChangePassword = ({ setPw }: any) => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const request: RequesChangePassword = {
      claveSocio: user.Clav_Asociado,
      newPassword: data.password,
    };

    console.log(request);

    try {
      toast.loading("Enviando datos", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      const res: ResponseUpdate = await dispatch(changePassword(request));

      if (res.status) {
        toast.dismiss();
        toast.success(`Exito : ${res.response}`);
        dispatch(updateUserFields({ passedit: 1 }));
        reset();
      } else {
        toast.dismiss();
        toast.error(`Error : ${res.response}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setPw(false);
    }
  });

  return (
    <>
      <Toaster />
      <div className="ch-password-container">
        {user.passedit === 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "0rem",
            }}
          >
            <AiOutlineCloseCircle
              className="btn-close-update"
              onClick={() => setPw(false)}
            />
          </div>
        )}

        <div className="input-up-container">
          <form onSubmit={onSubmit}>
            <div className="input-container">
              <h3
                style={{
                  textAlign: "center",
                  fontFamily: "var(--poppins)",
                  fontSize: "1em",
                  color: "white",
                }}
              >
                {" "}
                INTRODUCE TU NUEVA CONTRASEÑA
              </h3>

              <input
                className="n-card-input"
                type="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Ingresa al menos 8 caracteres",
                  },
                  required: {
                    value: true,
                    message: "*Campo requerido",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                    message:
                      "!Ingresa al menos un número (#) y una letra mayúscula (A)!",
                  },
                })}
              />
              {errors.password && (
                <span style={{ marginTop: "1vh" }}>
                  {errors.password.message}
                </span>
              )}
              <h3 style={{ marginTop: "2vh", color: "white" }}>
                Confirmar contraseña
              </h3>
              <input
                className="n-card-input"
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                  required: {
                    value: true,
                    message: "*Campo requerido",
                  },
                })}
              />
              {errors.confirmPassword && (
                <span style={{ marginTop: "2vh" }}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div
              className="btn-close-container "
              style={{
                marginTop: "2vh",
                marginBottom: "5vh",
              }}
            >
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
