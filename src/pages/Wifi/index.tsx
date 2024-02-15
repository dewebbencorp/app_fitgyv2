import { IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { getWifi } from "../../axios/News";
import { Loading } from "../../components/LoadScreen";
import { FaWifi } from "react-icons/fa6";
import CodigoQR from "../Welcome/CodigoQR";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
export const Wifi = () => {
  const [wifi, setWifi] = useState<any>(null);
  const { toasts: tt } = useToasterStore();
  useEffect(() => {
    tt.filter((t) => t.visible)
      .filter((item, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [tt]);

  useEffect(() => {
    const data = async () => {
      const wifi = await getWifi();

      setWifi(wifi);
    };

    data();
  }, []);

  const handleCopy = () => {
    toast.success("Copiado", {
      style: {
        borderRadius: "10px",
        fontSize: "1rem",
        backgroundColor: "#323232",
        color: "white",
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-10 pb-1 overflow-y-auto animate-ap">
      <Toaster />

      {!wifi && <Loading />}

      <section className="flex flex-col items-center w-[50%]">
        <CodigoQR />
        <p className="text-[1rem]  poppins text-center">
          Escanea aquí el código de la máquina
        </p>
      </section>
      <CopyToClipboard text={wifi ? wifi.password : ""}>
        <section
          className="flex flex-col items-center  w-[50%]"
          onClick={handleCopy}
        >
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
      </CopyToClipboard>
    </div>
  );
};
