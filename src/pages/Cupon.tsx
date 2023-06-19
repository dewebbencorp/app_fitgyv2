import { IonButton, IonContent,IonInput,IonModal } from "@ionic/react";
import  Barcode  from 'react-barcode';
import { useState } from "react";
import cupon from './img/cupon.png'
import './css/cupon.css';

const Cupon = () =>{
    const [beneficiario,setBeneficiario] = useState('');
    const [showModal ,setShowModal] = useState<boolean>(false);
    const [alerta, setAlerta] = useState('');
        const openBarcode =  () =>{
            console.log("hola");
            if(beneficiario == ""){
            
            }
           else{
            
            setShowModal(true);
           }
           
        }




    return (
        <IonContent>
                <div id="barraNaranja">

                </div>

                <div id="contenedorCupon">
             
                </div>
                <div id="tituloCupon">
                        <h5 className="poppins" id="t_fit">The Fit Bar</h5>
                        <span className="poppins" id="t_cupon">CUPÓN</span>

                    </div>
                
                <div id="nombreBeneficiario">
                <IonInput 
                placeholder="Nombre de beneficiario"
                value={beneficiario}
            
                errorText={alerta}
                onIonInput={(e:any) => { setBeneficiario(e.target.value) }}
                
                ></IonInput>
                {alerta}
                </div>
              
                <div id="btn_generar">
                
                    <IonButton ><img src={cupon} width="10%"  onClick={openBarcode}/> &nbsp; Generar</IonButton>
                </div>

                <IonModal isOpen={showModal}>
                    <h3>{beneficiario}</h3>
                    <Barcode value="123456789" />
                </IonModal>
        </IonContent>

    );
}

export default Cupon;