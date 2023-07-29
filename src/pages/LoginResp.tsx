import { useState, useEffect } from "react";
import "./css/login.css";
import logo from "./img/logo.png";
import { IonButton, IonContent, IonInput, IonLabel } from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../UserProvider";

const LoginResp = () => {
  const currentURL = window.location.href;
  console.log(currentURL);
  const history = useHistory();
  const { login, alerta, redireccionar, salir } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //console.log(email);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  if (salir == true) {
    console.log("La aplicacion cerro sesión");
    location.reload();
  } else {
    console.log("La aplicacion no cerro sesión");
  }
  useEffect(() => {
    const ionTabs = document.querySelector("ion-tabs");
    if (ionTabs) {
      ionTabs.style.display = "none";
    }

    return () => {
      if (ionTabs) {
        ionTabs.style.display = "flex";
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    //validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    if (validateEmail(value) !== null) {
      setEmail(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const iniciarSesion = () => {
    login(email, password);
    console.log("login");
    console.log(redireccionar);
    console.log(alerta);
  };
  useEffect(() => {
    console.log("Entre");
    console.log(redireccionar);
    if (redireccionar) {
      history.push("/home");
    }
  }, [redireccionar, history]);
  /*const iniciarSesion = (e:Event)=>{
    e.preventDefault();
   
    login(email,password);
  
    
    let data = ({
      "email":email,
      "password":password
    });
    console.log(data);
    let url:string = "https://187.188.16.29:4431/webservice-app2/controllers/login.php";
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      // Manejar la respuesta del servidor
      console.log(data);
      if(data.esSocio == 1 ) {
        history.push("/home/"+data.Clav_Asociado+"/"+data.titular);
      }
      else{
        setAlerta(data.mensaje);
      }
    })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }*/

  return (
    <IonContent>
      <img id="logo" src={logo} />

      <div id="login">
        <span id="alerta">{alerta}</span>
        <form>
          <IonLabel className="labelLogin">Usuario</IonLabel>
          <IonInput />
          <br />
          <IonLabel className="labelLogin">Contraseña</IonLabel>
          <IonInput
            type="password"
            id="password"
            value={password}
            onIonInput={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <IonButton expand="full" className="btn_login">
            Iniciar sesión
          </IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default LoginResp;
