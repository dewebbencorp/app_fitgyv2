import { IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { getWifi } from "../../axios/News";
import { Loading } from "../../components/LoadScreen";
import { FaWifi } from "react-icons/fa6";
import CodigoQR from "../Welcome/CodigoQR";
import { HiQrCode } from "react-icons/hi2";
export const Wifi = () => {
  const [wifi, setWifi] = useState<any>(null);

  useEffect(() => {
    const data = async () => {
      const wifi = await getWifi();

      setWifi(wifi);
    };

    data();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-10 pb-1 overflow-y-auto animate-ap">
      {!wifi && <Loading />}

      <section className="flex flex-col items-center w-[50%]">
        <HiQrCode className="p-4 border-orange text-[10rem] mb-5" />
        <p className="text-[1rem]  poppins text-center">
          Escanea aquí el código de la máquina
        </p>
      </section>
      

      <section className="flex flex-col items-center  w-[50%]">
        <FaWifi className="p-4 border-orange text-[10rem] mb-5 " />
        <div className="child:text-[1rem] child:mb-2 child:poppins child:text-center">
          <p>¡Conéctate a nuestra red!</p>
          <p className="child:text-[0.9rem] child:text-[#ff7d04]">
            <span>{wifi?.nombreRed}</span>
          </p>
          <p>Contraseña</p>
          <p className="child:text-[0.9rem] child:text-[#ff7d04]">
            <span>{wifi?.password}</span>
          </p>
        </div>
      </section>
    </div>
  );
};
