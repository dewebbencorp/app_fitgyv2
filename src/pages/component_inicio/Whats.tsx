import fw from './img/fonto_whats.png';
import w from './img/whats.png';
import './css/whats.css';
const Whats = ()=>{

    return(
        <div className="whatsContainer">
            <div className="fondoWhats">
                <img src={fw}/>
                </div>
            <div className="whats"> <img src={w}/></div>
        </div>
    );
}
export default Whats;