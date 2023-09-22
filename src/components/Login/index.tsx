import { IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "./images/logo.png";
import "./login.css";
import { useForm } from "react-hook-form";
import { Asociado, LoginError, ResponseUpdate } from "../../interfaces";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addUser } from "../../store/slices/userSlice";
import { Loading } from "../LoadScreen";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { forgotMyPassword, login } from "../../axios/User";
import VIDEO_URL from "./video/background_login.mp4";
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [rpIsActive, setRpActive] = useState(false);
  const [rpResponse, setRpResponse] = useState<any>();
  const [error, setError] = useState<LoginError>();
  const history = useHistory();
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const user: Asociado = useSelector((state: Asociado) => state.user);

  useEffect(() => {
    if (user.status === 1) {
      history.replace("/home");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const dta: any = await dispatch(login(data.email, data.password));
    if (dta) {
      setLoading(false);
    }
    if (dta.status === 1) {
      dispatch(addUser(dta));
      history.replace("/home");
    } else {
      console.log(dta.response);
      setError(dta);
      history.replace("/login");
    }
  });

  const resetPass = handleSubmit(async (data) => {
    reset();
    console.log(data.email);
    const dta: ResponseUpdate = await dispatch(forgotMyPassword(data.email));
    setRpResponse(dta.response);
  });
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };
  return (
    <IonContent>
      <div className="dot-container">
        <div className="video">
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            onCanPlayThrough={handleVideoLoaded}
            style={{ display: videoLoaded ? "block" : "none" }}
          />
        </div>
        {user.status === 1 ? (
          <Loading />
        ) : (
          <div className="login-container">
            <div className="card-login-container">
              <div className="logo-container">
                <img id="logo" src={logo} alt="Logo" />
              </div>

              <div id="login" className="input-lg">
                {!rpIsActive ? (
                  <>
                    <form onSubmit={onSubmit}>
                      <h5 style={{ width: "400px" }}>
                        {error && <span>{error.response}</span>}
                      </h5>

                      <input
                        placeholder="Correo"
                        type="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Correo es requerido",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Correo no válido",
                          },
                        })}
                      />
                      {errors.email && <span>{errors.email.message}</span>}
                      <input
                        placeholder="Contraseña"
                        type="password"
                        id="password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "La contraseña es requerida",
                          },
                          minLength: {
                            value: 3,
                            message: "Contraseña debe ser mayor a 3 caracteres",
                          },
                        })}
                      />
                      {errors.password && (
                        <span>{errors.password.message} </span>
                      )}

                      <div className="btn_login-container">
                        <button type="submit" className="btn_login">
                          Entrar
                        </button>
                        <span onClick={() => setRpActive(true)}>
                          Olvidé mi contraseña
                        </span>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <form onSubmit={resetPass}>
                      <div className="reset-pass-container">
                        <span onClick={() => setRpActive(true)}>
                          {!rpResponse && <>Ingresa tu correo</>}
                          {rpResponse && <>{rpResponse}</>}
                        </span>
                      </div>
                      <input
                        placeholder="Correo"
                        type="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Correo es requerido",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Correo no válido",
                          },
                        })}
                      />

                      <div className="btn_login-container">
                        <button type="submit" className="btn_login">
                          Enviar
                        </button>
                        <span onClick={() => setRpActive(false)}>Entrar </span>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
            {loading && <Loading />}
          </div>
        )}
      </div>
    </IonContent>
  );
};
