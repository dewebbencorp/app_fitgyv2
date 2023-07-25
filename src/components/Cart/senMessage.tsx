import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ProductoDetalle } from "../../interfaces";

export const sendWhatsAppMessage = (message: ProductoDetalle) => {
    const data: string = `Producto: ${message.nombreProducto}, Descripcion ${message.descripcion} `;
    const url = `https://api.whatsapp.com/send?phone=${9981797450}&text=${encodeURIComponent(
      data
    )}`;
    InAppBrowser.create(url, "_system");
  };