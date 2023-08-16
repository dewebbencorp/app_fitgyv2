import { useEffect, useState } from "react"
import { TfiReload } from "react-icons/tfi";
import { FaCircle, FaPlus } from "react-icons/fa";
import { IonContent, IonInput } from "@ionic/react";
import "./profile.css"
import { Asociado, Cards } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { postCardsList } from "../../axios/Card";


interface UpdateProfileProps {
    setModal: (value: boolean) => void;
    user: Asociado;
}


export const UpdateProfile = ({ setModal, user }: UpdateProfileProps) => {
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(postCardsList(user.Clav_Asociado))
    }, [])

    const cardss = useSelector((state: Cards) => state.card_list);
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
                    <h5>Nombre</h5>
                    <IonInput type="text" value={user.Nombre_Asociado} disabled />
                    <h5>Apellidos</h5>
                    <IonInput type="text" value={user.Apellidos} disabled />
                    <h5>Correo</h5>
                    <IonInput type="text" value={user.CorreoE} />
                    <h5>Teléfono</h5>
                    <IonInput type="text" name="" id="" value={user.Telefono} />

                    <div className="change-pass-container">

                        <TfiReload style={{ fontSize: '1.3em', color: 'orangered', fontWeight: 'bold' }} />

                        <h5>Cambiar contraseña</h5>
                    </div>
                    <div className="add-card-container">

                        <FaPlus style={{ fontSize: '1.3em', color: 'orangered', fontWeight: 'bold' }} />

                        <h5>Agregar otra tarjeta</h5>
                    </div>
                    <div className="current-card-container">

                        <div className="card-list-container">
                            {cardss.length > 0 && cardss.map((card: Cards) => (



                                <div key={card.numTarjeta}>
                                    <div className="card-number-container">

                                        <FaCircle className={card.Activo === 1 ? "far-Icon" : "far-Icon-non-active"} />
                                        {card.numTarjeta} <h5>{card.Activo === 1 ? "(Activa)" : "(Desactivada)"}</h5>
                                    </div>


                                </div>


                            ))}
                        </div>



                    </div>
                    <div className="btn-close-container" >
                        <button type="submit" className="btn-up-dta" >
                            Actualizar datos</button>
                    </div>
                </form>


            </div>



        </IonContent>
    </>)
}