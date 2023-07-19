import { IonBackButton, IonButtons, IonToolbar, IonTitle } from "@ionic/react";
import { useParams } from "react-router";

export const ListFood = () => {
    const { id } = useParams();
    return (
        <>
            <IonToolbar>
                <IonTitle>Hello ListFood</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="//home/fitbar" />
                </IonButtons>
            </IonToolbar>


            <h3>id_food = {id}</h3>
        </>
    )
}