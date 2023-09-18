import { SocialSharing } from "@ionic-native/social-sharing";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import "./cupon.css";

interface ShareBarcodeProps {
  code: string;
}

export const ShareBarcode: React.FC<ShareBarcodeProps> = ({ code }) => {
  const barcodeRef = useRef<HTMLDivElement | null>(null);

  const handleGenerateAndShare = async () => {
    if (barcodeRef.current) {
      try {
        const canvas = await html2canvas(barcodeRef.current);

        const imageUri = canvas.toDataURL("image/png");

        await SocialSharing.share(null, "Cupón generado", imageUri, null);
      } catch (error) {
        console.error("Error al generar y compartir el cupón:", error);
      }
    }
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
        ! Ahora puedes compartir tu codigo ¡
      </span>
      <div className="bar-info" ref={barcodeRef}>
        <Barcode value={code} />
      </div>

      <button className="btn-generate" onClick={handleGenerateAndShare}>
        <div className="btn-cupon-info">
          <p> Compartir</p>
        </div>
      </button>
    </div>
  );
};
