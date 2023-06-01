import {createContext,useState,useContext} from 'react';


interface AuthContextProps {
    user:User | null;
    login:(username:string,password:string) =>void;
    logout:()  =>void;
    alerta:string;
    redireccionar:boolean;
    salir:boolean;
}
interface User{
    
    Clav_Asociado:number;
    titular:boolean;
    Apellidos:string;
    Nombre_Asociado:string;
    CorreoE:string;
    Telefono:string;
    TipoMembresia:string;
    NombreMem:string;
    diasRestantes:number;
    esSocio:boolean;
    fechaO:string;
    puntos:number;
    imgAvatar:string;



}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {},
    alerta:'',
    redireccionar:false,
    salir:false
  });

export const AuthProvider: React.FC =( {children} ) => {
    const [user,setUser] = useState<User | null>(null);
    const [alerta,setAlerta] = useState('');
    const [redireccionar,setRedireecionar] = useState(false);
    const [salir,setSalir] = useState(false);
    
    const login =(email:string,password:string) =>{
      setSalir(false);
   
        let data = ({
            "email":email,
            "password":password
          });
          console.log(data);
          let url:string = "https://187.188.16.29:4431/webservice-app2/controllers/login.php";
          fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
            if(data.esSocio == 1 ) {
              setUser(data);
        
              setRedireecionar(true);
              

            }
            else{
              setAlerta(data.mensaje);
              setRedireecionar(false);
            }
          })
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));   
    }

    const logout =() =>{
        setUser(null);
        setSalir(true);
        setRedireecionar(false);
    }
    return (
        <AuthContext.Provider value ={{user,login,logout,alerta,redireccionar,salir}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () =>useContext(AuthContext);