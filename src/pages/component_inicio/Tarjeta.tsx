import { IonButton } from "@ionic/react";
import tarjeta from './img/tarjeta.png';
import './css/tarjeta.css';
import { useAuth } from "../../UserProvider";
import { useEffect, useState } from "react";
const Tarjeta = () =>{
    const {user} = useAuth();
    const [titular,setTitular] = useState<boolean>();
    useEffect(()=>{
        if(user !=null){
            setTitular(user.titular);
        }

    },[user,setTitular]);
    return(
        <div className="btn_tarjeta">
            {titular == false ?  <IonButton disabled={true}  fill="outline"><img src={tarjeta}/><span> Tarjeta </span></IonButton> 
            : <IonButton fill="outline"><img src={tarjeta}/><span> Tarjeta </span></IonButton>  }
           
        </div>
    );
}

export default Tarjeta;