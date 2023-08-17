import { useForm } from "react-hook-form";
import "./profile.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
export const ChangePassword = ({ setPw }: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = handleSubmit(async (data) => {

        reset()
        console.log(data.password);

    })


    return (
        <>

            <div className="ch-password-container">
                <div style={{ display: 'flex', justifyContent: 'end',  marginBottom:'0rem' }}>
                    <AiOutlineCloseCircle className="btn-close-update" onClick={() => setPw(false)} />
                </div>

               
                <div className="input-up-container" >

                    <form onSubmit={onSubmit}>
                   
                        <div className="input-container">
                        <h3 style={{textAlign: 'center', fontFamily:'var(--poppins)', fontSize:'1em'}}> INTRODUCE TU NUEVA CONTRASEÑA</h3>
                            
                            <input
                                className="n-card-input"
                                type="password"
                                {...register("password", {
                                    minLength: {
                                        value: 8,
                                        message: 'Ingresa al menos 8 caracteres',
                                    },
                                    required: {
                                        value: true,
                                        message: "*Campo requerido",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                                        message: "!Ingresa al menos un número (#) y una letra mayúscula (A)!",
                                    },
                                })}
                            />
                            {errors.password && <span style={{ marginTop: '1vh' }}>{errors.password.message}</span>}
                            <h3 style={{ marginTop: '2vh' }}>Confirmar contraseña</h3>
                            <input
                                className="n-card-input"
                                type="password"
                                {...register("confirmPassword", {
                                    validate: value => value === watch("password") || "Las contraseñas no coinciden",
                                    required: {
                                        value: true,
                                        message: "*Campo requerido",
                                    },
                                })}
                            />
                            {errors.confirmPassword && <span style={{ marginTop: '2vh' }}>{errors.confirmPassword.message}</span>}


                        </div>
                        <div className="btn-close-container " style={{
                            marginTop: '5vh',
                            marginBottom: '5vh'
                        }} >
                            <button type="submit" className="btn-up-dta" >
                                Guardar</button>
                        </div>
                    </form>


                </div>

            </div>


        </>
    )
}