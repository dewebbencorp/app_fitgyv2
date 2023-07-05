import f_atras from './img/f_atras.png';
import { useHistory } from 'react-router';
const FlechaAtras = ()=>{
    const history = useHistory();
    const regreso = () =>{
        console.log("regreso");
        history.push('/home/perfil')
    }
    
    return (
        <img width="10%" onClick={regreso} id="flechaAtras" src={f_atras}/>
    );
}
export default FlechaAtras;