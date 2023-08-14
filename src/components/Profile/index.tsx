import { GiPencil } from "react-icons/gi";
import { HiChevronRight } from "react-icons/hi2";
import './profile.css'
import points from './images/ponts.png'
import schedule from './images/schedule.png'
import { IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { App } from "@capacitor/app";
export const UserProfile = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const cerrarSesion = () => {
        dispatch(removeUser())
        history.replace('/');
        App.exitApp();
    };
    return (<>

        <IonContent>

            <div className="main-ctn">
                <div className='head-containaer-1'></div>
                <div className="head-containaer-2" >
                    <div className="profile-data-container">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRmGQNAHlUAEePOTE4GBTp9HjjNODjwBKZNw&usqp=CAU" className="profile-image" />
                    </div>
                    <GiPencil className="pencil" />
                    <h1 className="user-name ">User name</h1>
                </div>
                <div className="my-account">
                    <div className="detail-account">
                        <div className="detail-title">
                            <h3 className="kenyan">MI CUENTA</h3>
                            <h5>Revisar detalles de mi cuenta</h5>
                        </div>
                        <HiChevronRight style={{ fontSize: "2rem", marginTop: "0.5rem" }} />
                    </div>

                    <h3 className="kenyan" style={{ fontSize: '1.7em' }}>CLIENTE PREMIUM</h3>

                    <div className="ponits-container">
                        <img className="points-icon" src={points} />
                        <div className="points">
                            <h5>Puntos Disponibles</h5>
                            <h3 className="kenyan">100</h3>
                        </div>
                    </div>

                    <div className="btn-add-inbody-container">
                        <div className="btn-add-inbody">
                            <img className="schedule-icon" src={schedule} />
                            <h5>Agendar Inbody</h5></div>
                    </div>
                    <div className="memberships">
                        <h1 className="kenyan">Membresia</h1>
                        <h2>Valida hasta el 26 de mayo del 2020 </h2>
                    </div>
                </div>



            </div>
            <div className="btn-close-container" onClick={cerrarSesion}>
                <div className="btn-close">
                    Cerrar Sesión</div>
            </div>
        </IonContent>

    </>)
}