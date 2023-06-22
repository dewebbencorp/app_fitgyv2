import { IonButton, IonContent, IonInput, IonModal,IonAlert } from "@ionic/react";
import Barcode from 'react-barcode';
import { useState, useEffect,useRef } from "react";
import { SocialSharing } from '@ionic-native/social-sharing';
import { useAuth } from './../UserProvider';

import cupon from './img/cupon.png'
import compartir from './img/compartir.png';
import './css/cupon.css';


const Cupon = () => {
    
    const { user } = useAuth();
    const [codigo, setCodigo] = useState('');
    const [beneficiario, setBeneficiario] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fechaFormateada, setFechaFormateada] = useState('');


 
    

    useEffect(() => {
        const fechaActual = new Date();
        setFechaFormateada(formatFecha(fechaActual));

        console.log(fechaFormateada);

        
    });


    const crearCodigoBarras = () => {

        if (beneficiario != "") {
            let send = ({
                "beneficiario": beneficiario,
                "claveSocio": user?.Clav_Asociado
            });
            let url = "https://187.188.16.29:4431/webservice-app2/controllers/crearTarjetaRegalo.php";
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(send), // data can be `string` or {object}!
                headers: {
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
        else{
            setShowAlert(true);
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


                    onIonInput={(e: any) => { setBeneficiario(e.target.value) }}

                ></IonInput>

            </div>

            <div id="btn_generar">

                <IonButton onClick={crearCodigoBarras} ><img src={cupon} width="10%" /> &nbsp; Generar</IonButton>
            </div>

            <IonModal isOpen={showModal}>
                <div id="barraNaranja">
                    <h3 className="poppins">Cupón exitoso</h3>
                    <p className="poppins">{fechaFormateada}</p>
                    <p className="poppins">Beneficiario: {beneficiario}</p>
                </div>
                <div id="tarjetaRegalo">

                    <div   id= "barcode" >
                        <Barcode   value={codigo}  />
                   

                    </div>
                        
                    <div id="cerrar">

                        <div id="compartir">
                            <img src={compartir} onClick={share} width="10%" />
                            <p className="poppins">Compartir</p>
                        </div>
                        <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
                    </div>
                </div>
            </IonModal>





            <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={'Cuidado'}
      
        message={'Debe ingresar un beneficiario.'}
        buttons={[{
            text:"Ok",
           
        }]}
      />
        </IonContent>

    );
}

const formatFecha = (fecha: Date) => {
    const diaActual = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anioActual = fecha.getFullYear();
    let fechaFormateada = "";
    switch (mesActual) {
        case 1:
            fechaFormateada = diaActual + " de Enero de " + anioActual;
            break;
        case 2:
            fechaFormateada = diaActual + " de Febrero de " + anioActual;
            break;
        case 3:
            fechaFormateada = diaActual + " de Marzo de " + anioActual;
            break;
        case 4:
            fechaFormateada = diaActual + " de Abril de " + anioActual;
            break;
        case 5:
            fechaFormateada = diaActual + " de Mayo de " + anioActual;
            break;
        case 6:
            fechaFormateada = diaActual + " de Junio de " + anioActual;
            break;
        case 7:
            fechaFormateada = diaActual + " de Julio de " + anioActual;
            break;
        case 8:
            fechaFormateada = diaActual + " de Agosto de " + anioActual;
            break;
        case 9:
            fechaFormateada = diaActual + " de Septiembre de " + anioActual;
            break;
        case 10:
            fechaFormateada = diaActual + " de Octubre de " + anioActual;
            break;
        case 11:
            fechaFormateada = diaActual + " de Noviembre de " + anioActual;
            break;
        case 12:
            fechaFormateada = diaActual + " de Diciembre de " + anioActual;
            break;

        default:
            fechaFormateada = "Fecha incorrecta"
            break;


    }
    return fechaFormateada;
}
const share = async () => {
    const barcode = document.getElementById("barcode");;
    let canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    

    const width = barcode.offsetWidth;
    const height = barcode.offsetHeight;
  
    // Establece el tamaño del canvas para que coincida con el div
    canvas.width = width;
    canvas.height = height;

    // Copia el contenido del div al canvas
    const image = new Image();
    const svg = new Blob([barcode.innerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svg);
  image.src = url;

    image.onload = () => {
    // Copiar el contenido de la imagen al canvas
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        const imageData = canvas.toDataURL('image/png');

        try {
             SocialSharing.share('Te envio este regal para que disfrutes :)','Te envio este regal para que disfrutes :)',imageData);
      
            console.log('Compartido con éxito');
          } catch (error) {
            console.error('Error al compartir:', error);
          }
    }
 
  };
export default Cupon;