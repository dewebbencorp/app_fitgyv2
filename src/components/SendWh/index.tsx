import { InAppBrowser } from "@ionic-native/in-app-browser";


export const SendWh = (message: string) => {
    let number = "9983641651";

    console.log(message.length);

    if (message.length > 10) {
        const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
            message
        )}`
        InAppBrowser.create(url, "_system");

    }  else {
        console.log('The mssage can not be empty ');
        
    }



};
