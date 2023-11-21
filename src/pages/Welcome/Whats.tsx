import fw from './img/fonto_whats.png';
import w from './img/whats.png';
import './css/whats.css';
const Whats = ()=>{

    return(
        <div className="whatsContainer">
            <div className="fondoWhats">
                <img src={fw}/>
                </div>
            <div className="whats"> <img src={w} onClick={()=>window.location.href="whatsapp://send?phone=9983641651"}/></div>
        </div>
    );
}
export default Whats;