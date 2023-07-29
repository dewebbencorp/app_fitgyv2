import { IonButton, IonContent, IonInput, IonLabel } from "@ionic/react";
import { useState } from "react";
import logo from "./images/logo.png";
import "./login.css";
import { useForm } from "react-hook-form";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <IonContent>
      <div className="login-container">
        <div className="logo-container">
          <img id="logo" src={logo} alt="Logo" />
        </div>

        <div id="login">
          <form onSubmit={onSubmit}>
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
