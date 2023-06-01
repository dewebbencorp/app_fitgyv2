import { IonButton } from "@ionic/react";
import './css/cerrarSesion.css';
import { useAuth } from "../../UserProvider";
import { useEffect } from "react";
import {useHistory} from 'react-router';
const CerrarSesion = () =>{
    const history = useHistory();
    const {logout,salir} = useAuth();

    useEffect(()=>{
        if(salir == true){
            history.replace("/login");
        }
    },[salir,history]);
    const cerrarSesion=() =>{
        logout();
    }
    
    return(
        <div className="btn_cerrarSesion">
            <IonButton onClick={cerrarSesion}>Cerrar sesión</IonButton>

        </div>
    );
} 
export default CerrarSesion;