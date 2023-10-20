import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Cart, CartI } from "../../interfaces";


export const sendWhatsAppMessage = (message: any,   setIsClear: (value: boolean) => void) => {
 
  let number = "9983191668"; 
  let data: string = ` `;

  message.forEach(function (elemento: Cart) {
    data += `\n${elemento.product}, cantidad =  ${elemento.total} \n`;
    
  });

  const order: string = `Orden de compra:\n ${data}`;
 

  const confirmMessage = `¿Deseas enviar el pedido por WhatsApp?\n\n${order}`;
  const shouldSendMessage = window.confirm(confirmMessage);


  if (shouldSendMessage) {

    
    
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
      order
    )}`;
    InAppBrowser.create(url, "_system");
    setIsClear(true)
  }

  


};

