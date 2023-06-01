import './css/Micuenta.css'
import arrowRight from './img/arrow_right.png'
const MiCuenta = () =>{

    return (

        <div className="miCuenta">
           <div className="item1 items">
             <h4 className="kenyan"><i> MI CUENTA </i> </h4>

           </div>
            <div className=" items item2">
                <p className="poppins">Revisar detalles de mi cuenta</p>

            </div>
            <div className="item3 items">
                <img src={arrowRight}/>
            </div>
        </div>
    );

};

export default MiCuenta;


