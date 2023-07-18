import { Camera,CameraResultType, CameraSource } from '@capacitor/camera';
import { useAuth } from './../../UserProvider';
import { useEffect,useState } from 'react';

import './css/subirImagen.css';
const SubirImagen = () =>{

    const { user } = useAuth();
     const [urlFoto,setUrlFoto]=useState<string>('');
   
    const openGallery = async () => {

    
      
        if (user != null){
            const image = await Camera.getPhoto({
                source: CameraSource.Photos,
                allowEditing: false,
                resultType: CameraResultType.Base64,
              });
    
              
    
    
              const imageBase64 = image.base64String;
            subirFoto(imageBase64);
        }
          
        }
        
        const subirFoto = async (imagen:any)=>{
          if(user != null){
              let data = {
                  imagen:imagen,
                  claveSocio:user?.Clav_Asociado
              }
      
        
              let url = "https://187.188.16.29:4431/webservice-app2/controllers/actualizarFoto.php";
                await  fetch(url, {
                      method: 'POST', // or 'PUT'
                       // data can be `string` or {object}!
                       body:JSON.stringify(data),
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }).then(res => res.json())
                      .then(data => {
                        
                          
                          setUrlFoto("");
                          setTimeout(()=>{
                            setUrlFoto(`https://187.188.16.29:4431/webservice-app2/assets/avatars-users/${user?.imgAvatar}`);
                          },100);
                        
                          console.log(data.mensaje);
                        
                    
                          // Manejar la respuesta del servidor
                        
          
                    
          
                      })
                      .catch(error => console.error('Error:', error));

          }
                  
    
             
                    
        }
    
        useEffect(() => {
            console.log('cambiado', urlFoto);
          }, [urlFoto]);
        
          useEffect(() => {
            if (user) {
              setUrlFoto(`https://187.188.16.29:4431/webservice-app2/assets/avatars-users/${user?.imgAvatar}`);
            }
          }, [user]);

    return (
        <>
        
                <img  id="avatar" src={urlFoto} onClick={openGallery}/>
                
         

          
        </>
   
    );
}
export default SubirImagen;