import { IonButton, IonContent, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "./images/logo.png";
import "./login.css";
import { useForm } from "react-hook-form";
import { UseFecthPost } from "../../auth/post";
import { Asociado, LoginError } from "../../interfaces";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addUser } from "../../store/slices/userSlice";
import { Loading } from "../LoadScreen";

export const Login = () => {
  const [request, setRequest] = useState({});
  const [error, setError] = useState<LoginError>();;
  const history = useHistory();
  const dispatch = useDispatch();

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
    watch,
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

  const { data, loading } = UseFecthPost(request, "login.php");



  const response: Asociado = data;

  const auth = (esSocio: number, err: any, response: Asociado) => {
    if (esSocio === 1) {
      console.log("SI ES SOCIO");
      console.log(response);

      dispatch(addUser(response))
      history.replace("/home");
    } else if (!error) {
      console.log("NO ES SOCIO");
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

      {
        user.esSocio === 1 ? <Loading /> : (<div className="login-container">
          <div className="logo-container">
            <img id="logo" src={logo} alt="Logo" />
          </div>

          <div id="login">
            <form onSubmit={onSubmit}>
              <h5 style={{ width: "400px" }}>
                {error && <span>{error.mensaje}</span>}
              </h5>
              <label>Correo Electrónico:</label>
              <IonInput
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
              <label>Contraseña</label>
              <IonInput
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 6,
                    message: "Contraseña debe ser mayor a 6 caracteres",
                  },
                })}
              />
              {errors.password && <span>{errors.password.message} </span>}

              <IonButton expand="full" type="submit" className="btn_login">
                Iniciar sesión
              </IonButton>
            </form>
          </div>
          {loading && (
            <Loading />
          )}
        </div>)
      }

    </IonContent>
  );
};
