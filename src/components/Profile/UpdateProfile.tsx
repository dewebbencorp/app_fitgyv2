import { useEffect, useState } from "react"
import { TfiReload } from "react-icons/tfi";
import { FaCircle, FaPlus } from "react-icons/fa";
import { IonContent, IonInput } from "@ionic/react";
import "./profile.css"
import { Asociado, Cards } from "../../interfaces";
import { CardsList } from "../CardList";


interface UpdateProfileProps {
    setModal: (value: boolean) => void;
    user: Asociado;
}


export const UpdateProfile = ({ setModal, user }: UpdateProfileProps) => {


    const backButtonHandler = () => {
        setModal(false); // Cerrar el modal
    };


    useEffect(() => {
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);
    return (<>
        <IonContent>
            <div className="title-up">
                Detalles de mi cuenta
            </div>

            <div className="input-up-container">
                <form>
                    <h3>Nombre</h3>
                    <IonInput type="text" value={user.Nombre_Asociado} disabled />
                    <h3>Apellidos</h3>
                    <IonInput type="text" value={user.Apellidos} disabled />
                    <h3>Correo</h3>
                    <IonInput type="text" value={user.CorreoE} />
                    <h3>Teléfono</h3>
                    <IonInput type="text" name="" id="" value={user.Telefono} />

                    <div className="list-options-container">
                        <div className="change-pass-container">

                            <TfiReload style={{ fontSize: '1.3em', color: 'orangered', fontWeight: 'bold' }} />

                            <h5>Cambiar contraseña</h5>
                        </div>

                        <CardsList />
                    </div>
                    <div className="btn-close-container btn-send-up" >
                        <button type="submit" className="btn-up-dta" >
                            Actualizar datos</button>
                    </div>
                </form>


            </div>



        </IonContent>
    </>)
}