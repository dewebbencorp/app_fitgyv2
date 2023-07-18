import { IonContent, IonLabel,IonInput } from "@ionic/react";
import Informacion from './component_datos/Informacion'
import Puntos from './component_datos/Puntos';
import './css/informacionCliente.css';
import MiCuenta from "./component_datos/Micuenta";
import AgendarCita from "./component_datos/agendarCita";
import ClienteMembresia  from "./component_datos/ClienteMembresia";
import CerrarSesion from "./component_datos/CerrarSesion";
const InformacionCliente  = ()=>{

    return(
        <IonContent>
          <Informacion/>
    
          <Puntos/>
          <AgendarCita/>
          <ClienteMembresia/>
            <CerrarSesion />
     
           
        </IonContent>


    );


};
export default InformacionCliente;