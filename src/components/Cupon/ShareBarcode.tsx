import { SocialSharing } from "@ionic-native/social-sharing";
import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import "./cupon.css";

interface ShareBarcodeProps {
  code: string;
  name: string
}

export const ShareBarcode = ({ code, name }: ShareBarcodeProps) => {
  const barcodeRef = useRef<HTMLDivElement | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    setDate(today);
  }, []);

  const handleGenerateAndShare = async () => {
    if (barcodeRef.current) {
      try {
        const canvas = await html2canvas(barcodeRef.current);
        const imageUri = canvas.toDataURL("image/png");
        await SocialSharing.share('', "Cupón generado", imageUri, '');
      } catch (error) {
        console.error("Error al generar y compartir el cupón:", error);
      }
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Meses en JavaScript comienzan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="main-barcode">
      <span
        style={{
          fontSize: "1em",
          color: "white",
          animation: "shimmerAnimation 1.5s infinite",
        }}
      >
        ! Ahora puedes compartir tu código ¡
      </span>

      <div className="bar-info" ref={barcodeRef}>
        <div className="c-info">
          <h1>Beneficiario: {name}</h1>
          {date && <h2>{formatDate(date)}</h2>}
        </div>

        <div>
          <Barcode value={code} />
        </div>
      </div>

      <button className="btn-generate" onClick={handleGenerateAndShare}>
        <div className="btn-cupon-info">
          <p>Compartir</p>
        </div>
      </button>
    </div>
  );
};
