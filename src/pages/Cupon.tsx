import { IonButton, IonContent, IonInput, IonModal,IonAlert, IonProgressBar } from "@ionic/react";
import Barcode from 'react-barcode';
import { useState, useEffect,useRef } from "react";
import { SocialSharing } from '@ionic-native/social-sharing';
import { useAuth } from './../UserProvider';
import html2canvas from 'html2canvas';
import cupon from './img/cupon.png'
import compartir from './img/compartir.png';
import { useHistory } from 'react-router';
import './css/cupon.css';
import ListaBarcode from "./component_barcode/ListaBarcode";


const Cupon = () => {
    
    const { user } = useAuth();
    const [codigo, setCodigo] = useState('');
    const [beneficiario, setBeneficiario] = useState('');
    const [aceptaTerminos,setAceptaTerminos] = useState<boolean>();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertCondiciones, setShowAlertCondiciones] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showListaCodigos ,setShowListaCodigos] = useState<boolean>(false); 
    const [fechaFormateada, setFechaFormateada] = useState('');
    const [anuncio, setAnuncio] = useState('');
    const [progressTerminos, setProgressTerminos] = useState(false);
    const barcode = useRef(null);
 
    useEffect(() => {
        const fechaActual = new Date();
        setFechaFormateada(formatFecha(fechaActual));
        console.log("alerta condiciones",showAlertCondiciones);
        let send = ({
            "claveSocio":user?.Clav_Asociado
        })
        let url = "https://187.188.16.29:4431/webservice-app2/controllers/getAceptaTerminos.php";
            fetch(url, {
                method: 'POST', // or 'PUT'
                 // data can be `string` or {object}!
                 body:JSON.stringify(send),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                  
                    setAceptaTerminos(data.aceptoTerminos);
                 
                    if(aceptaTerminos == false){
                       setAnuncio('Debes aceptar los términos y condiciones');
                        setShowAlertCondiciones(true);
                    }
                    else{
                        setShowAlertCondiciones(false);
                    }
                    // Manejar la respuesta del servidor
                  
                  
              

                })
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));

        
    },[fechaFormateada,aceptaTerminos]);

    

   const aceptoTerminos = () =>{
    setAnuncio('Aceptando terminos...');
    setProgressTerminos(true);
    let send = ({
        "claveSocio":user?.Clav_Asociado
    })
    let url = "https://187.188.16.29:4431/webservice-app2/controllers/aceptaTerminos.php";
    fetch(url, {
        method: 'POST', // or 'PUT'
         // data can be `string` or {object}!
         body:JSON.stringify(send),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            setProgressTerminos(false);
            console.log(data);
            if(data.valido){
                setAceptaTerminos(true);
            }
          
      

        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
   }
    const share = async () => {
        setShowProgress(true);
       if (barcode.current){

           html2canvas(barcode.current).then(function(canvas){
            
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            
            try {
              
                SocialSharing.share('Te envio este regalo para que disfrutes :)','Te envio este regalo para que disfrutes :)',img.src);
                setShowProgress(false);
               console.log('Compartido con éxito');
             } catch (error) {
               console.error('Error al compartir:', error);
             }
           });
       }
       
       
      
      
   
    
 
     
      };
    


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
                {aceptaTerminos?
                 <div className="generaCupon">

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

                    <div id="btn_listar">
                    <IonButton onClick = {() => setShowListaCodigos(true)} > Códigos generados </IonButton>
                    </div>
                 </div>
                
                
                :<div><h2 className="poppins" id="anuncio">{anuncio} </h2></div>}
                  {progressTerminos ?
                          <IonProgressBar className="progress" type="indeterminate" color="light"></IonProgressBar>
                    :<div></div>}

            <IonModal isOpen={showModal}>
                
            <div ref = {barcode} id="barcode">
                <div id="barraNaranja">
                    <h3 className="poppins">Cupón exitoso</h3>
                    <p className="poppins">{fechaFormateada}</p>
                    <p className="poppins">Beneficiario: {beneficiario}</p>
                </div>
                <div id="tarjetaRegalo">

                    <div>
                        <Barcode   value={codigo}  />
                   

                    </div>
                        
                </div>
                
                </div>
                    <div id="cerrar">

                        <div id="compartir">
                            <img src={compartir} onClick={share} width="10%" />
                            <p className="poppins">Compartir</p>
                        </div>
                        <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>

                    </div>
                    {showProgress ?
                          <IonProgressBar className="progress" type="indeterminate" color="light"></IonProgressBar>
                    :<div></div>}
                   
            </IonModal>


            <IonModal isOpen={showListaCodigos}>
                        <ListaBarcode/>
                        <IonButton onClick={()=>setShowListaCodigos(false)}>Cerrar</IonButton>
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
           <IonAlert
            isOpen={showAlertCondiciones}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={'Términos y condiciones'}
        
            message={'¿Aceptas los terminos y condiciones?'}
            buttons={[{
                text:"Si",
                role:"confirm",
                handler:() =>{aceptoTerminos()}
            
            },
            {
                text:"No",
                role:"cancel"
            }
        
        ]}
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

export default Cupon;