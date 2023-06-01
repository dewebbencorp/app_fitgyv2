import { IonButton } from "@ionic/react";
import schedule from './img/schedule.png'
import './css/agendarCita.css'
const AgendarCita = () =>{
    return(

        <div className="btn_agendar">
            <IonButton className="btn_agendar"><img  width="10%" src={schedule}/> &nbsp; Agendar Inbody</IonButton>

        </div>
    )
     
    
}

export default AgendarCita;