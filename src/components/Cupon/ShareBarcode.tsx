import { SocialSharing } from "@ionic-native/social-sharing";
import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import "./cupon.css";
import logo from "./images/fitbar.png";
import toast from "react-hot-toast";
import { Asociado } from "../../interfaces";
import { useSelector } from "react-redux";

interface ShareBarcodeProps {
  code: string;
  name: string;
}

export const ShareBarcode = ({ code, name }: ShareBarcodeProps) => {
  const barcodeRef = useRef<HTMLDivElement | null>(null);
  const user: Asociado = useSelector((state: Asociado) => state.user);
  const [date, setDate] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const today = new Date();
    setDate(today);
  }, []);

  const handleGenerateAndShare = async () => {
    setIsActive(true);
    if (barcodeRef.current) {
      try {
        const canvas = await html2canvas(barcodeRef.current);
        const imageUri = canvas.toDataURL("image/png");
        await SocialSharing.share("", "Generado", imageUri, "");
      } catch (error) {
        console.error("Error al generar y compartir :", error);
      } finally {
        setIsActive(false);
        setIsShared(true);
      }
    }
  };

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 15);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // Meses en JavaScript comienzan desde 0
    const year = newDate.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <main className=" flex flex-col  justify-center items-center gap-10  h-screen ">
      <h1 className=" absolute z-30 top-[5vh]  text-center  items-center poppins italic bold text-[1.5rem]  tracking-[0.2rem]  ">
        ¡CUPÓN EXITOSO!
      </h1>

      <section className="flex justify-center items-center z-10 border-[2px] border-[#e64e08]  h-[65%] w-[85%]  rounded-[2rem]  relative bg-[var(--ion-background-color)]  ">
        <img
          src={logo}
          className="absolute w-36 top-[-5rem] bg-gradient-to-r  from-[#e64e08] to-[#ff7d04] p-3  rounded-full border-[var(--ion-background-color)] border-[0.7rem] "
        />
        <div className=" square-left"></div>
        <div className=" square-right"></div>

        <section className=" flex flex-col  justify-start    mt-10  h-[75%] w-[100%] ">
          <h1 className="text-center text-[1.5rem] poppins bold tracking-[0.2rem] italic mb-5 ">
            CUPÓN
          </h1>

          <section className="flex ml-[0.5rem] mr-[0.5rem] p-1 h-[20%]  items-start   child:text-white child:text-[0.9rem] text-center poppins ">
            <span>Generó: {user.Nombre_Asociado + " " + user.Apellidos}</span>
            <span className="bg-white w-[0.7%] h-[100%] text-white "></span>
            <span>Beneficiario : SEBASTIAN MARTÍNEZ</span>
          </section>

          <section className="flex flex-col items-center gap-1 mt-3  ml-[0.5rem] mr-[0.5rem] p-1      child:text-white child:text-[0.9rem] text-start poppins ">
            <span>Fecha: 20/01/24</span>
            <span>Hora: 4:46:06</span>
            <span>Vencimiento: 2/02/24</span>
          </section>

          <section className="flex flex-col justify-center items-center  child:text-white  mt-2 ">
            <span className="text-[0.9rem] poppins">Monto:</span>
            <span className="text-[2rem] poppins">$200</span>
          </section>

          <section className="  flex justify-center h-[20] " ref={barcodeRef}>
            
              <Barcode  height={15} width={1}  value={code} />
            
          </section>


          <section className="flex justify-center mt-5 ">
            hola
          </section>
        </section>
        {/* <button
          className="absolute bottom-5 bg-[orangered] p-1 rounded-md"
          onClick={handleGenerateAndShare}
          disabled={isActive}
        >
          <div className=" child:text-[1rem]">
            {isActive ? (
              <p style={{ color: "white" }}>Compartiendo...</p>
            ) : isShared ? (
              <p style={{ color: "white" }}>Compartido</p>
            ) : (
              <p style={{ color: "white", textDecoration: "none" }}>
                Compartir{" "}
              </p>
            )}
          </div>
        </button> */}
      </section>
    </main>
  );
};
