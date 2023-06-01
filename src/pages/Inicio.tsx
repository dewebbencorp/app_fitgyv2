import { IonContent } from "@ionic/react";
import Logo from './component_inicio/Logo'
import Video from './component_inicio/Video';
import Noticias from "./component_inicio/Noticias";
import CodigoQR from './component_inicio/CodigoQR';
import Tarjeta from "./component_inicio/Tarjeta";
import Whats from './component_inicio/Whats';



const Inicio  =() =>{

    
    return (
        <IonContent>
          
           <Logo/> 
    
           <Video/>
           <Noticias/>
           <CodigoQR/>
          
           <Tarjeta/>
           <Whats/>
        </IonContent>
    );
}

export default Inicio;