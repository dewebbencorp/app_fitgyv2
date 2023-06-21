import { IonButton, IonContent,IonInput,IonModal } from "@ionic/react";
import  Barcode  from 'react-barcode';
import { useState,useEffect } from "react";
import { useAuth } from './../UserProvider';

import cupon from './img/cupon.png'
import compartir from './img/compartir.png';
import './css/cupon.css';

const Cupon = () =>{
    const {user} = useAuth();
    const [codigo,setCodigo] = useState('');
    const [beneficiario,setBeneficiario] = useState('');
    const [showModal ,setShowModal] = useState<boolean>(false);
    const [fechaFormateada,setFechaFormateada] = useState('');
    useEffect(() =>{
        const fechaActual = new Date();
       setFechaFormateada(formatFecha(fechaActual));
    
        console.log(fechaFormateada);
    });
   
        
        const crearCodigoBarras =   () =>{
            let send = ({
                "beneficiario":beneficiario,
                "claveSocio":user?.Clav_Asociado
            });
        let url = "https://187.188.16.29:4431/webservice-app2/controllers/crearTarjetaRegalo.php";
           fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(send), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(data => {
            console.log(data);
            // Manejar la respuesta del servidor
            setCodigo(data.codigo);
            setShowModal(true);
           
          })
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));   
          
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
            
             
                onIonInput={(e:any) => { setBeneficiario(e.target.value) }}
                
                ></IonInput>
            
                </div>
             
                <div id="btn_generar">
                
                    <IonButton onClick={crearCodigoBarras} ><img src={cupon} width="10%"  /> &nbsp; Generar</IonButton>
                </div>

                <IonModal isOpen={showModal}>
                <div id="barraNaranja">
                        <h3 className="poppins">Cupón exitoso</h3>
                        <p className="poppins">{fechaFormateada}</p>
                        <p className="poppins">Beneficiario: {beneficiario}</p>
                </div>
                    <div id="tarjetaRegalo">
                            


                        <Barcode value={codigo} />
                        <div id="cerrar">

                            <div id="compartir">
                                <img src={compartir} width="10%" />
                                <p className="poppins">Compartir</p>
                            </div>
                            <IonButton onClick={()=>setShowModal(false)}>Cerrar</IonButton>
                        </div>
                    </div>
                </IonModal>
        </IonContent>

    );
}

const formatFecha = (fecha : Date) =>{
    const diaActual = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anioActual = fecha.getFullYear();
    let fechaFormateada  = "";
    switch (mesActual) {
        case 1:
                fechaFormateada =diaActual + " de Enero de " + anioActual;
            break;
        case 2:
            fechaFormateada =diaActual + " de Febrero de " + anioActual;
        break;
        case 3:
            fechaFormateada =diaActual + " de Marzo de " + anioActual;
        break;
        case 4:
            fechaFormateada =diaActual + " de Abril de " + anioActual;
        break;
        case 5:
            fechaFormateada =diaActual + " de Mayo de " + anioActual;
        break;
        case 6:
            fechaFormateada =diaActual + " de Junio de " + anioActual;
        break;
        case 7:
            fechaFormateada =diaActual + " de Julio de " + anioActual;
        break;
        case 8:
            fechaFormateada =diaActual + " de Agosto de " + anioActual;
        break;
        case 9:
            fechaFormateada =diaActual + " de Septiembre de " + anioActual;
        break;
        case 10:
            fechaFormateada =diaActual + " de Octubre de " + anioActual;
        break;
        case 11:
            fechaFormateada =diaActual + " de Noviembre de " + anioActual;
        break;
        case 12:
            fechaFormateada =diaActual + " de Diciembre de " + anioActual;
        break;
    
        default:
            fechaFormateada="Fecha incorrecta"
        break;

           
    }
    return fechaFormateada;
}
export default Cupon;