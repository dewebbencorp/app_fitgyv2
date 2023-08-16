import { GiPencil } from "react-icons/gi";
import { useEffect, useState } from "react"
import { HiChevronRight } from "react-icons/hi2";
import points from './images/ponts.png'
import schedule from './images/schedule.png'
import { IonActionSheet, IonAlert, IonContent, IonModal } from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { App } from "@capacitor/app";
import { Asociado } from "../../interfaces";
import './profile.css'
import { UpdateProfile } from "./UpdateProfile";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GetDeadLine } from "./GetDeadLine";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { uploadPhono } from "../../axios/User";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Toaster, toast } from 'react-hot-toast';
import { backgroundImage } from "html2canvas/dist/types/css/property-descriptors/background-image";

export const UserProfile = () => {
    const [showModal, setModal] = useState(false)
    const [actionSh, setActionSh] = useState(false)
    const user: Asociado = useSelector((state: Asociado) => state.user);
    const basefolder = "https://187.188.16.29:4431/webservice-app2/assets/avatars-users/";
    const history = useHistory();

    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const cerrarSesion = () => {

        const shouldSendMessage = window.confirm('Estas seguro que deseas salir?');

        if (shouldSendMessage) {
            dispatch(removeUser())
            history.replace('/');
            App.exitApp();
        }
    };

    const { deadline, calculateDeadline } = GetDeadLine(user.diasRestantes - 1 ?? 1)



    useEffect(() => {
        calculateDeadline()

    }, [])
    const openGallery = async () => {
        if (user != null) {
            const image = await Camera.getPhoto({
                source: CameraSource.Photos,
                allowEditing: false,
                resultType: CameraResultType.Base64,
            });

            const imageBase64 = image.base64String;


            if (imageBase64) {
                upph(imageBase64)
            }

        }
    };
    const upph = async (upImg: string) => {
        if (upImg) {
            try {
                console.log("SE ESTA SUBIENDO");
                await toast.promise(
                    dispatch(uploadPhono(upImg, user.Clav_Asociado)),
                    {
                        loading: 'Subiendo Foto',
                        success: 'Foto subida exitosamente',
                        error: 'Error al subir la foto',
                    }
                );
            } catch (error) {
                console.error("Error al subir la imagen:", error);
            } finally {
                window.location.replace("/home/perfil");
            }
        }
    };



    return (<>

        <IonContent>
            <Toaster />

            <div className="main-ctn">
                <div className='head-containaer-1'></div>
                <div className="head-containaer-2" >
                    <div className="profile-data-container">
                        <img src={basefolder + user.imgAvatar} className="profile-image" onClick={() => setActionSh(true)} />
                    </div>

                    <GiPencil className="pencil" onClick={() => setModal(true)} />
                    <h1 className="user-name ">{`${user.Nombre_Asociado} ${user.Apellidos}`}</h1>
                </div>
                <div className="my-account">
                    <div className="detail-account">
                        <div className="detail-title">
                            <h3 className="kenyan">MI CUENTA</h3>
                            <h5>Revisar detalles de mi cuenta</h5>
                        </div>
                        <HiChevronRight style={{ fontSize: "2rem", marginTop: "0.5rem", zIndex: "1" }} />
                    </div>

                    <h3 className="kenyan" style={{ fontSize: '1.7em' }}>CLIENTE PREMIUM</h3>

                    <div className="ponits-container">
                        <img className="points-icon" src={points} />
                        <div className="points">
                            <h5>Puntos Disponibles</h5>
                            <h3 className="kenyan">{user.puntos}</h3>
                        </div>
                    </div>

                    <div className="btn-add-inbody-container">
                        <div className="btn-add-inbody">
                            <img className="schedule-icon" src={schedule} />
                            <h5>Agendar Inbody</h5></div>
                    </div>
                    <div className="memberships">
                        <h1 className="kenyan">Membresia</h1>
                        <h2>Activa hasta: {deadline && deadline} </h2>
                    </div>
                </div>



            </div>
            <div className="btn-close-container" onClick={cerrarSesion}>
                <div className="btn-close">
                    Cerrar Sesión</div>
            </div>
        </IonContent>

        <IonModal isOpen={showModal} >
            <div className="btn-close-update-container">
                <AiOutlineCloseCircle className="btn-close-update" onClick={() => setModal(false)} />
            </div>
            <UpdateProfile setModal={setModal} user={user} />
        </IonModal >


        <IonActionSheet
            isOpen={actionSh}
            onDidDismiss={() => setActionSh(false)}
            cssClass="action-sheet"
            buttons={[

                {
                    text: 'Seleccionar foto de perfil',
                    icon: "#",
                    handler: () => {
                        openGallery()
                    },
                },
                {
                    text: 'Cancel',
                    icon: "#",
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    },
                },
            ]}
        ></IonActionSheet>


    </>)
}