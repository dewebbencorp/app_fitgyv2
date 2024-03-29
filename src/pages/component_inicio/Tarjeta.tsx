import { IonButton,IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import tarjeta from './img/tarjeta.png';
import './css/tarjeta.css';
import { useAuth } from "../../UserProvider";

const Tarjeta = () =>{
    const history = useHistory();
    const {user} = useAuth();
    const [titular,setTitular] = useState<boolean>();



    useEffect(()=>{
        if(user !=null){
            setTitular(user.titular);
        }

    },[user,setTitular]);
    return(
        <IonContent>

            <div className="btn_tarjeta">
                {titular == false ?  <IonButton disabled={true}  fill="outline"><img src={tarjeta}/><span> Tarjeta </span></IonButton> 
                : <IonButton fill="outline" onClick={()=>{history.push('/home/inicio/tarjetas')}}><img src={tarjeta}/><span> Tarjeta </span></IonButton>  }
            
            </div>
        </IonContent>
    );
}

export default Tarjeta;