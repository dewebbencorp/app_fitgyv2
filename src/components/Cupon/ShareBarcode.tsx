import { SocialSharing } from "@ionic-native/social-sharing";
import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import "./cupon.css";
import logo from "./images/fitbar.png";
import toast from "react-hot-toast";

interface ShareBarcodeProps {
  code: string;
  name: string;
}

export const ShareBarcode = ({ code, name }: ShareBarcodeProps) => {
  const barcodeRef = useRef<HTMLDivElement | null>(null);
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
      {/* <h1 className="  text-center  items-center poppins text-[1.5rem] bold tracking-[0.2rem] italic ">
        ¡CUPÓN EXITOSO!
      </h1> */}

      

      <section className="flex justify-center items-center z-10 border-[2px] border-[#e64e08]  h-[70%] w-[85%] p-10 rounded-[2rem]  relative bg-[var(--ion-background-color)]">
      <img
          src={logo}
          className="absolute w-40 top-[-5rem] bg-gradient-to-r  from-[#e64e08] to-[#ff7d04] p-3  rounded-full border-[var(--ion-background-color)] border-[0.7rem] "
        />
        <div className=" square-left"></div>
        <div className=" square-right"></div>

        {/* <div className="" ref={barcodeRef}>
          <div>
            <Barcode value={code} />
          </div>
        </div> */}

        <button
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
        </button>
      </section>
    </main>
  );
};
