import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Asociado, Cart, CartI } from "../../interfaces";
import { useSelector } from "react-redux";

export const sendWhatsAppMessage = (
  message: any,
  setIsClear: (value: boolean) => void,
  user: string,
  cve: number
) => {
  let number = "9983641651";
  let data: string = ` `;

  message.forEach(function (elemento: Cart) {
    data += `\n ${elemento.total} ${elemento.product}  \n`;
  });

  const order: string = `¡Hola! Soy ${user} con el número de socio ${cve}.\nMe gustaría realizar el siguiente pedido:\n ${data}`;

  const confirmMessage = `¿Deseas enviar el pedido por WhatsApp?\n${data}`;
  const shouldSendMessage = window.confirm(confirmMessage);

  if (shouldSendMessage) {
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
      order
    )}`;
    InAppBrowser.create(url, "_system");
    setIsClear(true);
  }
};
