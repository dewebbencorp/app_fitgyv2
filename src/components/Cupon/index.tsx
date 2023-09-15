import "./cupon.css";
import cupon_img from "../../pages/Home/img/cupon.png";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { BACKGROUND_CUPON_VIDEO } from "../../constants";
export const Cupon = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      beneficiario: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsButtonDisabled(true);
    toast.loading("Generando cupon ...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Cupon generado para: " + data.beneficiario);
      setIsButtonDisabled(false);
    }, 3000);
    console.log(data);
    reset();
  });
  return (
    <>
      <Toaster />
      <div className="main-cupon-container">
        <div className="cupon-container">
          <div className="head-cupon">
            <h1>The Fit Bar</h1>
            <h2>MENÚ</h2>
          </div>
          <div className="video-container">
            <video src={BACKGROUND_CUPON_VIDEO} autoPlay loop />
          </div>
        </div>
        <form onSubmit={onSubmit} className="btn-generate-container">
          {errors.beneficiario ? (
            <span>{errors.beneficiario.message}</span>
          ) : (
            <span className="span-m">Ingresa el nombre del beneficiario</span>
          )}
          <input
            type="text"
            {...register("beneficiario", {
              required: {
                value: true,
                message: "! El nombre es requerido ¡",
              },
              minLength: {
                value: 3,
                message: "! El nombre debe ser mayor a 3 caracteres ¡",
              },
            })}
          />

          <button
            type="submit"
            className="btn-generate"
            disabled={isButtonDisabled}
          >
            <div className="btn-cupon-info">
              <img src={cupon_img} /> <p> Generar</p>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};
