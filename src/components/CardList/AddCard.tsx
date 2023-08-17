import { IonProgressBar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import card_img from "./images/card_img.png"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Asociado, validCard } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { validateCard } from "../../axios/Card";
import { Toaster, toast } from 'react-hot-toast';


export const AddCard = ({ setModal }: any) => {
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const user: Asociado = useSelector((state: Asociado) => state.user);
    const backButtonHandler = () => {
        setModal(false);
    };


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({});



    const onSubmit = handleSubmit(async (data) => {


        const card: validCard = {
            claveSocio: user.Clav_Asociado,
            numTarjeta: data.ncard,
            vencimiento: data.date,
            cvv: data.cvv
        };

        try {
            toast.loading('Validando informacón')
            const response = await dispatch(validateCard(card));


            setTimeout(() => {
                toast.dismiss()
                if (response.exito) {
                    toast.success(`Exito :${response.mensaje}`)
                    reset()
                } else {
                    toast.error(`Error :${response.mensaje}`)
                }
            }, 5000);

        } catch (error) {
            toast.error(`${error}`);
        }


    });

    useEffect(() => {
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);
    return (
        <>
            <Toaster />
            <div className="btn-close-update-container" onClick={backButtonHandler}>
                <AiOutlineCloseCircle className="btn-close-update" />
            </div>

            <div>


                <div className="input-card-container">
                    <form onSubmit={onSubmit}>
                        <h2>Nueva tarjeta</h2>

                        <IonProgressBar color="var(--ion-tab-bar-background)" className="custom-pg-2" />

                        <h5 >Número de tarjeta de crédito</h5>
                        <input className="n-card-input" placeholder="123 . . . ." type="tel" minLength={16} maxLength={19}
                            {...register("ncard", {
                                maxLength: {
                                    value: 19,
                                    message: 'Cantidad de caracteres exedido'
                                },
                                minLength: {
                                    value: 16,
                                    message: 'Deben ser almenos 16 dígitos'
                                },
                                required: {
                                    value: true,
                                    message: "*El numero de tarjeta es requerido",
                                }
                            })}
                        />

                        {errors.ncard && <span>{errors.ncard.message}</span>}
                        <h5 >Fecha de vencimiento</h5>
                        <input className="date-deadline-input" placeholder="mmyy" type="tel" maxLength={4} {...register("date", {

                            minLength: {
                                value: 4,
                                message: 'Fecha invalida, ingresa el mes y el año, ejemplo : 0123'
                            },
                            required: {
                                value: true,
                                message: "*La fecha es requerida",
                            }
                        })} />
                        {errors.date && <span>{errors.date.message}</span>}
                        <h5 >Codigo de seguridad</h5>
                        <div className="cvv-container">
                            <input className="date-deadline-input" placeholder="cvv" type="password" maxLength={3} {...register("cvv", {

                                minLength: {
                                    value: 3,
                                    message: 'Deben ser almenos 3 dígitos'
                                },
                                required: {
                                    value: true,
                                    message: "*El cvv es requerido",
                                }
                            })} />

                            <img src={card_img} />
                        </div>
                        {errors.cvv && <span>{errors.cvv.message}</span>}

                        <div className="btn-close-container btn-send-up btn-save" >
                            <button type="submit" className="btn-up-dta" >
                                Guardar</button>
                        </div>

                    </form>

                </div>

            </div>
        </>
    )
}