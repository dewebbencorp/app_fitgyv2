import { IonButton, IonContent, IonInput, IonLabel } from "@ionic/react";
import logo from "./images/logo.png";
import "./login.css";
export const Login = () => {
  return (
    <>
      <IonContent>
        <div className="login-container">
          <div className="logo-container">
            <img id="logo" src={logo} />
          </div>

          <div id="login">
            <form>
              <IonLabel className="labelLogin">Usuario</IonLabel>
              <IonInput />
              <br />
              <IonLabel className="labelLogin">Contraseña</IonLabel>
              <IonInput type="password" id="password" />
              <IonButton expand="full" className="btn_login">
                Iniciar sesión
              </IonButton>
            </form>
          </div>
        </div>
      </IonContent>
    </>
  );
};
