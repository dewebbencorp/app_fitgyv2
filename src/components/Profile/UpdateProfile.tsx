import { useEffect } from "react"
import { TfiReload } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa";
import "./profile.css"
import { Asociado } from "../../interfaces";

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
        <div className="title-up">
            Detalles de mi cuenta
        </div>

        <div className="input-up-container">
            <h5>Nombre</h5>
            <input className="input-up" type="text" value={user.Nombre_Asociado}  disabled/>
            <h5>Apellidos</h5>
            <input className="input-up" type="text" value={user.Apellidos} disabled/>
            <h5>Correo</h5>
            <input className="input-up" type="text" />
            <h5>Teléfono</h5>
            <input type="text" name="" id="" />

            <div className="change-pass-container">

                <TfiReload style={{ fontSize: '1.3em', color: 'orangered', fontWeight: 'bold' }} />

                <h5>Cambiar contraseña</h5>
            </div>
            <div className="add-card-container">

                <FaPlus style={{ fontSize: '1.3em', color: 'orangered', fontWeight: 'bold' }} />

                <h5>Agregar otra tarjeta</h5>
            </div>


        </div>

        <div>Actualizar datos</div>
    </>)
}