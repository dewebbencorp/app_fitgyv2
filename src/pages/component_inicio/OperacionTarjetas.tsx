import { IonContent,IonRadioGroup,IonRadio, IonModal,IonButton,IonLabel,IonInput,IonGrid,IonRow,IonCol,IonAlert,IonProgressBar } from "@ionic/react"
import { useState,useEffect,useRef } from "react";
import f_atras from './../component_datos/img/f_atras.png';
import { useHistory } from 'react-router';
import { useAuth } from './../../UserProvider';
import './css/operacionTarjetas.css';
const OperacionTarjetas = () =>{
    const datosTarjeta = useRef<HTMLFormElement | null>(null);
   
    const [numTarjetas,setNumTarjetas] = useState<{Activo:boolean,numTarjeta:string}[]>();
    const [tarjetaActiva, setTarjetaActiva] = useState('');
    const [alerta, setAlerta] = useState('');
    const [showModal,setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const {user} = useAuth();
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const history = useHistory();
    const regreso = () =>{
        console.log("regreso");
        history.push('/home/inicio')
    }
    
    useEffect(()=>{
        
        const url = "https://187.188.16.29:4431/webservice-app2/controllers/getTarjetasBancarias.php";
        let send={
            "claveSocio":user?.Clav_Asociado
        };
        fetch(url, {
            method: 'POST', // or 'PUT'
             // data can be `string` or {object}!
             body:JSON.stringify(send),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
              
                console.log(data);
                setNumTarjetas(data);
                for (const iterator of data) {
                   
                    if(iterator.Activo){
                        setTarjetaActiva(iterator.numTarjeta);
                    }
                }
            
                // Manejar la respuesta del servidor
              

          

            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    },[]);


    const validarTarjeta = ()=>{
        setShowProgress(true);
        setAlerta("");
        if(datosTarjeta.current){
            
            var numTarjeta = datosTarjeta.current.numTarjeta.value.trim();
            var mes = datosTarjeta.current.mes.value;
            var anio = datosTarjeta.current.anio.value;
            var cvv = datosTarjeta.current.cvv.value;
            const fechaActual = new Date();
            const anioActual = fechaActual.getFullYear();
            const yy = anioActual%1000 ;
         console.log(cvv);
            if (numTarjeta == "" || mes == "" || anio == "" || cvv == ""){
                setAlerta("***Todos los datos son requeridos");
            }
            if(mes < 1 || mes >12){
                setAlerta("***Ingresé un mes valido");
                return;
            }
         
            if(anio < yy){
                setAlerta("***Tarjeta vencida");
                return;
            }

            if(mes /10 >10 || mes < 1){
                setAlerta("***Ingresé un mes valido");
                return;
            }
            if(anio / 10 >10 || anio / 10 <0){
             
                setAlerta("***Ingresé un año valido");
                return;
            }
            if(cvv /100 >10 || cvv /100 < 0){
                setAlerta("***Ingresé un cvv valido");
                return;
            }
            
            if(!luhnCheck(numTarjeta)){
                setAlerta("***Número de tarjeta invalido");
                return;
            }
            else{
                const url = "https://187.188.16.29:4431/webservice-app2/controllers/addTarjeta.php";
                let data ={
                    "claveSocio":user?.Clav_Asociado,
                    "numTarjeta":numTarjeta,
                    "vencimiento":mes.toString() + anio.toString(),
                    "cvv":cvv
                };

                fetch(url, {
                    method: 'POST', // or 'PUT'
                     // data can be `string` or {object}!
                     body:JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .then(data => {
                      
                        console.log(data);
                        if(data.insertado == 1){
                          
                            setTimeout(function(){
                                

                                confirmarToken(numTarjeta);
                                setShowProgress(false);

                            },5000);
                           

                        }
                    
                        // Manejar la respuesta del servidor
                      
        
                  
        
                    })
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response));
            }


        }
    }


    const confirmarToken = (numTarjeta:number)=>{
        const url = "https://187.188.16.29:4431/webservice-app2/controllers/confirmarToken.php";
        let data ={
            "claveSocio":user?.Clav_Asociado,
            "numTarjeta":numTarjeta,
        
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
             // data can be `string` or {object}!
             body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
              
                console.log(data);
                
                if(data.exito){

                }
                else{
                    setAlerta(data.mensaje);
                }
                // Manejar la respuesta del servidor
              
              
          

            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    return (
    <IonContent>
        <div id="flechaAtras">
        <img width="10%" onClick={regreso} id="flechaAtras" src={f_atras}/>
        </div>
        <div className="contenidoTarjetas">
            <h3>Tarjetas</h3>
            <IonRadioGroup value={tarjetaActiva} >
            {numTarjetas?.map((item,index)=>(
                item.Activo?
                <IonRadio value={item.numTarjeta} labelPlacement="end" key={index}>{item.numTarjeta} (Activa)</IonRadio>
                :
                <IonRadio value={item.numTarjeta} labelPlacement="end" key={index}>{item.numTarjeta} </IonRadio>
            
            ))}
            </IonRadioGroup>

            <IonButton onClick={()=>setShowModal(true)}>Agregar tarjeta</IonButton>

        </div>


        <IonModal isOpen={showModal}>
            <IonContent className="altaTarjetas">
              
                 <h3>Alta de tarjeta</h3>
                 <form ref={datosTarjeta}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                            <IonLabel>N° Tarjeta</IonLabel>
                            <IonInput
                             type="number"
                            placeholder="Ingrese el numero de tarjeta"
                            name="numTarjeta"
                           
                            />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>Fecha de vencimiento</IonLabel>
                              
                            </IonCol>
                              

                        </IonRow>
                        <IonRow>
                            <IonCol>
                            
                            <IonInput
                            type="number"
                            placeholder="MM"
                            name="mes"
                            
                     
                            
                            />
                             
                            </IonCol>
                            <IonCol>
                        
                            <IonInput
                               type="number"
                               placeholder="YY"
                               name="anio"
                              
                             />
                            </IonCol>

                        </IonRow>

                        <IonRow>
                            <IonCol>
                            <IonLabel>Código de seguridad</IonLabel>
                             <IonInput
                             type="number"
                             name="cvv"
                             placeholder="___"
                             maxlength={3}
                             />
                            </IonCol>
                            </IonRow>
                        <IonRow>
                            <IonCol >
                            <IonButton id="btn_guardarTarjeta" onClick={validarTarjeta} size="large">Guardar</IonButton>
                          
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonButton id="btn_salir" onClick={()=>setShowModal(false)} size="large"> Salir </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                            <div id="alertaTarjeta">{alerta}</div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>


                 </form>
                 {showProgress  ?
                          <IonProgressBar className="progress" type="indeterminate" color="light"></IonProgressBar>
                    :<div></div>} 
                 
                   
            </IonContent>
                   
                   
           
                   
        </IonModal>
   
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={'Exito'}
        
            message={'Su tarjeta ha sido aprobada'}
            buttons={[{
                text:"Ok",
            }]}
        />
    </IonContent>
    )
}
const luhnCheck = (num:number):boolean => {
  const arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  const lastDigit = arr.shift();
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
    0
  );
  if(lastDigit){
      sum += lastDigit;

  }
  return sum % 10 === 0;
};
export default OperacionTarjetas;