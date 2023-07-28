import { InAppBrowser } from "@ionic-native/in-app-browser";
import { CartI } from "../../interfaces";

export const sendWhatsAppMessage = (message: CartI[], total: number) => {
  let number = 9983191668;
  let data: string = ` `;
  for (let i = 0; i < message.length; i++) {
    const item = message[i];
    data += `${item.name_product}, cantidad = ${item.total_product}\n\n `;
  }

  const order : string = `Productos:\n\n ${data}\n Total a pagar:  $${total}`
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
    order
  )}`;
  InAppBrowser.create(url, "_system");
};
