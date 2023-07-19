import { IonContent, IonInput, IonButton, IonGrid, IonRow, IonCol, IonLabel, IonAlert, IonModal, IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

import './css/editarDatos.css';
import { useAuth } from '../../UserProvider';
import SubirImagen from "./SubirImagen";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import FlechaAtras from "./FlechaAtras";
const EditarDatos = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertContrasena, setShowAlertContrasena] = useState(false);
    const datosAsociados = useRef<HTMLFormElement | null>(null);
    const [showModalContrasena, setShowModalContrasena] = useState(false);
    const [nuevaContrasena1, setNuevaContrasena1] = useState('');
    const [nuevaContrasena2, setNuevaContrasena2] = useState('');
    const [alerta, setAlerta] = useState('');

    const actualizarDatos = async () => {
        if (datosAsociados.current) {
            const data = {
                claveSocio: user?.Clav_Asociado,
                nombre: datosAsociados.current.nombre.value,
                apellidos: datosAsociados.current.apellidos.value,
                correo: datosAsociados.current.email.value,
                telefono: datosAsociados.current.telefono.value
            }



            let url = "https://187.188.16.29:4431/webservice-app2/controllers/actualizarDatosApp.php";
            await fetch(url, {
                method: 'POST', // or 'PUT'
                // data can be `string` or {object}!
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {




                    console.log(data);
                    if (data.mensaje) {
                        setShowAlert(true);
                        setAlerta('');
                    }

                    // Manejar la respuesta del servidor




                })
                .catch(error => console.error('Error:', error));

        }

    }



    const actualizarContrasena = async () => {


        if (nuevaContrasena1 != '') {
            if (nuevaContrasena1 == nuevaContrasena2) {
                const data = {
                    "claveSocio": user?.Clav_Asociado,
                    "nuevaContrasena": nuevaContrasena1
                }
                let url = "https://187.188.16.29:4431/webservice-app2/controllers/actualizarContrasena.php";
                await fetch(url, {
                    method: 'POST', // or 'PUT'
                    // data can be `string` or {object}!
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .then(data => {




                        console.log(data);

                        if (data.mensaje) {
                            setShowAlertContrasena(true);

                        }
                        // Manejar la respuesta del servidor




                    })
                    .catch(error => console.error('Error:', error));


            }
            else {
                setAlerta("Las contraseñas no coinciden");
            }
        }
        else {
            setAlerta('Debe ingresar una contraseña');
        }

    }

    return (
        <IonContent>
            <IonToolbar>
                <IonTitle>Editar datos</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home/perfil" />
                </IonButtons>
            </IonToolbar>

            <form ref={datosAsociados}>
                <IonGrid>

                    <IonRow>
                        <IonCol id="avatar">
                            <SubirImagen />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="datosContacto">
                            <IonLabel>Nombre</IonLabel>
                            <IonInput
                                name="nombre"
                                type="text"
                                value={user?.Nombre_Asociado}

                            />
                            <IonLabel>Apellidos</IonLabel>
                            <IonInput
                                name="apellidos"
                                type="text"
                                value={user?.Apellidos}
                            />
                            <IonLabel>Correo</IonLabel>
                            <IonInput
                                name="email"
                                type="email"
                                value={user?.CorreoE}
                            />
                            <IonLabel>Telefono</IonLabel>
                            <IonInput
                                name="telefono"
                                type="tel"
                                value={user?.Telefono}
                            />

                        </IonCol>

                    </IonRow>
                    <IonRow>
                        <IonCol id="guardarDatos">
                            <IonButton onClick={actualizarDatos} >Guardar</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol id="actualizarContrasena">
                            <IonButton onClick={() => setShowModalContrasena(true)}>Actualizar contraseña</IonButton>

                        </IonCol>
                    </IonRow>
                </IonGrid>

            </form>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass="my-custom-class"
                header={'Datos Actualizados'}

                message={'Los datos han sido actualizados.'}
                buttons={[{
                    role: 'confirm',
                    text: "Ok",
                    handler: () => { history.push('/home/perfil') }
                }]}
            />
            <IonAlert
                isOpen={showAlertContrasena}
                onDidDismiss={() => setShowAlertContrasena(false)}
                cssClass="my-custom-class"
                header={'Contraseña actualizada'}

                message={'Contraseña actualizada'}
                buttons={[{

                    text: "Ok",
                    handler: () => { setShowModalContrasena(false) }

                }]}
            />

            <IonModal isOpen={showModalContrasena}>

                <div className="contraseña">
                    <IonLabel>Nueva contraseña</IonLabel>
                    <IonInput
                        type="password"
                        value={nuevaContrasena1}
                        onIonInput={(e: any) => { setNuevaContrasena1(e.target.value) }}
                    />
                    <IonLabel>Repite contraseña</IonLabel>
                    <IonInput
                        type="password"
                        value={nuevaContrasena2}
                        onIonInput={(e: any) => { setNuevaContrasena2(e.target.value) }}
                    />
                    <span id="alerta">{alerta}</span>
                    <IonButton id="actualizarContrasena" onClick={actualizarContrasena}>Actualizar contraseña</IonButton>
                    <IonButton id="cerrarModalContrasena" onClick={() => setShowModalContrasena(false)}>Cerrar</IonButton>
                </div>

            </IonModal>

        </IonContent>
    );
}

export default EditarDatos;