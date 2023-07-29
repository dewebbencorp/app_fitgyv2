import { IonButton, IonContent, IonInput } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "./images/logo.png";
import "./login.css";
import { useForm } from "react-hook-form";
import { UseFecthPost } from "../../api/post";
import { Asociado, LoginError } from "../../interfaces";
import { addUser } from "../../store/userSlice";
import { useHistory } from "react-router-dom";
export const Login = () => {
  const [request, setRequest] = useState({});
  const [error, setError] = useState<LoginError>();
  const dispatch = useDispatch();
  const history = useHistory();
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
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setRequest(data);
  });

  const { data } = UseFecthPost(request, "login.php");

  const response: Asociado = data;

  const auth = (esSocio: number, err: any, response: Asociado) => {
    if (esSocio === 1) {
      console.log("SI ES SOCIO");
      console.log(response);
      
      dispatch(addUser(response));
      history.push("/home")
    } else if (!error) {
      console.log("NO ES SOCIO");
      console.log(err);
      setError(err);
    }
  };

  if (data.length !== 0) {
    console.log("Es socio : " + JSON.stringify(response.esSocio));
    auth(response.esSocio, response, response);
  }

  return (
    <IonContent>
      <div className="login-container">
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
            {errors.password && <span>{errors.password.message}</span>}

            <IonButton expand="full" type="submit" className="btn_login">
              Iniciar sesión
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
  );
};
