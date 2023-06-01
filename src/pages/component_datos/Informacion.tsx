import foto from './img/user.png'
import icono from './img/i_pencil.png';
import './css/Informacion.css';
import { useAuth } from '../../UserProvider';
import { useEffect, useState } from 'react';
const Informacion = () =>{
    const {user} = useAuth();
    const [nombre,setNombre] = useState<string>();
   useEffect(()=>{
    if(user !=null){
        setNombre(user.Nombre_Asociado + " "+user.Apellidos);
    }
   });
    return(
        <div className=".infoUsuario">
            <div className="barraNaranja"></div>
            <div className="  barraBlanca">
                
                <div className="container">
                    <div className="itemInfo1 itemInfo">
                       <img src={foto}/>
                    </div>
                
                  
                    <div className="itemInfo2 itemInfo">
                        <h4><i>{nombre}</i></h4>
                        <p className='poppins'>+ Información Básica </p>
                    </div>
               
                <div className="itemInfo3 itemInfo">
                <img src={icono}/>
                </div>

                </div>
           
            </div>

          </div>

         
    );


};
export default Informacion;