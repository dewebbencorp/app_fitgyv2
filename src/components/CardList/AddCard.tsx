import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export const AddCard = ({ setModal }: any) => {
    const [request, setRequest] = useState({});
    const backButtonHandler = () => {
        setModal(false); // Cerrar el modal
    };


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            ncard: "",
            date: "",
            cvv: ""
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setRequest(data);

    });

    useEffect(() => {
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);
    return (
        <>
            <button onClick={backButtonHandler}>close</button>
            <div>


                <div className="input-card-container">
                    <form onSubmit={onSubmit}>
                        <h2>Nueva tarjeta</h2>
                        <h5 >Numero de tarjeta</h5>
                        <input placeholder="123 . . . ." type="tel" minLength={16} maxLength={19}
                            {...register("ncard", {
                                maxLength: {
                                    value: 19,
                                    message: 'Cantidad de caracteres exedido'
                                },
                                minLength: {
                                    value: 16,
                                    message: 'La tarjeta deben ser almenos 16 dígitos'
                                },
                                required: {
                                    value: true,
                                    message: "*El numero de tarjeta es requerido",
                                }
                            })}
                        />

                        {errors.ncard && <span>{errors.ncard.message}</span>}
                        <h5 >Fecha de vencimiento</h5>
                        <input placeholder="MMYY" type="tel" maxLength={4} {...register("date", {

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
                        <input placeholder="CVV" type="tel" maxLength={3} {...register("cvv", {

                            minLength: {
                                value: 3,
                                message: 'Deben ser almenos 3 dígitos'
                            },
                            required: {
                                value: true,
                                message: "*El cvv es requerido",
                            }
                        })} />
                        {errors.cvv && <span>{errors.cvv.message}</span>}
                        <button type="submit" className="btn_save-card">
                            Guardar
                        </button>

                    </form>

                    <div>{request && JSON.stringify(request)}</div>
                </div>

            </div>
        </>
    )
}