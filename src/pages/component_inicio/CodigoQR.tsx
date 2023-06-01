import { IonButton } from "@ionic/react";
import './css/codigoQR.css';
import qr from './img/qr.png'
const CodigoQR = () =>{
    return(
        <div className="btn_codigoQR">
            <IonButton fill="outline"><img src={qr}/><span className="poppins"> Código QR </span></IonButton>
        </div>
    );
}
export default CodigoQR;