
import { Asociado } from '../../interfaces';
import './css/clienteMembresia.css'
import {useSelector} from "react-redux"

import { useEffect,useState } from 'react';
const ClienteMembresia = () =>{
    const user: Asociado = useSelector((state) => state.user);
    const [fechaVencimiento,setFechaVencimiento] = useState<string>();
    useEffect(()=>{
        let fechaPrev = user?.fechaO;
        let arrayFecha = fechaPrev?.split("-");
        if(arrayFecha != null){
            let mes = arrayFecha[1];
            console.log(arrayFecha);      
             switch (mes) {
                    case "01":{
                        let descripcionFecha = arrayFecha[2] + " de Enero de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "02":{
                        let descripcionFecha = arrayFecha[2] + " de Febrero de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        
                        break;
                    }
                    case "03":{
                        let descripcionFecha = arrayFecha[2] + " de Marzo de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        
                        break;
                    }
                    case "04":{
                        let descripcionFecha = arrayFecha[2] + " de Abril de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "05":{
                        let descripcionFecha = arrayFecha[2] + " de Mayo de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        
                        break;
                    }
                    case "06":{
                        let descripcionFecha = arrayFecha[2] + " de Junio de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "07":{
                        let descripcionFecha = arrayFecha[2] + " de Julio de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "08":{
                        let descripcionFecha = arrayFecha[2] + " de Agosto de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "09":{
                        let descripcionFecha = arrayFecha[2] + " de Septiembre de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "10":{
                        let descripcionFecha = arrayFecha[2] + " de Octubre de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "11":{
                        let descripcionFecha = arrayFecha[2] + " de Noviembre de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    case "12":{
                        let descripcionFecha = arrayFecha[2] + " de Diciembre de "+arrayFecha[0];
                        setFechaVencimiento(descripcionFecha);
                        break;
                    }
                    default:
                        setFechaVencimiento("Mes indefinido");
                        break;
                }
        

        }
    

    });
    return (
        <div className="clienteMembresia">
           <div className="itemCM1 kenyan"><h4> <i> MEMBRESIA </i></h4></div>
           <div className="itemCM2 poppins"><p> Activa hasta: {fechaVencimiento}</p></div>
        </div>
    );
}
export default ClienteMembresia;