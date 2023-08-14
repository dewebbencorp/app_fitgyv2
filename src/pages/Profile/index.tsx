import { IonContent, IonLabel, IonInput } from "@ionic/react";
import Informacion from "../component_datos/Informacion";
import Puntos from "../component_datos/Puntos";
import AgendarCita from "../component_datos/agendarCita";
import ClienteMembresia from "../component_datos/ClienteMembresia";
import CerrarSesion from "../component_datos/CerrarSesion";
import { UserProfile } from "../../components/Profile";

export const Profile = () => {
  return (
    <IonContent>
      <UserProfile />
    </IonContent>
  );
};
