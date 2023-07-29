import { IonContent } from "@ionic/react";
import Logo from './component_inicio/Logo'
import Video from './component_inicio/Video';
import Noticias from "./component_inicio/Noticias";
import CodigoQR from './component_inicio/CodigoQR';
import Tarjeta from "./component_inicio/Tarjeta";
import Whats from './component_inicio/Whats';
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { Asociado } from "../interfaces";



const Inicio  =() =>{
    const user: Asociado = useSelector((state)=> state.user)
    console.log(user);
    
    return (
        <IonContent>
          
           <Logo/> 
    
           <Video/>
           <Noticias/>
           <CodigoQR/>
          <h1>name {user.Nombre_Asociado}</h1>
           <Tarjeta/>
           <Whats/>
        </IonContent>
    );
}

export default Inicio;