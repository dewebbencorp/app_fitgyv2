import { IonContent, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "./images/logo.png";
import "./login.css";
import { useForm } from "react-hook-form";
import { UseFecthPost } from "../../auth/post";
import { Asociado, LoginError, ResponseUpdate } from "../../interfaces";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addUser } from "../../store/slices/userSlice";
import { Loading } from "../LoadScreen";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { forgotMyPassword } from "../../axios/User";

export const Login = () => {
  const [request, setRequest] = useState({});
  const [rpIsActive, setRpActive] = useState(false)
  const [rpResponse, setRpResponse] = useState()
  const [error, setError] = useState<LoginError>();;
  const history = useHistory();
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const user: Asociado = useSelector((state: Asociado) => state.user);

  useEffect(() => {
    if (user.esSocio === 1) {
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setRequest(data);
  });

  const resetPass = handleSubmit(async (data) => {
    reset()
    console.log(data.email);
    const dta: ResponseUpdate = await dispatch(forgotMyPassword(data.email))
    setRpResponse(dta.response)


  });



  const { data, loading } = UseFecthPost(request, "/login.php");



  const response: Asociado = data;

  const auth = (esSocio: number, err: any, response: Asociado) => {
    if (esSocio === 1) {
      console.log("SI ES SOCIO");
      console.log(response);

      dispatch(addUser(response))
      history.replace("/home");
    } else if (!error) {
      console.log("NO ES SOCIO");
      history.replace("/login");
      setError(err);
    }
  };

  useEffect(() => {
    if (data.length !== 0) {
      console.log("Es socio : " + JSON.stringify(response.esSocio));
      auth(response.esSocio, response, response);
    }
  }, [response.esSocio]);



  return (
    <IonContent>

      <div className="dot-container">
        {
          user.esSocio === 1 ? <Loading /> : (
            <div className="login-container">
              <div className="card-login-container">
                <div className="logo-container">
                  <img id="logo" src={logo} alt="Logo" />
                </div>

                <div id="login" className="input-lg" >
                  {!rpIsActive ? <>
                    <form onSubmit={onSubmit}>
                      <h5 style={{ width: "400px" }}>
                        {error && <span>{error.mensaje}</span>}
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
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                      {errors.password && <span>{errors.password.message} </span>}

                      <div className="btn_login-container">
                        <button type="submit" className="btn_login">
                          Entrar
                        </button>
                        <span onClick={() => setRpActive(true)}>Olvidé mi contraseña</span>
                      </div>

                    </form>
                  </> : <>
                    <form onSubmit={resetPass}>
                      <div className="reset-pass-container">
                        <span onClick={() => setRpActive(true)}>{!rpResponse && <>Ingresa tu correo</>}
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
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Correo no válido",
                          },
                        })}
                      />


                      <div className="btn_login-container">
                        <button type="submit" className="btn_login">
                          Enviar
                        </button>
                        <span onClick={() => setRpActive(false)} >Entrar </span>
                      </div>

                    </form>

                  </>}
                </div>
              </div>
              {loading && (
                <Loading />
              )}
            </div>



          )
        }
      </div>

    </IonContent>
  );
};
