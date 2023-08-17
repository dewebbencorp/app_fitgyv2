import { useEffect } from "react"
import { TfiReload } from "react-icons/tfi";
import { IonContent } from "@ionic/react";
import { Toaster, toast } from 'react-hot-toast';
import "./profile.css"
import { Asociado, Cards, ResponseUpdate, UpdateProfile as upprofile } from "../../interfaces";
import { CardsList } from "../CardList";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../axios/User";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { updateUserFields } from "../../store/slices/userSlice";


interface UpdateProfileProps {
    setModal: (value: boolean) => void;
    user: Asociado;
}


export const UpdateProfile = ({ setModal, user }: UpdateProfileProps) => {


    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: user.CorreoE,
            phone: user.Telefono,
        }
    });

    const onSubmit = handleSubmit(async (data) => {


        const request: upprofile = {
            claveSocio: user.Clav_Asociado,
            correo: data.email,
            telefono: data.phone
        };


        console.log(request);


        try {
            toast.loading('Enviando datos', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            const res: ResponseUpdate = await dispatch(updateProfile(request));




            if (res.status) {
                toast.dismiss()
                toast.success(`Exito : ${res.response}`)
                reset({ email: '', phone: '' })

                dispatch(updateUserFields({ CorreoE: data.email, Telefono: data.phone }));
            } else {
                toast.dismiss()
                toast.error(`Error : ${res.response}`)
            }


        } catch (error) {
            toast.error(`${error}`);
        }



    });

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
            <Toaster />
            <div className="title-up">
                Detalles de mi cuenta
            </div>

            <div className="input-up-container">
                <form onSubmit={onSubmit}>
                    <div className="input-container">
                        <h3>Nombre</h3>
                        <input className="n-card-input" type="text" value={user.Nombre_Asociado} disabled />
                        <h3>Apellidos</h3>
                        <input className="n-card-input" type="text" value={user.Apellidos} disabled />
                        <h3>Correo</h3>
                        <input className="n-card-input" type="email"   {...register("email", {
                            required: {
                                value: true,
                                message: "Correo es requerido",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Correo no válido",
                            },
                        })} />

                        {errors.email && <span>{errors.email.message}</span>}
                        <h3>Teléfono</h3>
                        <input className="n-card-input" type="tel" minLength={10} maxLength={10} {...register("phone", {

                            minLength: {
                                value: 10,
                                message: 'Ingresa un numero valido '
                            },
                            required: {
                                value: true,
                                message: "*El numero es requerido",
                            }
                        })} />
                        {errors.phone && <span>{errors.phone.message}</span>}

                    </div>
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